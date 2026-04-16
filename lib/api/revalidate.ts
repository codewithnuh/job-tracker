import { revalidateTag, revalidatePath } from "next/cache"

export const CACHE_TAGS = {
  APPLICATIONS: "applications",
  APPLICATION: "application",
  ACTIVITY: "activity",
  STATS: "stats",
  USER: "user",
} as const

export function revalidateApplications() {
  revalidateTag(CACHE_TAGS.APPLICATIONS, "default")
  revalidatePath("/dashboard/applications")
}

export function revalidateApplication(id: string) {
  revalidateTag(`${CACHE_TAGS.APPLICATION}-${id}`, "default")
  revalidateApplicationActivity(id)
}

export function revalidateApplicationActivity(id: string) {
  revalidateTag(`${CACHE_TAGS.ACTIVITY}-${id}`, "default")
}

export function revalidateStats() {
  revalidateTag(CACHE_TAGS.STATS, "default")
  revalidatePath("/dashboard")
}

export function revalidateUser() {
  revalidateTag(CACHE_TAGS.USER, "default")
}

export function revalidateAll() {
  revalidateApplications()
  revalidateStats()
  revalidateUser()
}
