"use client";
import { CitySearch, Counter, DatePicker } from "@/components";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { AiOutlineSwap } from "react-icons/ai";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FaArrowRight } from "react-icons/fa6";
import { FC } from "react";
import useFlightCodes from "@/hooks/useFlightCodes";
import useFlightSearch from "@/hooks/useFlightSearch";
import useReactQuery from "@/hooks/useReactQuery";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";

interface Props {}

const OneWaySearchForm: FC<Props> = ({}) => {
  const flightCodes = useFlightCodes((state) => state.flightCodes);
  const flightSearch = useFlightSearch();
  const { useAppMutation } = useReactQuery();
  const router = useRouter();
  const form = useForm<TOneWayFormSchema>({
    resolver: zodResolver(oneWayFormSchema),
    defaultValues: {
      fromCityOrAirport: flightSearch.query.fromCityOrAirport,
      toCityOrAirport: flightSearch.query.toCityOrAirport,
      travelDate: flightSearch.query.travelDate,
      ADULT: flightSearch.query.ADULT,
      CHILD: flightSearch.query.CHILD,
      INFANT: flightSearch.query.INFANT,
      cabinClass: flightSearch.query.cabinClass,
      isDirectFlight: flightSearch.query.isDirectFlight,
      special: flightSearch.query.special,
    },
  });
  const mutation = useAppMutation({
    url: "/flight/tripjack-flight-search/",
    mutationKey: "flightSearch",
  });

  function onSubmit(values: TOneWayFormSchema) {
    flightSearch.setIsLoading(true);
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
    mutation.mutate(
      { searchQuery },
      {
        onSuccess(data: any) {
          flightSearch.setSearchResult(
            data.tripjack.searchResult.tripInfos.ONWARD,
          );
          router.push("/flight/search-flight");
        },
        onError(error) {
          console.log(error);
        },
        onSettled() {
          flightSearch.setIsLoading(false);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4 p-4 text-background"
      >
        <div className="col-span-1 grid h-16 grid-cols-10 gap-2">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="col-span-2 self-end text-xl"
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="travelDate"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Departure date</FormLabel>
              <FormControl>
                <DatePicker setValue={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-1 space-y-2">
          <FormLabel>Traveller(s)</FormLabel>
          <div className="grid grid-cols-3 gap-x-3">
            <FormField
              control={form.control}
              name="ADULT"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormControl>
                    <Counter
                      value={field.value}
                      setValue={field.onChange}
                      min={1}
                      max={10}
                    />
                  </FormControl>
                  <FormLabel>Adult</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CHILD"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormControl>
                    <Counter
                      value={field.value}
                      setValue={field.onChange}
                      min={0}
                      max={10}
                    />
                  </FormControl>
                  <FormLabel>Child</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="INFANT"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormControl>
                    <Counter
                      value={field.value}
                      setValue={field.onChange}
                      min={0}
                      max={10}
                    />
                  </FormControl>
                  <FormLabel>Infant</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="cabinClass"
          render={({ field }) => (
            <FormItem className="col-span-1">
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
                        className="[&_svg]:fill-background [&_svg]:text-background"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Economy</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="PREMIUM_ECONOMY" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Premium Economy
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="PREMIUM" />
                    </FormControl>
                    <FormLabel className="font-normal">Premium</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-1 space-y-2">
          <FormField
            control={form.control}
            name="isDirectFlight"
            render={({ field }) => (
              <FormItem className="flex items-end gap-2 font-normal">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">Non Stop Flights</FormLabel>
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
                  />
                </FormControl>
                <FormLabel className="font-normal">Senior Citizen</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1">
          <Button
            type="submit"
            variant="destructive"
            className="w-full gap-x-3"
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

export default OneWaySearchForm;
