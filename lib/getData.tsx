import Arena from "are.na"

export async function getData(token: string) {
    const channel = "pyxlz-inspo"
    const baseURL = "https://api.are.na/v2/channels/"

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
