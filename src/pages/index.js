import { Canvas  } from "@react-three/fiber";

// import styles from '../styles/Home.module.css';
import RefractSphere from "../component/refractSphere";
import DashLine from "../component/dashLine";

import styles from "../styles/Home.module.css";

import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <div className={styles.container}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6]}}>
        <color attach="background" args={['#101020']} />
        <ambientLight/>
        <DashLine />
        <RefractSphere />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
