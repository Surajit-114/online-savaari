"use server";

import { axiosInstance } from "@/services/axiosService";
import axios from "axios";


export async function getFlights(body:any) {
  try {
    const {data} = await axiosInstance({
        url:"/flight/tripjack-flight-search/",
        method:"POST",
        data:body,
    })
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Something unexpected happened!!");
  }
}