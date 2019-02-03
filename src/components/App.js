import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import { shuffleArray, timeout } from '../utils/'

import EntryView from './EntryView'
import Viewer from './Viewer';
import Menu from './Menu'

const Container = styled.div`
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
  background-color: white;
  font-family: 'Courier New', Courier, monospace;
`

function useDataFetch() {
    const [galleryData, setGalleryData] = useState();

    const makeUrl = (slug, page) => `https://api.are.na/v2/channels/${slug}?page=${page}/contents`;
    const cleanData = (data) => data.filter(n => n);
    const filterImages = (data) => data.map(block => block.class.toLowerCase() === 'image' && block.image.display.url);

    return [galleryData, async (url) => {
        const slug = (url && url.includes("are.na") && url.lastIndexOf('/') >= 0) ? 
            url.substr(url.lastIndexOf('/') + 1) :
            "layouts-1506953554";

        const firstPageResponse = await fetch(makeUrl(slug, 0))
        const firstPageData = await firstPageResponse.json();
        const randomizedData = shuffleArray(cleanData(filterImages(firstPageData.contents)));
        const pages = Math.ceil(firstPageData.length/firstPageData.per);
        
        if (randomizedData.length < firstPageData.per) {
            await timeout(800);
            setGalleryData(randomizedData);
            return;
        }
            
        const pagesData = [];

        for(var i = 1; i <= pages; i++) {
            pagesData.push(fetch(makeUrl(slug, i)));
        }

        await timeout(800);

        setGalleryData(randomizedData);

        const newPagesResponse = await Promise.all(pagesData)
        
        const newPageData = newPagesResponse.map(async response => {
            const pageJson = await response.json();
            return cleanData(filterImages(pageJson.contents));
        })
        const cleanedNewPages = await Promise.all(newPageData);

        const allPages = [].concat.apply([], [randomizedData.slice(2), ...cleanedNewPages])
        const randomizedAllPages = shuffleArray(allPages)
        const allPagesWithStart = randomizedData.slice(0, 2).concat(randomizedAllPages)

        setGalleryData(allPagesWithStart)
    }]
}

export const WindowHoverContext = React.createContext(false);

function App() {
    const [galleryData, fetchGalleryData] = useDataFetch();
    const [viewMode, setViewMode] = useState("TIMER")
    const [windowHover, setWindowHover] = useState(false)
    
    return (
        <Container onMouseEnter={() => setWindowHover(true)} onMouseLeave={() => setWindowHover(false)}>
            <WindowHoverContext.Provider value={windowHover}>
                {galleryData ? (
                    <> 
                        <Menu viewMode={viewMode} setViewMode={setViewMode}/>
                        <Viewer viewMode={viewMode} galleryData={galleryData}/>
                    </>
                ):(
                    <EntryView fetchData={fetchGalleryData}/>
                )}
            </WindowHoverContext.Provider>
            
            <GlobalStyle />
        </Container>
    );
}

export default App;


const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
  }

  html {
  ${'' /* Maybe Try?  font-size: calc(1.25vw + 62.5%); */}
    font-size: 62.5%;
    height: 100%;
  }

  body {
      overflow: hidden;
      margin: 0;
      height: 100%;
      font-size: 1.6em;
      line-height: 1.6;
      font-weight: 400;
      font-family: 'Helvetica', 'Arial', sans-serif;
      color: #222;
      webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      text-rendering: optimizeLegibility;
  }

  #root {
    height: 100%;
  }
`