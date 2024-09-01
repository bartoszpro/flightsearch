"use client";

import React, { useState } from "react";
import Head from "next/head";
import Navbar from "./components/Navbar";
import ReviewGrid from "./components/ReviewGrid";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import PopularDestinationsGrid from "./components/PopularDestinationsGrid";
import SearchBarRoundTrip from "./components/SearchBarRoundTrip";
import SearchBarOneWay from "./components/SearchBarOneWay";
import SearchBarMultiCity from "./components/SearchBarMultiCity";

const Home: React.FC = () => {
  const [tripType, setTripType] = useState<string>("Round Trip");
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

          {/* <button
            onClick={() => setTripType("Multi-city")}
            className={`drop-shadow-md border border-emerald-600 px-5 py-2.5 relative rounded group overflow-hidden font-medium inline-block ${
              tripType === "Multi-city"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-600"
            }`}
          >
            <span
              className={`absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 ${
                tripType === "Multi-city"
                  ? "bg-emerald-500 opacity-90"
                  : "bg-emerald-500 group-hover:h-full group-hover:opacity-90"
              }`}
            ></span>
            <span
              className={`relative ${
                tripType === "Multi-city"
                  ? "text-white"
                  : "group-hover:text-white"
              }`}
            >
              Multi-city
            </span>
          </button> */}
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
        <p className='text-black text-sm'></p>
      </div>
      <PopularDestinationsGrid />
      <div className='max-w-screen-xl mx-auto mt-4 bg-white rounded-2xl'>
        <h2 className='text-black text-lg font-medium'>Best Flight Deals</h2>
        <p className='text-black text-sm'>
          No need to shop multiple sites any more. We&apos;ve already done that
          by searching hundreds of cheap flights for you- scouring premium
          airlines, low-cost carriers and the biggest online travel agencies for
          the best deals. We&apos;ll even check alternate dates and nearby
          airports to help you save money, time, even sanity on airline tickets.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Home;
