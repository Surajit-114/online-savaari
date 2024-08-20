import { cn, convertMinutesToHours } from "@/lib/utils";
import { SI, TotalPriceList } from "@/types/flight";
import { type FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface Props {
  sI: SI;
  totalPriceList: TotalPriceList;
}

interface Details {
  p1: string | number;
  p2?: string | number;
  className?: string;
}

const Details: FC<Details> = ({ p1, p2, className }) => {
  return (
    <div className={cn(className)}>
      <p className="text-base font-semibold text-primary">{p1}</p>
      <p className="text-sm font-normal text-primary/70">{p2}</p>
    </div>
  );
};

const FlightCard: FC<Props> = ({ sI, totalPriceList }) => {
  return (
    <div className="mb-4 grid grid-cols-12 gap-3 rounded bg-background p-4 shadow">
      <div className="col-span-12 flex items-center gap-x-2 md:col-span-2">
        <Image
          src={`https://www.onlinesavaari.com/static/flight/airline_logo/${sI.fD.aI.code}.png`}
          width={50}
          height={50}
          alt={sI.fD.aI.code}
          className="inline-block aspect-square h-auto w-8 rounded-full"
        />
        <Details p1={sI.fD.aI.name} p2={`${sI.fD.aI.code}-${sI.fD.fN}`} />
      </div>
      <Details
        p1={new Date(sI.dt).toDateString()}
        p2={sI.da.name}
        className="col-span-6 md:col-span-3"
      />
      <Details
        p1={new Date(sI.at).toDateString()}
        p2={sI.aa.name}
        className="col-span-6 md:col-span-3"
      />
      <Details
        p1={convertMinutesToHours(sI.duration)}
        p2={`${sI.stops} Stop`}
        className="col-span-6 md:col-span-1"
      />
      <div className="col-span-6 inline-flex items-center md:col-span-2">
        <span>
          <FaIndianRupeeSign className="h-3 w-3" />
        </span>
        <Details p1={totalPriceList.fd.ADULT.fC.TF} />
      </div>
      <Button variant="destructive" className="col-span-12 md:col-span-1">
        View Fares
      </Button>
    </div>
  );
};

export default FlightCard;
