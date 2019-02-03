import React, { useState } from 'react'
import styled from 'styled-components';

import MenuItem from './MenuItem';
import DockButton from './DockButton'
import TimerIcon from '../assets/clock.svg'
import MouseIcon from '../assets/mouse.svg'
import ScrollIcon from '../assets/scroll.svg'

const Container = styled.div`
    width: 100%;
    z-index: 3;
    display: flex;
    justify-content: center;
    margin-top: 16px;
`

const Dock = styled.div`
    position: relative;
    z-index: 3;
    border-radius: 126px;
    padding: 16px;
    max-width: 363px;
    display: flex;
    width: 90%;
    height: 55px;
    border: 1.5px solid black;
    background-color: white;
    transition: opacity 150ms ease-out, transform 250ms ease-out;
    transform: translateY(${props => props.dockOpen ? 0 : "1px"});
    opacity: ${props => props.dockOpen ? 1 : 0};
    pointer-events: ${props => props.dockOpen ? "auto" : "none"};
`;

function Menu(props) {
    const [dockOpen, setDockOpen] = useState(false)

    return (
        <>
            <DockButton setDockOpen={setDockOpen} dockOpen={dockOpen} />

            <Container>
                <Dock dockOpen={dockOpen}>
                    <MenuItem {...props} icon={TimerIcon} menuString={"TIMER"}/>
                    <MenuItem {...props} icon={ScrollIcon} menuString={"SCROLL"}/>
                    <MenuItem {...props} icon={MouseIcon} menuString={"CLICK"}/>
                </Dock>
            </Container>
        </>    
    )
}

export default Menu;