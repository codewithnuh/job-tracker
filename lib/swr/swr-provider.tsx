"use client"

import { SWRConfig } from "swr"
import { ReactNode } from "react"

interface SWRProviderProps {
  children: ReactNode
  initialData?: Record<string, unknown>
}

export function SWRProvider({ children, initialData }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 10000,
        fallback: initialData || {},
      }}
    >
      {children}
    </SWRConfig>
  )
}
