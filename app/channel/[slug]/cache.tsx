"use client"

import type Arena from "are.na"
import { useEffect } from "react"

export const CHANNEL_CACHE_KEY = "view-recents"

export interface ChannelInfo extends Omit<Arena.Channel, "contents" | "collaborators" | "manifest"> {}

export function Cache({ channel }: { channel: Arena.Channel }) {
    useEffect(() => {
        if (!channel) return

        const rawCache = localStorage.getItem(CHANNEL_CACHE_KEY)
        const parsedCache = JSON.parse(rawCache)

        const cache = parsedCache ? new Map<number, ChannelInfo>(parsedCache) : new Map<number, ChannelInfo>()

        if (cache.has(channel.id)) return

        const reducedChannel = channel
        delete reducedChannel.contents
        delete reducedChannel.collaborators

        cache.set(channel.id, reducedChannel)

        localStorage.setItem(CHANNEL_CACHE_KEY, JSON.stringify(Array.from(cache.values())))
    }, [channel])

    return null
}
