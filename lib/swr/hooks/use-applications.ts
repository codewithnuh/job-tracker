import useSWR from "swr"
import { SWR_KEYS } from "@/lib/swr/config"
import {
  getApplicationsAction,
  getApplicationAction,
} from "@/lib/api/actions/applications"
import { getActivityLogAction } from "@/lib/api/actions/activity"
import type { ListApplicationsFilters } from "@/lib/types/api"

export function useApplications(filters: ListApplicationsFilters = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    [SWR_KEYS.applications, JSON.stringify(filters)],
    () => getApplicationsAction(filters),
    {
      revalidateOnFocus: true,
    }
  )

  return {
    applications: data?.data || [],
    meta: data?.meta,
    isLoading,
    isError: !!error || data?.success === false,
    mutate,
  }
}

export function useApplication(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? SWR_KEYS.application(id) : null,
    () => getApplicationAction(id),
    {
      revalidateOnFocus: true,
    }
  )

  return {
    application: data?.data || null,
    isLoading,
    isError: !!error || data?.success === false,
    mutate,
  }
}

export function useApplicationActivity(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? SWR_KEYS.applicationActivity(id) : null,
    () => getActivityLogAction(id),
    {
      revalidateOnFocus: true,
    }
  )

  return {
    activity: data?.data || [],
    isLoading,
    isError: !!error || data?.success === false,
    mutate,
  }
}
