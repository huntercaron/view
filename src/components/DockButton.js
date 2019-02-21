import React, { useContext } from 'react'
import styled from 'styled-components';

import { WindowHoverContext } from './App'
import xIcon from '../assets/x.svg'
import xWhiteIcon from '../assets/x_white.svg'

const ButtonContainer = styled.div`
    position: relative;
    margin: 14px 0 12px;
    width: 100%;
    z-index: 3;
    display: flex;
    justify-content: center;
    cursor: pointer;
    user-select: none;
`;

const Button = styled.div`
    width: 29px;
    height: 29px;
    background-color: white;
    border-radius: 50%;
    border: 1.5px solid black;
    opacity: ${props => props.dockOpen ? 1 : 0};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: opacity 120ms ease-out;
    
    &:hover {
        transition: opacity 120ms ease-out;
        opacity: 1;
    }
`

const ButtonInner = styled.div`
    width: 21px;
    height: 21px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2px;
    background-color: black;
    opacity: 0;
    transition: opacity 120ms ease-out;
    pointer-events: none;

    ${Button}:hover & {
        opacity: ${props => props.dockOpen ? 1 : 0};
    }
`;

const CircleContainer = styled.div`
    position: absolute;
    mix-blend-mode: difference;
    top: 14px;
    left: 0;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    pointer-events: none;
`;

const Circle = styled.div`
    mix-blend-mode: difference;
    width: 29px;
    height: 29px;
    background-color: transparent;
    border-radius: 50%;
    border: 1.5px solid white;
    pointer-events: auto;
    transition: opacity 120ms ease-out;
    opacity: ${props => props.windowHover ? 1 : 0};
`;

const CloseIcon = styled.img`
    pointer-events: none;
    opacity: ${props => props.dockOpen ? 1 : 0};
`;

function DockButton({ setDockOpen, dockOpen }) {
    const windowHover = useContext(WindowHoverContext);

    return (
        <>
            <ButtonContainer>
                <Button onClick={() => setDockOpen(!dockOpen)} dockOpen={dockOpen}>
                    <ButtonInner dockOpen={dockOpen}>
                        <CloseIcon src={xWhiteIcon} dockOpen={dockOpen}/>
                    </ButtonInner>

                    <CloseIcon src={xIcon} dockOpen={dockOpen}/>
                </Button>
            </ButtonContainer>

            <CircleContainer>
                <Circle windowHover={windowHover}/>
            </CircleContainer>
        </>
    )
}

export default DockButton;