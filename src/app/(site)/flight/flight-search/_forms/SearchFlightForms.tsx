"use client";
import { type FC } from "react";
import OneWaySearchForm from "./OneWaySearchForm";
import { Container } from "@/components";

interface Props {}

const SearchFlightForms: FC<Props> = ({}) => {
  const searchType = "oneWay"

  return (
    <div className="bg-gradient-to-r from-[#b7243a] to-[#43264e]">
      <Container>
        {searchType === "oneWay" ? <OneWaySearchForm/> : "Form"}
      </Container>
    </div>
  );
};

export default SearchFlightForms;
