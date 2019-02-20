import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import arrowIcon from '../assets/arrow.svg'

const InputContainer = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkInput = styled.input`
  outline: none;
  border-radius: 50px;
  border: 1.5px solid black;
  width: 70%;
  height: 52px;
  font-size: 1.6rem;
  padding-left: 22px;
  font-family: 'Courier New', Courier, monospace;
  padding-right: ${props => props.submitted ? "0" : "46px"};

  transition: all 250ms ease-out;
  width: ${props => props.submitted ? "52px" : "70%"};
  
  transform: translateX(${props => props.submitted ? "0px" : "0"});
  
  ${'' /* width: 50px; */}
`

const SubmitArrow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background: none;
  border-radius: 50%;
  margin: 0 0.5rem;
  width: 42px;
  height: 42px;
  position: relative;

  margin-left: -48px;
  z-index: 3px;
  
  &:hover {
    background-color: ${props => props.submitted ? "transparent" : "#eee"};
  }

  &:active {
    background-color: ${props => props.submitted ? "transparent" : "#dcdcdc"};
  }


`

const ArrowIcon = styled.img`
    height: 20px;
    width: 20px;
    user-select: none;
    position: relative;
    margin-top: 1px;
    z-index: 1;
    opacity: ${props => props.submitted ? 0 : 1};
`

function useUrlSubmission() {
    const [urlSubmitted, setUrlSubmitted] = useState(false)

    return [urlSubmitted, (e, inputElement, fetchData) => {
      setUrlSubmitted(true);
      e.preventDefault();
      
      fetchData(inputElement.current.value);

      inputElement.current.blur();
      inputElement.current.value = "";
    }];
}


function EntryView(props) {
    const urlInputElement = useRef(null);
    const [urlSubmitted, submitUrl] = useUrlSubmission();

    useEffect(() => {
        urlInputElement.current.focus();
    }, []);

    return (
      <InputContainer onSubmit={(e) => submitUrl(e, urlInputElement, props.fetchData)} submitted={urlSubmitted}>
          <LinkInput type="text" ref={urlInputElement} submitted={urlSubmitted}/>

          <SubmitArrow submitted={urlSubmitted}>
            <ArrowIcon src={arrowIcon} submitted={urlSubmitted}/>
          </SubmitArrow>
      </InputContainer>
    )
}

export default EntryView