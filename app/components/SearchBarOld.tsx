"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";

const cache: { [key: string]: string } = {};

export default function SearchBarOld() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>("2024-09-15");
  const [endDate, setEndDate] = useState<string>("2024-09-21");
  const [sourceCity, setSourceCity] = useState<string>("");
  const [destinationCity, setDestinationCity] = useState<string>("");
  const [sourceAirportCode, setSourceAirportCode] = useState<string>("");
  const [destinationAirportCode, setDestinationAirportCode] =
    useState<string>("");
  const [classOfService, setClassOfService] = useState<string>("ECONOMY");
  const [numAdults, setNumAdults] = useState<number>(1);
  const [tripType, setTripType] = useState<string>("Round Trip");

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

  const fetchAirportCode = async (
    city: string,
    setAirportCode: (code: string) => void,
    setCity: (cityWithCode: string) => void
  ) => {
    if (cache[city]) {
      const cachedCode = cache[city];
      setAirportCode(cachedCode);
      setCity(`${city} (${cachedCode})`);
      console.log(`Used cached Airport Code for ${city}:`, cachedCode);
      return;
    }

    try {
      const response = await axios.get(
        "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport",
        {
          params: { query: city },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
          },
        }
      );

      console.log("API Response:", response.data);

      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        const airportCode = response.data.data[0].airportCode || "";
        cache[city] = airportCode;
        setAirportCode(airportCode);
        setCity(`${city} (${airportCode})`);
        console.log(`Fetched Airport Code for ${city}:`, airportCode);
      } else {
        console.error("No airport code found in the API response.");
        alert("No airport code found for the specified city.");
      }
    } catch (error) {
      console.error("Error fetching airport code:", error);
      alert("Failed to fetch airport code. Please check the city name.");
    }
  };

  useEffect(() => {
    if (sourceCity) {
      const debounceTimeout = setTimeout(
        () =>
          fetchAirportCode(
            sourceCity.split(" (")[0],
            setSourceAirportCode,
            setSourceCity
          ),
        500
      );
      return () => clearTimeout(debounceTimeout);
    }
  }, [sourceCity]);

  useEffect(() => {
    if (destinationCity) {
      const debounceTimeout = setTimeout(
        () =>
          fetchAirportCode(
            destinationCity.split(" (")[0],
            setDestinationAirportCode,
            setDestinationCity
          ),
        500
      );
      return () => clearTimeout(debounceTimeout);
    }
  }, [destinationCity]);

  return (
    <div className='max-w-screen-xl w-full px-4 sm:px-8 mx-auto'>
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
      <div className='drop-shadow-md flex flex-row w-full bg-white rounded-3xl overflow-hidden border-emerald-600 border'>
        <input
          type='text'
          placeholder='From (City)'
          value={sourceCity}
          onChange={(e) => setSourceCity(e.target.value)}
          className='flex-grow w-1/2 h-full text-black p-4 bg-transparent focus:outline-none'
        />
        <input
          type='text'
          placeholder='To (City)'
          value={destinationCity}
          onChange={(e) => setDestinationCity(e.target.value)}
          className='flex-grow w-1/2 h-full text-black p-4 bg-transparent focus:outline-none'
        />
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
          className='text-lg font-medium bg-emerald-600 text-white h-full p-4 flex-grow-0 flex-shrink-0 hover:bg-emerald-500'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
