import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { TweenMax, Linear } from 'gsap'

const Container = styled.div`
  width: 42px;
  height: 42px;

  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  user-select: none;
  mix-blend-mode: difference;
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

const CountdownCircle = ({ iterator }) => {
  const [progress, setProgress] = useState(0)
  const circleElement = useRef(null);

  useEffect(() => {
    TweenMax.set(circleElement.current, { strokeDasharray: "0 158" })
    TweenMax.to(circleElement.current, 6, { strokeDasharray: "158 158",  ease: Linear.easeNone })
  }, [iterator])

  return (
    <Container>
      <SVG width={26} height={26} viewBox="0 0 100 100">
        <circle 
          cx="50" 
          cy="50" 
          r="25" 
          stroke="white" 
          strokeWidth="50" 
          fill="none"
          ref={circleElement}
          strokeDasharray={`0 158`}
        />
      </SVG>
    </Container>
  )
}

export default CountdownCircle;
