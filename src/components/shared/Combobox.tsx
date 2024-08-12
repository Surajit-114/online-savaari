"use client";
import { Dispatch, SetStateAction, useState, type FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  notAllowed:string;
}

const Combobox: FC<Props> = ({ options, name, value, setValue, notAllowed }) => {
  const [open, setOpen] = useState(false);
  const filteredOptions = options.filter(option => `${option.label}_${option.value}`!== notAllowed )
  
  return (
    <>
      <input value={value} name={name} hidden readOnly aria-readonly />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-lg"
          >
            {value
              ? filteredOptions.find((option) => `${option.label}_${option.value}` === value)?.value
              : "Select airport..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search airport..." />
            <CommandList>
              <CommandEmpty>No airport found...</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={`${option.label}_${option.value}`}
                    value={`${option.label}_${option.value}`}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === `${option.label}_${option.value}` ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label} ({option.value})
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Combobox;
