import {  useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO, Html, Text, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

import refractVertexShader from "../shader/vertexShader";
import refractFragmentShader from "../shader/fragmentShader";

const RefractSphere = ({ fontColor = '#DAFFFB'} ) => {
  // const url = require('./zen.json')
  const mesh = useRef(null);
  const text = useRef(null);
  const transelated = useRef(null);
  const mainRenderTarget = useFBO();
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    uTexture: { value: null },
    winResolution: { value: new THREE.Vector2(
      window.innerWidth,
      window.innerHeight
    ).multiplyScalar(Math.min(window.devicePixelRatio), 2) },
  }), [])

  useFrame((state) => {
    const { gl, scene, camera, clock, mouse } = state;

    const x = mouse.x * viewport.width / 2;
    const y = mouse.y * viewport.height / 2;
    mesh.current.position.set(x, y, 0);

    text.current.visible = true;
    transelated.current.visible = false;
    mesh.current.visible = false;

    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;
    gl.setRenderTarget(null);

    text.current.visible = false;
    transelated.current.visible = true;
    mesh.current.visible = true;
  });

  const columns = [-7.5, -5, -2.5, 0, 2.5, 5, 7.5];
  const rows = [-7.5, -5, -2.5, 0, 2.5, 5, 7.5];
  return (
    <>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2, 20]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={refractVertexShader}
          fragmentShader={refractFragmentShader}
        />
      </mesh> 

      <Center position={[1,-1, -7]} rotation={[-0.3, 0.6, 0.07]}>
        <Text3D 
          ref={transelated} 
          bevelEnabled
          curveSegments={32}
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.01}
          size={1.8} 
          font="./fonts/hina.json" 
        >
          {` HELLO！\nWelcome to my portfolio!`}
          <meshStandardMaterial color={fontColor}/>
        </Text3D>
      </Center>


      <Center position={[1,-1,-7]} rotation={[-0.3, 0.6, 0.07]}>
        <Text3D 
          ref={text} 
          bevelEnabled
          curveSegments={32}
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.01}
          size={1.8}  
          letterSpacing={-0.2}
          font="./fonts/hina.json" 
        >
          {`こんにちは!\n私のportforioへようこそ！`}
          <meshStandardMaterial color={fontColor} />
        </Text3D>
      </Center>
    </>
   
  );
};

export default RefractSphere;
