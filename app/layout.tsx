import { cookies, headers } from "next/headers"
import { getAccessToken } from "../lib/getAccessToken"
import { getUserId } from "../lib/getUserId"
import "./global.css"
import Login from "./login"

async function Profile() {
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

export default async function RootLayout({ children }) {
    const token = await getAccessToken(cookies(), headers())

    const isLoggedIn = !!token

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                {!isLoggedIn && <Login />}
                {/* @ts-ignore */}
                {isLoggedIn && <Profile />}
                <>{children}</>
            </body>
        </html>
    )
}
