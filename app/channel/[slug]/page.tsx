import "server-only"

import { cookies, headers } from "next/headers"
import { getAccessToken } from "../../../lib/getAccessToken"
import { Cache } from "./cache"
import { Viewer } from "./viewer"
import { getArenaChannel } from "../../../lib/getArenaChannel"

export default async function Channel(props) {
    const slug = props.params.slug
    const accessToken = await getAccessToken(cookies(), headers())

    if (!slug) return <div>please enter channel</div>

    const { channel, allContents } = await getArenaChannel(slug, accessToken)

    return (
        <div className="">
            <Cache channel={channel} />
            <Viewer contents={allContents} channel={channel} />
        </div>
    )
}
