import Arena from "are.na"
import { getUserId } from "./getUserId"

interface ChannelResponse {
    length: number
    total_pages: number
    per: number
    channels: Arena.Channel[]
}

export async function getUserChannels(token: string): Promise<Arena.Channel[]> {
    if (!token) return null

    const userId = await getUserId(token)

    const url = new URL(`http://api.are.na/v2/users/${userId}/channels`)

    url.searchParams.set("per", "64")

    const res = await fetch(url, {
        next: { revalidate: 10000 },
        headers: { authorization: `Bearer ${token}` },
    })

    const data = await res.json()
    return data.channels
}
