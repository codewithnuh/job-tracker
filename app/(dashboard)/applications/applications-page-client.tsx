"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignIcon,
  Search01Icon,
  Loading01Icon,
  Trash2,
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
import { deleteApplicationAction } from "@/lib/api/actions/applications"
import { useApplications } from "@/lib/swr/hooks"
import type { ApplicationStatus, ListApplicationsFilters } from "@/lib/types"

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

interface ApplicationsPageClientProps {
  initialFilters: ListApplicationsFilters
}

export default function ApplicationsPageClient({
  initialFilters,
}: ApplicationsPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [filters, setFilters] = useState<ListApplicationsFilters>({
    ...initialFilters,
  })

  const { applications, meta, isLoading, mutate } = useApplications(filters)

  const totalPages = meta?.totalPages || 1
  const currentPage = meta?.currentPage || 1
  const totalItems = meta?.totalItems || 0

  function handleFilterChange(
    key: keyof ListApplicationsFilters,
    value: string
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: 1,
    }))
  }

  function handlePageChange(page: number) {
    setFilters((prev) => ({
      ...prev,
      page,
    }))
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this application?")) return

    setDeletingId(id)
    const result = await deleteApplicationAction(id)
    setDeletingId(null)

    if (result.success) {
      toast.success(result.message)
      mutate()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
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
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
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
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No applications found.
              </p>
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
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/applications/${app.id}`}
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
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        disabled={deletingId === app.id}
                        onClick={() => handleDelete(app.id)}
                      >
                        {deletingId === app.id ? (
                          <HugeiconsIcon
                            icon={Loading01Icon}
                            strokeWidth={2}
                            className="animate-spin"
                          />
                        ) : (
                          <HugeiconsIcon icon={Trash2} strokeWidth={2} />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
