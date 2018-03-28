import React, { Component } from 'react';
import axios from 'axios'
import styled, { injectGlobal } from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const InnerContainer = Container.extend``;

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

function filter_images(block) {
  return block._type === "link";
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blockImage: null,
      initialRequest: false,
      iterator: 0,
      pageIterator: Math.floor(Math.random()*100),
      imageUrls: [],
      dataLength: null,
      maxPages: null
    }
  }

  handleClick = () => {
    let scope = this;
    if (this.state.iterator == this.state.dataLength-2) {
      this.setState({
        iterator: 0,
        pageIterator: Math.floor(Math.random()*this.state.maxPages-1)
      }, scope.fetchData);

    } else {
      this.setState(prevState => ({
        iterator: prevState.iterator + 1
      }));
    }

    console.log(this.state)
  }

  fetchData = () => {
    let scope = this;
    axios.get('http://api.are.na/v2/search/blocks', {
      params: {
        page: this.state.pageIterator,
        per: 15
      }
    })
    .then(function (response) {
      let data = response.data.blocks.map(block => block._type == 'image' && block.image.display.url);
      let cleanData = data.filter(n => n);
      console.log(response.data);

      if (cleanData.length <= 1)
        this.fetchData();

      scope.setState({
        dataLength: cleanData.length,
        imageUrls: cleanData,
        maxPages: response.data.total_pages,
        iterator: 0
      })
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Container onClick={this.handleClick}>
        {this.state.imageUrls && (
          <React.Fragment>
            <PrimaryImage src={this.state.imageUrls[this.state.iterator]} />
            <HiddenImage src={this.state.imageUrls[this.state.iterator+1]} />
          </React.Fragment>
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
