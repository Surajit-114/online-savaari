import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoundTripForm from "./_forms/RoundTripForm";
import DomesticRoutesCarousel from "./_components/DomesticRoutesCarousel";
import InternationalRoutesCarousel from "./_components/InternationalRoutesCarousel";
import Details from "./_components/Details";
import OneWayForm from "./_forms/OneWayForm";
import { Container } from "@/components";
import ClientWrapper from "./_components/ClientWrapper";
import { getCodes } from "@/actions/flights/codes/getCodes";


const Home = async () => {
  const flightCodes = await getCodes();
  return (
    <ClientWrapper flightCodes={flightCodes}>
      <Container>
        <div className="my-8 grid grid-cols-12 gap-x-6">
          <section className="relative col-span-12 lg:col-span-6 xl:col-span-5">
            <div className="sticky top-24 space-y-4 rounded bg-background p-4 shadow">
              <h2 className="text-center font-medium tracking-wide text-primary/85">
                Book Flights and Hotels
              </h2>
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
                <TabsContent value="one_way">
                  <OneWayForm />
                </TabsContent>
                <TabsContent value="round_trip">
                  <RoundTripForm />
                </TabsContent>
                <TabsContent value="multi_city"></TabsContent>
              </Tabs>
            </div>
          </section>
          <section className="col-span-12 space-y-10 lg:col-span-6 xl:col-span-7">
            <DomesticRoutesCarousel />
            <InternationalRoutesCarousel />
            <Details />
          </section>
        </div>
      </Container>
    </ClientWrapper>
  );
};

export default Home;
