import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Canvas } from '@react-three/fiber';

export default function Home() {
  return (
    <div className={styles.container}>
      <Canvas>
        <ambientLight />
        <directionalLight />
        <mesh>
          <boxBufferGeometry />
          <meshLambertMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}
