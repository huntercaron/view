import Arena from "are.na"
import { getData } from "./getData"

const paginationPer = 64
const getTotalPages = channel => Math.ceil(Math.min(channel.length, 500) / paginationPer)

async function getArenaChannelContents(channelSlug: string, token: string, currentPage: number) {
    const data = await getData(channelSlug, token, currentPage)
    return await data.contents
}

export async function getArenaChannel(
    channelSlug: string,
    token: string
): Promise<{ channel: Arena.Channel; allContents: Arena.Channel["contents"] }> {
    const channelData = await getData(channelSlug, token)
    const totalPages = getTotalPages(channelData)
    const allPageRequests: Promise<Arena.Block[]>[] = []

    let currentPage = 1
    while (currentPage <= totalPages) {
        allPageRequests.push(getArenaChannelContents(channelSlug, token, currentPage))
        currentPage++
    }

    const channelPages = await Promise.all(allPageRequests)
    console.log("Fetched all blocks for a channel")

    return { channel: channelData, allContents: [].concat(...channelPages) }
}
