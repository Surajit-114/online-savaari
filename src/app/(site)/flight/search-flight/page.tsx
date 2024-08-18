import getFlightCodeList from "@/actions/flights/getFlightCodeList";
import SearchFlightForms from "./_forms/SearchFlightForms";
import ClientWrapper from "./_components/ClientWrapper";
import SearchResult from "./_components/SearchResult";

const SearchFlight = async () => {
  const flightCodes = await getFlightCodeList();

  return (
    <ClientWrapper flightCodes={flightCodes}>
      <SearchFlightForms />
      <SearchResult/>
    </ClientWrapper>
  );
};

export default SearchFlight;
