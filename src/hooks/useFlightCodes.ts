import {create} from "zustand"
export type TFlightCode = {
    code: string;
    name: string;
    citycode: string;
    city: string;
    country: string;
    countrycode: string;
};

interface FlightCodesStore {
    flightCodes:TFlightCode[];
    setFlightCodes: (flightCodes:TFlightCode[]) => void;
}

const useFlightCodes = create<FlightCodesStore>((set) => ({
    flightCodes:[],
    setFlightCodes: (flightCodes:TFlightCode[]) => set({flightCodes}),
}))

export default useFlightCodes;