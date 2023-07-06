import { Canvas  } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// import styles from '../styles/Home.module.css';
import RefractSphere from "../component/refractSphere";
import UnderLay from "../component/underlay";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6]}}>
        <ambientLight/>
        <RefractSphere />
        {/* <OrbitControls /> */}
      </Canvas>
      {/* <UnderLay /> */}
    </div>
  )
}
