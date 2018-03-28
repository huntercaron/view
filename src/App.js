import React, { Component } from 'react';
import axios from 'axios'
import styled, { injectGlobal } from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
  font-family: 'Courier New', Courier, monospace;
`

const InputContainer = styled.form`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: opacity 200ms 400ms ease-out;
  opacity: ${props => props.submitted ? 0 : 1};

`;

const PrimaryImage = styled.div`
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

// function filter_images(block) {
//   return block._type === "link";
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iterator: 0,
      imageUrls: [],
      imageMode: false,
      dataLength: null,
      maxPages: null,
      wrongFileType: false,
      inputView: true
    }
  }

  handleClick = () => {
    if (this.state.imagesLoaded) {
      if (this.state.iterator === this.state.dataLength-2) {
        this.resetIterator()
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
    this.setState({
      iterator: 0,
    });
  }

  fetchData = (url) => {
    let scope = this;
    axios.get('https://api.are.na/v2/channels/layouts-1506953554')
    .then(function (response) {
      setTimeout(() => {
        scope.setState({
          inputMode: false
        })
      }, 600);

      console.log(response.data.contents[0]);
      
      
      let data = response.data.contents.map(block => block.class.toLowerCase() === 'image' && block.image.display.url);
      let cleanData = data.filter(n => n);
      console.log(cleanData);
      

      scope.setState({
        dataLength: cleanData.length,
        imageUrls: cleanData,
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
    console.log("submitted");

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

    console.log(e);
        

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
        {this.state.imagesLoaded && (
          <React.Fragment>
            <PrimaryImage src={this.state.imageUrls[this.state.iterator]} />
            <HiddenImage src={this.state.imageUrls[this.state.iterator+1]} />
          </React.Fragment>
        )}
        {this.state.inputView && (
          <InputContainer submitted={this.state.imageMode} onSubmit={this.handleLinkSubmit}>
            <LinkInput submitted={this.state.imageMode} type="text" innerRef={input => this.urlInput = input} />

            <SubmitArrow submitted={this.state.imageMode}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 11">
                <polygon fill="#000000" fillRule="evenodd" points="8.81 .647 13.655 5.492 13.655 5.934 8.81 10.779 7.824 9.793 11.258 6.393 .684 6.393 .684 5.05 11.275 5.05 7.824 1.633" />
              </svg>
            </SubmitArrow>

          </InputContainer>
        )}
      </Container>
    );
  }
}

export default App;


injectGlobal`
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
