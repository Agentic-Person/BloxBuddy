import React, { useState } from 'react';
import { Box } from '@react-three/drei';

interface GateComponentProps {
  position: [number, number, number];
  rotation?: number;
  isPreview?: boolean;
  onPlace?: () => void;
}

const GateComponent: React.FC<GateComponentProps> = ({ 
  position, 
  rotation = 0, 
  isPreview = false,
  onPlace 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!isPreview) {
      setIsOpen(!isOpen);
      onPlace?.();
    }
  };

  return (
    <group 
      position={position} 
      rotation={[0, rotation * Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Gate posts */}
      <Box args={[0.1, 0.7, 0.1]} position={[-0.45, 0.35, 0]} castShadow>
        <meshStandardMaterial color="#d0d0d0" opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Box>
      <Box args={[0.1, 0.7, 0.1]} position={[0.45, 0.35, 0]} castShadow>
        <meshStandardMaterial color="#d0d0d0" opacity={isPreview ? 0.7 : 1} transparent={isPreview} />
      </Box>

      {/* Gate door - animates on open/close */}
      <group 
        position={[-0.35, 0, 0]}
        rotation={[0, isOpen ? Math.PI / 2 : 0, 0]}
      >
        <Box args={[0.7, 0.5, 0.05]} position={[0.35, 0.35, 0]} castShadow>
          <meshStandardMaterial 
            color={isOpen ? "#ffc080" : "#ffaa60"}
            opacity={isPreview ? 0.7 : 1} 
            transparent={isPreview} 
          />
        </Box>
        {/* Gate handle */}
        <Box args={[0.05, 0.05, 0.08]} position={[0.6, 0.35, 0]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
      </group>

      {/* Status indicator */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={isOpen ? "#ff0000" : "#00ff00"} />
      </mesh>

      {/* Hover highlight */}
      {hovered && !isPreview && (
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[1.2, 0.9, 0.3]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

export default GateComponent;