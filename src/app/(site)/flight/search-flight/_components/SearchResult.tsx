"use client";
import { Container } from "@/components";
import useFlightSearch from "@/hooks/useFlightSearch";
import { type FC } from "react";
import FlightOverview from "./FlightOverview";
import { ImSpinner8 } from "react-icons/im";
import { LuPlaneTakeoff } from "react-icons/lu";

interface Props {}

const SearchResult: FC<Props> = ({}) => {
  const { searchResult, isLoading } = useFlightSearch();
  if (isLoading) {
    return (
      <Container className="my-4 grid place-items-center h-80">
        <ImSpinner8 className="h-10 w-10 animate-spin text-clr-red/80" />
      </Container >
    );
  }
  if(searchResult.length===0){
    return (
      <Container className="my-4 flex flex-col justify-center items-center h-80">
        <LuPlaneTakeoff className="h-16 w-16 text-clr-red/80" />
        <p>Bring Out Your Travel Wishlist...</p>
      </Container >
    );
  }
  
  return (
    <Container className="my-4">
      <div className="grid grid-cols-12 gap-x-3 bg-primary/80 rounded px-4 py-2 mb-2 text-primary-foreground">
        <p className="col-span-2 text-xs font-semibold">AIRLINE</p>
        <p className="col-span-3 text-xs font-semibold">DEPART</p>
        <p className="col-span-3 text-xs font-semibold">ARRIVE</p>
        <p className="col-span-1 text-xs font-semibold">DURATION</p>
        <p className="col-span-2 text-xs font-semibold">PRICE PER ADULT</p>
        <p className="col-span-1 text-xs font-semibold">&nbsp;</p>
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
