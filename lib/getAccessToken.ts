import "server-only"
import { getSession } from "./getSession"

export const getAccessToken = async (cookies, headers) => {
    const env = process.env.NODE_ENV
    let token

    if (env === "development") {
        token = process.env.ARENA_PERSONAL
    } else {
        try {
            const session = await getSession(cookies, headers)
            token = session.body["access_token"]
        } catch (e) {
            console.error(e)
            return Promise.reject(e.message)
        }
    }

    return token
}
