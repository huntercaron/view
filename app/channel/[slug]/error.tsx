"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <p>{error.message}</p>
            <p>
                Otherwise, <Link href="/">Go back home?</Link>
            </p>
            <button onClick={() => reset()}>Try Again</button>
        </div>
    )
}
