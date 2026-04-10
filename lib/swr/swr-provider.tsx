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
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 5000,
        fallback: initialData || {},
      }}
    >
      {children}
    </SWRConfig>
  )
}
