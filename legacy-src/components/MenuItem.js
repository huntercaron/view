import React from 'react'
import styled from 'styled-components';

const MenuIcon = styled.img`
    height: 20px;
    width: 20px;
    user-select: none;
    pointer-events: none;
    position: relative;
    z-index: 20;
    /* opacity: ${props => props.active ? "1" : "0.4"}; */
    mix-blend-mode: difference !important;
    /* padding: 0 calc(100% / 6); */
` 

const IconContainer = styled.div`
    position: absolute;
    top: 2px;
    width: calc(${100/3}% - 5px);
    left: calc(${props => 100/3*props.index}% + 3px);
    height: 32px;
    margin-right: 8px;
    cursor: pointer;
`;

const IconBg = styled.div`
    background-color: #eee;
    border-radius: 50px;
    width: 100%;
    height: 24px;
    position: absolute;
    opacity: 0;

    ${IconContainer}:hover & {
        opacity: 1;
    }

    ${IconContainer}:active & {
        background-color: #dcdcdc;
    }
`;

function MenuItem({ icon, setViewMode, viewMode, menuString, index }) {
    return (
        <>
            <MenuIcon active={viewMode === menuString} src={icon}/>
            <IconContainer onClick={() => setViewMode(menuString)} index={index}>
                <IconBg />
            </IconContainer>
        </>
    );
}

export default MenuItem;