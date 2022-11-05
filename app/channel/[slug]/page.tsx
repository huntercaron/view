import "server-only"

import { cookies, headers } from "next/headers"
import { getAccessToken } from "../../../lib/getAccessToken"
import { getData } from "../../../lib/getData"
import { Cache } from "./cache"
import { getArenaChannel } from "../../../lib/getArenaChannel"

export default async function Channel(props) {
    const slug = props.params.slug
    const accessToken = await getAccessToken(cookies(), headers())

    if (!slug) return <div>please enter channel</div>

    const { channel, allContents } = await getArenaChannel(slug, accessToken)

    return (
        <div>
            <Cache channel={channel} />
            channel: {channel.title}
            {allContents.map(block => (
                <div key={block.id}>
                    <img src={block.image?.thumb?.url} />
                    <h3>{block.generated_title}</h3>
                </div>
            ))}
        </div>
    )
}
