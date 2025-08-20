import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';
import FenceComponent from './objects/FenceComponent';
import GateComponent from './objects/GateComponent';
import { 
  HouseComponent, 
  TreeComponent, 
  HayBaleComponent, 
  WaterTroughComponent, 
  ScarecrowComponent,
  ChickenCoopComponent,
  FeedDispenserComponent,
  WaterFountainComponent,
  SmallBarnComponent
} from './objects/BuildingObjects';
import { Sparkles } from '@react-three/drei';

const PlacementSystem: React.FC = () => {
  const { camera, gl } = useThree();
  const { placedObjects, addObject, removeObject, currentDragItem, setCurrentDragItem, deleteMode, setDeleteMode } = useGameStore();
  const [previewPosition, setPreviewPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [sparklePosition, setSparklePosition] = useState<[number, number, number]>([0, 0, 0]);
  const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null);
  const [connectionSparkles, setConnectionSparkles] = useState<Array<{id: string, position: [number, number, number]}>>([]);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Snap to grid - different logic for fences/gates vs other objects
  const snapToGrid = (value: number, isFenceOrGate: boolean = false): number => {
    if (isFenceOrGate) {
      // For fences and gates, snap to grid intersections (0.5, 1.5, 2.5, etc.)
      return Math.round(value - 0.5) + 0.5;
    } else {
      // For other objects, snap to grid centers (0, 1, 2, etc.)
      return Math.round(value);
    }
  };

  // Check if position is within the platform boundaries (8x8 platform)
  const isWithinBounds = (x: number, z: number, isFenceOrGate: boolean = false): boolean => {
    const platformSize = 8;
    const halfSize = platformSize / 2; // 4 for 8x8 platform
    
    if (isFenceOrGate) {
      // For fences and gates, adjust boundaries to account for transform at end rather than center
      // X: negative side pulled in to -2.5, positive side stays at 3.5
      // Z: negative side at -2.5, positive side extended back to 3.5 for proper alignment
      return x >= -2.5 && x <= 3.5 && z >= -2.5 && z <= 3.5;
    } else {
      // For other objects, use standard grid centers (up to 3 for 8x8 platform)  
      const objectMaxPosition = halfSize - 1; // 3 for 8x8 platform
      return x >= -objectMaxPosition && x <= objectMaxPosition && z >= -objectMaxPosition && z <= objectMaxPosition;
    }
  };

  // Calculate stacking height for hay bales
  const calculateStackHeight = (x: number, z: number, type: string): number => {
    if (type !== 'hay_bale') return 0; // Only hay bales can stack
    
    // Find all hay bales at this grid position
    const hayBalesAtPosition = placedObjects.filter(obj => 
      obj.type === 'hay_bale' &&
      Math.abs(obj.position[0] - x) < 0.1 &&
      Math.abs(obj.position[2] - z) < 0.1
    );
    
    // Calculate the Y position for the next hay bale (each hay bale is 0.4 units tall)
    return hayBalesAtPosition.length * 0.4;
  };

  // Enhanced fence connection checking with multiple connection detection
  const checkFenceConnection = (pos: [number, number, number], currentRotation: number): { isConnected: boolean, connectionCount: number, connectionPositions: Array<[number, number, number]> } => {
    if (currentDragItem !== 'fence' && currentDragItem !== 'gate') {
      return { isConnected: false, connectionCount: 0, connectionPositions: [] };
    }
    
    const connectionPositions: Array<[number, number, number]> = [];
    
    placedObjects.forEach(obj => {
      if (obj.type === 'fence' || obj.type === 'gate') {
        const dx = obj.position[0] - pos[0];
        const dz = obj.position[2] - pos[2];
        const distance = Math.abs(dx) + Math.abs(dz);
        
        // For fences on grid intersections, check if they're exactly 1 unit apart
        if (Math.abs(distance - 1.0) < 0.1) { // Small tolerance for floating point
          // For straight fences, check alignment based on rotation
          if (currentDragItem === 'fence') {
            const fenceRotation = currentRotation % 2; // 0 or 1 (horizontal or vertical)
            const isHorizontalPlacement = fenceRotation === 0;
            const isVerticalPlacement = fenceRotation === 1;
            
            // Horizontal fence should connect horizontally (dx != 0, dz = 0)
            // Vertical fence should connect vertically (dx = 0, dz != 0)
            if ((isHorizontalPlacement && Math.abs(dx) === 1 && Math.abs(dz) < 0.1) ||
                (isVerticalPlacement && Math.abs(dx) < 0.1 && Math.abs(dz) === 1)) {
              connectionPositions.push(obj.position);
            }
          } else {
            // Gates can connect in any adjacent direction
            if ((Math.abs(dx) === 1 && Math.abs(dz) < 0.1) || (Math.abs(dx) < 0.1 && Math.abs(dz) === 1)) {
              connectionPositions.push(obj.position);
            }
          }
        }
      }
    });
    
    return {
      isConnected: connectionPositions.length > 0,
      connectionCount: connectionPositions.length,
      connectionPositions
    };
  };


  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!currentDragItem) return;

    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    
    // Intersect with the raised platform plane (Y = 1)
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1);
    const intersection = new THREE.Vector3();
    raycaster.current.ray.intersectPlane(plane, intersection);
    
    if (intersection) {
      const isFenceOrGate = currentDragItem === 'fence' || currentDragItem === 'gate';
      const snappedX = snapToGrid(intersection.x, isFenceOrGate);
      const snappedZ = snapToGrid(intersection.z, isFenceOrGate);
      
      // Only update preview position if within bounds
      if (isWithinBounds(snappedX, snappedZ, isFenceOrGate)) {
        // For hay bales, calculate the correct Y position for stacking
        const stackHeight = calculateStackHeight(snappedX, snappedZ, currentDragItem);
        const yPosition = stackHeight > 0 ? stackHeight : 1; // Stack or use platform height (1)
        setPreviewPosition([snappedX, yPosition, snappedZ]);
      }
    }
  }, [currentDragItem, camera, gl]);

  // Handle placement or deletion
  const handleClick = useCallback((event: MouseEvent) => {
    // Delete mode only (removed shift-click)
    if (deleteMode) {
      if (hoveredObjectId) {
        removeObject(hoveredObjectId);
        setHoveredObjectId(null);
      }
      return;
    }

    if (!currentDragItem) return;

    // Check if the current preview position is within bounds before placing
    const isFenceOrGatePlacement = currentDragItem === 'fence' || currentDragItem === 'gate';
    if (!isWithinBounds(previewPosition[0], previewPosition[2], isFenceOrGatePlacement)) {
      return; // Don't place if outside bounds
    }

    // Calculate stacking height for this position
    const stackHeight = calculateStackHeight(previewPosition[0], previewPosition[2], currentDragItem);
    const finalPosition: [number, number, number] = [
      previewPosition[0],
      stackHeight > 0 ? stackHeight : 1, // Use stack height for hay bales, platform height (1) for others
      previewPosition[2]
    ];

    const newObject = {
      id: `${currentDragItem}-${Date.now()}`,
      type: currentDragItem,
      position: finalPosition,
      rotation: [0, rotation, 0] as [number, number, number],
    };

    addObject(newObject);
    
    // Enhanced sparkles for fence/gate placement with connection feedback
    if (currentDragItem === 'fence' || currentDragItem === 'gate') {
      const connectionResult = checkFenceConnection(previewPosition, rotation);
      
      setSparklePosition(previewPosition);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
      
      // Show connection sparkles at connecting positions
      if (connectionResult.isConnected) {
        const newConnectionSparkles = connectionResult.connectionPositions.map((pos, index) => ({
          id: `connection-${Date.now()}-${index}`,
          position: pos
        }));
        
        setConnectionSparkles(prev => [...prev, ...newConnectionSparkles]);
        
        // Remove connection sparkles after animation
        setTimeout(() => {
          setConnectionSparkles(prev => 
            prev.filter(sparkle => !newConnectionSparkles.find(newSparkle => newSparkle.id === sparkle.id))
          );
        }, 1500);
      }
      
      // Play a satisfying "click" sound effect based on connection count
      // In a real app: playSound(connectionResult.connectionCount > 0 ? 'fence-connect' : 'fence-place');
    }
  }, [currentDragItem, previewPosition, rotation, addObject, deleteMode, hoveredObjectId, removeObject]);

  // Handle rotation and delete mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        if (currentDragItem) {
          setRotation((prev) => (prev + 1) % 4);
        }
        setDeleteMode(false); // Exit delete mode when rotating
      } else if (e.key === 'd' || e.key === 'D') {
        setDeleteMode(!deleteMode);
      } else if (e.key === 'Escape') {
        setDeleteMode(false);
        setCurrentDragItem(null);
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [setCurrentDragItem, deleteMode, currentDragItem]);

  // Mouse event listeners
  useEffect(() => {
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);
    
    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [gl, handleMouseMove, handleClick]);

  // Render preview object
  const renderPreviewObject = () => {
    if (!currentDragItem) return null;

    // Only show preview if within bounds
    const isPreviewFenceOrGate = currentDragItem === 'fence' || currentDragItem === 'gate';
    if (!isWithinBounds(previewPosition[0], previewPosition[2], isPreviewFenceOrGate)) {
      return null;
    }

    const connectionResult = checkFenceConnection(previewPosition, rotation);
    const props = {
      position: previewPosition,
      rotation,
      isPreview: true,
      isConnected: connectionResult.isConnected,
    };

    switch (currentDragItem) {
      case 'fence':
        return <FenceComponent {...props} />;
      case 'gate':
        return <GateComponent {...props} />;
      case 'house':
        return <HouseComponent {...props} />;
      case 'tree':
        return <TreeComponent {...props} />;
      case 'hay_bale':
        return <HayBaleComponent {...props} />;
      case 'water_trough':
        return <WaterTroughComponent {...props} />;
      case 'scarecrow':
        return <ScarecrowComponent {...props} />;
      case 'chicken_coop':
        return <ChickenCoopComponent {...props} />;
      case 'feed_dispenser':
        return <FeedDispenserComponent {...props} />;
      case 'water_fountain':
        return <WaterFountainComponent {...props} />;
      case 'small_barn':
        return <SmallBarnComponent {...props} />;
      default:
        return null;
    }
  };

  // Render placed objects
  const renderPlacedObjects = () => {
    return placedObjects.map((obj) => {
      const isHovered = hoveredObjectId === obj.id;
      
      return (
        <group 
          key={obj.id}
          onPointerOver={() => deleteMode && setHoveredObjectId(obj.id)}
          onPointerOut={() => setHoveredObjectId(null)}
        >
          {/* Delete mode highlight */}
          {deleteMode && isHovered && (
            <mesh position={obj.position}>
              <boxGeometry args={[1.2, 1.2, 1.2]} />
              <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
            </mesh>
          )}
          
          {(() => {
            const props = {
              position: obj.position,
              rotation: obj.rotation[1],
              isPreview: false,
            };

            switch (obj.type) {
              case 'fence':
                return <FenceComponent {...props} isConnected={checkFenceConnection(obj.position, obj.rotation[1]).isConnected} />;
              case 'gate':
                return <GateComponent {...props} />;
              case 'house':
                return <HouseComponent {...props} />;
              case 'tree':
                return <TreeComponent {...props} />;
              case 'hay_bale':
                return <HayBaleComponent {...props} />;
              case 'water_trough':
                return <WaterTroughComponent {...props} />;
              case 'scarecrow':
                return <ScarecrowComponent {...props} />;
              case 'chicken_coop':
                return <ChickenCoopComponent {...props} />;
              case 'feed_dispenser':
                return <FeedDispenserComponent {...props} />;
              case 'water_fountain':
                return <WaterFountainComponent {...props} />;
              case 'small_barn':
                return <SmallBarnComponent {...props} />;
              default:
                return null;
            }
          })()}
        </group>
      );
    });
  };

  return (
    <>
      {renderPreviewObject()}
      {renderPlacedObjects()}
      
      {/* Sparkle effect for fence placement */}
      {showSparkles && (
        <Sparkles
          position={sparklePosition}
          count={30}
          scale={2}
          size={3}
          speed={2}
          color="#00ff88"
        />
      )}
      
      {/* Connection sparkles */}
      {connectionSparkles.map((sparkle) => (
        <Sparkles
          key={sparkle.id}
          position={sparkle.position}
          count={20}
          scale={1.5}
          size={2}
          speed={3}
          color="#ffaa00"
        />
      ))}
      
      {/* Grid helper visualization when placing */}
      {currentDragItem && !deleteMode && isWithinBounds(previewPosition[0], previewPosition[2], currentDragItem === 'fence' || currentDragItem === 'gate') && (
        <mesh position={previewPosition} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color="#00ff88" 
            transparent 
            opacity={0.2} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Delete mode indicator */}
      {deleteMode && (
        <mesh position={[0, 3, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      )}
    </>
  );
};

export default PlacementSystem;