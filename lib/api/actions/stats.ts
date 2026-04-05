"use server";

import { apiFetch } from "@/lib/api/client";
import type { StatsResponse, ApplicationStatus } from "@/lib/types/api";

export async function getStatsAction(): Promise<{
  success: boolean;
  data?: {
    totalApplications: number;
    byStatus: Partial<Record<ApplicationStatus, number>>;
  };
  message?: string;
}> {
  try {
    const response = await apiFetch<StatsResponse>("/v1/stats", {
      next: {
        revalidate: 60,
        tags: ["stats"],
      },
    });

    return {
      success: true,
      data: response.data || { totalApplications: 0, byStatus: {} },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        data: { totalApplications: 0, byStatus: {} },
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      data: { totalApplications: 0, byStatus: {} },
    };
  }
}
