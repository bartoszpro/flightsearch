"use client";
const flightCache: { [key: string]: any } = {};

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import Navbar from "@/app/components/Navbar";

interface Leg {
  arrivalDateTime: string;
  departureDateTime: string;
  destinationStationCode: string;
  originStationCode: string;
  marketingCarrier: {
    displayName: string;
    logoUrl: string;
  };
  operatingCarrier: {
    displayName: string;
    logoUrl: string;
  };
}

interface PurchaseLink {
  totalPrice: number;
  currency: string;
  url: string;
  commerceName: string;
}

interface FlightData {
  segments?: {
    legs?: Leg[];
  }[];
  purchaseLinks?: PurchaseLink[];
}

const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString();
};

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const calculateDuration = (departure: string, arrival: string) => {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  const diff = Math.abs(arr.getTime() - dep.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${hours}h ${minutes}m`;
};

const retry = async (fn: () => Promise<any>, retries = 2, delay = 500) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

function ResultsContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const classOfService = searchParams.get("classOfService");
  const numAdults = parseInt(searchParams.get("numAdults") || "1", 10);

  const [flights, setFlights] = useState<FlightData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let didCancel = false;

    const searchFlights = async () => {
      const cacheKey = `${source}-${destination}-${startDate}-${endDate}-${classOfService}-${numAdults}`;

      if (flightCache[cacheKey]) {
        console.log("Using cached data for flights.");
        setFlights(flightCache[cacheKey]);
        setIsLoading(false);
        return;
      }

      try {
        const options = {
          method: "GET",
          url: "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights",
          params: {
            sourceAirportCode: source,
            destinationAirportCode: destination,
            itineraryType: "ROUND_TRIP",
            numAdults: numAdults.toString(),
            classOfService: classOfService,
            date: startDate,
            returnDate: endDate,
          },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
          },
        };

        const response = await retry(() => axios.request(options), 2, 500);
        console.log("API Response:", response.data);

        const allFlights = response.data?.data?.flights || [];
        const validFlights = allFlights;

        if (!didCancel) {
          if (validFlights.length > 0) {
            flightCache[cacheKey] = validFlights;
            setFlights(validFlights);
            setErrorMessage("");
          } else {
            setErrorMessage(
              "No flights found with valid pricing for the given criteria."
            );
          }
        }
      } catch (error) {
        if (!didCancel) {
          console.error("Error fetching flights:", error);

          if (error instanceof AxiosError) {
            setErrorMessage(
              `Failed to fetch flights: ${
                error.response?.data?.message || error.message
              }`
            );
          } else if (error instanceof Error) {
            setErrorMessage(`Failed to fetch flights: ${error.message}`);
          } else {
            setErrorMessage(
              "An unknown error occurred while fetching flights."
            );
          }
        }
      } finally {
        if (!didCancel) setIsLoading(false);
      }
    };

    if (
      source &&
      destination &&
      startDate &&
      endDate &&
      classOfService &&
      numAdults
    ) {
      searchFlights();
    } else {
      setErrorMessage("Missing required parameters.");
      setIsLoading(false);
    }

    return () => {
      didCancel = true;
    };
  }, [source, destination, startDate, endDate, classOfService, numAdults]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className='mt-44 flex flex-col justify-center items-center'>
          <p className='font-medium mb-8 text-emerald-600 animate-pulse'>
            {errorMessage || "Getting you the best deal..."}
          </p>
          <div className='mb-12 animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500'></div>
        </div>
      ) : errorMessage ? (
        <div className='font-medium mb-8 flex flex-col items-center mt-44 text-rose-500'>
          <p className='text-lg font-medium text-emerald-500'>
            Please refresh and try again.
          </p>
          {errorMessage}
        </div>
      ) : flights.length === 0 ? (
        <div className='mt-4 text-red-500'>
          No flights found for the given criteria.
        </div>
      ) : (
        <div className='max-w-screen-xl w-full mt-4 px-4 sm:px-8 mx-auto'>
          <h1 className='text-2xl font-medium'>Results</h1>
          <p className='text-xs mb-4'>
            Lowest prices may take a second to appear.
          </p>
          <div className='mt-4'>
            {flights.map((flight, flightIndex) => (
              <div
                key={flightIndex}
                className='mb-4 p-4 bg-white shadow-md rounded-3xl'
              >
                {flight.segments &&
                flight.segments.length > 0 &&
                flight.segments[0].legs ? (
                  <div>
                    <h2 className='font-medium text-lg'>Outbound Flight</h2>
                    <p className='text-gray-600'>
                      Date:{" "}
                      {formatDate(flight.segments[0].legs[0].departureDateTime)}
                    </p>
                    {flight.segments[0].legs.map((leg, legIndex) => (
                      <div
                        key={legIndex}
                        className='flex justify-between items-center mb-4'
                      >
                        <div className='flex items-center'>
                          <img
                            src={leg.operatingCarrier?.logoUrl}
                            alt={leg.operatingCarrier?.displayName}
                            className='w-10 h-10 mr-4'
                          />
                          <div>
                            <p className='text-md'>
                              {formatTime(leg.departureDateTime)} -{" "}
                              {formatTime(leg.arrivalDateTime)}
                            </p>
                            <p className='text-gray-600'>
                              {leg.originStationCode} -{" "}
                              {leg.destinationStationCode},{" "}
                              {leg.operatingCarrier.displayName}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='text-gray-600'>
                            {calculateDuration(
                              leg.departureDateTime,
                              leg.arrivalDateTime
                            )}
                          </p>
                          <p className='text-gray-600'>Nonstop</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No leg data available for this flight.</div>
                )}
                {flight.segments &&
                flight.segments[1] &&
                flight.segments[1].legs ? (
                  <div className='border-t pt-3'>
                    <h2 className='font-medium text-lg'>Return Flight</h2>
                    <p className='text-gray-600'>
                      Date:{" "}
                      {formatDate(flight.segments[1].legs[0].departureDateTime)}
                    </p>
                    {flight.segments[1].legs.map((leg, legIndex) => (
                      <div
                        key={legIndex}
                        className='flex justify-between items-center mb-4'
                      >
                        <div className='flex items-center'>
                          <img
                            src={leg.operatingCarrier?.logoUrl}
                            alt={leg.operatingCarrier?.displayName}
                            className='w-10 h-10 mr-4'
                          />
                          <div>
                            <p className='text-md'>
                              {formatTime(leg.departureDateTime)} -{" "}
                              {formatTime(leg.arrivalDateTime)}
                            </p>
                            <p className='text-gray-600'>
                              {leg.originStationCode} -{" "}
                              {leg.destinationStationCode},{" "}
                              {leg.operatingCarrier.displayName}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='text-gray-600'>
                            {calculateDuration(
                              leg.departureDateTime,
                              leg.arrivalDateTime
                            )}
                          </p>
                          <p className='text-gray-600'>Nonstop</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No return flight data available for this flight.</div>
                )}

                {flight.purchaseLinks && flight.purchaseLinks.length > 0 ? (
                  <div className='border-t flex justify-between items-center pt-4'>
                    <div>
                      <p className='font-medium text-lg'>Total</p>
                      <p className='text-md'>
                        {flight.purchaseLinks[0].currency}$
                        {flight.purchaseLinks[0].totalPrice.toFixed(2)}
                      </p>
                      <p className='text-md'>
                        Price per person: {flight.purchaseLinks[0].currency}$
                        {(
                          flight.purchaseLinks[0].totalPrice / numAdults
                        ).toFixed(2)}
                      </p>
                      <p className='text-xs text-gray-600 pt-4'>
                        Deal from {flight.purchaseLinks[0].commerceName}
                      </p>
                    </div>
                    <a
                      href={flight.purchaseLinks[0].url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-emerald-600 drop-shadow-sm text-white py-2 px-4 rounded-3xl hover:bg-emerald-500 font-medium'
                    >
                      View Deal
                    </a>
                  </div>
                ) : (
                  <div>No purchase links available for this flight.</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
