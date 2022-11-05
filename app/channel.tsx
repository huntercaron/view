import type Arena from "are.na"

import "server-only"
import { cookies, headers } from "next/headers"
import { getAccessToken } from "../lib/getAccessToken"

const baseURL = "https://api.are.na/v2/channels/"

async function getData(token: string) {
    const channel = "pyxlz-inspo"
    const url = new URL(channel, baseURL)

    url.searchParams.set("per", "64")
    url.searchParams.set("direction", "desc")
    url.searchParams.set("page", "1")

    try {
        const res = await fetch(url, {
            next: { revalidate: 1000 },
            headers: {
                authorization: `Bearer ${token}`,
            },
        })

        if (res.status === 200) {
            const data = (await res.json()) as Arena.Channel

            return Promise.resolve(data)
        } else {
            const message = await res.text()
            return Promise.reject(message)
        }
    } catch (e) {
        console.error("Err", e)

        return Promise.reject(e.message)
    }
}

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
