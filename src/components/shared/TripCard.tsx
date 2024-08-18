import { type FC } from "react";
import { Button } from "../ui/button";
import { AiOutlineSwap } from "react-icons/ai";

interface Props {
  departFrom: string;
  goingTo: string;
  departureDate: string;
}

const TripCard: FC<Props> = ({ departFrom, goingTo, departureDate }) => {
  return (
    <form
      action=""
      className="m-1 rounded bg-background p-4 shadow"
    >
      <input
        type="text"
        name="departFrom"
        id="departFrom"
        value={departFrom}
        hidden
        readOnly
      />
      <input
        type="text"
        name="goingTo"
        id="goingTo"
        value={goingTo}
        hidden
        readOnly
      />
      <input
        type="text"
        name="departureDate"
        id="departureDate"
        value={new Date(departureDate).toDateString()}
        hidden
        readOnly
      />
      <input type="text" name="adult" id="adult" value={1} hidden readOnly />
      <input type="text" name="child" id="child" value={0} hidden readOnly />
      <input type="text" name="infant" id="infant" value={0} hidden readOnly />
      <input
        type="radio"
        name="cabinClass"
        id="cabinClass"
        value="ECONOMY"
        checked
        hidden
        readOnly
      />
      <input
        type="radio"
        name="special"
        id="NORMAL"
        value="NORMAL"
        checked={true}
        readOnly
        hidden
      />
      {/* ---------- CARD CONTENT ---------- */}
      <div className="space-y-3">
        <div className="flex items-center gap-x-3">
          <p className="text-lg font-medium capitalize">{departFrom}</p>
          <AiOutlineSwap className="text-lg font-semibold" />
          <p className="text-lg font-medium capitalize">{goingTo}</p>
        </div>
        <p>{new Date(departureDate).toDateString()}</p>
        <Button variant="destructive" className="capitalize">
          Explore
        </Button>
      </div>
    </form>
  );
};

export default TripCard;
