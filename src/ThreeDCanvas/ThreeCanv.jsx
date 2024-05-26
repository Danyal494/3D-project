import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect } from "react";

const ThreeCanv = () => {
  const { scene } = useGLTF("/planet/scene.gltf");
  return (
    <mesh position={[0, 1, 0]}>
      <hemisphereLight intensity={3.15} groundColor="black" />
      <pointLight intensity={2} />
      <spotLight
        position={[20, 60, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapsize={1024}
      />
      <primitive object={scene} />
    </mesh>
  );
};

const Plane = ({ rotationY }) => {
  const { scene } = useGLTF("/plane1.glb");
  return (
    <mesh rotation={[0, rotationY, 0]}>
      <hemisphereLight intensity={3.15} groundColor="white" />
      <pointLight intensity={2} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapsize={1024}
      />
      <primitive object={scene} />
    </mesh>
  );
};

const CompCanvas = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const rotationY = scrollY * 0.01;
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
      }}
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <OrbitControls enableZoom={false} />
      <Plane rotationY={rotationY} />
      <ThreeCanv />
    </Canvas>
  );
};

export default CompCanvas;
