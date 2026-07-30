import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  imageSrc: z.string().min(1),
  imageGallery: z.array(z.string().min(1)).min(1).max(10),
  category: z.string().min(2),
  roomCount: z.coerce.number().int().min(1),
  bathroomCount: z.coerce.number().int().min(1),
  guestCount: z.coerce.number().int().min(1),
  locationValue: z.string().min(2),
  pricePerNight: z.coerce.number().int().min(10),
});

export type ListingInput = z.infer<typeof listingSchema>;
