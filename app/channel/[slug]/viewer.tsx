"use client"

import styles from "./viewer.module.css"
import Arena from "are.na"
import { useState, useEffect, useRef, useReducer, useMemo } from "react"
import Link from "next/link"

function shuffleArray<T extends any[]>(array): T {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

export function Viewer(props: { contents: Arena.Block[]; channel: Arena.Channel }) {
    const { contents, channel } = props

    const filteredContent = contents.filter(b => {
        if (b?.source?.url.includes("tiktok") || b?.source?.url.includes("instagram")) return false
        return !!b?.image?.thumb?.url
    })
    const shuffledContent = useMemo(() => shuffleArray<Arena.Block[]>(filteredContent), [])
    const [iterator, incrementIterator] = useReducer(index => (index >= filteredContent.length - 2 ? 0 : index + 1), 0)
    const [hovered, setHovered] = useState(false)
    const [fitImage, setFitImage] = useState(false)
    const viewMode = "TIMER"
    const interval = useRef<number>()

    function handleKeyDown(e) {
        console.log(e.key)
        if (e.keyCode === 32) {
            incrementIterator()
            setupInterval()
        }
    }

    function setupInterval() {
        if (interval.current) clearInterval(interval.current)

        function tick() {
            if (viewMode === "TIMER") incrementIterator()
        }

        interval.current = window.setInterval(tick, 4000)
    }

    useEffect(() => {
        setupInterval()

        return () => clearInterval(interval.current)
    }, [viewMode])

    const handleNextBlock = () => {
        incrementIterator()
        setupInterval()
    }

    const selectedBlock = shuffledContent[iterator]
    const nextIndex = iterator < shuffledContent.length - 1 ? iterator + 1 : 0
    const nextBlock = shuffledContent[nextIndex]

    console.log(selectedBlock)

    return (
        <div
            onKeyDown={handleKeyDown}
            tabIndex={0}
            onClick={handleNextBlock}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hovered && (
                <div className={styles["info-container"]}>
                    <Link href="/">
                        <p className={styles.info} style={{ marginTop: 8 }}>
                            ← Back
                        </p>
                    </Link>
                    <p className={styles.info}> channel: {channel.title}</p>
                    {/* {selectedBlock?.source?.url && (
                        <a target={"_blank"} href={selectedBlock.source.url}>
                            <p className={styles.info}>open source</p>
                        </a>
                    )} */}
                </div>
            )}

            {viewMode === "TIMER" && (
                <>
                    <div>
                        <img className={styles.image} src={selectedBlock.image.thumb.url} />
                    </div>
                    <div>
                        <img className={styles.background} src={selectedBlock.image.thumb.url} />
                    </div>
                    <div className={styles.image} style={{ opacity: 0 }}>
                        <img src={nextBlock.image.thumb.url} />{" "}
                    </div>
                </>
            )}
        </div>
    )
}
