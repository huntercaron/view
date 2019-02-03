import React, { useRef, useEffect } from 'react'
import styled from 'styled-components';
import { TimelineMax, TweenMax, Power0, Power3, Expo, Sine } from 'gsap'

import TimerIcon from '../assets/clock.svg'
import MouseIcon from '../assets/mouse.svg'
import ScrollIcon from '../assets/scroll.svg'

const MenuIcon = styled.img`
    height: 20px;
    width: 20px;
    user-select: none;
    position: relative;
    z-index: 1;
    opacity: ${props => props.active ? "1" : "0.4"};
`

const IconContainer = styled.div`
    position: relative;
    height: 32px;
    width: 32px;
    margin-right: 8px;
    cursor: pointer;
`;

const IconBg = styled.div`
    background-color: #eee;
    border-radius: 50%;
    height: 32px;
    width: 32px;
    position: absolute;
    top: -6px;
    left: -6px;
    opacity: 0;

    ${IconContainer}:hover & {
        opacity: 1;
    }
`;

function MenuItem({ icon, setViewMode, viewMode, menuString }) {
    return (
        <IconContainer onClick={() => setViewMode(menuString)}>
            <MenuIcon active={viewMode === menuString} src={icon} />
            <IconBg />
        </IconContainer>
    )
}


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

const PseudoDock = styled.div`
    border-radius: 126px;
    padding: 16px;
    max-width: 363px;
    display: flex;
    pointer-events: auto;

    width: 52px;
    height: 52px;
    border: 3px solid white;
    position: relative;
`;

const Dock = styled.div`
    border-radius: 126px;
    padding: 16px;
    max-width: 363px;
    display: flex;
    pointer-events: auto;

    width: 55px;
    height: 55px;
    border: 3px solid white;
    position: relative;

    mix-blend-mode: normal;

    & > div {
        opacity: 0;
        transition: opacity 250ms ease-out;
        pointer-events: none;
    }

    &:hover > div {
        opacity: 1;
        transition: opacity 250ms 50ms ease-out;
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

    useEffect(() => {
        TweenMax.set(dockEl.current, initialState)
    }, [])

    function getTl() {
        let tl = tlRef.current;
        if (tl !== null) {
          return tl;
        }
        let newTl =  new TimelineMax({ paused: true });
        
        // .set(containerEl.current, { mixBlendMode: "normal", borderColor: "black" })
        newTl.fromTo(dockEl.current, 0.35, initialState, { borderWidth: 1.5, borderColor: "black", ease: Sine.easeInOut, scale: 1, y: 0, width: "363px" }, "one")
            // .to(dockEl.current, 0.3, { y: 0 }, "one")
            
            // .to(dockEl.current, )
        

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