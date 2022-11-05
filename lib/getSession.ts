import "server-only"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { NextAuthHandler } from "next-auth/core"
import { Session } from "next-auth"

export const getSession = async (cookies, headers) => {
    const allCookies = {}
    cookies.getAll().map(({ value, name }) => (allCookies[name] = value))

    const allHeaders = {}
    headers.forEach((value, key) => (allHeaders[key] = value))

    const session = await NextAuthHandler<Session | {} | string>({
        options: authOptions,
        req: {
            host: headers.get("x-forwarded-host") ?? "http://localhost:3000",
            action: "session",
            method: "GET",
            cookies: allCookies,
            headers: allHeaders,
        },
    })

    return session
}
