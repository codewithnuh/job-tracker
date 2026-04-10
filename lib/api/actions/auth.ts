"use server"

import { apiFetch } from "@/lib/api/client"
import { revalidateUser } from "@/lib/api/revalidate"
import { applySetCookieHeaders, clearAuthCookies } from "@/lib/api/cookies"
import type { RegisterInput, User, MeResponse } from "@/lib/types/api"
import { API_BASE_URL } from "@/lib/config/api"

export async function loginAction(_: unknown, formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        message: errorData?.message || "Invalid credentials",
      }
    }

    await applySetCookieHeaders(response.headers.getSetCookie())
    revalidateUser()

    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error("Login Error:", error)
    return { success: false, message: "Something went wrong" }
  }
}

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
      return { success: false, message: "All fields are required" }
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    }
  }
}

export async function logoutAction() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/logout`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    })

    if (response.ok) {
      await applySetCookieHeaders(response.headers.getSetCookie())
    } else {
      await clearAuthCookies()
    }
  } catch (error) {
    console.error("Logout Error:", error)
    await clearAuthCookies()
  } finally {
    revalidateUser()
  }

  return { success: true, message: "Logged out" }
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
  } catch (error) {
    return null
  }
}
