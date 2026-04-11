"use client"

import React from "react"

export function BackgroundBeams() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute top-0 left-0 h-full w-2/5 bg-gradient-to-r from-transparent via-purple-100 to-transparent opacity-40" />
      <div className="absolute top-0 right-0 h-full w-2/5 bg-gradient-to-l from-transparent via-pink-100 to-transparent opacity-40" />
    </div>
  )
}
