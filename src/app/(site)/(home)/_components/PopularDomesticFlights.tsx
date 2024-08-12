"use client";
import { type FC } from "react";
import { FlightCard } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Props {}

const PopularDomesticFlights: FC<Props> = ({}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-medium text-primary">
          Popular Domestic Flight Routes
        </h3>
        <div className="space-x-2">
          <button className="swiper-button-prev text-lg">
            <FaChevronLeft />
          </button>
          <button className="swiper-button-next text-lg">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <Swiper
        loop={true}
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <FlightCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlightCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlightCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlightCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlightCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlightCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlightCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlightCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PopularDomesticFlights;
