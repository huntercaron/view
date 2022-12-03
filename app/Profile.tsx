import { cookies, headers } from "next/headers"
import { getAccessToken } from "../lib/getAccessToken"
import { getUserId } from "../lib/getUserId"

export async function Profile() {
    const token = await getAccessToken(cookies(), headers())

    const userId = await getUserId(token)
    const res = await fetch(`https://api.are.na/v2/users/${userId}`, { next: { revalidate: 10000 } })
    const user = await res.json()

    return (
        <div className="login">
            {" "}
            <img src={user.avatar} />
        </div>
    )
}
