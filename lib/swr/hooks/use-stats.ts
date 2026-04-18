import useSWR from "swr"
import { SWR_KEYS } from "@/lib/swr/config"
import { getStatsAction } from "@/lib/api/actions/stats"
import type { StatsResponse, ApplicationStatus } from "@/lib/types/api"

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
  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.stats,
    () => getStatsAction()
  )

  return {
    stats: (data?.data as StatsResponse) ?? defaultStats,
    isLoading,
    isError: !!error || data?.success === false,
    mutate,
  }
}
