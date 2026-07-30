import { ListingAbout } from "@/components/listing/listing-about";
import { ListingBookedRanges } from "@/components/listing/listing-booked-ranges";
import { ListingBookingSidebar } from "@/components/listing/listing-booking-sidebar";
import { ListingHeaderInfo } from "@/components/listing/listing-header-info";
import { ListingImageGallery } from "@/components/listing/listing-image-gallery";
import { ListingMap } from "@/components/listing/listing-map";
import {
  getListingDetail,
  type ListingDetailSearchParams,
} from "@/lib/listings/get-listing-detail";

type ListingPageProps = {
  params: Promise<{ listingId: string }>;
  searchParams: Promise<ListingDetailSearchParams>;
};

export default async function ListingPage({
  params,
  searchParams,
}: ListingPageProps) {
  const { listingId } = await params;
  const query = await searchParams;
  const {
    listing,
    hostRating,
    isDemoListing,
    reservationCount,
    bookedRanges,
    userActiveReservation,
    isLoggedIn,
    bookingStatus,
    bookingMessage,
    initialCheckIn,
    initialCheckOut,
    initialAdults,
    initialChildren,
    initialInfants,
  } = await getListingDetail(listingId, query);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pt-5 pb-28 md:px-8 md:pt-8 md:pb-10">
      <article className="space-y-6 md:space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:items-start">
          <div className="order-2 space-y-6 md:space-y-7 lg:order-1">
            <section>
              <ListingImageGallery
                images={
                  listing.imageGallery.length > 0
                    ? listing.imageGallery
                    : [listing.imageSrc]
                }
                altBase={listing.title}
              />
              <ListingHeaderInfo
                category={listing.category}
                title={listing.title}
                locationValue={listing.locationValue}
                hostRating={hostRating}
                hostName={listing.hostName}
                pricePerNight={listing.pricePerNight}
                listingStatusLabel={
                  isDemoListing
                    ? "Featured demo listing"
                    : reservationCount > 0
                      ? `${reservationCount} confirmed booking${reservationCount > 1 ? "s" : ""}`
                      : "Newly listed"
                }
              />
            </section>

            <ListingAbout
              description={listing.description}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              hostName={listing.hostName}
              hostRating={hostRating}
            />

            <ListingBookedRanges bookedRanges={bookedRanges} />
            <ListingMap locationValue={listing.locationValue} />
          </div>

          <div className="order-1 lg:order-2">
            <ListingBookingSidebar
              listingId={listing.id}
              pricePerNight={listing.pricePerNight}
              hostName={listing.hostName}
              reservationCount={reservationCount}
              userActiveReservation={userActiveReservation}
              maxGuests={listing.guestCount}
              isLoggedIn={isLoggedIn}
              bookingStatus={bookingStatus}
              bookingMessage={bookingMessage}
              unavailableRanges={bookedRanges}
              initialCheckIn={initialCheckIn}
              initialCheckOut={initialCheckOut}
              initialAdults={initialAdults}
              initialChildren={initialChildren}
              initialInfants={initialInfants}
            />
          </div>
        </div>
      </article>
    </main>
  );
}
