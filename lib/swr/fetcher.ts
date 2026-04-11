import { API_BASE_URL } from "@/lib/config/api"

function buildFetchUrl(url: string) {
  return `${API_BASE_URL}${url}`
}

async function applySetCookieHeaders(setCookieHeaders: string[]) {
  if (typeof document === "undefined") return

  for (const cookie of setCookieHeaders) {
    const parts = cookie.split(";")
    const nameValue = parts[0]
    const [name, value] = nameValue.split("=")
    const cookieOptions = parts.slice(1).map((p) => p.trim())

    const cookieString = `${name}=${value}`
    let expires: Date | undefined
    let path: string | undefined
    let secure = false
    let sameSite: string | undefined

    for (const opt of cookieOptions) {
      if (opt.toLowerCase().startsWith("expires=")) {
        expires = new Date(opt.substring(8))
      } else if (opt.toLowerCase().startsWith("path=")) {
        path = opt.substring(5)
      } else if (opt.toLowerCase() === "secure") {
        secure = true
      } else if (opt.toLowerCase().startsWith("samesite=")) {
        sameSite = opt.substring(9)
      }
    }

    const cookieConfig: {
      path?: string
      expires?: Date
      secure?: boolean
      sameSite?: string
    } = {}

    if (path) cookieConfig.path = path
    if (expires) cookieConfig.expires = expires
    if (secure) cookieConfig.secure = true
    if (sameSite) cookieConfig.sameSite = sameSite as "Strict" | "Lax" | "None"

    document.cookie =
      Object.keys(cookieConfig).length > 0
        ? `${name}=${value}; ${Object.entries(cookieConfig)
            .map(([k, v]) => `${k}=${v}`)
            .join("; ")}`
        : cookieString
  }
}

async function refreshTokens(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })

    if (response.ok) {
      const setCookieHeaders = response.headers.getSetCookie()
      await applySetCookieHeaders(setCookieHeaders)
      return true
    }
    return false
  } catch (error) {
    console.error("Token refresh failed:", error)
    return false
  }
}

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(buildFetchUrl(url), {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (res.status === 401) {
    const refreshed = await refreshTokens()
    if (refreshed) {
      const retryRes = await fetch(buildFetchUrl(url), {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (retryRes.ok) {
        return retryRes.json()
      }
    }
    throw new Error("Session expired. Please login again.")
  }

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

  if (res.status === 401) {
    const refreshed = await refreshTokens()
    if (refreshed) {
      const retryRes = await fetch(buildFetchUrl(url), {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        credentials: "include",
      })
      if (retryRes.ok) {
        return retryRes.json()
      }
    }
    throw new Error("Session expired. Please login again.")
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP error ${res.status}`)
  }

  return res.json()
}
