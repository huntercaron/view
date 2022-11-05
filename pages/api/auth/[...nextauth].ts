import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

/** Create a random alphanumeric string that can be used as a unique id. */
export function randomId(digits = 10): string {
    return Array(digits)
        .fill(0)
        .map(() => BASE62[Math.floor(Math.random() * BASE62.length)])
        .join("")
}

const baseURL = "https://dev.are.na/oauth/token"

async function makeTokenRequest(context: any) {
    const code = context?.params?.code
    if (!code) throw new Error("No Code provided")

    try {
        const url = new URL(baseURL)
        url.searchParams.set("client_id", process.env.ARENA_ID)
        url.searchParams.set("client_secret", process.env.ARENA_SECRET)
        url.searchParams.set("code", code)
        url.searchParams.set("redirect_uri", context.provider.callbackUrl)
        url.searchParams.set("grant_type", "authorization_code")

        const res = await fetch(url, {
            method: "POST",
        })
        const data = await res.json()
        return {
            tokens: data,
        }
    } catch (e) {
        throw new Error(e)
    }
}

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        {
            id: "arena",
            name: "Are.na",
            type: "oauth" as const,
            authorization: {
                url: "https://dev.are.na/oauth/authorize",
                params: { scope: "write", responseType: "token" },
            },
            token: {
                url: "https://dev.are.na/oauth/token",
                async request(context) {
                    const token = await makeTokenRequest(context)
                    return token
                },
            },
            userinfo: {
                request: async () => {
                    return {}
                },
            },
            clientId: process.env.ARENA_ID,
            clientSecret: process.env.ARENA_SECRET,
            profile() {
                return { id: randomId() }
            },
        },
    ],
    session: {
        strategy: "jwt" as const,
        maxAge: 30 * 24 * 60 * 60 * 12,
    },
    callbacks: {
        jwt: async ({ token, account, profile }) => {
            if (account) {
                token.access_token = account.access_token
                token.id = profile.id
            }
            return token
        },
        session: async ({ session, token }) => {
            session.access_token = token.access_token
            return session
        },
    },
    cookies: {
        sessionToken: {
            name: `view.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: true,
            },
        },
        callbackUrl: {
            name: `view.callback-url`,
            options: {
                sameSite: "lax",
                path: "/",
                secure: true,
            },
        },
        csrfToken: {
            name: `view-host.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: true,
            },
        },
    },
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    // console.log(req, res)
    return await NextAuth(req, res, authOptions)
}
