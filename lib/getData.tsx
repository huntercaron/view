import Arena from "are.na"

export async function getData(channelSlug: string, token: string): Promise<Arena.Channel> {
    const baseURL = "https://api.are.na/v2/channels/"

    const url = new URL(channelSlug, baseURL)

    url.searchParams.set("per", "64")
    url.searchParams.set("direction", "desc")
    url.searchParams.set("page", "1")

    let headers

    if (token) {
        headers = {
            authorization: `Bearer ${token}`,
        }
    }

    try {
        const res = await fetch(url, {
            next: { revalidate: 1000 },
            headers,
        })

        if (res.status === 200) {
            const data = (await res.json()) as Arena.Channel
            return Promise.resolve(data)
        } else {
            const data = await res.json()
            if (data.code === 401) throw new Error(`You do not have access to this channel, maybe you need to login?`)
            throw new Error(`${data.code} ${data.description}`)
        }
    } catch (e) {
        throw new Error(`Error Fetching Channel: ${e.message}`)
    }
}
