"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStats } from "@/lib/swr/hooks"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading01Icon } from "@hugeicons/core-free-icons"
import type { ApplicationStatus } from "@/lib/types"

const statusConfig: Record<
  ApplicationStatus,
  { label: string; color: string }
> = {
  APPLIED: { label: "Applied", color: "bg-blue-500" },
  SCREENING: { label: "Screening", color: "bg-yellow-500" },
  INTERVIEW: { label: "Interview", color: "bg-purple-500" },
  OFFER: { label: "Offer", color: "bg-green-500" },
  ACCEPTED: { label: "Accepted", color: "bg-emerald-500" },
  REJECTED: { label: "Rejected", color: "bg-red-500" },
  WITHDRAWN: { label: "Withdrawn", color: "bg-gray-500" },
}

export function StatsContent() {
  const { stats, isLoading } = useStats()

  const maxCount = Math.max(...Object.values(stats.byStatus), 1)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <HugeiconsIcon
          icon={Loading01Icon}
          strokeWidth={2}
          className="animate-spin text-muted-foreground"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Statistics</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your job hunt progress
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalApplications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Interview Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.totalApplications > 0
                ? Math.round(
                    ((stats.byStatus.INTERVIEW || 0) /
                      stats.totalApplications) *
                      100
                  )
                : 0}
              %
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats.byStatus.INTERVIEW || 0} interviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Offer Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.totalApplications > 0
                ? Math.round(
                    ((stats.byStatus.OFFER || 0) / stats.totalApplications) *
                      100
                  )
                : 0}
              %
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats.byStatus.OFFER || 0} offers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(stats.byStatus.APPLIED || 0) +
                (stats.byStatus.SCREENING || 0) +
                (stats.byStatus.INTERVIEW || 0)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">In pipeline</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications by Status</CardTitle>
          <CardDescription>
            Breakdown of your applications across different stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {(Object.keys(statusConfig) as ApplicationStatus[]).map(
              (status) => {
                const count = stats.byStatus[status] || 0
                const percentage =
                  stats.totalApplications > 0
                    ? Math.round((count / stats.totalApplications) * 100)
                    : 0
                const barWidth =
                  maxCount > 0 ? Math.round((count / maxCount) * 100) : 0

                return (
                  <div key={status} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-3 rounded-full ${statusConfig[status].color}`}
                        />
                        <span className="text-sm font-medium">
                          {statusConfig[status].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{count}</span>
                        <span className="text-xs text-muted-foreground">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all ${statusConfig[status].color}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Summary</CardTitle>
          <CardDescription>Key metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {Object.entries(stats.byStatus)
              .filter(([, count]) => count > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([status, count]) => (
                <div
                  key={status}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{status}</Badge>
                  </div>
                  <span className="text-lg font-semibold">{count}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
