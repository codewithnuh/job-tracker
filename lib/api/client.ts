"use server"

import { headers } from "next/headers"
import type { ErrorResponse, SuccessResponse } from "@/lib/types/api"
import { ApiError } from "./utils"
import { applySetCookieHeaders } from "./cookies"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://job-tracker-api-8yjw.onrender.com"

async function getRequestCookies(): Promise<string | null> {
  const requestHeaders = await headers()
  return requestHeaders.get("cookie")
}

interface FetchOptions extends RequestInit {
  revalidate?: number | false
  tags?: string[]
}

async function refreshTokens(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })

    if (response.ok) {
      await applySetCookieHeaders(response.headers.getSetCookie())
      return true
    }
  } catch {
    // Refresh failed
  }
  return false
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<SuccessResponse<T>> {
  const {
    revalidate = 0,
    tags = [],
    headers: customHeaders,
    ...restOptions
  } = options

  const cookieHeader = await getRequestCookies()

  const headersObj: HeadersInit = {
    "Content-Type": "application/json",
    ...(customHeaders as Record<string, string>),
  }

  if (cookieHeader) {
    headersObj["Cookie"] = cookieHeader
  }

  const url = `${API_BASE_URL}${path}`

  const nextOptions: { revalidate?: number; tags?: string[] } = {}
  if (revalidate !== undefined) {
    nextOptions.revalidate = revalidate === false ? undefined : revalidate
  }
  if (tags.length > 0) {
    nextOptions.tags = tags
  }

  const response = await fetch(url, {
    ...restOptions,
    headers: headersObj,
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
  })

  if (response.status === 401) {
    const refreshed = await refreshTokens()
    if (refreshed) {
      const newCookieHeader = await getRequestCookies()
      if (newCookieHeader) {
        headersObj["Cookie"] = newCookieHeader
      }
      const retryResponse = await fetch(url, {
        ...restOptions,
        headers: headersObj,
      })

      if (retryResponse.ok) {
        const retryData = await retryResponse.json()
        return retryData as SuccessResponse<T>
      }
    }
  }

  const data = await response.json()

  if (!response.ok) {
    const errorData = data as ErrorResponse
    throw new ApiError(
      errorData.message || "An unexpected error occurred",
      errorData.status_code || response.status,
      errorData.error?.code || "UNKNOWN_ERROR",
      errorData.error?.details || "No details available"
    )
  }

  return data as SuccessResponse<T>
}
