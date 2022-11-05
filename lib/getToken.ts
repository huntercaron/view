import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getToken() {
    const nextCookies = cookies()
    const rawToken = nextCookies.get("view.session-token")

    if (!rawToken) return null

    const token = await decode({
        token: rawToken.value,
        secret: process.env.NEXTAUTH_SECRET,
    })

    return token
}
