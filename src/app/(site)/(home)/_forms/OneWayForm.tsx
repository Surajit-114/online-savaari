"use client";
import { useState, type FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  oneWayFormSchema,
  TOneWayFormSchema,
} from "@/schemas/flight/oneWayFormSchema";
import { CitySearch, Counter, DatePicker } from "@/components";
import { AiOutlineSwap } from "react-icons/ai";
import { FaArrowRight, FaChevronDown } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import useFlightCodes from "@/hooks/useFlightCodes";
import useFlightSearch from "@/hooks/useFlightSearch";
import useReactQuery from "@/hooks/useReactQuery";
import { toast } from "sonner";

interface Props {}

const OneWayForm: FC<Props> = ({}) => {
  const flightCodes = useFlightCodes((state) => state.flightCodes);
  const flightSearch = useFlightSearch();
  const { useAppMutation } = useReactQuery();
  const router = useRouter();
  const [showTravellerSelection, setShowTravellerSelection] =
    useState<boolean>(false);
  const form = useForm<TOneWayFormSchema>({
    resolver: zodResolver(oneWayFormSchema),
    defaultValues: {
      fromCityOrAirport: "DEL",
      toCityOrAirport: "BLR",
      travelDate: new Date(),
      ADULT: 1,
      CHILD: 0,
      INFANT: 0,
      cabinClass: "ECONOMY",
      isDirectFlight: false,
      special: null,
    },
  });

  const mutation = useAppMutation({
    url: "/flight/tripjack-flight-search/",
    mutationKey: "flightSearch",
  });

  async function onSubmit(values: TOneWayFormSchema) {
    const searchQuery = {
      special: values.special,
      cabinClass: values.cabinClass,
      paxInfo: {
        ADULT: values.ADULT,
        CHILD: values.CHILD,
        INFANT: values.INFANT,
      },
      searchModifiers: {
        pft: null,
        isDirectFlight: values.isDirectFlight,
      },
      routeInfos: [
        {
          fromCityOrAirport: {
            code: values.fromCityOrAirport,
          },
          toCityOrAirport: {
            code: values.toCityOrAirport,
          },
          travelDate: values.travelDate.toLocaleDateString(),
        },
      ],
      preferredAirline: null,
    };

    mutation.mutateAsync(
      { searchQuery },
      {
        onSuccess(data: any) {
          
          const payload = {
            ...values,
            searchType: "oneWay",
          };
          flightSearch.setQuery(payload);
          flightSearch.setSearchResult(
            data.tripjack.searchResult.tripInfos.ONWARD,
          );
          toast.success("Search successful")
          router.push("/flight/search-flight");
        },
        onError(error) {
          toast.error(error.message)
        },
      },
    );
  }

  function handleSwapCity() {
    const fromCityOrAirport = form.getValues("fromCityOrAirport");
    const toCityOrAirport = form.getValues("toCityOrAirport");
    const temp = fromCityOrAirport;
    form.setValue("fromCityOrAirport", toCityOrAirport);
    form.setValue("toCityOrAirport", temp);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">
        {/* -------- AIRPORT SELECTION -------- */}
        <div className="grid grid-cols-10 gap-2">
          <FormField
            control={form.control}
            name="fromCityOrAirport"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Depart from</FormLabel>
                <FormControl>
                  <CitySearch
                    options={flightCodes}
                    setValue={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <p className="text-xs font-medium capitalize text-primary/70">
                  {
                    flightCodes.find((option) => option.code === field.value)
                      ?.name
                  }
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="col-span-2 self-center text-xl"
            variant="ghost"
            onClick={handleSwapCity}
          >
            <AiOutlineSwap />
          </Button>
          <FormField
            control={form.control}
            name="toCityOrAirport"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Going To</FormLabel>
                <FormControl>
                  <CitySearch
                    options={flightCodes}
                    setValue={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <p className="text-xs font-medium capitalize text-primary/70">
                  {
                    flightCodes.find((option) => option.code === field.value)
                      ?.name
                  }
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* -------- DATE SELECTION -------- */}
        <FormField
          control={form.control}
          name="travelDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure date</FormLabel>
              <FormControl>
                <DatePicker setValue={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* -------- TRAVELLER SELECTION -------- */}
        <div className="space-y-4">
          <div className="flex flex-col gap-y-2">
            <FormLabel>Traveller(s), class</FormLabel>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowTravellerSelection((prev) => !prev)}
              className="justify-between text-primary/80"
            >
              <p className="text-lg capitalize">
                {form.watch("ADULT") +
                  form.watch("CHILD") +
                  form.watch("INFANT")}{" "}
                traveller,{" "}
                {form.watch("cabinClass").replace("_", " ").toLowerCase()}
              </p>
              <FaChevronDown />
            </Button>
          </div>
          {/* -------- TRAVELLER SELECTION BUTTONS -------- */}
          <div
            className={cn(
              "grid grid-cols-3 gap-4 overflow-y-scroll transition-all duration-300 ease-in-out",
              !showTravellerSelection ? "h-0" : "h-40",
            )}
          >
            <FormField
              control={form.control}
              name="ADULT"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Adult</FormLabel>
                  <FormControl>
                    <Counter
                      value={field.value}
                      setValue={field.onChange}
                      min={1}
                      max={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CHILD"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Child</FormLabel>
                  <FormControl>
                    <Counter
                      value={field.value}
                      setValue={field.onChange}
                      min={0}
                      max={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="INFANT"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Infant</FormLabel>
                  <FormControl>
                    <Counter
                      value={field.value}
                      setValue={field.onChange}
                      min={0}
                      max={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* -------- CABIN CLASS SELECTION -------- */}
            <FormField
              control={form.control}
              name="cabinClass"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Cabin Class</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="ECONOMY"
                            className="border-clr-red/80 [&_svg]:fill-clr-red/80 [&_svg]:text-clr-red/80"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Economy</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="PREMIUM_ECONOMY"
                            className="border-clr-red/80 [&_svg]:fill-clr-red/80 [&_svg]:text-clr-red/80"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Premium Economy
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="PREMIUM"
                            className="border-clr-red/80 [&_svg]:fill-clr-red/80 [&_svg]:text-clr-red/80"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Premium</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* -------- SPECIAL CLASS SELECTION -------- */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="isDirectFlight"
              render={({ field }) => (
                <FormItem className="flex items-end gap-2 font-normal">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-clr-red/80 data-[state=checked]:bg-clr-red/80 data-[state=checked]:text-background"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Non Stop Flights
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="special"
              render={() => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      value="STUDENT"
                      checked={form.getValues("special") === "STUDENT"}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue("special", "STUDENT");
                        } else {
                          form.setValue("special", null);
                        }
                      }}
                      className="border-clr-red/80 data-[state=checked]:bg-clr-red/80 data-[state=checked]:text-background"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Student Fares</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="special"
              render={() => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      value="MIL"
                      checked={form.getValues("special") === "MIL"}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue("special", "MIL");
                        } else {
                          form.setValue("special", null);
                        }
                      }}
                      className="border-clr-red/80 data-[state=checked]:bg-clr-red/80 data-[state=checked]:text-background"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Armed Forces</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="special"
              render={() => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      value="SENIOR_CITIZEN"
                      checked={form.getValues("special") === "SENIOR_CITIZEN"}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue("special", "SENIOR_CITIZEN");
                        } else {
                          form.setValue("special", null);
                        }
                      }}
                      className="border-clr-red/80 data-[state=checked]:bg-clr-red/80 data-[state=checked]:text-background"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Senior Citizen</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="text-right">
          <Button
            type="submit"
            variant="destructive"
            className="gap-x-3"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <ImSpinner8 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span>Search Flights</span>{" "}
                <span>
                  <FaArrowRight />
                </span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OneWayForm;
