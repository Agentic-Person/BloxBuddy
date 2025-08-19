import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Box } from '@react-three/drei';

interface FenceComponentProps {
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
  isConnected?: boolean;
  onPlace?: () => void;
}

const FenceComponent: React.FC<FenceComponentProps> = ({ 
  position, 
  rotation = 0, 
  isPreview = false,
  isConnected = false,
  onPlace 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<THREE.Mesh>(null);

  // Animate glow effect when connected
  useFrame((state) => {
    if (glowRef.current && isConnected) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      }
    }
  });

  // Create picket fence geometry
  const pickets = useMemo(() => {
    const picketPositions: number[] = [];
    const picketCount = 5;
    const spacing = 0.2;
    const startX = -(picketCount - 1) * spacing / 2;
    
    for (let i = 0; i < picketCount; i++) {
      picketPositions.push(startX + i * spacing);
    }
    return picketPositions;
  }, []);

  return (
    <group 
      ref={groupRef} 
      position={position} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onPlace}
    >
      {/* Fence rotates around its left end (-0.5, 0, 0) */}
      <group 
        rotation={[0, rotation * Math.PI / 2, 0]}
        position={[-0.5, 0, 0]} // Move pivot to left end
      >
        <group position={[0.5, 0, 0]}> {/* Offset fence back to center */}
          {/* Fence base/rail - full grid width for proper connection */}
          <Box 
            args={[1.0, 0.1, 0.05]} 
            position={[0, 0.3, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial 
              color={isPreview ? "#ffffff" : "#f5f5f5"}
              opacity={isPreview ? 0.7 : 1}
              transparent={isPreview}
            />
          </Box>
          
          {/* Top rail - full grid width */}
          <Box 
            args={[1.0, 0.05, 0.05]} 
            position={[0, 0.6, 0]}
            castShadow
          >
            <meshStandardMaterial 
              color={isPreview ? "#ffffff" : "#f5f5f5"}
              opacity={isPreview ? 0.7 : 1}
              transparent={isPreview}
            />
          </Box>
          
          {/* End posts for better connection */}
          <Box 
            args={[0.05, 0.65, 0.05]} 
            position={[-0.475, 0.325, 0]}
            castShadow
          >
            <meshStandardMaterial color={isPreview ? "#ffffff" : "#e0e0e0"} opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
          </Box>
          <Box 
            args={[0.05, 0.65, 0.05]} 
            position={[0.475, 0.325, 0]}
            castShadow
          >
            <meshStandardMaterial color={isPreview ? "#ffffff" : "#e0e0e0"} opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
          </Box>

          {/* Pickets */}
          {pickets.map((x, i) => (
            <Box 
              key={i}
              args={[0.08, 0.5, 0.03]} 
              position={[x, 0.35, 0]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial 
                color={isPreview ? "#ffffff" : "#ffffff"}
                opacity={isPreview ? 0.7 : 1}
                transparent={isPreview}
              />
            </Box>
          ))}

          {/* Connection glow effect */}
          {isConnected && (
            <mesh ref={glowRef} position={[0, 0.35, 0]}>
              <boxGeometry args={[1.2, 0.7, 0.1]} />
              <meshBasicMaterial 
                color="#00ff88"
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}

          {/* Hover highlight */}
          {hovered && !isPreview && (
            <mesh position={[0, 0.35, 0]}>
              <boxGeometry args={[1.3, 0.8, 0.2]} />
              <meshBasicMaterial 
                color="#ffff00"
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
};

export default FenceComponent;