import type Arena from "are.na"
import Login from "./login"

const baseURL = "https://api.are.na/v2/channels/"

async function getData() {
    const channel = "great-sites-shv7bj7sqn0"
    const url = new URL(channel, baseURL)

    url.searchParams.set("per", "64")
    url.searchParams.set("direction", "desc")
    url.searchParams.set("page", "1")

    console.log(url.toString())

    try {
        const res = await fetch(url, { next: { revalidate: 1000 } })
        const data = (await res.json()) as Arena.Channel

        return data
    } catch (e) {
        console.error(e)
    }
}

export default async function Page() {
    const channel = await getData()
    const blocks = channel?.contents ?? []

    return (
        <div>
            Hello, Next.js!
            <Login />
            {blocks.map(block => (
                <div key={block.id}>
                    <img src={block.image.thumb.url} />
                    <h3>{block.generated_title}</h3>
                </div>
            ))}
        </div>
    )
}
