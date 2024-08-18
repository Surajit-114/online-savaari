"use client";
import { useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import { FixedSizeList as List } from "react-window";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

interface Props {
  options: TFlightCodeListResponse[];
  value: string;
  setValue: (...event: any[]) => void;
}

const CitySearch: FC<Props> = ({ options, value, setValue }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const filteredOptions = options.filter((option) =>
    `${option.name}_${option.city}_${option.code}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            type="button"
            variant="outline"
            className="w-full text-xl font-semibold text-primary/80"
            onClick={() => setOpen((prev) => !prev)}
          >
            {value}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="bg-background border border-border">
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Airport..."
            className="mb-3 w-full rounded border border-border bg-background/90 p-2 text-primary placeholder:text-sm focus-visible:outline-none"
          />
          <Separator/>
          <List
            innerElementType="ul"
            itemCount={filteredOptions.length}
            itemSize={50}
            height={300}
            width={260}
          >
            {({ index, style }: { index: number; style: Object }) => (
              <li style={style}>
                <button
                  type="button"
                  key={filteredOptions[index].code}
                  data-value={filteredOptions[index].code}
                  className="text-left"
                  onClick={(e) => {
                    setOpen(false);
                    setValue(e.currentTarget?.dataset?.value ?? "DEL");
                  }}
                >
                  <p className="font-semibold text-primary/80">
                    {filteredOptions[index].city.trim().split(",")[0]} (
                    {filteredOptions[index].code.trim()})
                  </p>
                  <p className="text-xs font-semibold text-primary/50">
                    {filteredOptions[index].name.trim()}
                  </p>
                </button>
              </li>
            )}
          </List>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CitySearch;
