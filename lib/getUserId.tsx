export async function getUserId(token: string) {
    if (!token) return null
    const res = await fetch("https://api.are.na/graphql", {
        next: { revalidate: 10000 },
        headers: {
            accept: "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua": '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-app-token": "pL4YhrdwXq7Bm7t8s6Yt",
            "x-auth-token": token,
            authorization: `Bearer ${token}`,
        },
        referrer: "https://www.are.na/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: '{"operationName":"IsConfirmed","variables":{},"query":"query IsConfirmed {\\n  me {\\n    id\\n    is_confirmed\\n    __typename\\n  }\\n}\\n"}',
        method: "POST",
        mode: "cors",
        credentials: "omit",
    })
    const data = await res.json()
    return data.data.me.id
}
