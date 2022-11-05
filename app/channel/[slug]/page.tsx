import "server-only"

import { cookies, headers } from "next/headers"
import { getAccessToken } from "../../../lib/getAccessToken"
import { getData } from "../../../lib/getData"
import { Cache } from "./cache"

export default async function Channel(props) {
    const slug = props.params.slug
    const accessToken = await getAccessToken(cookies(), headers())

    if (!slug) return <div>please enter channel</div>

    const data = await getData(slug, accessToken)
    const blocks = data.contents ?? []

    return (
        <div>
            <Cache channel={data} />
            channel:
            {blocks.map(block => (
                <div key={block.id}>
                    <img src={block.image?.thumb?.url} />
                    <h3>{block.generated_title}</h3>
                </div>
            ))}
        </div>
    )
}
