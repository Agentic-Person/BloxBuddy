import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  ContactShadows,
  Loader,
  PerspectiveCamera,
  Text
} from '@react-three/drei';
import * as THREE from 'three';
import GrassPlatform from './GrassPlatform';
import PlacementSystem from './PlacementSystem';

const Scene3D: React.FC = () => {
  return (
    <>
      <div className="w-full h-full relative">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ 
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            alpha: false
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            {/* Fixed isometric camera - raised for better platform view */}
            <PerspectiveCamera 
              makeDefault 
              position={[8, 10, 8]}
              fov={45}
              near={0.1}
              far={1000}
            />
            
            {/* Disable orbit controls - fixed camera */}
            <OrbitControls 
              enabled={false}
              target={[0, 0, 0]}
            />
            
            {/* Lighting setup - Enhanced for better visibility */}
            <ambientLight intensity={0.6} />
            
            {/* Main sun light */}
            <directionalLight
              position={[10, 15, 10]}
              intensity={1.2}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-near={0.5}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
              color="#ffffff"
            />
            
            {/* Fill light from opposite side */}
            <directionalLight
              position={[-5, 8, -5]}
              intensity={0.4}
              color="#87CEEB"
            />
            
            {/* Accent lights */}
            <pointLight position={[0, 10, 0]} intensity={0.3} color="#ffffff" />
            <pointLight position={[-8, 3, -8]} intensity={0.3} color="#F59E0B" />
            <pointLight position={[8, 3, -8]} intensity={0.3} color="#10B981" />
            
            {/* Simple gradient background using fog color */}
            
            {/* Grass platform - raised higher */}
            <group position={[0, 1, 0]}>
              <GrassPlatform size={8} />
            </group>
            
            {/* XYZ Axis Gizmos for feedback */}
            <group position={[3, 2, 3]}>
              {/* X Axis - Red */}
              <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 1]} />
                <meshBasicMaterial color="#ff0000" />
              </mesh>
              <mesh position={[1, 0, 0]}>
                <coneGeometry args={[0.05, 0.2]} />
                <meshBasicMaterial color="#ff0000" />
              </mesh>
              {/* X Label */}
              <Text
                position={[1.3, 0, 0]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                X
              </Text>
              
              {/* Y Axis - Green */}
              <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 1]} />
                <meshBasicMaterial color="#00ff00" />
              </mesh>
              <mesh position={[0, 1, 0]}>
                <coneGeometry args={[0.05, 0.2]} />
                <meshBasicMaterial color="#00ff00" />
              </mesh>
              {/* Y Label */}
              <Text
                position={[0, 1.3, 0]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                Y
              </Text>
              
              {/* Z Axis - Blue */}
              <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 1]} />
                <meshBasicMaterial color="#0000ff" />
              </mesh>
              <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.05, 0.2]} />
                <meshBasicMaterial color="#0000ff" />
              </mesh>
              {/* Z Label */}
              <Text
                position={[0, 0, 1.3]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                Z
              </Text>
            </group>
            
            {/* Placement system for objects */}
            <PlacementSystem />
            
            {/* Contact shadows for better grounding */}
            <ContactShadows
              opacity={0.4}
              scale={10}
              blur={2}
              far={4}
              position={[0, 0, 0]}
              color="#000000"
            />
            
            {/* Fog for depth - matches purple background */}
            <fog attach="fog" args={['#6B46C1', 15, 40]} />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </>
  );
};

export default Scene3D;