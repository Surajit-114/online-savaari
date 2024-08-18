"use client";
import { type FC } from "react";
import { TripCard } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Props {}

const DomesticRoutesCarousel: FC<Props> = ({}) => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-medium text-primary">
          Popular Domestic Flight Routes
        </h3>
        <div className="space-x-2">
          <button className="swiper-button-prev-domestic text-lg">
            <FaChevronLeft />
          </button>
          <button className="swiper-button-next-domestic text-lg">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <Swiper
        loop={true}
        slidesPerView={3}
        spaceBetween={30}
        navigation={{
          nextEl: ".swiper-button-next-domestic",
          prevEl: ".swiper-button-prev-domestic",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <TripCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TripCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TripCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TripCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TripCard
            departFrom="del"
            goingTo="blr"
            departureDate="August 12, 2024"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DomesticRoutesCarousel;
