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
