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
        <boxGeometry args={[0.4, 0.2, 0.25]} />
        <meshStandardMaterial 
          color="#f4e04d"
          roughness={0.9}
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </mesh>
      
      {/* Straw texture lines */}
      {[-0.1, 0, 0.1].map((z, i) => (
        <Box key={i} args={[0.41, 0.01, 0.01]} position={[0, 0.05, z]}>
          <meshStandardMaterial color="#d4c03d" />
        </Box>
      ))}

      {hovered && !isPreview && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.35]} />
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
      {/* Trough container */}
      <Box args={[1, 0.3, 0.4]} position={[0, 0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#4682b4"
          opacity={isPreview ? 0.7 : 1}
          transparent={isPreview}
        />
      </Box>
      
      {/* Water */}
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

export default {
  HouseComponent,
  TreeComponent,
  HayBaleComponent,
  WaterTroughComponent,
  ScarecrowComponent
};