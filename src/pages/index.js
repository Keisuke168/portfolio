import { Canvas  } from "@react-three/fiber";

// import styles from '../styles/Home.module.css';
import RefractSphere from "../component/refractSphere";
import DashLine from "../component/dashLine";
import Meta from "../component/meta";

import styles from "../styles/Home.module.css";

import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <div className={styles.container}>
      <Meta />
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6]}}>
        <color attach="background" args={['#9AC5F4']} />
        <ambientLight intensity={5}/>
        <DashLine colors={['#99DBF5', '#A7ECEE']}/>
        <RefractSphere fontColor="#FFEEBB"/>
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}
