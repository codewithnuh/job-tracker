"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/swr/fetcher"
import { SWR_KEYS } from "@/lib/swr/config"
import type {
  Application,
  ListApplicationsFilters,
  PaginationMeta,
} from "@/lib/types/api"
import { buildQueryString } from "@/lib/api/utils"

interface ApiResponse<T> {
  data: T | null
  meta: PaginationMeta | null
  message: string
  status_code: number
}

export function useApplications(filters: ListApplicationsFilters = {}) {
  const query = buildQueryString({
    status: filters.status,
    companyName: filters.companyName,
    location: filters.location,
    page: filters.page || 1,
    limit: filters.limit || 10,
  })

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Application[]>>(
    `${SWR_KEYS.applications}${query}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  )

  return {
    applications: data?.data || [],
    meta: data?.meta ?? undefined,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useApplication(id: string) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Application>>(
    id ? SWR_KEYS.application(id) : null,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  )

  return {
    application: data?.data || null,
    isLoading,
    isError: error,
    mutate,
  }
}
