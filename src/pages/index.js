import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

import styles from '../styles/Home.module.css';
import Opening from '../component/opening';


const Box = () => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  }, []);

  return (
    <mesh
      ref={ref}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxBufferGeometry args={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]} />
      <meshLambertMaterial color={isHovered ? 0x44c2b5 : 0x9178e6} />
    </mesh>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Opening/>
      <Canvas dpr={2} className={styles.canvas}>
        <color attach="background" args={[0xf5f3fd]} />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[-10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  )
}
