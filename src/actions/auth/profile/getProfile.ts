import { apiService } from "@/services/apiService";
import axios from "axios";

export async function getProfile() {
    try {
      const { data } = await apiService({
        url: "/accounts/customer-profile/",
        method: "GET",
      });
      
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log({getProfile:error.response?.data.messages})
        throw new Error(error.response?.data.message);
      }
      console.log({getProfile:error})
      throw new Error("Something unexpected happened!!");
    }
  }