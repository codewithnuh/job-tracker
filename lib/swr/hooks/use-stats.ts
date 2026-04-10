"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/swr/fetcher"
import { SWR_KEYS } from "@/lib/swr/config"
import type { StatsResponse, ApplicationStatus } from "@/lib/types/api"

interface ApiResponse<T> {
  data: T
  message: string
  status_code: number
}

const defaultByStatus: Record<ApplicationStatus, number> = {
  APPLIED: 0,
  SCREENING: 0,
  INTERVIEW: 0,
  OFFER: 0,
  ACCEPTED: 0,
  REJECTED: 0,
  WITHDRAWN: 0,
}

const defaultStats: StatsResponse = {
  totalApplications: 0,
  byStatus: defaultByStatus,
}

export function useStats() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<StatsResponse>>(
    SWR_KEYS.stats,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  )

  return {
    stats: data?.data ?? defaultStats,
    isLoading,
    isError: error,
    mutate,
  }
}
