const FALLBACK_API_URL = "http://localhost:3001"

function normalize(value?: string) {
  const trimmed = value?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : undefined
}

export const API_BASE_URL =
  normalize(process.env.API_URL) ??
  normalize(process.env.NEXT_PUBLIC_API_URL) ??
  FALLBACK_API_URL
