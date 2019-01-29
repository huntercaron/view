import React, { useState } from 'react';
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

function useIterator(dataLength) {
    const [iterator, setIterator] = useState(0);

    return [iterator, () => {
        if (iterator === dataLength) 
            setIterator(0)
        else 
            setIterator(iterator + 1)
    }]
}

function Viewer({ galleryData }, props) {
    const [iterator, incrementIterator] = useIterator(galleryData.length);

    return ( 
        <ImagesContainer onClick={incrementIterator}>
          <PrimaryImage src={galleryData[iterator]} />
          <HiddenImage src={iterator === galleryData.length-1 ? galleryData[0] : galleryData[iterator+1]} />
        </ImagesContainer>
    )
}

export default Viewer;