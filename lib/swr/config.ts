import { SWRConfiguration } from "swr"

export const SWR_KEYS = {
  user: "/v1/auth/me",
  applications: "/v1/applications",
  application: (id: string) => `/v1/applications/${id}`,
  applicationActivity: (id: string) =>
    `/v1/applications/${id}/activity`,
  stats: "/v1/stats",
} as const

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 5000,
  errorRetryCount: 3,
}
