"use client"

import React, { useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import styled from "styled-components"
import { CHANNEL_CACHE_KEY, ChannelInfo } from "./channel/[slug]/cache"

const InputContainer = styled.form`
    /* position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center; */
`

const LinkInput = styled.input`
    /* outline: none;
    border-radius: 50px;
    border: 1.5px solid black;
    height: 52px;
    font-size: 16px;
    padding-left: 22px;
    padding-right: ${props => (props.submitted ? "0" : "46px")};
    font-weight: 500;

    transition: all 250ms ease-out;
    width: ${props => (props.submitted ? "52px" : "100%")};

    transform: translateX(${props => (props.submitted ? "0px" : "0")});

    &::placeholder {
        opacity: ${props => (props.submitted ? "0" : "0.35")};
    } */
    /* 
    &:focus::-webkit-input-placeholder {
        color: transparent;
    } */
`

const SubmitArrow = styled.button`
    /* display: flex;
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

    opacity: ${props => (props.enabled ? 1 : 0.2)};

    margin-left: -48px;
    z-index: 3px;

    &:hover {
        background-color: ${props => (props.submitted ? "transparent" : "#efefef")};
    }

    &:active {
        background-color: ${props => (props.submitted ? "transparent" : "#dfdfdf")};
    } */
`

const ArrowIcon = styled.svg`
    /* height: 20px;
    width: 20px;
    user-select: none;
    position: relative;
    margin-top: 1px;
    z-index: 1; */
`

export function Input() {
    const router = useRouter()
    // refactor into one state value
    const [isUrlSubmitted, setIsUrlSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [url, setUrl] = useState("")

    const handleUrlSubmit = e => {
        e.preventDefault()
        setIsUrlSubmitted(true)

        try {
            const parsedUrl = new URL(url)

            if (parsedUrl.host !== "www.are.na") {
                setErrorMessage("invalid are.na channel url")
            }

            const parts = parsedUrl.pathname.split("/")
            const lastSegment = parts.pop() || parts.pop()

            e.target.blur()
            router.push(`/channel/${lastSegment}`)
        } catch (_) {
            setErrorMessage("invalid are.na channel url")
        }
    }

    const handleUrlChange = e => {
        setUrl(e.target.value)
        setErrorMessage(null)
        setIsUrlSubmitted(false)
    }

    const rawCache = localStorage.getItem(CHANNEL_CACHE_KEY)
    const parsedCache = JSON.parse(rawCache)
    const cache = parsedCache ? new Map<number, ChannelInfo>(parsedCache) : null

    return (
        <div>
            <InputContainer onSubmit={handleUrlSubmit} submitted={isUrlSubmitted}>
                <LinkInput
                    autoFocus
                    placeholder="Are.na channel url…"
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    submitted={isUrlSubmitted}
                />

                <SubmitArrow enabled={url.trim().length > 0}>
                    <ArrowIcon xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <g transform="translate(3 4.5)">
                            <path
                                d="M 9.5 11 L 15 5.5 L 9.5 0"
                                fill="transparent"
                                strokeWidth="1.6"
                                stroke="hsl(0, 0%, 0%)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M 15 5.5 L 0 5.5"
                                fill="transparent"
                                strokeWidth="1.6"
                                stroke="hsl(0, 0%, 0%)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </g>
                    </ArrowIcon>
                </SubmitArrow>
            </InputContainer>
            {errorMessage && <p>{errorMessage}</p>}
            {isUrlSubmitted && !errorMessage && <p>loading…</p>}
            {cache && (
                <div>
                    ===
                    {[...cache].map(([_, channel]) => (
                        <ChannelLink key={channel.id} channel={channel} />
                    ))}
                </div>
            )}
        </div>
    )
}

function ChannelLink({ channel }) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Link href={`/channel/${channel.slug}`} onClick={() => setIsLoading(true)} key={channel.id}>
            <p style={{ margin: 0 }}>
                {channel.title} - {channel.user.full_name}
            </p>
        </Link>
    )
}
