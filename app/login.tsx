"use client"

import { signIn } from "next-auth/react"

export default function Login() {
    function handleLogin(e) {
        e.preventDefault()
        signIn("arena", { redirect: false })
    }

    return <button onClick={handleLogin}>Login to Are.na</button>
}
