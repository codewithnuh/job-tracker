"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignIcon,
  Search01Icon,
  Loading01Icon,
  Trash2,
  Edit01Icon,
  ExternalLink,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteApplicationAction } from "@/lib/api/actions/applications"
import { useApplications } from "@/lib/swr/hooks"
import type { ApplicationStatus, ListApplicationsFilters } from "@/lib/types"

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

export default function ApplicationsPageClient({
  initialFilters,
}: {
  initialFilters: ListApplicationsFilters
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)

  const [filters, setFilters] = useState<ListApplicationsFilters>({
    ...initialFilters,
  })
  const { applications, meta, isLoading, mutate } = useApplications(filters)

  const totalPages = meta?.totalPages || 1
  const currentPage = meta?.currentPage || 1
  const totalItems = applications.length || 0

  function handleFilterChange(
    key: keyof ListApplicationsFilters,
    value: string
  ) {
    setFilters((prev) => ({ ...prev, [key]: value || undefined, page: 1 }))
  }

  function handlePageChange(page: number) {
    setFilters((prev) => ({ ...prev, page }))
  }

  function initiateDelete(id: string) {
    setIdToDelete(id)
    setIsDialogOpen(true)
  }

  async function confirmDelete() {
    if (!idToDelete) return

    const id = idToDelete
    console.log(id)
    setDeletingId(id)
    setIsDialogOpen(false)

    const result = await deleteApplicationAction(id)
    setDeletingId(null)
    setIdToDelete(null)

    if (result.success) {
      toast.success(result.message)
      mutate()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Standard Dialog for Deletion */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this application? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Applications</h1>
          <p className="text-sm text-muted-foreground">
            {totalItems} application{totalItems !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button asChild>
          <Link href="/applications/add">
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            Add Application
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <HugeiconsIcon
                icon={Search01Icon}
                strokeWidth={2}
                className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search company..."
                className="pl-9"
                value={filters.companyName || ""}
                onChange={(e) =>
                  handleFilterChange("companyName", e.target.value)
                }
              />
            </div>
            <Select
              value={filters.status || ""}
              onValueChange={(v: string) => handleFilterChange("status", v)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Status">All statuses</SelectItem>
                {allStatuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Location..."
              className="sm:w-48"
              value={filters.location || ""}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <HugeiconsIcon
                icon={Loading01Icon}
                strokeWidth={2}
                className="animate-spin text-muted-foreground"
              />
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
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/applications/${app.id}`}
                          className="font-medium hover:underline"
                        >
                          {app.companyName}
                        </Link>
                        {app.jobUrl && (
                          <a
                            href={app.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <HugeiconsIcon
                              icon={ExternalLink}
                              strokeWidth={2}
                              className="size-4"
                            />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {app.roleTitle}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {app.location || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusColors[app.status]}
                      >
                        {app.status.charAt(0) +
                          app.status.slice(1).toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(app.appliedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          asChild
                        >
                          <Link href={`/applications/${app.id}`}>
                            <HugeiconsIcon
                              icon={Edit01Icon}
                              strokeWidth={2}
                              className="size-4"
                            />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          disabled={deletingId === app.id}
                          onClick={() => initiateDelete(app.id)}
                        >
                          {deletingId === app.id ? (
                            <HugeiconsIcon
                              icon={Loading01Icon}
                              strokeWidth={2}
                              className="size-4 animate-spin"
                            />
                          ) : (
                            <HugeiconsIcon
                              icon={Trash2}
                              strokeWidth={2}
                              className="size-4"
                            />
                          )}
                        </Button>
                      </div>
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
