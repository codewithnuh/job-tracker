import { notFound } from "next/navigation"
import { getApplicationAction } from "@/lib/api/actions/applications"
import { getActivityLogAction } from "@/lib/api/actions/activity"
import ApplicationDetailClient from "./application-detail-client"

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params
  const [appResult, activityResult] = await Promise.all([
    getApplicationAction(id),
    getActivityLogAction(id),
  ])

  if (!appResult.success || !appResult.data) {
    notFound()
  }

  return (
    <ApplicationDetailClient
      application={appResult.data}
      activityLog={activityResult.data || []}
    />
  )
}
