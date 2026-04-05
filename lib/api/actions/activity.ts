"use server";

import { apiFetch } from "@/lib/api/client";
import type { ActivityLog } from "@/lib/types/api";

export async function getActivityLogAction(
  id: string
): Promise<{
  success: boolean;
  data?: ActivityLog[];
  message?: string;
}> {
  try {
    const response = await apiFetch<ActivityLog[]>(
      `/v1/applications/${id}/activity`,
      {
        next: {
          revalidate: 30,
          tags: [`activity-${id}`],
        },
      }
    );

    return {
      success: true,
      data: response.data || [],
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
