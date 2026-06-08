"use client"

import { useEffect, useRef, type PropsWithChildren } from "react"

export default function SmoothPageScroll({ children }: PropsWithChildren) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isScrollingRef = useRef(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const sections = Array.from(container.querySelectorAll<HTMLElement>(".scroll-section"))
        if (sections.length === 0) return

        const scrollToSection = (section: HTMLElement) => {
            isScrollingRef.current = true
            section.scrollIntoView({ behavior: "smooth", block: "start" })
            window.setTimeout(() => {
                isScrollingRef.current = false
            }, 800)
        }

        const handleWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) < 10) {
                return
            }

            event.preventDefault()
            if (isScrollingRef.current) {
                return
            }

            const currentScroll = container.scrollTop
            const direction = event.deltaY > 0 ? 1 : -1
            let nextSection: HTMLElement | undefined

            if (direction > 0) {
                nextSection = sections.find((section) => section.offsetTop > currentScroll + 10)
            } else {
                nextSection = [...sections]
                    .reverse()
                    .find((section) => section.offsetTop < currentScroll - 10)
            }

            if (nextSection) {
                scrollToSection(nextSection)
            }
        }

        container.addEventListener("wheel", handleWheel, { passive: false })
        return () => {
            container.removeEventListener("wheel", handleWheel)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="overflow-x-hidden overflow-y-auto h-screen scroll-smooth"
            dir="ltr"
            style={{ overscrollBehavior: "contain" }}
        >
            {children}
        </div>
    )
}
