"use client";

import { AuthSessionProvider } from "@/providers/session-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
