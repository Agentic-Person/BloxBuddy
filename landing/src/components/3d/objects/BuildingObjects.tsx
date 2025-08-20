import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';

// House Component - Barrier object
export const HouseComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* House base */}
      <Box args={[1, 0.8, 1]} position={[0, 0.4, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#f5deb3"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Box>
      
      {/* Roof */}
      <Cone args={[0.8, 0.6, 4]} position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <meshStandardMaterial 
          color="#a0522d"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Cone>
      
      {/* Door */}
      <Box args={[0.3, 0.5, 0.05]} position={[0, 0.25, 0.51]} castShadow>
        <meshStandardMaterial color="#654321" />
      </Box>
      
      {/* Window */}
      <Box args={[0.2, 0.2, 0.05]} position={[0.3, 0.5, 0.51]} castShadow>
        <meshStandardMaterial color="#87ceeb" />
      </Box>

      {hovered && !isPreview && (
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.3, 1.5, 1.3]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

// Tree Component - Natural barrier with swaying animation
export const TreeComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const treeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (treeRef.current && !isPreview) {
      // Gentle swaying animation
      treeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });
  
  return (
    <group 
      ref={treeRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Tree trunk */}
      <Cylinder args={[0.15, 0.2, 0.8]} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial 
          color="#8b4513"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Cylinder>
      
      {/* Tree canopy - semi-transparent */}
      <Sphere args={[0.6, 8, 8]} position={[0, 1, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#228b22"
          opacity={isPreview ? 0.5 : 0.7}
          transparent={true}
        />
      </Sphere>

      {hovered && !isPreview && (
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.8, 8, 8]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

// Hay Bale - Chicken attractor!
export const HayBaleComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const [hovered, setHovered] = useState(false);
  const baleRef = useRef<THREE.Mesh>(null);
  
  // Check if this hay bale is stacked (Y position > 1 means it's on top of another)
  const isStacked = position[1] > 1;
  
  // Subtle pulse effect to make it appealing
  useFrame((state) => {
    if (baleRef.current && hovered && !isPreview) {
      baleRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.02);
    }
  });
  
  return (
    <group 
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={baleRef} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.4, 0.25]} />
        <meshStandardMaterial 
          color="#d4a574"
          roughness={0.9}
          opacity={isPreview ? 0.7 : (isStacked ? 0.7 : 1)}
          transparent={isPreview || isStacked}
        />
      </mesh>
      
      {/* Straw texture lines */}
      {[-0.1, 0, 0.1].map((z, i) => (
        <Box key={i} args={[0.41, 0.01, 0.01]} position={[0, 0.1, z]}>
          <meshStandardMaterial color="#b8965d" />
        </Box>
      ))}

      {hovered && !isPreview && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.35]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};

// Water Trough - Another chicken attractor
export const WaterTroughComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const [hovered, setHovered] = useState(false);
  const waterRef = useRef<THREE.Mesh>(null);
  
  // Water ripple animation
  useFrame((state) => {
    if (waterRef.current && !isPreview) {
      waterRef.current.position.y = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });
  
  return (
    <group 
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Wooden trough base */}
      <Box args={[1, 0.05, 0.4]} position={[0, 0.025, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#8b4513"
          roughness={0.8}
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Box>
      
      {/* Wooden side walls */}
      <Box args={[0.05, 0.3, 0.4]} position={[-0.475, 0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#8b4513" roughness={0.8} opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Box>
      <Box args={[0.05, 0.3, 0.4]} position={[0.475, 0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#8b4513" roughness={0.8} opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Box>
      
      {/* Wooden end walls */}
      <Box args={[1, 0.3, 0.05]} position={[0, 0.15, -0.175]} castShadow receiveShadow>
        <meshStandardMaterial color="#8b4513" roughness={0.8} opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Box>
      <Box args={[1, 0.3, 0.05]} position={[0, 0.15, 0.175]} castShadow receiveShadow>
        <meshStandardMaterial color="#8b4513" roughness={0.8} opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Box>
      
      {/* Water inside */}
      <mesh ref={waterRef} position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.2, 0.3]} />
        <meshStandardMaterial 
          color="#1e90ff"
          transparent
          opacity={isPreview ? 0.5 : 0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {hovered && !isPreview && (
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.2, 0.5, 0.6]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};

// Scarecrow - The decoy! Looks important but does nothing
export const ScarecrowComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const [hovered, setHovered] = useState(false);
  const scarecrowRef = useRef<THREE.Group>(null);
  
  // Dramatic wobble to make it seem important
  useFrame((state) => {
    if (scarecrowRef.current && !isPreview) {
      scarecrowRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <group 
      ref={scarecrowRef}
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Pole */}
      <Cylinder args={[0.05, 0.05, 1.2]} position={[0, 0.6, 0]} castShadow>
        <meshStandardMaterial color="#654321" opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Cylinder>
      
      {/* Cross beam (arms) */}
      <Box args={[0.8, 0.05, 0.05]} position={[0, 0.9, 0]} castShadow>
        <meshStandardMaterial color="#654321" opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Box>
      
      {/* Head */}
      <Sphere args={[0.15, 8, 8]} position={[0, 1.1, 0]} castShadow>
        <meshStandardMaterial color="#f4e04d" opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Sphere>
      
      {/* Hat */}
      <Cone args={[0.2, 0.2, 4]} position={[0, 1.25, 0]} castShadow>
        <meshStandardMaterial color="#8b4513" opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Cone>
      
      {/* "Clothes" */}
      <Box args={[0.4, 0.3, 0.1]} position={[0, 0.7, 0]} castShadow>
        <meshStandardMaterial color="#ff0000" opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Box>
      
      {/* Mysterious glow effect to make it seem important */}
      {hovered && !isPreview && (
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};


// Chicken Coop Component - Functional building for chickens
export const ChickenCoopComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const [hovered, setHovered] = useState(false);
  const coopRef = useRef<THREE.Group>(null);
  
  // Gentle sway animation
  useFrame((state) => {
    if (coopRef.current && !isPreview) {
      coopRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
    }
  });
  
  return (
    <group 
      ref={coopRef}
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main coop body */}
      <Box args={[0.6, 0.3, 0.4]} position={[0, 0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#deb887"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Box>
      
      {/* Roof */}
      <Box args={[0.65, 0.05, 0.45]} position={[0, 0.325, 0]} rotation={[0, 0, 0]} castShadow>
        <meshStandardMaterial 
          color="#8b4513"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Box>
      
      {/* Entrance hole */}
      <Cylinder args={[0.05, 0.05, 0.025]} position={[0.25, 0.1, 0.205]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial color="#2f1b14" />
      </Cylinder>
      
      {/* Nesting boxes */}
      <Box args={[0.1, 0.075, 0.075]} position={[-0.2, 0.125, 0.175]} castShadow>
        <meshStandardMaterial color="#cd853f" />
      </Box>
      <Box args={[0.1, 0.075, 0.075]} position={[-0.2, 0.225, 0.175]} castShadow>
        <meshStandardMaterial color="#cd853f" />
      </Box>

      {hovered && !isPreview && (
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.7, 0.4, 0.5]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

// Feed Dispenser Component - Dispenses feed for animals
export const FeedDispenserComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const [hovered, setHovered] = useState(false);
  const hopperRef = useRef<THREE.Mesh>(null);
  
  // Slow rotation animation
  useFrame((state) => {
    if (hopperRef.current && !isPreview) {
      hopperRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group 
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Support post */}
      <Cylinder args={[0.025, 0.025, 0.4]} position={[0, 0.2, 0]} castShadow>
        <meshStandardMaterial 
          color="#708090"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Cylinder>
      
      {/* Hopper top */}
      <mesh ref={hopperRef} position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.125, 0.075, 0.15]} />
        <meshStandardMaterial 
          color="#c0c0c0"
          metalness={0.8}
          roughness={0.2}
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </mesh>
      
      {/* Funnel */}
      <Cone args={[0.075, 0.1, 6]} position={[0, 0.325, 0]} castShadow>
        <meshStandardMaterial 
          color="#a9a9a9"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Cone>
      
      {/* Feed tray */}
      <Cylinder args={[0.1, 0.1, 0.025]} position={[0, 0.05, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#8b4513"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Cylinder>

      {hovered && !isPreview && (
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.5]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

// Water Fountain Component - Decorative water feature
export const WaterFountainComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const [hovered, setHovered] = useState(false);
  const waterRef = useRef<THREE.Mesh>(null);
  
  // Water ripple animation
  useFrame((state) => {
    if (waterRef.current && !isPreview) {
      waterRef.current.position.y = 0.25 + Math.sin(state.clock.elapsedTime * 3) * 0.02;
    }
  });
  
  return (
    <group 
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base basin */}
      <Cylinder args={[0.4, 0.4, 0.2]} position={[0, 0.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#696969"
          roughness={0.3}
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Cylinder>
      
      {/* Central spout */}
      <Cylinder args={[0.08, 0.08, 0.4]} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial 
          color="#808080"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Cylinder>
      
      {/* Spout top */}
      <Sphere args={[0.1, 8, 8]} position={[0, 0.65, 0]} castShadow>
        <meshStandardMaterial 
          color="#778899"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Sphere>
      
      {/* Water surface */}
      <mesh ref={waterRef} position={[0, 0.25, 0]} receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.05]} />
        <meshStandardMaterial 
          color="#1e90ff"
          transparent
          opacity={isPreview ? 0.4 : 0.7}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {hovered && !isPreview && (
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.7]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

// Small Barn Component - Simple red barn with door
export const SmallBarnComponent: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
}> = ({ position, rotation = 0, isPreview = false }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Barn base */}
      <Box args={[1, 0.8, 0.8]} position={[0, 0.4, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#800000"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Box>
      
      {/* Roof */}
      <Box args={[1.1, 0.3, 0.9]} position={[0, 0.9, 0]} rotation={[0, 0, 0]} castShadow>
        <meshStandardMaterial 
          color="#800000"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Box>
      
      {/* Large barn door */}
      <Box args={[0.4, 0.6, 0.05]} position={[0, 0.3, 0.41]} castShadow>
        <meshStandardMaterial color="#654321" />
      </Box>
      
      {/* Door handle */}
      <Sphere args={[0.02, 8, 8]} position={[0.15, 0.3, 0.43]} castShadow>
        <meshStandardMaterial color="#ffd700" />
      </Sphere>

      {hovered && !isPreview && (
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.2, 1, 1]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

const BuildingObjects = {
  HouseComponent,
  TreeComponent,
  HayBaleComponent,
  WaterTroughComponent,
  ScarecrowComponent,
  ChickenCoopComponent,
  FeedDispenserComponent,
  WaterFountainComponent,
  SmallBarnComponent
};

export default BuildingObjects;