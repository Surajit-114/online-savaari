"use server";
import { TFlightCode } from "@/hooks/flight/useFlightCodes";
import axios from "axios";

export async function getCodes() {
  try {
    const { data } = await axios.get(
      "https://onlinesavaari.website/savaari_api/flight_code_list/",
    );
    return data as TFlightCode[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Something unexpected happened!!");
  }
}
