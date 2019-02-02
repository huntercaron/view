import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import CountdownCicle from './CountdownCircle'
import FastAverageColor from 'fast-average-color/dist/index.es6';

const ImagesContainer = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
`

const PrimaryImage = styled.img`
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
    const imageEl = useRef(null);
    const ref = useRef(null);

    function getImageColor() {
      let avgColor = ref.current; 
      if (avgColor !== null) {
        return avgColor;
      }
      let newAvgColor = new ColorThief();
      ref.current = newAvgColor;
      return newAvgColor;
    }

    function idk() {
      console.log(getImageColor().getColor(imageEl.current));
    }

    useEffect(() => {
      // console.log(imageEl.current.)
    }, [])
    
    useLayoutEffect(() => {
    }, [iterator])


    return ( 
        <ImagesContainer onClick={incrementIterator}>
          <PrimaryImage
            src={galleryData[iterator]}
            ref={imageEl}
            onLoad={idk}
          />
          {/* <img src={galleryData[iterator]} onLoad={idk}/> */}
          <HiddenImage src={iterator === galleryData.length-1 ? galleryData[0] : galleryData[iterator+1]} />

          <CountdownCicle />
        </ImagesContainer>
    )
}

export default Viewer;