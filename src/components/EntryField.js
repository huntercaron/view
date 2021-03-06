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
  height: 52px;
  font-size: 1.7rem;
  padding-left: 22px;
  padding-right: ${props => props.submitted ? "0" : "46px"};
  font-weight: 500;

  transition: all 250ms ease-out;
  width: ${props => props.submitted ? "52px" : "100%"};
  
  transform: translateX(${props => props.submitted ? "0px" : "0"});


  &::placeholder {
    opacity: ${props => props.submitted ? "0" : "0.35"};
  }

  &:focus::-webkit-input-placeholder { color:transparent; } 
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
    background-color: ${props => props.submitted ? "transparent" : "#efefef"};
  }

  &:active {
    background-color: ${props => props.submitted ? "transparent" : "#dfdfdf"};
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
          <LinkInput placeholder='Enter Are.na url…' type="text" ref={urlInputElement} submitted={urlSubmitted}/>

          <SubmitArrow submitted={urlSubmitted}>
            <ArrowIcon src={arrowIcon} submitted={urlSubmitted}/>
          </SubmitArrow>
      </InputContainer>
    )
}

export default EntryView