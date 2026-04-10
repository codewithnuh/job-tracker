const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001"

function buildFetchUrl(url: string) {
  if (typeof window === "undefined") {
    return `${API_BASE_URL}${url}`
  }

  const basePath = "/api"
  return `${basePath}${url}`
}

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(buildFetchUrl(url), {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP error ${res.status}`)
  }

  return res.json()
}

export async function fetcherWithOptions<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(buildFetchUrl(url), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    credentials: "include",
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP error ${res.status}`)
  }

  return res.json()
}
