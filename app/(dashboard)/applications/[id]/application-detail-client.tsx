"use client"

import { useEffect, useState, useTransition, useActionState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Trash2,
  Loading01Icon,
  Calendar01Icon,
  MapPinIcon,
  Link02Icon,
  Money01Icon,
  Edit01Icon,
  More01Icon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import {
  deleteApplicationAction,
  updateApplicationAction,
} from "@/lib/api/actions/applications"
import { updateStatusDirectAction } from "@/lib/api/actions/status"
import { useApplication, useApplicationActivity } from "@/lib/swr/hooks"
import type { Application, ApplicationStatus } from "@/lib/types"

const statusColors: Record<ApplicationStatus, string> = {
  APPLIED: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  SCREENING:
    "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  INTERVIEW:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  OFFER:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  ACCEPTED:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  REJECTED: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  WITHDRAWN:
    "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
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

const formatStatusLabel = (status: ApplicationStatus) =>
  status.charAt(0) + status.slice(1).toLowerCase()

interface ApplicationDetailPageProps {
  applicationId: string
}

function StatusUpdateForm({
  applicationId,
  currentStatus,
  onSuccess,
  compact = false,
}: {
  applicationId: string
  currentStatus: ApplicationStatus
  onSuccess?: () => void
  compact?: boolean
}) {
  const [state, formAction, isPending] = useActionState(
    async (prev: { success: boolean; message: string }, formData: FormData) => {
      const result = await updateStatusDirectAction(
        formData.get("id") as string,
        formData.get("status") as ApplicationStatus
      )
      return result
    },
    { success: false, message: "" }
  )
  const { success, message } = state
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus>(currentStatus)
  const [note, setNote] = useState("")

  useEffect(() => {
    if (!message || isPending) return
    if (success) {
      toast.success(message)
      onSuccess?.()
      setNote("")
    } else {
      toast.error(message)
    }
  }, [success, message, isPending, onSuccess])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set("id", applicationId)
    formAction(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-3" : "space-y-4"}
    >
      <div className="flex items-end gap-3">
        <Field className="flex-1">
          <Select
            name="status"
            value={selectedStatus}
            onValueChange={(v: ApplicationStatus) => setSelectedStatus(v)}
          >
            <SelectTrigger className={compact ? "h-9" : "w-full"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {formatStatusLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Button
          type="submit"
          size={compact ? "sm" : "default"}
          disabled={isPending || selectedStatus === currentStatus}
        >
          {isPending ? (
            <HugeiconsIcon
              icon={Loading01Icon}
              strokeWidth={2}
              className="animate-spin"
            />
          ) : (
            "Update"
          )}
        </Button>
      </div>
      <Textarea
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional)"
        rows={2}
        className="resize-none text-sm"
      />
    </form>
  )
}

function EditApplicationDialog({
  application,
  onSuccess,
}: {
  application: Application
  onSuccess: () => void
}) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(
    updateApplicationAction,
    {
      success: false,
      message: "",
    }
  )
  const { success, message } = state

  useEffect(() => {
    if (!message || isPending) return
    if (success) {
      toast.success(message)
      onSuccess()
      setOpen(false)
    } else {
      toast.error(message)
    }
  }, [success, message, isPending, onSuccess])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update the details for {application.companyName}
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
          <input type="hidden" name="id" value={application.id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="companyName">Company</FieldLabel>
              <Input
                id="companyName"
                name="companyName"
                defaultValue={application.companyName}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="roleTitle">Role</FieldLabel>
              <Input
                id="roleTitle"
                name="roleTitle"
                defaultValue={application.roleTitle}
                required
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              name="location"
              defaultValue={application.location ?? ""}
              placeholder="Remote, Chicago, etc."
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="jobUrl">Job URL</FieldLabel>
            <Input
              id="jobUrl"
              name="jobUrl"
              type="url"
              defaultValue={application.jobUrl ?? ""}
              placeholder="https://..."
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="salaryMin">Min Salary</FieldLabel>
              <Input
                id="salaryMin"
                name="salaryMin"
                type="number"
                min={0}
                defaultValue={application.salaryMin ?? ""}
                placeholder="0"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="salaryMax">Max Salary</FieldLabel>
              <Input
                id="salaryMax"
                name="salaryMax"
                type="number"
                min={0}
                defaultValue={application.salaryMax ?? ""}
                placeholder="0"
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea
              id="notes"
              name="notes"
              rows={3}
              defaultValue={application.notes ?? ""}
              placeholder="Interview prep, recruiter feedback..."
            />
          </Field>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <HugeiconsIcon
                    icon={Loading01Icon}
                    strokeWidth={2}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteDialog({
  applicationId,
  companyName,
}: {
  applicationId: string
  companyName: string
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleting, startDeleteTransition] = useTransition()

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteApplicationAction(applicationId)
      if (result.success) {
        setOpen(false)
        toast.success(result.message)
        router.push("/applications")
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
        >
          <HugeiconsIcon icon={Trash2} strokeWidth={2} />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Application?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the application for {companyName}?
            This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <HugeiconsIcon
                  icon={Loading01Icon}
                  strokeWidth={2}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ApplicationSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="size-10" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-48" />
          <Skeleton className="h-64" />
        </div>
      </div>
    </div>
  )
}

function ActivityTimeline({
  activity,
  isLoading,
}: {
  activity: ReturnType<typeof useApplicationActivity>["activity"]
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1 space-y-2 pt-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (activity.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-muted p-3">
          <HugeiconsIcon
            icon={More01Icon}
            strokeWidth={2}
            className="size-5 text-muted-foreground"
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          No status changes yet
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute top-2 bottom-2 left-4 w-px bg-border" />
      <div className="space-y-4">
        {activity.map((entry, index) => (
          <div key={entry.id} className="relative flex gap-4 pl-1">
            <div
              className={`relative z-10 flex size-8 items-center justify-center rounded-full border ${
                index === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background"
              }`}
            >
              {index === 0 ? (
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
              ) : (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  strokeWidth={2}
                  className="size-4 text-muted-foreground"
                />
              )}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">
                  {entry.fromStatus
                    ? `${formatStatusLabel(entry.fromStatus)} → ${formatStatusLabel(entry.toStatus)}`
                    : `Started as ${formatStatusLabel(entry.toStatus)}`}
                </span>
                <Badge
                  variant="outline"
                  className={`px-1.5 py-0 text-[10px] ${statusColors[entry.toStatus]}`}
                >
                  {entry.toStatus}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {new Date(entry.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              {entry.note && (
                <p className="mt-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                  {entry.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ApplicationDetailPage({
  applicationId,
}: ApplicationDetailPageProps) {
  const { application, isLoading, mutate } = useApplication(applicationId)
  const { activity, isLoading: logsLoading } =
    useApplicationActivity(applicationId)

  if (isLoading) {
    return <ApplicationSkeleton />
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Application not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/applications">
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            </Link>
          </Button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="truncate text-2xl font-semibold">
                {application.companyName}
              </h1>
              <Badge
                variant="outline"
                className={statusColors[application.status]}
              >
                {formatStatusLabel(application.status)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {application.roleTitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 pl-14 sm:pl-0">
          <EditApplicationDialog application={application} onSuccess={mutate} />
          <DeleteDialog
            applicationId={application.id}
            companyName={application.companyName}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-sm font-medium text-muted-foreground">
                Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-background">
                    <HugeiconsIcon
                      icon={Calendar01Icon}
                      strokeWidth={2}
                      className="text-muted-foreground"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Applied</p>
                    <p className="text-sm font-medium">
                      {new Date(application.appliedAt).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                {application.location && (
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-background">
                      <HugeiconsIcon
                        icon={MapPinIcon}
                        strokeWidth={2}
                        className="text-muted-foreground"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">
                        {application.location}
                      </p>
                    </div>
                  </div>
                )}
                {application.jobUrl && (
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-background">
                      <HugeiconsIcon
                        icon={Link02Icon}
                        strokeWidth={2}
                        className="text-muted-foreground"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Job URL</p>
                      <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View posting
                      </a>
                    </div>
                  </div>
                )}
                {(application.salaryMin || application.salaryMax) && (
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-background">
                      <HugeiconsIcon
                        icon={Money01Icon}
                        strokeWidth={2}
                        className="text-muted-foreground"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Salary</p>
                      <p className="text-sm font-medium">
                        {application.salaryMin
                          ? `$${application.salaryMin.toLocaleString()}`
                          : "—"}{" "}
                        -{" "}
                        {application.salaryMax
                          ? `$${application.salaryMax.toLocaleString()}`
                          : "—"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {application.notes && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="mb-2 text-xs font-medium text-muted-foreground">
                    Notes
                  </h3>
                  <p className="text-sm whitespace-pre-wrap">
                    {application.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-sm font-medium text-muted-foreground">
                Update Status
              </h2>
              <StatusUpdateForm
                applicationId={application.id}
                currentStatus={application.status}
                onSuccess={mutate}
                compact
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-sm font-medium text-muted-foreground">
                Activity
              </h2>
              <ActivityTimeline activity={activity} isLoading={logsLoading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
