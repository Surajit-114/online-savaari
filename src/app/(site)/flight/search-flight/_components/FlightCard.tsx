import { Card, CardContent } from "@/components/ui/card";
import { convertMinutesToHours } from "@/lib/utils";
import { SI } from "@/types/flight";
import { type FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  sI: SI;
}

interface Details {
  p1: string;
  p2: string;
}

const Details: FC<Details> = ({ p1, p2 }) => {
  return (
    <div>
      <p className="text-sm font-semibold text-primary">{p1}</p>
      <p className="text-xs font-normal text-primary/70">{p2}</p>
    </div>
  );
};

const FlightCard: FC<Props> = ({ sI }) => {
  return (
      <div className="flex items-center justify-between p-4 shadow-md rounded-md bg-background mb-4">
        <div className="flex items-center gap-x-2">
        <Image src={`https://www.onlinesavaari.com/static/flight/airline_logo/${sI.fD.aI.code}.png`} width={50} height={50} alt={sI.fD.aI.code} className="inline-block aspect-square w-8 h-auto rounded-full"/>
        <Details p1={sI.fD.aI.name} p2={`${sI.fD.aI.code}-${sI.fD.fN}`} />
        </div>
        <Details p1={new Date(sI.dt).toDateString()} p2={sI.da.name} />
        <Details p1={new Date(sI.at).toDateString()} p2={sI.aa.name} />
        <Details p1={convertMinutesToHours(sI.duration)} p2={`${sI.stops} Stop`} />
        <Button variant="destructive">View Fares</Button>
      </div>
  );
};

export default FlightCard;
