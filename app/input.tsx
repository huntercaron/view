"use client"

import React, { useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { CHANNEL_CACHE_KEY, ChannelInfo } from "./channel/[slug]/cache"

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
        <div style={{ padding: 10 }}>
            <form onSubmit={handleUrlSubmit}>
                <input autoFocus placeholder="Are.na channel url…" type="text" value={url} onChange={handleUrlChange} />

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
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
                    </svg>
                </button>
            </form>
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
    const name = channel.user?.full_name

    return (
        <Link href={`/channel/${channel.slug}`} onClick={() => setIsLoading(true)} key={channel.id}>
            <p style={{ margin: 0 }}>
                {channel.title} {name && ` – ${name}`} {isLoading && " – loading…"}
            </p>
        </Link>
    )
}
