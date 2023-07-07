import { Canvas  } from "@react-three/fiber";

// import styles from '../styles/Home.module.css';
import RefractSphere from "../component/refractSphere";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6]}}>
        <ambientLight/>
        <RefractSphere />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}
