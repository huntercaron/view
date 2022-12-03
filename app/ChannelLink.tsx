"use client"
import React, { useState } from "react"
import Link from "next/link"

export function ChannelLink({ channel, showAuthor = true }) {
    const [isLoading, setIsLoading] = useState(false)
    const name = channel.user?.full_name

    return (
        <Link href={`/channel/${channel.slug}`} onClick={() => setIsLoading(true)} key={channel.id}>
            <p style={{ margin: 0 }}>
                {channel.title} {name && showAuthor && ` – ${name}`} {isLoading && " – loading…"}
            </p>
        </Link>
    )
}
