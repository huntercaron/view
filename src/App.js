import React from 'react';
import axios from 'axios'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
  background-color: white;
  font-family: 'Courier New', Courier, monospace;
`

const InputContainer = styled.form`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  animation: ${fadeIn} 300ms ease-in;

  transition: opacity 200ms 400ms ease-out;
  opacity: ${props => props.submitted ? 0 : 1} !important;
  z-index: 10;
`;

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

const LinkInput = styled.input`
  outline: none;
  border-radius: 50px;
  border: 1.5px solid black;
  width: 70%;
  height: 50px;
  font-size: 1.6rem;
  padding-left: 22px;
  font-family: 'Courier New', Courier, monospace;

  transition: all 200ms ease-out;
  width: ${props => props.submitted ? "50px" : "70%"};
  transform: translateX(${props => props.submitted ? "25px" : "0"});
  
  ${'' /* width: 50px; */}
`

const SubmitArrow = styled.button`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background: none;
  border-radius: 50%;
  margin: 0 0.5rem;

  svg {
    transition: opacity 150ms ease-out;
    opacity: ${props => props.submitted ? 0 : 1};
  }
  

  width: 50px;
  height: 50px;

  &:active {
    background-color: #eee;
  }
  
`

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


function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// function filter_images(block) {
//   return block._type === "link";
// }

class App extends React.Component {

  maxPages = 0
  currentPage = 0
  dataLength

  state = {
      iterator: 0,
      imageUrls: [],
      imageMode: false,
      
      wrongFileType: false,
      inputView: true
  }


  handleClick = () => {
    if (this.state.imageMode) {
      if (this.state.iterator === this.dataLength-2) {
        this.nextPage()
      } else {
        this.incrementIterator()
      }
    }
  }

  incrementIterator = () => {
    this.setState(prevState => ({
      iterator: prevState.iterator + 1
    }));
  }

  resetIterator = () => {
    let randomizedData = shuffleArray(this.state.imageUrls);

    this.setState({
      iterator: 0,
      imageUrls: randomizedData
    });
  }

  nextPage = () => {
    const prevPage = this.currentPage

    while (this.currentPage === prevPage)
      this.currentPage = Math.floor(Math.random()*(this.maxPages-1))+1

    this.fetchData();
  }

  fetchData = (url) => {
    if (url && url.includes("are.na") && url.lastIndexOf('/') >= 0) {
      const slug = url.substr(url.lastIndexOf('/') + 1)
      url = `https://api.are.na/v2/channels/${slug}?page=${this.currentPage}`;
    } else {
      url = `https://api.are.na/v2/channels/layouts-1506953554?page=${this.currentPage}`;
    } 

    axios.get(url)
    .then(response => {
      setTimeout(() => {
        this.setState({
          inputView: false
        })
      }, 800);
      
      let rawData = response.data;
      let data = response.data.contents.map(block => block.class.toLowerCase() === 'image' && block.image.display.url);
      let cleanData = data.filter(n => n);
      let randomizedData = shuffleArray(cleanData)
      this.maxPages = Math.ceil(rawData.length/rawData.per)
      
      this.resetIterator()
      this.dataLength = randomizedData.length

      this.setState({
        imageUrls: randomizedData,
        imageMode: true,
        iterator: 0
      })
    })
    .catch(err => console.log(err));
  }

  loadFileData = (filePath) => {
    
  }

  componentDidMount() {
    // this.fetchData();
    this.urlInput.focus();

    document.addEventListener('drop', e => this.handleFileDrop(e));
    document.addEventListener('dragover', e => this.handleDragOver(e));
  }

  handleLinkSubmit = (e) => {
    e.preventDefault();

    this.fetchData(this.urlInput.value);

    this.urlInput.blur()
    this.urlInput.value = "";

    this.setState({
      imageMode: true
    })
  }

  handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("FUCKIN DRAGME")
  }

  handleFileDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
      
    if (e.dataTransfer.files[0].type === "application/json") {
      this.loadFileData(e.dataTransfer.files[0].path);
      let file = e.dataTransfer.files[0]
      console.log(file);
      
    } else {
      this.setState({
        wrongFileType: true
      })
    }
  }

  render() {
    return (
      <Container onClick={this.handleClick}>

        <ImagesContainer>
          <PrimaryImage src={this.state.imageUrls[this.state.iterator]} />
          <HiddenImage src={this.state.iterator === this.state.imageUrls.length-1 ? this.state.imageUrls[0] : this.state.imageUrls[this.state.iterator+1]} />
        </ImagesContainer>

        {this.state.inputView && (
          <InputContainer submitted={this.state.imageMode} onSubmit={this.handleLinkSubmit}>
            <LinkInput submitted={this.state.imageMode} type="text" ref={input => this.urlInput = input} />

            <SubmitArrow submitted={this.state.imageMode}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 11">
                <polygon fill="#000000" fillRule="evenodd" points="8.81 .647 13.655 5.492 13.655 5.934 8.81 10.779 7.824 9.793 11.258 6.393 .684 6.393 .684 5.05 11.275 5.05 7.824 1.633" />
              </svg>
            </SubmitArrow>

          </InputContainer>
        )}

        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
