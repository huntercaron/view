import React from 'react'
import styled from 'styled-components';

import xIcon from '../assets/x.svg'
import xWhiteIcon from '../assets/x_white.svg'

const ButtonContainer = styled.div`
    position: relative;
    margin: 16px 0 12px;
    width: 100%;
    z-index: 3;
    display: flex;
    justify-content: center;
    cursor: pointer;
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
    left: 3px;
    background-color: black;
    opacity: 0;
    transition: opacity 120ms ease-out;

    ${Button}:hover & {
        opacity: ${props => props.dockOpen ? 1 : 0};
    }
`;

const CircleContainer = styled.div`
    position: absolute;
    isolation: isolate;
    mix-blend-mode: difference;
    top: 16px;
    left: 0;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
`;

const Circle = styled.div`
    mix-blend-mode: difference;
    width: 29px;
    height: 29px;
    background-color: transparent;
    border-radius: 50%;
    border: 1.5px solid white;
`;

const CloseIcon = styled.img`
    opacity: ${props => props.dockOpen ? 1 : 0};
`;

function DockButton({ setDockOpen, dockOpen }) {
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
                <Circle />
            </CircleContainer>
        </>
    )
}

export default DockButton;