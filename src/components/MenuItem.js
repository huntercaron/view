import React from 'react'
import styled from 'styled-components';

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

    ${IconContainer}:active & {
        background-color: #dcdcdc;
    }
`;

function MenuItem({ icon, setViewMode, viewMode, menuString }) {
    return (
        <IconContainer onClick={() => setViewMode(menuString)}>
            <MenuIcon active={viewMode === menuString} src={icon} />
            <IconBg />
        </IconContainer>
    );
}

export default MenuItem;