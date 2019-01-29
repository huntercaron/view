import React from 'react';
import styled from 'styled-components';

const ImagesContainer = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
`

const PrimaryImage = styled.div.attrs({
  style: ({ backgroundImage }) => ({
    backgroundImage
  })
})`
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: 100%;
`

const HiddenImage = styled.img`
  visibility: hidden;
  position: absolute;
`


function Viewer() {
    return ( 
        <ImagesContainer>
          <PrimaryImage src={this.state.imageUrls[this.state.iterator]} />
          <HiddenImage src={this.state.iterator === this.state.imageUrls.length-1 ? this.state.imageUrls[0] : this.state.imageUrls[this.state.iterator+1]} />
        </ImagesContainer>
    )
}

export default Viewer;