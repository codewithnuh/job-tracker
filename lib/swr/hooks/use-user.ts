import useSWR from "swr"
import { SWR_KEYS } from "@/lib/swr/config"
import { getCurrentUser } from "@/lib/api/actions/auth"

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.user,
    () => getCurrentUser(),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0,
    }
  )

  return {
    user: data || null,
    isLoading,
    isError: !!error,
    mutate,
  }
}
