import { MAX_INFANTS, MIN_ADULTS } from "@/lib/booking-rules";
import { z } from "zod";

export const reservationSchema = z.object({
  listingId: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-zA-Z0-9_-]+$/),
  startDate: z.string(),
  endDate: z.string(),
  adults: z.coerce.number().int().min(MIN_ADULTS),
  children: z.coerce.number().int().min(0),
  infants: z.coerce.number().int().min(0).max(MAX_INFANTS),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
