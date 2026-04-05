"use server";

import { apiFetch, buildQueryString } from "@/lib/api/client";
import {
  revalidateApplications,
  revalidateApplication,
  revalidateStats,
} from "@/lib/api/revalidate";
import type {
  Application,
  CreateApplicationInput,
  ListApplicationsFilters,
  ApplicationsListResponse,
  PaginationMeta,
} from "@/lib/types/api";

export async function createApplicationAction(
  _: unknown,
  formData: FormData
): Promise<
  | { success: true; message: string; data?: Application }
  | { success: false; message: string; errors?: Record<string, string[]> }
> {
  try {
    const companyName = formData.get("companyName") as string;
    const roleTitle = formData.get("roleTitle") as string;

    if (!companyName || !roleTitle) {
      return {
        success: false,
        message: "Company name and role title are required",
      };
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
    };

    const response = await apiFetch<Application>("/v1/applications", {
      method: "POST",
      body: JSON.stringify(input),
      cache: "no-store",
    });

    revalidateApplications();
    revalidateStats();

    return {
      success: true,
      message: response.message || "Application created successfully",
      data: response.data || undefined,
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

export async function getApplicationsAction(
  filters: ListApplicationsFilters = {}
): Promise<{
  success: boolean;
  data?: Application[];
  meta?: PaginationMeta;
  message?: string;
}> {
  try {
    const query = buildQueryString({
      status: filters.status,
      companyName: filters.companyName,
      location: filters.location,
      page: filters.page || 1,
      limit: filters.limit || 10,
    });

    const response = await apiFetch<ApplicationsListResponse>(
      `/v1/applications${query}`,
      {
        next: {
          revalidate: 60,
          tags: ["applications"],
        },
      }
    );

    return {
      success: true,
      data: response.data?.data || [],
      meta: response.data?.meta as PaginationMeta | undefined,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      data: [],
    };
  }
}

export async function getApplicationAction(
  id: string
): Promise<{
  success: boolean;
  data?: Application;
  message?: string;
}> {
  try {
    const response = await apiFetch<Application>(`/v1/applications/${id}`, {
      next: {
        revalidate: 60,
        tags: [`application-${id}`],
      },
    });

    return {
      success: true,
      data: response.data || undefined,
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

export async function deleteApplicationAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    await apiFetch(`/v1/applications/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    revalidateApplications();
    revalidateApplication(id);
    revalidateStats();

    return {
      success: true,
      message: "Application deleted successfully",
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
