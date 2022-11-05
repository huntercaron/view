import "server-only"
import { Suspense } from "react"
import Login from "./login"
import Channel from "./channel"
import { getAccessToken } from "../lib/getAccessToken"
import { cookies, headers } from "next/headers"

export default async function Page() {
    const token = await getAccessToken(cookies(), headers())

    return (
        <div>
            Hello, hello!
            <br />
            <br />
            <Login isSignedIn={!!token} />
            {/* @ts-ignore */}
            <Channel />
        </div>
    )
}
