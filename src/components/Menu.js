import React, { useRef, useEffect } from 'react'
import styled from 'styled-components';
import { TweenMax } from 'gsap'

import EntryField from './EntryField'
import MenuItem from './MenuItem';
import TimerIcon from '../assets/clock.svg'
import MouseIcon from '../assets/mouse.svg'
import ScrollIcon from '../assets/scroll.svg'
import checkIcon from '../assets/check.svg'

const Container = styled.div`
    position: absolute;
    width: 100%;
    z-index: 3;
    display: flex;
    justify-content: center;
    user-select: none;
`

const Dock = styled.div`
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 463px;
    padding: 32px 32px 0;
    background-color: white;
    transition: opacity 150ms ease-out, transform 250ms ease-out;
    transform: translateY(${props => props.dockOpen ? 0 : "1px"});
    opacity: ${props => props.dockOpen ? 1 : 0};
    pointer-events: ${props => props.dockOpen ? "auto" : "none"};
`;

const Row = styled.div`
    display: flex;
    padding-bottom: 12px;
`;

const ViewModeContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    height: 32px;
    border: 1.6px solid black;
    border-radius: 36px;
    /* isolation: isolate; */
    /* background-color: black; */

    path {
        mix-blend-mode: difference;
    }
`;

const MenuSelector = styled.div`
    height: 24px;
    background-color: black;
    width: calc(${100/3}% - 5px);
    left: 0;
    /* transform: translateX(33%); */
    margin-left: 3px;
    border-radius: 36px;
    position: absolute;
    z-index: 2;
    pointer-events: none;
`;

const ImageFitToggle = styled.div`
    position: relative;
    border: 1.6px solid black;
    width: 99px;
    margin-left: 12px;
    height: 32px;
    border-radius: 36px;
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    
    p {
        padding-top: 2px;
    }
`

const CheckBox = styled.div`
    height: 22px;
    width: 22px;
    margin: 0 6px 0 4px;
    background-color: #dfdfdf;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img { 
        transition: opacity 150ms ease-out;
        opacity: ${props => props.active ? "1" : "0"};
    }
`

function Menu({ dockOpen, setDockOpen, setImageFit, imageFit, fetchData, viewMode, ...props }) {
    const menuSelectorEl = useRef(null);

    useEffect(() => {
        if (menuSelectorEl.current) {
            switch (viewMode) {
                case 'TIMER': 
                    TweenMax.to(menuSelectorEl.current , 0.25, { left: "0%" });
                    break;
                case 'SCROLL': 
                    TweenMax.to(menuSelectorEl.current , 0.25, { left: "33%" });
                    break;
                case 'CLICK': 
                    TweenMax.to(menuSelectorEl.current , 0.25, { left: "66.7%" });
                    break;
                default: 
                    console.log("NO")
            }
        }
    }, [viewMode]);
    
    return (
        <Container>
            <Dock dockOpen={dockOpen}>
                <Row>
                    <EntryField fetchData={fetchData}/>
                </Row>
                
                <Row>
                    <ViewModeContainer>
                        <MenuItem {...props} index={0} icon={TimerIcon} menuString={"TIMER"}/>
                        <MenuItem {...props} index={1} icon={ScrollIcon} menuString={"SCROLL"}/>
                        <MenuItem {...props} index={2} icon={MouseIcon} menuString={"CLICK"}/>
                        <MenuSelector ref={menuSelectorEl}/>
                    </ViewModeContainer>

                    <ImageFitToggle onClick={() => setImageFit(!imageFit)}>
                        <CheckBox active={imageFit}>
                            <img src={checkIcon} />
                        </CheckBox>
                        <p>Image Fit</p>
                    </ImageFitToggle>
                </Row>    
            </Dock>
        </Container>
    )
}

export default Menu;