"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./components/Navbar";
import ReviewGrid from "./components/ReviewGrid";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import PopularDestinationsGrid from "./components/PopularDestinationsGrid";
import SearchBarRoundTrip from "./components/SearchBarRoundTrip";
import SearchBarOneWay from "./components/SearchBarOneWay";
import SearchBarMultiCity from "./components/SearchBarMultiCity";
import dayjs from "dayjs";
import { FaArrowRight, FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";

const Home: React.FC = () => {
  const [tripType, setTripType] = useState<string>("Round Trip");
  const [recentSearches, setRecentSearches] = useState<
    {
      sourceCity: string;
      sourceAirportCode: string;
      destinationCity: string;
      destinationAirportCode: string;
      startDate: string;
      endDate: string;
      numAdults: number;
      classOfService: string;
      tripType: string;
    }[]
  >([]);

  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches);
  }, []);

  const imageHeight = tripType === "Multi-city" ? "525px" : "400px";

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Navbar />
      <div
        className='relative w-full'
        style={{ height: imageHeight, overflow: "visible", zIndex: 10 }}
      >
        <img
          src='https://images6.alphacoders.com/526/526622.jpg'
          className='w-full h-full object-cover object-[20%_56%]'
          alt='Fixed Height Image'
          style={{ zIndex: 1 }}
        />
        <h1 className='absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md whitespace-nowrap text-xl sm:text-3xl text-outline-emerald-mob font-medium text-outline-emerald-reg'>
          Find the best flight for the right price
        </h1>
        <div
          className='absolute top-48 left-1/2 transform -translate-x-1/2 -translate-y-full w-full flex justify-center space-x-2'
          style={{ zIndex: 15 }}
        >
          <button
            onClick={() => setTripType("Round Trip")}
            className={`drop-shadow-md border border-emerald-600 px-5 py-2.5 relative rounded group overflow-hidden font-medium inline-block ${
              tripType === "Round Trip"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-600"
            }`}
          >
            <span
              className={`absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 ${
                tripType === "Round Trip"
                  ? "bg-emerald-500 opacity-90"
                  : "bg-emerald-500 group-hover:h-full group-hover:opacity-90"
              }`}
            ></span>
            <span
              className={`relative ${
                tripType === "Round Trip"
                  ? "text-white"
                  : "group-hover:text-white"
              }`}
            >
              Round Trip
            </span>
          </button>
          <button
            onClick={() => setTripType("One-way")}
            className={`drop-shadow-md border border-emerald-600 px-5 py-2.5 relative rounded group overflow-hidden font-medium inline-block ${
              tripType === "One-way"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-600"
            }`}
          >
            <span
              className={`absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 ${
                tripType === "One-way"
                  ? "bg-emerald-500 opacity-90"
                  : "bg-emerald-500 group-hover:h-full group-hover:opacity-90"
              }`}
            ></span>
            <span
              className={`relative ${
                tripType === "One-way" ? "text-white" : "group-hover:text-white"
              }`}
            >
              One-way
            </span>
          </button>
        </div>

        <div
          className='absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4'
          style={{ zIndex: 10 }}
        >
          {tripType === "Round Trip" && <SearchBarRoundTrip />}
          {tripType === "One-way" && <SearchBarOneWay />}
          {tripType === "Multi-city" && <SearchBarMultiCity />}
        </div>
      </div>

      <div className='max-w-screen-xl mx-auto mt-4 bg-white rounded-2xl'>
        <h2 className='text-black text-lg font-medium'>Recent searches</h2>
        <p className='text-xs text-gray-600 mb-4'>
          Your most recent searches saved just for you.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {recentSearches.map((search, index) => {
            const searchUrl = `/pages/results?source=${
              search.sourceAirportCode
            }&destination=${search.destinationAirportCode}&startDate=${dayjs(
              search.startDate
            ).format("YYYY-MM-DD")}&endDate=${dayjs(search.endDate).format(
              "YYYY-MM-DD"
            )}&classOfService=${search.classOfService}&numAdults=${
              search.numAdults
            }&tripType=${search.tripType}`;

            return (
              <Link href={searchUrl} key={index} passHref>
                <div className='text-left bg-white border rounded-lg p-4 hover:border-emerald-600 cursor-pointer'>
                  <div className='text-black text-md flex'>
                    <span className='font-medium '>{search.sourceCity}</span>{" "}
                    <span className='flex items-center mx-2 text-emerald-600 text-md'>
                      <FaArrowRight />
                    </span>
                  </div>
                  <div className='text-black text-md'>
                    <span className='font-medium '>
                      {search.destinationCity}
                    </span>
                  </div>
                  <div className='text-gray-500 text-xs'>
                    {dayjs(search.startDate).format("MMM D")} -{" "}
                    {dayjs(search.endDate).format("MMM D, YYYY")}
                  </div>
                  <div className='text-gray-500 text-xs'>
                    {search.numAdults}{" "}
                    {search.numAdults > 1 ? "Adults" : "Adult"},{" "}
                    {search.classOfService}
                  </div>
                  <div className='text-gray-500 text-xs'>{search.tripType}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <PopularDestinationsGrid />
      <Footer />
    </>
  );
};

export default Home;
