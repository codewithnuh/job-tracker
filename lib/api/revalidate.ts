import { revalidateTag, revalidatePath } from "next/cache";

export const CACHE_TAGS = {
  APPLICATIONS: "applications",
  APPLICATION: "application",
  ACTIVITY: "activity",
  STATS: "stats",
  USER: "user",
} as const;

export function revalidateApplications() {
  revalidateTag(CACHE_TAGS.APPLICATIONS);
  revalidatePath("/dashboard/applications");
  revalidatePath("/dashboard");
}

export function revalidateApplication(id: string) {
  revalidateTag(`${CACHE_TAGS.APPLICATION}-${id}`);
  revalidateApplicationActivity(id);
  revalidateApplications();
}

export function revalidateApplicationActivity(id: string) {
  revalidateTag(`${CACHE_TAGS.ACTIVITY}-${id}`);
}

export function revalidateStats() {
  revalidateTag(CACHE_TAGS.STATS);
  revalidatePath("/dashboard");
}

export function revalidateUser() {
  revalidateTag(CACHE_TAGS.USER);
  revalidatePath("/dashboard");
}

export function revalidateAll() {
  revalidateApplications();
  revalidateStats();
  revalidateUser();
}
