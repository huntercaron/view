import { cookies, headers } from "next/headers"
import { getAccessToken } from "../lib/getAccessToken"
import "./global.css"
import Login from "./login"

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
                <>{children}</>
            </body>
        </html>
    )
}
