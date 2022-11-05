"use client"

import { signIn, signOut } from "next-auth/react"

export default function Login(props) {
    const { isSignedIn } = props

    function handleLogin(e) {
        e.preventDefault()
        signIn("arena", { redirect: false })
    }

    if (isSignedIn) return null

    return <button onClick={handleLogin}>Login to Are.na</button>
}
