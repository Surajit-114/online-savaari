import React, { type FC } from "react";
import { Button } from "../ui/button";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface Props {
  max: number;
  min: number;
  value: number;
  setValue: (...event: any[]) => void;
}

const Counter: FC<Props> = ({ value, setValue, max, min }) => {
  function handleIncrement() {
    const newValue = value + 1;
    setValue(newValue > max ? max : newValue);
  }
  function handleDecrement() {
    const newValue = value - 1;
    setValue(newValue < min ? min : newValue);
  }

  return (
    <div className="flex w-full items-center border">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="rounded-none text-xs"
        onClick={handleDecrement}
      >
        <FaMinus />
      </Button>
      <p className="w-full border-0 bg-background p-2 text-primary text-center text-sm">
        {value}
      </p>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="rounded-none text-xs"
        onClick={handleIncrement}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default Counter;
