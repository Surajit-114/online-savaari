import { type FC } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  label: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  className?:string;
}

const CheckboxItem: FC<Props> = ({ name, label, checked, setChecked, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        hidden
        readOnly
      />
      <Checkbox
        checked={checked}
        onCheckedChange={() => {
          setChecked((prev) => !prev);
        }}
      />
      <Label
        className="cursor-pointer capitalize text-primary/80 transition-colors hover:text-clr-red/80"
        onClick={() => setChecked((prev) => !prev)}
      >
        {label}
      </Label>
    </div>
  );
};

export default CheckboxItem;
