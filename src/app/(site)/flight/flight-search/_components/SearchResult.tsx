"use client";
import { Container } from "@/components";
import useFlightSearch from "@/hooks/flight/useFlightSearch";
import { useEffect, type FC } from "react";
import FlightOverview from "./FlightOverview";
import { toast } from "sonner";
import useReactQuery from "@/hooks/useReactQuery";
import LoadingSkeleton from "./LoadingSkeleton";

interface Props {}

const SearchResult: FC<Props> = ({}) => {
  const { searchResult, query, isLoading, setSearchResult, setIsLoading } =
    useFlightSearch();
  const { usePublicMutation } = useReactQuery();
  const mutation = usePublicMutation({
    url: "/flight/tripjack-flight-search/",
    mutationKey: "flightSearch",
  });
  function getFlights() {
    setIsLoading(true);
    const searchQuery = {
      special: query.special,
      cabinClass: query.cabinClass,
      paxInfo: {
        ADULT: query.ADULT,
        CHILD: query.CHILD,
        INFANT: query.INFANT,
      },
      searchModifiers: {
        pft: null,
        isDirectFlight: query.isDirectFlight,
      },
      routeInfos: [
        {
          fromCityOrAirport: {
            code: query.fromCityOrAirport,
          },
          toCityOrAirport: {
            code: query.toCityOrAirport,
          },
          travelDate: query.travelDate.toLocaleDateString(),
        },
      ],
      preferredAirline: null,
    };
    mutation.mutateAsync(
      { searchQuery },
      {
        onSuccess(data: any) {
          if (data.tripjack.searchResult.tripInfos) {
            setSearchResult(data.tripjack.searchResult.tripInfos.ONWARD);
          } else {
            toast.info("No flights found!!!");
          }
        },
        onError(error) {
          toast.error(error.message);
        },
        onSettled() {
          setIsLoading(false);
        },
      },
    );
  }
  

  useEffect(() => {
    getFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  if (isLoading) {
    return (
      <Container className="my-4">
        <div className="mb-2 hidden grid-cols-12 gap-x-3 rounded bg-primary/80 px-4 py-2 text-primary-foreground md:grid">
          <p className="col-span-2 text-sm font-semibold">AIRLINE</p>
          <p className="col-span-3 text-sm font-semibold">DEPART</p>
          <p className="col-span-3 text-sm font-semibold">ARRIVE</p>
          <p className="col-span-1 text-sm font-semibold">DURATION</p>
          <p className="col-span-2 text-sm font-semibold">PRICE PER ADULT</p>
          <p className="col-span-1 text-sm font-semibold">&nbsp;</p>
        </div>
        <LoadingSkeleton />
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="mb-2 hidden grid-cols-12 gap-x-3 rounded bg-primary/80 px-4 py-2 text-primary-foreground md:grid">
        <p className="col-span-2 text-sm font-semibold">AIRLINE</p>
        <p className="col-span-3 text-sm font-semibold">DEPART</p>
        <p className="col-span-3 text-sm font-semibold">ARRIVE</p>
        <p className="col-span-1 text-sm font-semibold">DURATION</p>
        <p className="col-span-2 text-sm font-semibold">PRICE PER ADULT</p>
        <p className="col-span-1 text-sm font-semibold">&nbsp;</p>
      </div>
      {searchResult.map((item, index) => (
        <FlightOverview
          sI={item.sI}
          totalPriceList={item.totalPriceList}
          key={`SearchResult${index}`}
        />
      ))}
    </Container>
  );
};

export default SearchResult;
function usePublicMutation(arg0: { url: string; mutationKey: string }) {
  throw new Error("Function not implemented.");
}
