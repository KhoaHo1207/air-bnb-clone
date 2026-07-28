import Link from "next/link";
import { House } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import AuthButtons from "@/components/auth-button";
import { prisma } from "@/lib/prisma";
import { ModeToggle } from "@/components/mode-toggle";

export async function Navbar() {
  const user = await getCurrentUser();
  const hasHostedListings = user
    ? (await prisma.listing.count({ where: { userId: user.id } })) > 0
    : false;
  const hostCtaLabel = hasHostedListings ? "Manage hosting" : "Start hosting";
  return (
    <header className="border-ink-200/80 bg-surface/95 sticky top-0 z-40 border-b backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-brand-500 flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <House className="size-5" />
          <span>StayScape</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/host"
            className="text-ink-700 hover:bg-ink-100 hidden rounded-full px-3 py-2 text-sm font-semibold md:inline-block"
          >
            {hostCtaLabel}
          </Link>

          <AuthButtons user={user} hostCtaLabel={hostCtaLabel} />

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
