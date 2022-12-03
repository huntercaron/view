"use client"
import React, { useMemo } from "react"
import { CHANNEL_CACHE_KEY, ChannelInfo } from "./channel/[slug]/cache"
import { ChannelLink } from "./ChannelLink"

export function CachedChannels(props) {
    const { channels = [] } = props
    const supportLocalStorage = typeof localStorage !== "undefined"

    if (!supportLocalStorage) return null

    const rawCache = localStorage.getItem(CHANNEL_CACHE_KEY)
    const parsedCache = JSON.parse(rawCache)
    const cache = useMemo(() => (parsedCache ? new Map<number, ChannelInfo>(parsedCache) : null), [])

    const dedupedCache = useMemo(() => {
        if (!cache) return null
        const cacheArray = [...cache]
        if (!channels || channels.length === 0) return cacheArray
        const otherChannels = new Map(channels.map(channel => [channel.id, channel]))

        return cacheArray.filter(([id]) => !otherChannels.has(id))
    }, [])

    return (
        <>
            {dedupedCache.length > 0 && (
                <div>
                    <br />
                    === Recently Opened:
                    {dedupedCache.map(([_, channel]) => (
                        <ChannelLink key={channel.id} channel={channel} />
                    ))}
                </div>
            )}
        </>
    )
}
