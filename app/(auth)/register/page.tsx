"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { BriefcaseIcon, Loading01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { registerAction } from "@/lib/api/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useFormState(registerAction, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      router.push("/login")
    } else if (!isPending && state.message && !state.success) {
      toast.error(state.message)
    }
  }, [state, isPending, router])

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-4xl bg-primary/10">
          <HugeiconsIcon icon={BriefcaseIcon} strokeWidth={2} className="text-primary" />
        </div>
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>Sign up to start tracking your job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
            </Field>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <HugeiconsIcon icon={Loading01Icon} strokeWidth={2} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </FieldGroup>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
