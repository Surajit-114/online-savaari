"use client";
import { oneWayFormAction } from "@/actions/flights/oneWayFormAction";
import {
  CheckboxItem,
  Combobox,
  Counter,
  DatePicker,
  RadioGroup,
} from "@/components";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { FaArrowRight, FaChevronDown } from "react-icons/fa6";

let options = [
  {
    label: "Delhi",
    value: "DEL",
  },
  {
    label: "Bangalore",
    value: "BLR",
  },
  {
    label: "Kolkata",
    value: "CCU",
  },
];

const classes = [
  {
    label: "economy",
    value: "economy",
  },
  {
    label: "premium economy",
    value: "premium_economy",
  },
  {
    label: "bussiness",
    value: "bussiness",
  },
];

const OneWayForm = () => {
  const [departFrom, setDepartFrom] = useState<string>("Delhi_DEL");
  const [goingTo, setGoingTo] = useState<string>("Bangalore_BLR");
  const [adult, setAdult] = useState<number>(1);
  const [infant, setInfant] = useState<number>(0);
  const [child, setChild] = useState<number>(0);
  const [travelClass, setTravelClass] = useState<string>("economy");
  const [nonStop, setNonStop] = useState<boolean>(false);
  const [student, setStudent] = useState<boolean>(false);
  const [senior, setSenior] = useState<boolean>(false);
  const [armed, setArmed] = useState<boolean>(false);
  const [toggleTravel, setToggleTravel] = useState<boolean>(true);

  function handleSwap() {
    let temp = goingTo;
    setGoingTo(departFrom);
    setDepartFrom(temp);
  }

  return (
    <form action={oneWayFormAction} className="mt-8">
      <ScrollArea className="h-[calc(100vh-17rem)]">
        <div className="space-y-4">
          {/* -------- AIRPORT SELECTION -------- */}
          <div className="grid grid-cols-9 gap-x-1">
            <div className="col-span-4 inline-flex flex-col gap-y-2">
              <Label className="text-xs capitalize text-primary/60">
                Depart from
              </Label>
              <Combobox
                options={options}
                name="depart_from"
                value={departFrom}
                setValue={setDepartFrom}
                notAllowed={goingTo}
              />
              <p className="text-sm font-semibold capitalize text-primary/70">
                {departFrom.split("_")[0] ?? ""}
              </p>
            </div>
            <Button
              type="button"
              className="col-span-1 w-full self-center text-4xl"
              variant="ghost"
              onClick={handleSwap}
            >
              <AiOutlineSwap />
            </Button>
            <div className="col-span-4 inline-flex flex-col gap-y-2">
              <Label className="text-xs capitalize text-primary/60">
                Going to
              </Label>
              <Combobox
                options={options}
                name="going_to"
                value={goingTo}
                setValue={setGoingTo}
                notAllowed={departFrom}
              />
              <p className="text-sm font-semibold capitalize text-primary/70">
                {goingTo.split("_")[0] ?? ""}
              </p>
            </div>
          </div>
          {/* -------- DATE SELECTION -------- */}
          <div className="flex flex-col gap-y-2">
            <Label className="text-xs capitalize text-primary/60">
              Departure date
            </Label>
            <DatePicker name="departure_date" />
          </div>
          {/* -------- TRAVELLER SELECTION -------- */}
          <div>
            <Label className="text-xs text-primary/60">
              Traveller(s), class
            </Label>
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg capitalize">
                {adult + child + infant} traveller,{" "}
                {travelClass.replace("_", " ")}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setToggleTravel((prev) => !prev)}
              >
                <FaChevronDown />
              </Button>
            </div>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                toggleTravel ? "h-0" : "h-44",
              )}
            >
              <div className="grid grid-cols-3 gap-x-4">
                <span className="col-span-1 space-y-2">
                  <Label className="text-xs capitalize text-primary/90">
                    Adult
                  </Label>
                  <Counter
                    value={adult}
                    setValue={setAdult}
                    min={1}
                    max={10}
                    name="adult"
                  />
                </span>
                <span className="col-span-1 space-y-2">
                  <Label className="text-xs capitalize text-primary/90">
                    Child [2-12 YRS]
                  </Label>
                  <Counter
                    value={child}
                    setValue={setChild}
                    min={0}
                    max={10}
                    name="child"
                  />
                </span>
                <span className="col-span-1 space-y-2">
                  <Label className="text-xs capitalize text-primary/90">
                    Infant [Below 2 YRS]
                  </Label>
                  <Counter
                    value={infant}
                    setValue={setInfant}
                    min={0}
                    max={10}
                    name="infant"
                  />
                </span>
              </div>
              {/* -------- CLASS SELECTION -------- */}
              <div className="mt-3">
                <RadioGroup
                  options={classes}
                  name="class"
                  defaultValue="economy"
                  value={travelClass}
                  setValue={setTravelClass}
                />
              </div>
            </div>
          </div>

          {/* -------- TYPE SELECTION -------- */}
          <div className="space-y-4">
            <CheckboxItem
              label="non stop flights"
              checked={nonStop}
              setChecked={setNonStop}
              name="non_stop"
            />
            <CheckboxItem
              label="student fares"
              checked={student}
              setChecked={setStudent}
              name="student_fares"
            />
            <CheckboxItem
              label="senior citizen"
              checked={senior}
              setChecked={setSenior}
              name="senior_citizen"
            />
            <CheckboxItem
              label="armed forces"
              checked={armed}
              setChecked={setArmed}
              name="armed_forces"
            />
          </div>
          <Button
            variant="destructive"
            className="float-right gap-2"
            type="submit"
          >
            Search Flights <FaArrowRight />
          </Button>
        </div>
      </ScrollArea>
    </form>
  );
};

export default OneWayForm;
