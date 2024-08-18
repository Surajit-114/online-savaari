import { z } from "zod";
export const roundTripFormSchema = z.object({
  fromCityOrAirport: z.string().min(2),
  toCityOrAirport: z.string().min(2),
  travelDate: z.date(),
  returnDate: z.date(),
  ADULT: z.number().min(1).max(10),
  CHILD: z.number().min(0).max(10),
  INFANT: z.number().min(0).max(10),
  cabinClass: z.string().min(2),
  isDirectFlight: z.boolean().default(false),
  special: z.string().min(2).nullable()
});

export type TRoundTripFormSchema = z.infer<typeof roundTripFormSchema>