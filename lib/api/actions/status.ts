"use server"

import { apiFetch } from "@/lib/api/client"
import {
  revalidateApplication,
  revalidateApplicationActivity,
  revalidateApplications,
  revalidateStats,
} from "@/lib/api/revalidate"
import type {
  Application,
  ApplicationStatus,
  SuccessResponse,
} from "@/lib/types/api"

export async function updateApplicationStatusAction(
  _: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string; data?: Application }> {
  try {
    const id = formData.get("id") as string
    const status = formData.get("status") as ApplicationStatus
    const note = (formData.get("note") as string) || undefined

    if (!id || !status) {
      return {
        success: false,
        message: "Application ID and status are required",
      }
    }

    const response = await apiFetch<Application>(
      `/v1/applications/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status, note }),
        cache: "no-store",
      }
    )

    revalidateApplication(id)
    revalidateApplicationActivity(id)
    revalidateApplications()
    revalidateStats()

    return {
      success: true,
      message: response.message || "Status updated successfully",
      data: response.data || undefined,
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

export async function updateStatusDirectAction(
  id: string,
  status: ApplicationStatus,
  note?: string
): Promise<{ success: boolean; message: string; data?: Application }> {
  try {
    const response = await apiFetch<Application>(
      `/v1/applications/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status, note }),
        cache: "no-store",
      }
    )

    revalidateApplication(id)
    revalidateApplicationActivity(id)
    revalidateApplications()
    revalidateStats()

    return {
      success: true,
      message: response.message || "Status updated successfully",
      data: response.data || undefined,
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
