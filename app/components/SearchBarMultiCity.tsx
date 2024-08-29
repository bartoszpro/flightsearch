"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { airports } from "../data/airports";

export default function SearchBarMultiCity() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>("2024-09-15");
  const [endDate, setEndDate] = useState<string>("2024-09-21");
  const [sourceCity, setSourceCity] = useState<string>("");
  const [destinationCity, setDestinationCity] = useState<string>("");
  const [secondSourceCity, setSecondSourceCity] = useState<string>("");
  const [secondDestinationCity, setSecondDestinationCity] =
    useState<string>("");
  const [sourceAirportCode, setSourceAirportCode] = useState<string>("");
  const [destinationAirportCode, setDestinationAirportCode] =
    useState<string>("");
  const [secondSourceAirportCode, setSecondSourceAirportCode] =
    useState<string>("");
  const [secondDestinationAirportCode, setSecondDestinationAirportCode] =
    useState<string>("");
  const [classOfService, setClassOfService] = useState<string>("ECONOMY");
  const [numAdults, setNumAdults] = useState<number>(1);
  const [sourceSuggestions, setSourceSuggestions] = useState<
    { city: string; code: string; country: string }[]
  >([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    { city: string; code: string; country: string }[]
  >([]);
  const [secondSourceSuggestions, setSecondSourceSuggestions] = useState<
    { city: string; code: string; country: string }[]
  >([]);
  const [secondDestinationSuggestions, setSecondDestinationSuggestions] =
    useState<{ city: string; code: string; country: string }[]>([]);

  const handleSearch = () => {
    if (
      !sourceAirportCode ||
      !destinationAirportCode ||
      !secondSourceAirportCode ||
      !secondDestinationAirportCode
    ) {
      alert("Please ensure all cities are specified correctly.");
      return;
    }

    const legs = [
      {
        sourceAirportCode,
        destinationAirportCode,
        date: startDate,
      },
      {
        sourceAirportCode: secondSourceAirportCode,
        destinationAirportCode: secondDestinationAirportCode,
        date: endDate,
      },
    ];

    const query = `?legs=${JSON.stringify(
      legs
    )}&classOfService=${classOfService}&numAdults=${numAdults}`;
    router.push(`/`); //router.push(`/pages/mcresults${query}`)
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
            typeof airport.city === "string" &&
            typeof airport.country === "string" &&
            airport.city.toLowerCase().includes(query.toLowerCase())
        )
        .map((airport) => ({
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
            typeof airport.city === "string" &&
            typeof airport.country === "string" &&
            airport.city.toLowerCase().includes(query.toLowerCase())
        )
        .map((airport) => ({
          city: airport.city as string,
          code: airport.code as string,
          country: airport.country as string,
        }));

      setDestinationSuggestions(filteredSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSecondSourceCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSecondSourceCity(query);

    if (query.length > 0) {
      const filteredSuggestions = airports
        .filter(
          (airport) =>
            typeof airport.city === "string" &&
            typeof airport.country === "string" &&
            airport.city.toLowerCase().includes(query.toLowerCase())
        )
        .map((airport) => ({
          city: airport.city as string,
          code: airport.code as string,
          country: airport.country as string,
        }));

      setSecondSourceSuggestions(filteredSuggestions);
    } else {
      setSecondSourceSuggestions([]);
    }
  };

  const handleSecondDestinationCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSecondDestinationCity(query);

    if (query.length > 0) {
      const filteredSuggestions = airports
        .filter(
          (airport) =>
            typeof airport.city === "string" &&
            typeof airport.country === "string" &&
            airport.city.toLowerCase().includes(query.toLowerCase())
        )
        .map((airport) => ({
          city: airport.city as string,
          code: airport.code as string,
          country: airport.country as string,
        }));

      setSecondDestinationSuggestions(filteredSuggestions);
    } else {
      setSecondDestinationSuggestions([]);
    }
  };

  return (
    <div className='max-w-screen-xl w-full px-6 sm:px-8 mx-auto z-50 pt-32'>
      <div className='relative drop-shadow-md flex flex-row space-x-2 w-full bg-white overflow-visible border-emerald-600 border rounded-3xl'>
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='From (City)'
            value={sourceCity}
            onChange={handleSourceCityChange}
            className='flex-grow w-full h-full text-black p-4 bg-transparent focus:outline-none z-10 relative'
          />
          {sourceSuggestions.length > 0 && (
            <div
              className='absolute left-0 bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto'
              style={{ zIndex: 9999 }}
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
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='To (City)'
            value={destinationCity}
            onChange={handleDestinationCityChange}
            className='flex-grow w-full h-full text-black p-4 bg-transparent focus:outline-none z-10 relative'
          />
          {destinationSuggestions.length > 0 && (
            <div
              className='absolute left-0 bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto'
              style={{ zIndex: 9999 }}
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
            className='border-0 w-11/12 h-full text-black bg-transparent focus:outline-none z-10 relative'
            style={{ lineHeight: "normal", verticalAlign: "middle" }}
          />
        </div>
      </div>
      <div className='relative drop-shadow-md flex flex-row space-x-2 w-full bg-white overflow-visible border-emerald-600 border rounded-3xl mt-1'>
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='From (City)'
            value={secondSourceCity}
            onChange={handleSecondSourceCityChange}
            className='flex-grow w-full h-full text-black p-4 bg-transparent focus:outline-none z-10 relative'
          />
          {secondSourceSuggestions.length > 0 && (
            <div
              className='absolute left-0 bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto'
              style={{ zIndex: 9999 }}
            >
              {secondSourceSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className='p-2 hover:bg-emerald-100 cursor-pointer'
                  onClick={() => {
                    setSecondSourceCity(
                      `${suggestion.city}, ${suggestion.country} (${suggestion.code})`
                    );
                    setSecondSourceAirportCode(suggestion.code);
                    setSecondSourceSuggestions([]);
                  }}
                >
                  {suggestion.city}, {suggestion.country} ({suggestion.code})
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='To (City)'
            value={secondDestinationCity}
            onChange={handleSecondDestinationCityChange}
            className='flex-grow w-full h-full text-black p-4 bg-transparent focus:outline-none z-10 relative'
          />
          {secondDestinationSuggestions.length > 0 && (
            <div
              className='absolute left-0 bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto'
              style={{ zIndex: 9999 }}
            >
              {secondDestinationSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className='p-2 hover:bg-emerald-100 cursor-pointer'
                  onClick={() => {
                    setSecondDestinationCity(
                      `${suggestion.city}, ${suggestion.country} (${suggestion.code})`
                    );
                    setSecondDestinationAirportCode(suggestion.code);
                    setSecondDestinationSuggestions([]);
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
            placeholder='End Date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='border-0 w-11/12 h-full text-black bg-transparent focus:outline-none z-10 relative'
            style={{ lineHeight: "normal", verticalAlign: "middle" }}
          />
        </div>
      </div>

      <div className='relative drop-shadow-md flex flex-row space-x-2 w-2/5 bg-white overflow-visible border-emerald-600 border rounded-3xl mt-1'>
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
        <div className='flex items-center'>
          <span className='pl-7 bg-white text-black'>Tickets:</span>{" "}
          <input
            type='number'
            value={numAdults}
            onChange={(e) => setNumAdults(Number(e.target.value))}
            min={1}
            className='border-0 h-full w-16 text-black p-4 bg-transparent focus:outline-none text-left'
          />
        </div>

        <button
          className='text-lg font-medium bg-rose-600 text-white h-full w-auto py-4 px-5 flex-grow-0 flex-shrink-0 hover:bg-rose-500 rounded-r-3xl'
          style={{ marginRight: "-1px" }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
