
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OneWayForm from "./_forms/OneWayForm";
import RoundTripForm from "./_forms/RoundTripForm";
import PopularDomesticFlights from "./_components/PopularDomesticFlights";


const Home = () => {
  return (
    <div className="mt-8 grid grid-cols-12 gap-x-6">
      {/* --------- BOOKING SEARCH AREA --------- */}
      <section className="col-span-12 space-y-4 rounded p-4 shadow-[0_0px_10px_rgba(0,0,0,0.1)] md:col-span-5">
        {/* --------- BOOKING SEARCH AREA HEADING --------- */}
        <h2 className="text-center font-medium tracking-wide text-primary/85">
          Book Flights and Hotels
        </h2>
        {/* --------- BOOKING TABS --------- */}
        <Tabs defaultValue="one_way" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="one_way"
              className="data-[state=active]:text-clr-red"
            >
              One Way
            </TabsTrigger>
            <TabsTrigger
              value="round_trip"
              className="data-[state=active]:text-clr-red"
            >
              Round Trip
            </TabsTrigger>
            <TabsTrigger
              value="multi_city"
              className="data-[state=active]:text-clr-red"
            >
              Multi-city
            </TabsTrigger>
          </TabsList>
          {/* --------- BOOKING TABS CONTENT --------- */}
          <TabsContent value="one_way">
            <OneWayForm />
          </TabsContent>
          <TabsContent value="round_trip">
            <RoundTripForm />
          </TabsContent>
          <TabsContent value="multi_city"></TabsContent>
        </Tabs>
      </section>
      <section className="col-span-12 md:col-span-7">
        {/* -------- POPULAR FLIGHTS --------- */}
        <PopularDomesticFlights/>
      </section>
    </div>
  );
};

export default Home;
