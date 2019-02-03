import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CountdownCicle from './CountdownCircle'
import { fadeIn } from '../utils'

const ImagesContainer = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;

  animation: ${fadeIn} 300ms ease-in;
`

const PrimaryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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



function Viewer({ galleryData, viewMode }, props) {
    const [iterator, incrementIterator] = useIterator(galleryData.length);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (viewMode === "TIMER")
          incrementIterator()
      }, 6000*0.98)

      return () => clearTimeout(timeout);
    }, [iterator, viewMode])

    return ( 
        <ImagesContainer onClick={incrementIterator}>
          <PrimaryImage src={galleryData[iterator]} />
          <HiddenImage src={iterator === galleryData.length-1 ? galleryData[0] : galleryData[iterator+1]} />

          {viewMode === "TIMER" &&
            <CountdownCicle iterator={iterator}/>
          }
        </ImagesContainer>
    )
}

export default Viewer;