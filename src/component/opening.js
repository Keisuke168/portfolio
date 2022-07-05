import styles from '../styles/Opening.module.css'
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Opening = () => {

    const ref = useRef();
    const textRef = useRef();
    const nameRef = useRef();
    const iamRef = useRef();
    const q = gsap.utils.selector(textRef);
    const n = gsap.utils.selector(nameRef);
    const i = gsap.utils.selector(iamRef);

    const tl = gsap.timeline();

    useEffect(()=>{
        tl.to(q('.tx'), {
            y:'0%',
            duration:0.7,
            stagger:0.05,
            ease:'circ.inOut'
        }).to(q('.tx'), {
            y:'-100%',
            duration:0.2,
            stagger:0.05,
            ease:'circ.inOut'
        })
        .to(i('.tx'), {
            y:'0%',
            duration:0.6,
            stagger:0.05,
            ease:'circ.inOut'
        }).to(i('.tx'), {
            y:'-100%',
            duration:0.2,
            stagger:0.05,
            ease:'circ.inOut'
        }).to(n('.tx'), {
            y:'0%',
            duration:0.8,
            stagger:0.05,
            ease:'circ.inOut'
        }).to(nameRef.current, {
            x:'-40%',
            y:'-130%',
            scale: 0.5,
            duration:0.8,
            stagger:0.05,
            ease:'circ.inOut'
        }).to(ref.current, {
            y: '-100%',
            ease:'circ.inOut'
        },'<')
        
    })
  
    return (
        <>
            <div ref={ref} className={styles.bg}></div>
            <div className={styles.wrap}>
                <h1 ref={textRef} className={styles.text}>
                    <span className='tx'>H</span>
                    <span className='tx'>E</span>
                    <span className='tx'>L</span>
                    <span className='tx'>L</span>
                    <span className='tx'>O</span>
                </h1>
                <h1 ref={iamRef} className={styles.text}>
                    <span className='tx'>I</span>
                    <span className='tx'>　</span>
                    <span className='tx'>A</span>
                    <span className='tx'>M</span>
                </h1>
                <h1 ref={nameRef} className={styles.text}>
                    <span className='tx'>K</span>
                    <span className='tx'>E</span>
                    <span className='tx'>I</span>
                    <span className='tx'>S</span>
                    <span className='tx'>U</span>
                    <span className='tx'>K</span>
                    <span className='tx'>E　</span><br />
                    <span className='tx'>Y</span>
                    <span className='tx'>O</span>
                    <span className='tx'>S</span>
                    <span className='tx'>H</span>
                    <span className='tx'>I</span>
                    <span className='tx'>M</span>
                    <span className='tx'>I</span>
                </h1>
            </div>

        </>
    );
}

export default Opening;