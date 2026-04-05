import { cookies } from "next/headers"
import type { ErrorResponse, SuccessResponse } from "@/lib/types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001"

export class ApiError extends Error {
  status_code: number
  code: string
  details: string | Array<{ field: string; message: string }>

  constructor(
    message: string,
    status_code: number,
    code: string,
    details: string | Array<{ field: string; message: string }>
  ) {
    super(message)
    this.name = "ApiError"
    this.status_code = status_code
    this.code = code
    this.details = details
  }
}

async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("auth_token")?.value || null
}

interface FetchOptions extends RequestInit {
  revalidate?: number | false
  tags?: string[]
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

  const token = await getAuthToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(customHeaders as Record<string, string>),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
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
    headers,
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
  })

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

export function buildQueryString(
  params: Record<string, string | number | undefined | null>
): string {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value))
    }
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ""
}
