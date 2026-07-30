import Link from "next/link";
import { createListing } from "@/actions/listings";
import { ListingForm } from "@/components/host/listing-form";
import { HostSection } from "@/components/host/host-section";
import { HostListingItem } from "@/components/host/host-listing-item";
import { BadgeCheck, Building2, DollarSign, Sparkles } from "lucide-react";
import { PageIntro } from "@/components/shared/page-intro";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { uiShell } from "@/lib/ui-classes";
import { getHostDashboardData } from "@/lib/listings/get-host-dashboard";

export default async function HostDashboardPage() {
  const { user, listings, listingCount, avgNightlyRate, totalCapacity } =
    await getHostDashboardData();

  return (
    <main className={uiShell.pageContainer}>
      <PageIntro
        badge="Host workspace"
        icon={Sparkles}
        title={`Welcome back, ${user.name ?? "Host"}`}
        description="Manage your homes, publish new listings, and keep every stay ready for guests."
      />

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Active Listings"
          value={listingCount}
          icon={Building2}
        />
        <StatCard
          label="Average Nightly Rate"
          value={`$${avgNightlyRate}`}
          icon={DollarSign}
        />
        <StatCard
          label="Total Guest Capacity"
          value={totalCapacity}
          icon={BadgeCheck}
        />
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <HostSection
          title="Create a listing"
          description="Add a professionally presented listing with photos, pricing, and guest details."
        >
          <ListingForm action={createListing} />
        </HostSection>

        <HostSection
          title="Your listings"
          description="Update, review, or remove homes from your hosting portfolio."
          action={
            <Link
              href="/"
              className="border-ink-300 text-ink-700 hover:bg-ink-50 rounded-full border px-3 py-1.5 text-xs font-semibold transition"
            >
              View guest experience
            </Link>
          }
        >
          <div className="space-y-3">
            {listings.length === 0 ? (
              <EmptyState
                title="No listings yet"
                description="Fill in the form to publish your first property."
              />
            ) : (
              listings.map((listing, index) => (
                <HostListingItem
                  key={listing.id}
                  listing={listing}
                  index={index}
                />
              ))
            )}
          </div>
        </HostSection>
      </div>
    </main>
  );
}
