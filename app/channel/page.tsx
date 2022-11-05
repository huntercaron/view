import "server-only"

import { cookies, headers } from "next/headers"
import { getAccessToken } from "../../lib/getAccessToken"
import { getData } from "../../lib/getData"

export default async function Channel() {
    const accessToken = await getAccessToken(cookies(), headers())

    if (!accessToken) return <div>private channel</div>

    const channel = await getData(accessToken)
    const blocks = channel?.contents ?? []

    return (
        <div>
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
