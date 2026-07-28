"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getSafeCallbackUrl } from "@/lib/auth-routes";
import { loginSchema, type LoginInput } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, House, ShieldCheck, Sparkle } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const callbackUrl = useMemo(
    () => getSafeCallbackUrl(searchParams.get("callbackUrl")),
    [searchParams],
  );

  async function onCredentialsLogin(data: LoginInput) {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      form.setError("password", { message: "Invalid email or password." });
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[88vh] max-w-5xl items-center px-4 md:px-8">
      <section className="bg-surface border-ink-200 grid w-full overflow-hidden rounded-xl border shadow-sm md:grid-cols-2">
        <div className="from-brand-50 to-brand-100 bg-linear-to-br via-white p-8 md:p-10">
          <p className="text-brand-600 text-xs font-semibold tracking-[0.16rem] uppercase">
            Welcome back
          </p>

          <h1 className="text-ink-900 mt-3 text-xl font-bold tracking-tight">
            Sign in to continue your travel plan
          </h1>

          <p className="text-ink-600 mt-3 text-sm leading-relaxed">
            Access your bookings, manage your host activity, and continue
            exploring stays across top destinations.
          </p>

          <div className="text-ink-700 mt-8 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <House className="text-brand-500 size-4" /> Personalize home
              recommendations
            </p>

            <p className="flex items-center gap-2">
              <ShieldCheck className="text-brand-500 size-4" />
              Secure account access
            </p>

            <p className="flex items-center gap-2">
              <Sparkle className="text-brand-500 size-4" />
              Streamlined booking experience
            </p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-ink-900 text-2xl font-semibold">Sign in</h2>
          <p className="text-ink-600 mt-1 text-sm">
            Continue as a guest or host
          </p>

          <form
            id="login-form"
            onSubmit={form.handleSubmit(onCredentialsLogin)}
            className="mt-5"
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Work or personal email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      className="border-ink-300 text-ink-800 ring-brand-300 w-full rounded-xl border px-3.5 py-2.5 outline-none focus:ring-2"
                      disabled={form.formState.isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="border-ink-300 text-ink-800 ring-brand-300 w-full rounded-xl border py-2.5 pr-10 pl-3.5 outline-none focus:ring-2"
                        disabled={form.formState.isSubmitting}
                      />
                      <button
                        type="button"
                        className="text-ink-500 hover:text-ink-800 absolute inset-y-0 right-0 flex w-10 items-center justify-center"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 mt-6 w-full rounded-xl py-5 text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <FieldSeparator className="my-5">or</FieldSeparator>

          <Button
            type="button"
            variant="outline"
            className="hover:bg-ink-50 w-full bg-white py-5 shadow-xs"
            onClick={() => signIn("google", { callbackUrl })}
            disabled={form.formState.isSubmitting}
          >
            <Image src="/google.png" alt="Google" width={20} height={20} />
            <span>Sign in with Google</span>
          </Button>

          <p className="text-ink-600 mt-5 text-sm">
            New here?{" "}
            <Link
              href="/register"
              className="text-brand-600 hover:text-brand-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
