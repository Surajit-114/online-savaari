"use client";
import useFlightCodes, { TFlightCode } from "@/hooks/flight/useFlightCodes";
import { useEffect, type FC } from "react";

interface Props {
  children: React.ReactNode;
  flightCodes: TFlightCode[];
}

const ClientWrapper: FC<Props> = ({ children, flightCodes }) => {
  const setFlightCodes = useFlightCodes(
    (state) => state.setFlightCodes,
  );
  useEffect(()=>{
    setFlightCodes(flightCodes)
  },[])
  return <>{children}</>;
};

export default ClientWrapper;
