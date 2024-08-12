import { type FC } from "react";
import { RadioGroup as RG, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";

interface Props {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioGroup: FC<Props> = ({
  name,
  options,
  defaultValue,
  value,
  setValue,
}) => {
  return (
    <div>
      <input type="text" value={value} name={name} hidden readOnly />
      <RG
        defaultValue={defaultValue}
        onValueChange={(val) => {
          setValue(val);
        }}
        
      >
        {options.map((option) => (
          <div
            className="flex items-baseline space-x-2"
            key={`${option.label}_${option.value}`}
          >
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value} className="capitalize font-normal text-base">{option.label}</Label>
          </div>
        ))}
      </RG>
    </div>
  );
};

export default RadioGroup;
