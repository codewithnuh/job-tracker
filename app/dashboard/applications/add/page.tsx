"use client"

import { useEffect, useActionState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { createApplicationAction } from "@/lib/api/actions/applications"
import type { ApplicationStatus } from "@/lib/types"

const allStatuses: ApplicationStatus[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
]

export default function AddApplicationPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(
    createApplicationAction,
    {
      success: false,
      message: "",
    }
  )

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      router.push("/dashboard/applications")
    } else if (!isPending && state.message && !state.success) {
      toast.error(state.message)
    }
  }, [state, isPending, router])

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add Application</h1>
        <p className="text-sm text-muted-foreground">
          Track a new job application
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
          <CardDescription>
            Fill in the details of the job you applied to
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="e.g. Google"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="roleTitle">Role / Title</FieldLabel>
                <Input
                  id="roleTitle"
                  name="roleTitle"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select name="status" defaultValue="APPLIED">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {allStatuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. San Francisco, CA or Remote"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="jobUrl">Job URL</FieldLabel>
                <Input
                  id="jobUrl"
                  name="jobUrl"
                  type="url"
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
                    placeholder="0"
                    min="0"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="salaryMax">Max Salary</FieldLabel>
                  <Input
                    id="salaryMax"
                    name="salaryMax"
                    type="number"
                    placeholder="0"
                    min="0"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="notes">Notes</FieldLabel>
                <FieldDescription>
                  Any additional notes about this application
                </FieldDescription>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Interview scheduled for next week..."
                  rows={4}
                />
              </Field>

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
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
                  "Add Application"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
