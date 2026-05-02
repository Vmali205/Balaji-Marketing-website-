import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera, 
  Environment,
  ContactShadows,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';

const KadaiModel = () => {
  const meshRef = useRef();

  // Create a custom LatheGeometry for a perfect Kadai shape
  const kadaiGeometry = useMemo(() => {
    const points = [];
    // Bottom flat part
    for (let i = 0; i <= 5; i++) {
      points.push(new THREE.Vector2(i * 0.1, 0));
    }
    // Curved sides
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const x = 0.5 + t * 1.2; // Width goes from 0.5 to 1.7
      const y = Math.pow(t, 1.5) * 1.0; // Height goes from 0 to 1.0 with a nice curve
      points.push(new THREE.Vector2(x, y));
    }
    // Rim flare
    points.push(new THREE.Vector2(1.75, 1.02));
    points.push(new THREE.Vector2(1.78, 1.05));
    
    return new THREE.LatheGeometry(points, 64);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3; // Gentle rotation
    }
  });

  return (
    <group ref={meshRef} scale={2.4} position={[0, -0.4, 0]}>
      {/* Kadai Body */}
      <mesh geometry={kadaiGeometry}>
        <meshPhysicalMaterial 
          color="#f8fafc" 
          metalness={0.95} 
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Premium Red Rim */}
      <mesh position={[0, 1.05, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[1.765, 0.04, 16, 100]} />
        <meshPhysicalMaterial 
          color="#D32F2F" 
          metalness={0.9} 
          roughness={0.2}
          emissive="#3a0000"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Handles */}
      {[ -1, 1 ].map((dir) => (
        <group key={dir} position={[1.86 * dir, 0.8, 0]} rotation={[0, 0, (Math.PI / 4) * -dir]}>
          {/* Handle Connector */}
          <mesh position={[-0.08 * dir, -0.08, 0]} rotation={[0, 0, Math.PI/4 * dir]}>
             <cylinderGeometry args={[0.06, 0.06, 0.25, 16]} />
             <meshPhysicalMaterial color="#C87533" metalness={0.9} roughness={0.25} />
          </mesh>
          {/* Main Handle Loop */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.22, 0.07, 16, 32, Math.PI]} />
            <meshPhysicalMaterial color="#1A1A1A" metalness={0.6} roughness={0.4} clearcoat={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      {/* Adjusted camera to look slightly down at the Kadai */}
      <PerspectiveCamera makeDefault position={[0, 2.0, 5.5]} fov={45} />
      
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={6} castShadow />
      <spotLight position={[-10, 10, -10]} angle={0.2} penumbra={1} intensity={3} color="#D32F2F" />
      <pointLight position={[0, 5, 0]} intensity={3} />
      
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0.1, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 2, Math.PI / 2]}
      >
        <Float rotationIntensity={0.6} floatIntensity={1.2} speed={1.8}>
          <KadaiModel />
        </Float>
      </PresentationControls>

      <ContactShadows 
        position={[0, -1.8, 0]} 
        opacity={0.7} 
        scale={15} 
        blur={2.5} 
        far={4.5} 
        color="#000000"
      />
      {/* Clean studio environment removes the messy "city" background reflections */}
      <Environment preset="studio" />
    </>
  );
};

const Hero3D = ({ height = '100%' }) => {
  return (
    <div style={{ width: '100%', height, minHeight: '500px', position: 'relative', zIndex: 2 }}>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
