"use client";

import { registerUser } from "@/actions/auth";
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
import {
  registerSchema,
  type RegisterInput,
} from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Compass, Eye, EyeOff, HeartHandshake, KeyRound } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const callbackUrl = useMemo(
    () => getSafeCallbackUrl(searchParams.get("callbackUrl")),
    [searchParams],
  );

  async function onRegister(data: RegisterInput) {
    const result = await registerUser(data);

    if (!result.success) {
      form.setError("email", { message: result.error });
      return;
    }

    const signInResult = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl,
    });

    if (signInResult?.error) {
      router.push("/login");
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
            Join StayScape
          </p>

          <h1 className="text-ink-900 mt-3 text-xl font-bold tracking-tight">
            Create an account to start your next trip
          </h1>

          <p className="text-ink-600 mt-3 text-sm leading-relaxed">
            Save favorites, book stays faster, and manage host listings from one
            place.
          </p>

          <div className="text-ink-700 mt-8 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Compass className="text-brand-500 size-4" />
              Discover stays tailored to your plans
            </p>

            <p className="flex items-center gap-2">
              <HeartHandshake className="text-brand-500 size-4" />
              Book with trusted hosts worldwide
            </p>

            <p className="flex items-center gap-2">
              <KeyRound className="text-brand-500 size-4" />
              Switch between guest and host anytime
            </p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-ink-900 text-2xl font-semibold">
            Create account
          </h2>
          <p className="text-ink-600 mt-1 text-sm">
            Join as a guest or become a host
          </p>

          <form
            id="register-form"
            onSubmit={form.handleSubmit(onRegister)}
            className="mt-5"
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Your name"
                      type="text"
                      autoComplete="name"
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
                        placeholder="At least 8 characters"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
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

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm password
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Re-enter your password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="border-ink-300 text-ink-800 ring-brand-300 w-full rounded-xl border py-2.5 pr-10 pl-3.5 outline-none focus:ring-2"
                        disabled={form.formState.isSubmitting}
                      />
                      <button
                        type="button"
                        className="text-ink-500 hover:text-ink-800 absolute inset-y-0 right-0 flex w-10 items-center justify-center"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
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
              {form.formState.isSubmitting
                ? "Creating account..."
                : "Create account"}
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
            <span>Continue with Google</span>
          </Button>

          <p className="text-ink-600 mt-5 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-600 hover:text-brand-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
