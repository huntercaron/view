import { cookies, headers } from "next/headers"
import { getAccessToken } from "../lib/getAccessToken"
import "./global.css"
import Login from "./login"

export default async function RootLayout({ children }) {
    const token = await getAccessToken(cookies(), headers())

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                {!token && <Login />}
                <>{children}</>
            </body>
        </html>
    )
}
