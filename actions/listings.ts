"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { listingSchema } from "@/validations/listing.validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseListingGallery(rawGallery: FormDataEntryValue | null) {
  try {
    const value = JSON.parse(String(rawGallery ?? "[]"));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function parseListingFormData(formData: FormData) {
  return listingSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    imageSrc: formData.get("imageSrc"),
    imageGallery: parseListingGallery(formData.get("imageGallery")),
    category: formData.get("category"),
    roomCount: formData.get("roomCount"),
    bathroomCount: formData.get("bathroomCount"),
    guestCount: formData.get("guestCount"),
    locationValue: formData.get("locationValue"),
    pricePerNight: formData.get("pricePerNight"),
  });
}

export async function createListing(formData: FormData) {
  const user = await requireUser();
  const parsed = parseListingFormData(formData);
  if (!parsed.success) throw new Error("Invalid listing payload.");

  await prisma.listing.create({
    data: {
      ...parsed.data,
      userId: user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/host");
}

export async function updateListing(listingId: string, formData: FormData) {
  const user = await requireUser();
  if (!listingId) throw new Error("Listing id is missing.");

  const parsed = parseListingFormData(formData);
  if (!parsed.success) throw new Error("Invalid listing payload.");

  const updated = await prisma.listing.updateMany({
    where: {
      id: listingId,
      userId: user.id,
    },
    data: parsed.data,
  });

  if (updated.count === 0) {
    throw new Error("Listing not found or access denied.");
  }

  revalidatePath("/");
  revalidatePath("/host");
  revalidatePath(`/listings/${listingId}`);
  redirect("/host");
}

export async function deleteListing(formData: FormData) {
  const user = await requireUser();
  const listingId = String(formData.get("listingId") ?? "");
  if (!listingId) throw new Error("Listing id is missing.");

  await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/host");
}
