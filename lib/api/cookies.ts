import { cookies } from "next/headers"

type CookieSameSite = "strict" | "lax" | "none"

interface ParsedCookieOptions {
  path?: string
  domain?: string
  maxAge?: number
  expires?: Date
  sameSite?: CookieSameSite
  httpOnly?: boolean
  secure?: boolean
}

interface ParsedCookie {
  name: string
  value: string
  options: ParsedCookieOptions
}

const DEFAULT_AUTH_COOKIE_NAMES = ["token", "refreshToken"]

export async function applySetCookieHeaders(
  setCookieHeaders: string[] | null | undefined
) {
  if (!Array.isArray(setCookieHeaders) || setCookieHeaders.length === 0) {
    return
  }

  const cookieStore = await cookies()

  for (const cookieString of setCookieHeaders) {
    const parsed = parseSetCookieString(cookieString)
    if (!parsed) {
      continue
    }

    const { name, value, options } = parsed

    cookieStore.set({
      name,
      value,
      path: options.path ?? "/",
      domain: options.domain,
      httpOnly: options.httpOnly,
      secure: options.secure,
      sameSite: options.sameSite,
      maxAge: options.maxAge,
      expires: options.expires,
    })
  }
}

export async function clearAuthCookies(names: string[] = DEFAULT_AUTH_COOKIE_NAMES) {
  const cookieStore = await cookies()
  names.forEach((name) => {
    cookieStore.delete(name)
  })
}

function parseSetCookieString(cookieString: string): ParsedCookie | null {
  const parts = cookieString.split(";").map((segment) => segment.trim())
  if (parts.length === 0) {
    return null
  }

  const [nameValue, ...attributeParts] = parts
  const separatorIndex = nameValue.indexOf("=")

  if (separatorIndex === -1) {
    return null
  }

  const name = nameValue.slice(0, separatorIndex).trim()
  const value = nameValue.slice(separatorIndex + 1)

  const options: ParsedCookieOptions = {}

  for (const attribute of attributeParts) {
    if (!attribute) {
      continue
    }

    const [rawKey, ...rawValueParts] = attribute.split("=")
    const key = rawKey.trim().toLowerCase()
    const rawValue = rawValueParts.join("=").trim()

    switch (key) {
      case "path":
        options.path = rawValue || "/"
        break
      case "domain":
        if (rawValue) {
          options.domain = rawValue
        }
        break
      case "max-age": {
        const maxAge = Number(rawValue)
        if (!Number.isNaN(maxAge)) {
          options.maxAge = maxAge
        }
        break
      }
      case "expires": {
        const expires = new Date(rawValue)
        if (!Number.isNaN(expires.getTime())) {
          options.expires = expires
        }
        break
      }
      case "samesite": {
        const normalized = rawValue.toLowerCase()
        if (normalized === "strict" || normalized === "lax" || normalized === "none") {
          options.sameSite = normalized
        }
        break
      }
      case "httponly":
        options.httpOnly = true
        break
      case "secure":
        options.secure = true
        break
      default:
        break
    }
  }

  return { name, value, options }
}
