import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components';
import { TimelineMax, TweenMax, Power0, Power3, Expo, Sine } from 'gsap'

import MenuItem from './MenuItem';
import TimerIcon from '../assets/clock.svg'
import MouseIcon from '../assets/mouse.svg'
import ScrollIcon from '../assets/scroll.svg'

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    pointer-events: hover;
    display: flex;
    justify-content: center;
    margin-top: 16px;
    opacity: 0;
    transition: opacity 200ms ease-out;

    &:hover {
        opacity: 1;
    }
`

const Dock = styled.div`
    border-radius: 126px;
    padding: 16px;
    max-width: 363px;
    display: flex;

    width: 55px;
    height: 55px;
    border: 3px solid white;
    position: relative;

    & > div {
        opacity: 0;
        transition: opacity  250ms ease-out;
        pointer-events: none;
    }

    &:hover > div {
        opacity: 1;
        transition: all 250ms 200ms ease-out;
        pointer-events: auto;
    }
`;

const initialState = { 
    scale: 0.5, 
    transformOrigin: "center center",
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 3,
    y: -13,
}

function Menu(props) {
    const containerEl = useRef(null);
    const dockEl = useRef(null);
    const tlRef = useRef(null);

    const [dockOpen, toggleDockOpen] = useState(false)

    useEffect(() => {
        TweenMax.set(dockEl.current, initialState)
    }, [])

    function getTl() {
        let tl = tlRef.current;
        if (tl !== null) {
          return tl;
        }
        let newTl =  new TimelineMax({ paused: true });
        newTl.fromTo(dockEl.current, 0.35, initialState, { borderWidth: 1.5, borderColor: "black", ease: Sine.easeInOut, scale: 1, y: 0, width: "363px" }, "one")
        tlRef.current = newTl;
        return newTl;
      }

    function handleMouseEnter() {
        getTl().play();
    }

    function handleMouseLeave() {
        getTl().reverse();
    }

    return (
        <Container ref={containerEl}>
            <Dock ref={dockEl} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <MenuItem {...props} icon={TimerIcon} menuString={"TIMER"}/>
                <MenuItem {...props} icon={ScrollIcon} menuString={"SCROLL"}/>
                <MenuItem {...props} icon={MouseIcon} menuString={"CLICK"}/>
            </Dock>
        </Container>    
    )
}

export default Menu;