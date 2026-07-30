"use client";

import { Menu, UserCircle2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  user: {
    id: string;
    name?: string | null;
  } | null;
  hostCtaLabel?: string;
}
export default function AuthButton({
  user,
  hostCtaLabel = "Start hosting",
}: Props) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={"/login"}
          className="border-ink-300 text-ink-700 rounded-full border px-3 py-1.5 text-xs font-semibold"
        >
          Sign in
        </Link>

        <Link
          href={"/register"}
          className="bg-brand-500 hover:bg-brand-600 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
        >
          Create account
        </Link>
      </div>
    );
  }
  return <UserMenu name={user.name ?? "Host"} hostCtaLabel={hostCtaLabel} />;
}

function UserMenu({
  name,
  hostCtaLabel,
}: {
  name: string;
  hostCtaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!menuRef.current) return;

      const target = event.target as Node | null;
      if (target && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="border-ink-300 bg-surface flex items-center gap-2 rounded-full border px-3 py-2 shadow-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Menu className="text-ink-700 size-4" />
        <UserCircle2 className="text-ink-500 size-6" />
      </button>

      {open ? (
        <div className="border-ink-200 bg-surface absolute top-12 right-0 z-50 w-48 rounded-2xl border p-2 shadow-xl">
          <p className="text-ink-500 px-3 py-2 text-xs font-medium">{name}</p>

          <Link
            href={"/bookings"}
            className="text-ink-700 hover:bg-ink-100 block w-full rounded-xl px-3 py-2 text-left text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Bookings
          </Link>

          <Link
            href="/host"
            className="text-ink-700 hover:bg-ink-100 block w-full rounded-xl px-3 py-2 text-left text-sm font-medium md:hidden"
            onClick={() => setOpen(false)}
          >
            {hostCtaLabel}
          </Link>

          <button
            type="button"
            className="text-ink-700 hover:bg-ink-100 w-full rounded-xl px-3 py-2 text-left text-sm font-medium"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
