import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
// import { useCatchedFetch } from 'use-local-cache'
import { shuffleArray, timeout, fadeIn } from "../utils/";
import { TweenMax } from "gsap";

import EntryField from "./EntryField";
import DockButton from "./DockButton";
import Viewer from "./Viewer";
import Menu from "./Menu";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-app-region: drag;
  background-color: white;
  transform: none !important;
  font-family: "Favorit Trial Pro", "Courier New", Courier, monospace;
`;

const ViewerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.12);
  z-index: 4;
  overflow: hidden;
`;

const InputContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0 15%;
  animation: ${fadeIn} 300ms ease-in;
  padding-bottom: 12px;

  transition: opacity 200ms 400ms ease-out;
  opacity: ${(props) => (props.submitted ? 0 : 1)} !important;
  z-index: 10;
`;

function useDataFetch() {
  const [galleryData, setGalleryData] = useState();

  const makeUrl = (slug, page) =>
    `https://api.are.na/v2/channels/${slug}?page=${page}/contents`;
  const cleanData = (data) => data.filter((n) => n);
  const filterImages = (data) =>
    data.map(
      (block) =>
        block.class.toLowerCase() === "image" && block.image.display.url
    );

  return [
    galleryData,
    async (url) => {
      const slug =
        url && url.includes("are.na") && url.lastIndexOf("/") >= 0
          ? url.substr(url.lastIndexOf("/") + 1)
          : "layouts-1506953554";

      const firstPageResponse = await fetch(makeUrl(slug, 0));
      const firstPageData = await firstPageResponse.json();
      const randomizedData = shuffleArray(
        cleanData(filterImages(firstPageData.contents))
      );
      const pages = Math.ceil(firstPageData.length / firstPageData.per);

      if (firstPageData.length < firstPageData.per) {
        await timeout(800);
        setGalleryData(randomizedData);
        return;
      }

      const pagesData = [];

      console.log(pages);

      for (var i = 1; i <= pages; i++) {
        pagesData.push(fetch(makeUrl(slug, i)));
      }

      await timeout(800);

      setGalleryData(randomizedData);

      const newPagesResponse = await Promise.all(pagesData);

      const newPageData = newPagesResponse.map(async (response) => {
        const pageJson = await response.json();
        return cleanData(filterImages(pageJson.contents));
      });
      const cleanedNewPages = await Promise.all(newPageData);

      const allPages = [].concat.apply(
        [],
        [randomizedData.slice(2), ...cleanedNewPages]
      );
      const randomizedAllPages = shuffleArray(allPages);
      const allPagesWithStart = randomizedData
        .slice(0, 2)
        .concat(randomizedAllPages);

      setGalleryData(allPagesWithStart);
    },
  ];
}

export const WindowHoverContext = React.createContext(false);

function App() {
  const viewerEl = useRef(null);
  const viewerContainerEl = useRef(null);
  const [galleryData, fetchGalleryData] = useDataFetch();
  const [viewMode, setViewMode] = useState("TIMER");
  const [windowHover, setWindowHover] = useState(false);
  const [dockOpen, setDockOpen] = useState(false);
  const [imageFit, setImageFit] = useState(false);

  useEffect(
    () => {
      const focusGallery = () => {
        viewerEl.current.focus();
      };

      if (viewerContainerEl.current && dockOpen)
        TweenMax.to(viewerContainerEl.current, 0.25, {
          y: 160,
          borderRadius: 11,
        });
      else if (viewerContainerEl.current)
        TweenMax.to(viewerContainerEl.current, 0.25, {
          y: 0,
          borderRadius: 4,
          onComplete: focusGallery,
        });
    },
    [dockOpen, galleryData]
  );

  return (
    <Container
      onMouseEnter={() => setWindowHover(true)}
      onMouseLeave={() => setWindowHover(false)}
    >
      <WindowHoverContext.Provider value={windowHover}>
        {galleryData ? (
          <>
            <Menu
              viewMode={viewMode}
              setViewMode={setViewMode}
              dockOpen={dockOpen}
              imageFit={imageFit}
              setImageFit={setImageFit}
              fetchData={fetchGalleryData}
            />
            <ViewerContainer open={dockOpen} ref={viewerContainerEl}>
              <DockButton dockOpen={dockOpen} setDockOpen={setDockOpen} />
              <Viewer
                viewMode={viewMode}
                galleryData={galleryData}
                viewerRef={viewerEl}
                imageFit={imageFit}
              />
            </ViewerContainer>
          </>
        ) : (
          <InputContainer>
            <EntryField
              fetchData={fetchGalleryData}
              setDockOpen={setDockOpen}
            />
          </InputContainer>
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
  ${"" /* Maybe Try?  font-size: calc(1.25vw + 62.5%); */}
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
`;
