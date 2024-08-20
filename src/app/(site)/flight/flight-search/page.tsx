
import SearchFlightForms from "./_forms/SearchFlightForms";
import ClientWrapper from "./_components/ClientWrapper";
import SearchResult from "./_components/SearchResult";
import { getCodes } from "@/actions/flights/codes/getCodes";

const SearchFlight = async () => {
  const flightCodes = await getCodes();

  return (
    <ClientWrapper flightCodes={flightCodes}>
      <SearchFlightForms />
      <SearchResult/>
    </ClientWrapper>
  );
};

export default SearchFlight;
