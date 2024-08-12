import { type FC } from "react";
import { Button } from "../ui/button";
import { AiOutlineSwap } from "react-icons/ai";

interface Props {
  departFrom: string;
  goingTo: string;
  departureDate: string;
}

const FlightCard: FC<Props> = ({ departFrom, goingTo, departureDate }) => {
  return (
    <div className="aspect-square flex flex-col justify-evenly items-start border border-border space-y-2 rounded p-4 shadow-[0_0px_10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-4">
        <p className="text-xl font-medium capitalize">{departFrom}</p>
        <AiOutlineSwap />
        <p className="text-xl font-medium capitalize">{goingTo}</p>
      </div>
      <p>{departureDate}</p>
      <Button variant="destructive">Explore</Button>
    </div>
  );
};

export default FlightCard;
