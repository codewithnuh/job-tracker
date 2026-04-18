"use client"

import { useEffect, useActionState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { BriefcaseIcon, Loading01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { registerAction } from "@/lib/api/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(registerAction, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      router.push("/login")
      return
    }
    if (!isPending && state.message) {
      toast.error(state.message)
    }
  }, [state.success, state.message, isPending, router])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo / brand */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-indigo-500/15 shadow-[0_0_24px_rgba(99,102,241,0.25)]">
          <HugeiconsIcon icon={BriefcaseIcon} strokeWidth={2} className="size-5 text-indigo-400" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-[800] tracking-tight text-foreground">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start tracking your job search for free
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="p-6 sm:p-8">
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className="text-sm font-medium">
                  Full name
                </FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  autoComplete="name"
                  className="mt-1.5 h-11"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  Email address
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="mt-1.5 h-11"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="text-sm font-medium">
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="mt-1.5 h-11"
                />
              </Field>

              <Button
                type="submit"
                className="group mt-2 h-11 w-full gap-2 rounded-xl bg-indigo-500 text-[0.9rem] font-semibold text-white shadow-[0_4px_16px_rgba(99,102,241,0.35)] transition-all duration-200 hover:bg-indigo-400 hover:shadow-[0_6px_24px_rgba(99,102,241,0.45)] disabled:opacity-60"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <HugeiconsIcon icon={Loading01Icon} strokeWidth={2} className="animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create free account
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      strokeWidth={2.5}
                      className="size-4 transition-transform duration-200 group-hover:rotate-45"
                    />
                  </>
                )}
              </Button>
            </FieldGroup>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/30 px-8 py-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-500 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Legal note */}
      <p className="mt-5 text-center text-[11px] text-muted-foreground/60">
        By creating an account you agree to our{" "}
        <Link href="#" className="underline underline-offset-2 hover:text-muted-foreground">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline underline-offset-2 hover:text-muted-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </motion.div>
  )
}
