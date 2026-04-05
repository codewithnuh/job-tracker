"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Trash01Icon,
  Loading01Icon,
  Calendar01Icon,
  MapPin01Icon,
  Link02Icon,
  Money01Icon,
  NoteIcon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { updateApplicationStatusAction } from "@/lib/api/actions/status"
import { deleteApplicationAction } from "@/lib/api/actions/applications"
import type { Application, ApplicationStatus, ActivityLog } from "@/lib/types"

const statusColors: Record<ApplicationStatus, string> = {
  APPLIED: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  SCREENING: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  INTERVIEW: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  OFFER: "bg-green-500/10 text-green-600 dark:text-green-400",
  ACCEPTED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  REJECTED: "bg-red-500/10 text-red-600 dark:text-red-400",
  WITHDRAWN: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
}

const allStatuses: ApplicationStatus[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
]

interface ApplicationDetailPageProps {
  application: Application
  activityLog: ActivityLog[]
}

function StatusUpdateForm({
  applicationId,
  currentStatus,
}: {
  applicationId: string
  currentStatus: ApplicationStatus
}) {
  const router = useRouter()
  const [state, formAction, isPending] = useFormState(
    updateApplicationStatusAction,
    { success: false, message: "" }
  )

  if (state.success && !isPending) {
    toast.success(state.message)
    router.refresh()
  } else if (!isPending && state.message && !state.success) {
    toast.error(state.message)
  }

  return (
    <form action={formAction} className="flex gap-2">
      <input type="hidden" name="id" value={applicationId} />
      <Select name="status" defaultValue={currentStatus}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {allStatuses.map((s) => (
            <SelectItem key={s} value={s}>
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? (
          <>
            <HugeiconsIcon icon={Loading01Icon} strokeWidth={2} className="animate-spin" />
            Updating...
          </>
        ) : (
          "Update Status"
        )}
      </Button>
    </form>
  )
}

export default function ApplicationDetailPage({
  application,
  activityLog,
}: ApplicationDetailPageProps) {
  const router = useRouter()
  const [isDeleting, startDeleteTransition] = useTransition()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this application?")) return

    startDeleteTransition(async () => {
      const result = await deleteApplicationAction(application.id)
      if (result.success) {
        toast.success(result.message)
        router.push("/dashboard/applications")
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/applications">
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{application.companyName}</h1>
            <p className="text-sm text-muted-foreground">{application.roleTitle}</p>
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? (
            <>
              <HugeiconsIcon icon={Loading01Icon} strokeWidth={2} className="animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <HugeiconsIcon icon={Trash01Icon} strokeWidth={2} />
              Delete
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Applied</p>
                    <p className="text-sm font-medium">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HugeiconsIcon icon={MapPin01Icon} strokeWidth={2} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">
                      {application.location || "Not specified"}
                    </p>
                  </div>
                </div>
                {application.jobUrl && (
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon icon={Link02Icon} strokeWidth={2} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Job URL</p>
                      <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary underline-offset-4 hover:underline"
                      >
                        View posting
                      </a>
                    </div>
                  </div>
                )}
                {(application.salaryMin || application.salaryMax) && (
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon icon={Money01Icon} strokeWidth={2} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Salary Range</p>
                      <p className="text-sm font-medium">
                        {application.salaryMin
                          ? `$${application.salaryMin.toLocaleString()}`
                          : "N/A"}{" "}
                        -{" "}
                        {application.salaryMax
                          ? `$${application.salaryMax.toLocaleString()}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {application.notes && (
                <>
                  <Separator className="my-4" />
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon icon={NoteIcon} strokeWidth={2} className="mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Notes</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm">
                        {application.notes}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>Update application status</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge
                variant="outline"
                className={statusColors[application.status]}
              >
                {application.status}
              </Badge>
              <Separator className="my-4" />
              <StatusUpdateForm
                applicationId={application.id}
                currentStatus={application.status}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>History of status changes</CardDescription>
        </CardHeader>
        <CardContent>
          {activityLog.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              No activity recorded yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {activityLog.map((entry, index) => (
                <div key={entry.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="size-2 rounded-full bg-primary" />
                    {index < activityLog.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2">
                      {entry.fromStatus ? (
                        <>
                          <Badge variant="outline" className="text-xs">
                            {entry.fromStatus}
                          </Badge>
                          <span className="text-muted-foreground">→</span>
                          <Badge variant="outline" className="text-xs">
                            {entry.toStatus}
                          </Badge>
                        </>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {entry.toStatus}
                        </Badge>
                      )}
                    </div>
                    {entry.note && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {entry.note}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
