import React from 'react';
import { Grid } from '@react-three/drei';

interface GrassPlatformProps {
  size?: number;
}

const GrassPlatform: React.FC<GrassPlatformProps> = ({ size = 8 }) => {
  return (
    <group>
      {/* Grass platform - bright green */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial 
          color="#1e5e2e"
          roughness={0.95}
          metalness={0}
        />
      </mesh>
      
      {/* Grid overlay - raised slightly to avoid z-fighting */}
      <Grid
        args={[size, size]}
        cellSize={1}
        cellThickness={0.8}
        cellColor="white"
        sectionSize={4}
        sectionThickness={1.5}
        sectionColor="white"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      
      {/* Platform base - darker brown */}
      <mesh position={[0, -0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[size + 0.4, 0.6, size + 0.4]} />
        <meshStandardMaterial color="#654321" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
};

export default GrassPlatform;