"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function SearchBar() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sourceAirportCode, setSourceAirportCode] = useState<string>("BOM");
  const [destinationAirportCode, setDestinationAirportCode] =
    useState<string>("DEL");
  const [classOfService, setClassOfService] = useState<string>("ECONOMY");
  const [numAdults, setNumAdults] = useState<number>(1);

  const handleSearch = () => {
    if (!validateDates(startDate, endDate)) {
      alert(
        "Invalid date values. Please ensure the dates are in the future and in the correct format."
      );
      return;
    }

    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
    const query = `?source=${sourceAirportCode}&destination=${destinationAirportCode}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&classOfService=${classOfService}&numAdults=${numAdults}`;
    router.push(`/pages/results${query}`);
  };

  const validateDates = (start: string, end: string): boolean => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const today = new Date();

    if (
      startDateObj < today ||
      endDateObj < today ||
      startDateObj > endDateObj
    ) {
      return false;
    }

    return true;
  };

  return (
    <div className='max-w-screen-xl w-full px-4 sm:px-8 mx-auto'>
      <div className='flex flex-row w-full bg-white rounded-lg overflow-hidden'>
        <input
          type='text'
          placeholder='From'
          value={sourceAirportCode}
          onChange={(e) => setSourceAirportCode(e.target.value)}
          className='flex-grow h-full text-black p-4 bg-transparent'
        />
        <input
          type='text'
          placeholder='To'
          value={destinationAirportCode}
          onChange={(e) => setDestinationAirportCode(e.target.value)}
          className='flex-grow h-full text-black p-4 bg-transparent'
        />
        <div className='flex items-center'>
          <input
            type='date'
            placeholder='Start Date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='border-0 w-32 h-full text-black p-3 bg-transparent'
            style={{ lineHeight: "normal", verticalAlign: "middle" }}
          />
          <span className='p-4 bg-white text-black'>-</span>
          <input
            type='date'
            placeholder='End Date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='border-0 w-32 h-full text-black p-3 bg-transparent'
            style={{ lineHeight: "normal", verticalAlign: "middle" }}
          />
        </div>
        <select
          value={classOfService}
          onChange={(e) => setClassOfService(e.target.value)}
          className='border-0 flex-grow h-full text-black p-4 bg-transparent'
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
          className='border-0 flex-grow w-1/2 h-full text-black p-4 bg-transparent'
        />
        <button
          className='bg-blue-600 text-white h-full p-4 flex-grow-0 flex-shrink-0'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
