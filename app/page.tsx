import "server-only"

import { cookies, headers } from "next/headers"
import { getUserChannels } from "../lib/getUserChannels"
import { Input } from "./input"
import { getAccessToken } from "../lib/getAccessToken"
import { ChannelLink } from "./ChannelLink"
import { CachedChannels } from "./CachedChannels"

export default async function Page() {
    const accessToken = await getAccessToken(cookies(), headers())
    const channels = await getUserChannels(accessToken)

    return (
        <div style={{ padding: 10, overflowY: "auto", maxHeight: "100vh" }}>
            <Input />

            {channels && (
                <>
                    <br />
                    === Your Channels:
                    {channels.map(channel => (
                        <ChannelLink key={channel.id} channel={channel} showAuthor={false} />
                    ))}
                </>
            )}
            <CachedChannels channels={channels} />
        </div>
    )
}
