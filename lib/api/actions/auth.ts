"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import { revalidateUser } from "@/lib/api/revalidate";
import type {
  RegisterInput,
  LoginInput,
  User,
  LoginResponse,
  MeResponse,
  SuccessResponse,
} from "@/lib/types/api";

export async function registerAction(
  _: unknown,
  formData: FormData
): Promise<
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string[]> }
> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const input: RegisterInput = { name, email, password };

    await apiFetch<User>("/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
      cache: "no-store",
    });

    return {
      success: true,
      message: "Registration successful. Please login.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function loginAction(
  _: unknown,
  formData: FormData
): Promise<
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string[]> }
> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    const input: LoginInput = { email, password };

    const response = await apiFetch<LoginResponse>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
      cache: "no-store",
    });

    if (response.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      revalidateUser();
    }

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await apiFetch<MeResponse>("/v1/auth/me", {
      next: {
        revalidate: 60 * 15,
        tags: ["user"],
      },
    });

    return response.data?.user || null;
  } catch {
    return null;
  }
}
