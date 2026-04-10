import ApplicationDetailClient from "./application-detail-client"

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params

  return <ApplicationDetailClient applicationId={id} />
}
