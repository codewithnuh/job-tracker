import type { Metadata } from "next"
import ApplicationsPageClient from "./applications-page-client"
import type { ApplicationStatus } from "@/lib/types"

export const metadata: Metadata = {
  title: "Applications",
  description: "View and filter your job applications.",
}

interface ApplicationsPageProps {
  searchParams: Promise<{
    status?: string
    companyName?: string
    company?: string
    location?: string
    page?: string
  }>
}

export default async function ApplicationsPage({
  searchParams,
}: ApplicationsPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const status = params.status as ApplicationStatus | undefined
  const companyName = params.companyName || params.company
  const location = params.location

  return (
    <ApplicationsPageClient
      initialFilters={{
        status,
        companyName,
        location,
        page,
        limit: 10,
      }}
    />
  )
}
