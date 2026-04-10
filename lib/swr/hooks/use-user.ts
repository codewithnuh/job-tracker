"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/swr/fetcher"
import { SWR_KEYS } from "@/lib/swr/config"
import type { User } from "@/lib/types/api"

interface MeResponse {
  data?: {
    user?: User
  }
  message: string
  status_code: number
}

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<MeResponse>(
    SWR_KEYS.user,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )
  console.log({ data })
  return {
    user: data?.data?.user || null,
    isLoading,
    isError: error,
    mutate,
  }
}
