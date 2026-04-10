import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getStatsAction } from "@/lib/api/actions/stats"
import { getApplicationsAction } from "@/lib/api/actions/applications"
import { getCurrentUser } from "@/lib/api/actions/auth"
import type { ApplicationStatus } from "@/lib/types"

const statusColors: Record<ApplicationStatus, string> = {
  APPLIED: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  SCREENING: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  INTERVIEW: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  OFFER: "bg-green-500/10 text-green-600 dark:text-green-400",
  ACCEPTED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  REJECTED: "bg-red-500/10 text-red-600 dark:text-red-400",
  WITHDRAWN: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
}

function StatCard({
  title,
  value,
  loading,
}: {
  title: string
  value: number
  loading: boolean
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  )
}

export default async function DashboardPage() {
  const [user, statsResult, appsResult] = await Promise.all([
    getCurrentUser(),
    getStatsAction(),
    getApplicationsAction({ page: 1, limit: 5 }),
  ])

  const stats =
    statsResult.success && statsResult.data
      ? statsResult.data
      : { totalApplications: 0, byStatus: {} }
  const recentApps = appsResult.success ? appsResult.data || [] : []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s an overview of your job applications
          </p>
        </div>
        <Button asChild>
          <Link href="/applications/add">
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            Add Application
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          loading={false}
        />
        {(["APPLIED", "INTERVIEW", "OFFER"] as ApplicationStatus[]).map(
          (status) => (
            <StatCard
              key={status}
              title={status.charAt(0) + status.slice(1).toLowerCase()}
              value={stats.byStatus[status] || 0}
              loading={false}
            />
          )
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/applications">View all</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No applications yet. Add your first one to get started.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/applications/add">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                  Add Application
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/dashboard/applications/${app.id}`}
                        className="hover:underline"
                      >
                        {app.companyName}
                      </Link>
                    </TableCell>
                    <TableCell>{app.roleTitle}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {app.location || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusColors[app.status]}
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
