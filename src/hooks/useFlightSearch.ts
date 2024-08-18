import { SI, TotalPriceList } from "@/types/flight";
import { create } from "zustand";

export type TFlightSearch = {
  searchType: string;
  fromCityOrAirport: string;
  toCityOrAirport: string;
  travelDate: Date;
  ADULT: number;
  CHILD: number;
  INFANT: number;
  cabinClass: string;
  isDirectFlight: boolean;
  special: string | null;
};

export type TSearchresult = {
  sI:SI[];
  totalPriceList:TotalPriceList[];
}

interface FlightSearchStore {
  query: TFlightSearch;
  setQuery: (query: TFlightSearch) => void;
  searchResult: TSearchresult[];
  setSearchResult: (searchResult: TSearchresult[]) => void;
}

const useFlightSearch = create<FlightSearchStore>((set) => ({
  query: {
    searchType: "oneWay",
    fromCityOrAirport: "DEL",
    toCityOrAirport: "BLR",
    travelDate: new Date(),
    ADULT: 1,
    CHILD: 0,
    INFANT: 0,
    cabinClass: "ECONOMY",
    isDirectFlight: false,
    special: null,
  },
  setQuery: (query: TFlightSearch) => set({ query }),
  searchResult: [],
  setSearchResult: (searchResult: TSearchresult[]) => set({ searchResult }),
}));

export default useFlightSearch;
