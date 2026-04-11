"use server"

import { apiFetch } from "@/lib/api/client"
import { buildQueryString } from "@/lib/api/utils"
import {
  revalidateApplications,
  revalidateApplication,
  revalidateStats,
} from "@/lib/api/revalidate"
import type {
  Application,
  CreateApplicationInput,
  ListApplicationsFilters,
  PaginationMeta,
  ApplicationStatus,
  UpdateApplicationInput,
} from "@/lib/types/api"

export async function createApplicationAction(
  _: unknown,
  formData: FormData
): Promise<
  | { success: true; message: string; data?: Application }
  | { success: false; message: string; errors?: Record<string, string[]> }
> {
  try {
    const companyName = formData.get("companyName") as string
    const roleTitle = formData.get("roleTitle") as string

    if (!companyName || !roleTitle) {
      return {
        success: false,
        message: "Company name and role title are required",
      }
    }

    const input: CreateApplicationInput = {
      companyName,
      roleTitle,
      status: (formData.get("status") as ApplicationStatus) || undefined,
      location: (formData.get("location") as string) || undefined,
      jobUrl: (formData.get("jobUrl") as string) || undefined,
      salaryMin: formData.get("salaryMin")
        ? Number(formData.get("salaryMin"))
        : undefined,
      salaryMax: formData.get("salaryMax")
        ? Number(formData.get("salaryMax"))
        : undefined,
      notes: (formData.get("notes") as string) || undefined,
    }

    const response = await apiFetch<Application>("/v1/applications", {
      method: "POST",
      body: JSON.stringify(input),
      cache: "no-store",
    })

    revalidateApplications()
    revalidateStats()

    return {
      success: true,
      message: response.message || "Application created successfully",
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

export async function updateApplicationAction(
  _: unknown,
  formData: FormData
): Promise<
  | { success: true; message: string; data?: Application }
  | { success: false; message: string }
> {
  try {
    const id = (formData.get("id") as string | null)?.trim()
    if (!id) {
      return {
        success: false,
        message: "Application ID is missing",
      }
    }

    const payload: UpdateApplicationInput = {}

    const companyName = (formData.get("companyName") as string | null)?.trim()
    if (companyName) {
      payload.companyName = companyName
    }

    const roleTitle = (formData.get("roleTitle") as string | null)?.trim()
    if (roleTitle) {
      payload.roleTitle = roleTitle
    }

    const status = formData.get("status") as ApplicationStatus | null
    if (status) {
      payload.status = status
    }

    const location = (formData.get("location") as string | null)?.trim()
    if (location !== undefined) {
      payload.location = location.length ? location : null
    }

    const jobUrl = (formData.get("jobUrl") as string | null)?.trim()
    if (jobUrl !== undefined) {
      payload.jobUrl = jobUrl.length ? jobUrl : null
    }

    const salaryMin = (formData.get("salaryMin") as string | null)?.trim()
    if (salaryMin) {
      payload.salaryMin = Number(salaryMin)
    }

    const salaryMax = (formData.get("salaryMax") as string | null)?.trim()
    if (salaryMax) {
      payload.salaryMax = Number(salaryMax)
    }

    const notes = (formData.get("notes") as string | null)?.trim()
    if (notes !== undefined) {
      payload.notes = notes.length ? notes : null
    }

    const response = await apiFetch<Application>(`/v1/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    revalidateApplication(id)
    revalidateApplications()
    revalidateStats()

    return {
      success: true,
      message: response.message || "Application updated successfully",
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

export async function getApplicationsAction(
  filters: ListApplicationsFilters = {}
): Promise<{
  success: boolean
  data?: Application[]
  meta?: PaginationMeta
  message?: string
}> {
  try {
    const query = buildQueryString({
      status: filters.status,
      companyName: filters.companyName,
      location: filters.location,
      page: filters.page || 1,
      limit: filters.limit || 10,
    })

    const response = await apiFetch<Application[]>(`/v1/applications${query}`, {
      next: {
        revalidate: 60,
        tags: ["applications"],
      },
    })

    return {
      success: true,
      data: response.data || [],
      meta: response.meta as unknown as PaginationMeta,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        data: [],
      }
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      data: [],
    }
  }
}

export async function getApplicationAction(id: string): Promise<{
  success: boolean
  data?: Application
  message?: string
}> {
  try {
    const response = await apiFetch<Application>(`/v1/applications/${id}`, {
      next: {
        revalidate: 60,
        tags: [`application-${id}`],
      },
    })

    return {
      success: true,
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

export async function deleteApplicationAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    await apiFetch(`/v1/applications/${id}`, {
      method: "DELETE",
      cache: "no-store",
    })

    revalidateApplications()
    revalidateApplication(id)
    revalidateStats()

    return {
      success: true,
      message: "Application deleted successfully",
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
