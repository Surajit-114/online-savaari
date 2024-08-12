import React, { HtmlHTMLAttributes, type FC } from "react";
import { Button } from "../ui/button";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  max: number;
  min: number;
}

const Counter: FC<Props> = ({ value, setValue, name, max, min, ...props }) => {
  function handleIncrement() {
    setValue((prev) => {
      const newValue = prev + 1;
      return newValue > max ? max : newValue;
    });
  }
  function handleDecrement() {
    setValue((prev) => {
      const newValue = prev - 1;
      return newValue < min ? min : newValue;
    });
  }

  return (
    <div className="flex w-full items-center border">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="rounded-none"
        onClick={handleDecrement}
      >
        <FaMinus />
      </Button>
      <input
        name={name}
        value={value}
        {...props}
        className="w-full border-0 p-1 text-center outline-0 focus-visible:outline-0"
        readOnly
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="rounded-none"
        onClick={handleIncrement}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default Counter;
