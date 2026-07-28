"use server";

import { prisma } from "@/lib/prisma";
import {
  registerSchema,
  type RegisterInput,
} from "@/validations/auth.validation";
import bcrypt from "bcryptjs";

export type RegisterResult =
  { success: true } | { success: false; error: string };

export async function registerUser(
  input: RegisterInput,
): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check your details and try again.",
    };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return {
      success: false,
      error: "An account with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      name: parsed.data.name.trim(),
      email,
      hashedPassword,
    },
  });

  return { success: true };
}
