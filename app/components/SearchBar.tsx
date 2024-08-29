"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { airports } from "../data/airports";
import axios from "axios";
import dayjs from "dayjs";

export default function SearchBar() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>("2024-09-15");
  const [endDate, setEndDate] = useState<string>("2024-09-21");
  const [sourceCity, setSourceCity] = useState<string>("");
  const [destinationCity, setDestinationCity] = useState<string>("");
  const [tripType, setTripType] = useState<string>("Round Trip");
  const [sourceAirportCode, setSourceAirportCode] = useState<string>("");
  const [destinationAirportCode, setDestinationAirportCode] =
    useState<string>("");
  const [classOfService, setClassOfService] = useState<string>("ECONOMY");
  const [sourceSuggestions, setSourceSuggestions] = useState<
    { city: string; code: string; country: string }[]
  >([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    { city: string; code: string; country: string }[]
  >([]);
  const [numAdults, setNumAdults] = useState<number>(1);

  const handleSearch = () => {
    console.log("Source Airport Code:", sourceAirportCode);
    console.log("Destination Airport Code:", destinationAirportCode);

    if (
      !validateDates(startDate, endDate) ||
      !sourceAirportCode ||
      !destinationAirportCode
    ) {
      alert(
        "Invalid input values. Please ensure the dates are in the future, the cities are correctly specified, and in the correct format."
      );
      return;
    }

    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
    const query = `?source=${sourceAirportCode}&destination=${destinationAirportCode}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&classOfService=${classOfService}&numAdults=${numAdults}&tripType=${tripType}`;
    router.push(`/pages/results${query}`);
  };

  const validateDates = (start: string, end: string): boolean => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const today = new Date();

    return !(
      startDateObj < today ||
      endDateObj < today ||
      startDateObj > endDateObj
    );
  };

  const handleSourceCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSourceCity(query);

    if (query.length > 0) {
      const filteredSuggestions = airports.filter(
        (airport) =>
          airport.city &&
          String(airport.city).toLowerCase().includes(query.toLowerCase())
      );
      setSourceSuggestions(filteredSuggestions);
    } else {
      setSourceSuggestions([]);
    }
  };

  const handleDestinationCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setDestinationCity(query);

    if (query.length > 0) {
      const filteredSuggestions = airports.filter(
        (airport) =>
          airport.city &&
          String(airport.city).toLowerCase().includes(query.toLowerCase())
      );
      setDestinationSuggestions(filteredSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  };

  return (
    <div className='max-w-screen-xl w-full px-4 sm:px-8 mx-auto z-50'>
      <div className='flex justify-center space-x-4 mb-4'>
        <div className='flex space-x-2'>
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

          <button
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
          </button>
        </div>
      </div>
      <div className='relative drop-shadow-md flex flex-row w-full bg-white  overflow-visible border-emerald-600 border rounded-3xl'>
        <div className='relative flex-grow w-1/2'>
          <input
            type='text'
            placeholder='From (City)'
            value={sourceCity}
            onChange={handleSourceCityChange}
            className='flex-grow w-full h-full text-black p-4 bg-transparent focus:outline-none'
          />
          {sourceSuggestions.length > 0 && (
            <div
              className='absolute left-0 bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto z-50'
              style={{ zIndex: 1000 }}
            >
              {sourceSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className='p-2 hover:bg-emerald-100 cursor-pointer'
                  onClick={() => {
                    setSourceCity(
                      `${suggestion.city}, ${suggestion.country} (${suggestion.code})`
                    );
                    setSourceAirportCode(suggestion.code);
                    setSourceSuggestions([]);
                  }}
                >
                  {suggestion.city}, {suggestion.country} ({suggestion.code})
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='relative flex-grow w-1/2'>
          <input
            type='text'
            placeholder='To (City)'
            value={destinationCity}
            onChange={handleDestinationCityChange}
            className='flex-grow w-full h-full text-black p-4 bg-transparent focus:outline-none'
          />
          {destinationSuggestions.length > 0 && (
            <div
              className='absolute left-0 bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto z-50'
              style={{ zIndex: 1000 }}
            >
              {destinationSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className='p-2 hover:bg-emerald-100 cursor-pointer'
                  onClick={() => {
                    setDestinationCity(
                      `${suggestion.city}, ${suggestion.country} (${suggestion.code})`
                    );
                    setDestinationAirportCode(suggestion.code);
                    setDestinationSuggestions([]);
                  }}
                >
                  {suggestion.city}, {suggestion.country} ({suggestion.code})
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex items-center'>
          <input
            type='date'
            placeholder='Start Date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='border-0 w-5/12 h-full text-black bg-transparent focus:outline-none'
            style={{ lineHeight: "normal", verticalAlign: "middle" }}
          />
          <span className='px-4 bg-white text-black'>—</span>
          <input
            type='date'
            placeholder='End Date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='border-0 w-5/12 h-full text-black bg-transparent focus:outline-none'
            style={{ lineHeight: "normal", verticalAlign: "middle" }}
          />
        </div>
        <select
          value={classOfService}
          onChange={(e) => setClassOfService(e.target.value)}
          className='border-0 flex-grow h-full text-black p-4 bg-transparent focus:outline-none'
        >
          <option value='ECONOMY'>Economy</option>
          <option value='PREMIUM_ECONOMY'>Premium Economy</option>
          <option value='BUSINESS'>Business Class</option>
          <option value='FIRST'>First Class</option>
        </select>
        <input
          type='number'
          placeholder='Passengers'
          value={numAdults}
          onChange={(e) => setNumAdults(Number(e.target.value))}
          min={1}
          className='border-0 flex-grow w-1/3 h-full text-black p-4 bg-transparent focus:outline-none'
        />
        <button
          className='text-lg font-medium bg-emerald-600 text-white h-full w-auto py-4 px-3 flex-grow-0 flex-shrink-0 hover:bg-emerald-500 rounded-r-3xl'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
