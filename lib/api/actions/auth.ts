"use server"

import { apiFetch } from "@/lib/api/client"
import { revalidateUser } from "@/lib/api/revalidate"
import type { RegisterInput, User, MeResponse } from "@/lib/types/api"
import { cookies } from "next/headers"
import { parse } from "set-cookie-parser"
const API_BASE_URL = "http://localhost:3001"

export async function registerAction(
  _: unknown,
  formData: FormData
): Promise<
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string[]> }
> {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    const input: RegisterInput = { name, email, password }

    await apiFetch<User>("/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
      cache: "no-store",
    })

    return {
      success: true,
      message: "Registration successful. Please login.",
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      }
    }
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}

export async function loginAction(_: unknown, formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        message: errorData?.message || "Invalid credentials",
      }
    }
    const cookieStore = await cookies()
    const setCookieHeader = response.headers.getSetCookie()
    const parsedCookies = parse(setCookieHeader)
    for (const cookie of parsedCookies) {
      await cookieStore.set({
        name: cookie.name,
        value: cookie.value,
        path: cookie.path || "/",

        sameSite: (cookie.sameSite as any) || "strict",
        expires: cookie.maxAge,
      })
    }
    const cookiesData: Record<string, string> = {}

    setCookieHeader.forEach((cookieString) => {
      const [nameValue] = cookieString.split(";")
      const [name, value] = nameValue.split("=")
      cookiesData[name.trim()] = value.trim()
    })

    revalidateUser()

    return {
      success: true,
      message: "Login successful",
      cookies: cookiesData,
    }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Something went wrong" }
  }
}

export async function logoutAction() {
  revalidateUser()
  return { success: true }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await apiFetch<MeResponse>("/v1/auth/me", {
      next: {
        revalidate: 60 * 15,
        tags: ["user"],
      },
    })

    return response.data?.user || null
  } catch {
    return null
  }
}
