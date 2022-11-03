"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
    function handleLogin() {
        const url = new URL("http://dev.are.na/oauth/authorize")

        url.searchParams.set("client_id", "jmEpZLGfNXA566QNOS8zAm6gO9XB_K28oF6gohIEbZQ")
        url.searchParams.set("redirect_uri", "https://localhost:3000/api/auth/callback")
        url.searchParams.set("response_type", "code")

        window.open(url)
    }

    return (
        <div>
            <button onClick={() => signIn()}>Login to Are.na</button>
        </div>
    )
}
