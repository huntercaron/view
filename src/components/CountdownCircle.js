import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { TweenMax, Linear } from 'gsap'

const Container = styled.div`
    width: 42px;
    height: 45px;

    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    /* background-color: pink; */
    mix-blend-mode: difference !important;

`;

const SVG = styled.svg`
  position:absolute;
  transform: rotate(-90deg);
  transform-origin: center center;
  border-radius: 50%;
  /* mix-blend-mode: difference !important; */

  circle {
    
  }
`

function getCoordinatesFromPercentage(percentage) {
    const x = Math.cos(Math.PI * 2 * percentage);
    const y = Math.sin(Math.PI * 2 * percentage);

    return [x, y];
}

const CountdownCircle = () => {
  const [progress, setProgress] = useState(0)
  const circleElement = useRef(null);
  // useEffect on change of... something? image number

  // useEffect(() => {
  //   setInterval(() => {
  //     if (progress >= 158)
  //       setProgress(0)
  //     else
  //       setProgress(prevProgress => (prevProgress+1))
  //   }, 50)
  // }, [])

  useEffect(() => {
    TweenMax.to(circleElement.current, 10, { strokeDasharray: "158 158",  ease: Linear.easeNone, repeat: -1 })
  }, [])


  return (
    <Container>
      <SVG width={30} height={30} viewBox="0 0 100 100">
        <filter id="f1" x="0" y="0" width="1" height="1">
          <feImage xlinkHref="#p1" result="p1"/>
          <feImage xlinkHref="#p2" result="p2"/>
          <feBlend mode="screen" in="p1" in2="p2" />
        </filter>

        <circle 
          cx="50" 
          cy="50" 
          r="25" 
          stroke="white" 
          strokeWidth="50" 
          fill="none"
          ref={circleElement}

          strokeDasharray={`${progress} 158`}
        />
      </SVG>
    </Container>
  )
}

export default CountdownCircle;
