"use client"

import type { PropsWithChildren } from "react"

export default function SmoothPageScroll({ children }: PropsWithChildren) {
    return (
        <div
            className="overflow-x-hidden overflow-y-auto h-screen scroll-smooth"
            dir="ltr"
            style={{ overscrollBehavior: "contain" }}
        >
            {children}
        </div>
    )
}
