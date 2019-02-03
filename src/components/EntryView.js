import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import { fadeIn } from '../utils'

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

const LinkInput = styled.input`
  outline: none;
  border-radius: 50px;
  border: 1.5px solid black;
  width: 70%;
  height: 52px;
  font-size: 1.6rem;
  padding-left: 22px;
  font-family: 'Courier New', Courier, monospace;

  transition: all 250ms ease-out;
  width: ${props => props.submitted ? "52px" : "70%"};
  transform: translateX(${props => props.submitted ? "25px" : "0"});
  
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

  svg {
    transition: opacity 150ms ease-out;
    opacity: ${props => props.submitted ? 0 : 1};
  }
  
  width: 50px;
  height: 50px;

  &:hover {
    background-color: #eee;
  }

  /* &:active {
    background-color: #dcdcdc;
  } */
`

function useUrlSubmission() {
    const [urlSubmitted, setUrlSubmitted] = useState(false)

    return [urlSubmitted, (e, inputElement, fetchData) => {
        setUrlSubmitted(true);
        e.preventDefault();
        
        fetchData(inputElement.current.value);

        inputElement.current.blur()
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
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 11">
                    <polygon fill="#000000" fillRule="evenodd" points="8.81 .647 13.655 5.492 13.655 5.934 8.81 10.779 7.824 9.793 11.258 6.393 .684 6.393 .684 5.05 11.275 5.05 7.824 1.633" />
                </svg>
            </SubmitArrow>

      </InputContainer>
    )
}

export default EntryView