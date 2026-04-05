"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { apiFetch } from "@/lib/api/client"
import { revalidateUser } from "@/lib/api/revalidate"
import type {
  RegisterInput,
  LoginInput,
  User,
  LoginResponse,
  MeResponse,
} from "@/lib/types/api"

const API_BASE_URL = "http://localhost:3000"

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
      // No need for credentials: 'include' here; this is server-to-server
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        message: errorData?.message || "Invalid credentials",
      }
    }

    // 1. Get cookies from the Fastify response
    const setCookieHeader = response.headers.getSetCookie()
    const cookieStore = await cookies()

    // 2. Manually proxy them to the browser
    if (setCookieHeader) {
      setCookieHeader.forEach((cookieString) => {
        // Simple parsing logic or use a library like 'cookie'
        const [nameValue] = cookieString.split(";")
        const [name, value] = nameValue.split("=")

        cookieStore.set(name.trim(), value.trim(), {
          httpOnly: true,
          path: "/",
          // CRITICAL: Disable 'secure' on localhost or it won't save
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })
      })
    }

    revalidateUser()
  } catch (error) {
    // Handle specific errors
    return { success: false, message: "Something went wrong" }
  }

  // 3. Redirect MUST be called outside the try/catch block
  redirect("/dashboard")
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  redirect("/login")
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
