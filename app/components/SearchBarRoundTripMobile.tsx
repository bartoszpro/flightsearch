"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { airports } from "../data/airports";
import dayjs from "dayjs";

export default function SearchBarRoundTripMobile() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>("2024-09-15");
  const [endDate, setEndDate] = useState<string>("2024-09-21");
  const [sourceCity, setSourceCity] = useState<string>("");
  const [destinationCity, setDestinationCity] = useState<string>("");
  const [sourceAirportCode, setSourceAirportCode] = useState<string>("");
  const [destinationAirportCode, setDestinationAirportCode] =
    useState<string>("");
  const [classOfService, setClassOfService] = useState<string>("ECONOMY");
  const [sourceSuggestions, setSourceSuggestions] = useState<
    { city: string; code: string; country: string; name: string }[]
  >([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    { city: string; code: string; country: string; name: string }[]
  >([]);
  const [numAdults, setNumAdults] = useState<number>(1);
  const [tripType, setTripType] = useState<string>("Round Trip");

  const handleSearch = () => {
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

    const search = {
      sourceCity,
      sourceAirportCode,
      destinationCity,
      destinationAirportCode,
      startDate,
      endDate,
      numAdults,
      classOfService,
      tripType,
    };

    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );

    const updatedSearches = [search, ...storedSearches].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

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
      const filteredSuggestions = airports
        .filter(
          (airport) =>
            typeof airport.name === "string" &&
            typeof airport.city === "string" &&
            typeof airport.country === "string" &&
            airport.city.toLowerCase().includes(query.toLowerCase())
        )
        .map((airport) => ({
          name: airport.name as string,
          city: airport.city as string,
          code: airport.code as string,
          country: airport.country as string,
        }));

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
      const filteredSuggestions = airports
        .filter(
          (airport) =>
            typeof airport.name === "string" &&
            typeof airport.city === "string" &&
            typeof airport.country === "string" &&
            airport.city.toLowerCase().includes(query.toLowerCase())
        )
        .map((airport) => ({
          name: airport.name as string,
          city: airport.city as string,
          code: airport.code as string,
          country: airport.country as string,
        }));

      setDestinationSuggestions(filteredSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  };

  return (
    <div className='max-w-screen-xl w-full px-4 sm:px-8 mx-auto z-50 pt-8'>
      <div className='relative drop-shadow-md flex flex-col space-y-0 w-full bg-white overflow-visible border-emerald-600 border rounded-3xl'>
        <div className='flex flex-row space-x-2'>
          <div className='relative flex-grow'>
            <input
              type='text'
              placeholder='From (City)'
              value={sourceCity}
              onChange={handleSourceCityChange}
              className='w-full h-full text-black px-4 bg-transparent focus:outline-none text-center'
            />
            {sourceSuggestions.length > 0 && (
              <div
                className='absolute left-0 bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto z-50'
                style={{ zIndex: 1000 }}
              >
                {sourceSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className='p-2 hover:bg-emerald-100 cursor-pointer overflow-hidden'
                    onClick={() => {
                      setSourceCity(
                        `${suggestion.city}, ${suggestion.country} (${suggestion.code})`
                      );
                      setSourceAirportCode(suggestion.code);
                      setSourceSuggestions([]);
                    }}
                  >
                    <div>
                      {suggestion.city}, {suggestion.country} ({suggestion.code})
                      <div className='text-xs'>{suggestion.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='relative flex-grow'>
            <input
              type='text'
              placeholder='To (City)'
              value={destinationCity}
              onChange={handleDestinationCityChange}
              className='w-full h-full text-black p-4 bg-transparent focus:outline-none text-center'
            />
            {destinationSuggestions.length > 0 && (
              <div
                className='absolute left-0 bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto z-50'
                style={{ zIndex: 1000 }}
              >
                {destinationSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className='p-2 hover:bg-emerald-100 cursor-pointer overflow-hidden'
                    onClick={() => {
                      setDestinationCity(
                        `${suggestion.city}, ${suggestion.country} (${suggestion.code})`
                      );
                      setDestinationAirportCode(suggestion.code);
                      setDestinationSuggestions([]);
                    }}
                  >
                    <div>
                      {suggestion.city}, {suggestion.country} ({suggestion.code})
                      <div className='text-xs'>{suggestion.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
   <div className='flex flex-col space-y-2 px-4'>
   <div className='flex flex-row items-center justify-center space-x-2'>
      <input
        type='date'
        placeholder='Start Date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className='border-0 w-full text-black bg-transparent focus:outline-none text-center pr-4'
      />
      <span className='px-2 text-black'>—</span>
      <input
        type='date'
        placeholder='End Date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className='border-0 w-full text-black bg-transparent focus:outline-none text-center pr-4'
      />
  </div>

  <div className='flex flex-row justify-between space-x-2'>
    <select
      value={classOfService}
      onChange={(e) => setClassOfService(e.target.value)}
      className='border-0 w-full text-black p-4 bg-transparent focus:outline-none md:text-center'
    >
      <option value='ECONOMY'>Economy</option>
      <option value='PREMIUM_ECONOMY'>Premium Economy</option>
      <option value='BUSINESS'>Business Class</option>
      <option value='FIRST'>First Class</option>
    </select>
    <div className='flex items-center'>
      <span className='pl-4 bg-white text-black'>Tickets:</span>
      <input
        type='number'
        placeholder='Passengers'
        value={numAdults}
        onChange={(e) => setNumAdults(Number(e.target.value))}
        min={1}
        className='border-0 w-16 text-black p-4 bg-transparent focus:outline-none text-left'
      />
    </div>
  </div>
</div>

        <button
          className='text-lg font-medium bg-emerald-600 text-white h-full w-auto py-4 flex-grow-0 flex-shrink-0 hover:bg-emerald-500 rounded-b-3xl'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
