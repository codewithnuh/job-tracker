"use server"

import { headers } from "next/headers"
import { cookies } from "next/headers"
import type { ErrorResponse, SuccessResponse } from "@/lib/types/api"
import { ApiError } from "./utils"
import { applySetCookieHeaders } from "./cookies"
import { API_BASE_URL } from "@/lib/config/api"

async function getRequestCookies(): Promise<string | null> {
  const requestHeaders = await headers()
  return requestHeaders.get("cookie")
}

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies()
  return cookieStore.toString()
}

interface FetchOptions extends RequestInit {
  revalidate?: number | false
  tags?: string[]
}

async function refreshTokens(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })

    if (response.ok) {
      await applySetCookieHeaders(response.headers.getSetCookie())
      const newCookieHeader = response.headers
        .getSetCookie()
        .map((c) => c.split(";")[0])
        .join("; ")
      return newCookieHeader
    }
  } catch (error) {
    console.error("Token refresh failed:", error)
  }
  return null
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<SuccessResponse<T>> {
  const {
    revalidate = 0,
    tags = [],
    headers: customHeaders,
    body,
    method,
    ...restOptions
  } = options

  const cookieHeader = await getRequestCookies()

  const headersObj: HeadersInit = {
    ...(customHeaders as Record<string, string>),
  }

  if (body) {
    headersObj["Content-Type"] = "application/json"
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
    method,
    body,
    headers: headersObj,
    credentials: "include",
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
  })

  if (response.status === 401) {
    const newCookies = await refreshTokens()
    if (newCookies) {
      const retryResponse = await fetch(url, {
        ...restOptions,
        method,
        body,
        headers: {
          ...headersObj,
          Cookie: newCookies,
        },
        credentials: "include",
      })

      if (retryResponse.ok) {
        const retryData = await retryResponse.json()
        return retryData as SuccessResponse<T>
      }

      if (retryResponse.status === 401) {
        throw new ApiError(
          "Session expired. Please login again.",
          401,
          "SESSION_EXPIRED",
          "Please login again"
        )
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
