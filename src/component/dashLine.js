import { useMemo, useRef } from "react";
import * as THREE from "three";
import { extend, useFrame } from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

const DashLine = ({ colors=['#176B87', '#64CCC5'] }) => (
    <>
        <Lines count={15} dash={0.3} width={0.8} colors={colors} />
    </>
)

function Lines({ dash, count, colors, radius = 20, width=0.3, rand = THREE.MathUtils.randFloatSpread }) {
    const lines = useMemo(() => {
      return Array.from({ length: count }, () => {
        const bias = rand(radius * 1.5);
        const points = Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (i) => {
            const rad = i / 10 * Math.PI * 2;
            return new THREE.Vector3(Math.cos(rad * 0.5) * radius, Math.cos(rad * 0.5) * 8 + bias + rand(2), - Math.sin(rad * 0.5) * radius * 0.7);
        })
        const curve = new THREE.CatmullRomCurve3(points).getPoints(300)
        return {
          color: colors[parseInt(colors.length * Math.random())],
          width: Math.random() * width,
          speed: Math.max(0.1, 1 * Math.random()),
          curve: curve.flatMap((point) => point.toArray())
        }
      })
    }, [colors, count, radius])
    return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />)
  }
  
  function Fatline({ curve, width, color, speed, dash }) {
    const ref = useRef()
    useFrame((state, delta) => (ref.current.material.dashOffset -= (delta * speed) / 10))
    return (
      <mesh ref={ref}>
        <meshLineGeometry points={curve} />
        <meshLineMaterial transparent lineWidth={width} color={color} depthWrite={false} dashArray={0.25} dashRatio={dash} toneMapped={false} />
      </mesh>
    )
  }


export default DashLine;