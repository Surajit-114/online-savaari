"use server";

import axios from "axios";
export default async function getFlightCodeList() {
  const { data } = await axios.get(
    "https://onlinesavaari.website/savaari_api/flight_code_list/",
  );
  return data as TFlightCodeListResponse[];
}
