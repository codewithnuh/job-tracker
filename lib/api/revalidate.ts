import { revalidateTag, revalidatePath } from "next/cache"

export const CACHE_TAGS = {
  APPLICATIONS: "applications",
  APPLICATION: "application",
  ACTIVITY: "activity",
  STATS: "stats",
  USER: "user",
} as const

const cacheProfile = "default"

export function revalidateApplications() {
  revalidateTag(CACHE_TAGS.APPLICATIONS, cacheProfile)
  revalidatePath("/applications")
  revalidatePath("/")
}

export function revalidateApplication(id: string) {
  revalidateTag(`${CACHE_TAGS.APPLICATION}-${id}`, cacheProfile)
  revalidateApplicationActivity(id)
  revalidateApplications()
}

export function revalidateApplicationActivity(id: string) {
  revalidateTag(`${CACHE_TAGS.ACTIVITY}-${id}`, cacheProfile)
}

export function revalidateStats() {
  revalidateTag(CACHE_TAGS.STATS, cacheProfile)
  revalidatePath("/")
}

export function revalidateUser() {
  revalidateTag(CACHE_TAGS.USER, cacheProfile)
  revalidatePath("/")
}

export function revalidateAll() {
  revalidateApplications()
  revalidateStats()
  revalidateUser()
}
