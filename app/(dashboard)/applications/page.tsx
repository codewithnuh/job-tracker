import ApplicationsPageClient from "./applications-page-client"
import { getApplicationsAction } from "@/lib/api/actions/applications"

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
  const status = params.status as "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "ACCEPTED" | "REJECTED" | "WITHDRAWN" | undefined
  const companyName = params.companyName || params.company
  const location = params.location

  const result = await getApplicationsAction({
    status,
    companyName,
    location,
    page,
    limit: 10,
  })

  const applications = result.success ? result.data || [] : []
  const meta = result.meta || {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 10,
  }

  return (
    <ApplicationsPageClient
      applications={applications}
      totalPages={meta.totalPages}
      currentPage={meta.currentPage}
      totalItems={meta.totalItems}
    />
  )
}
