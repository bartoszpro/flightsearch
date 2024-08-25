"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
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

export default function Results() {
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
    const searchFlights = async () => {
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
            "x-rapidapi-key":
              "70a6cb126emsha5ea9357a6dc219p1faacajsnebc68dfe6202",
            "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        console.log(response.data);

        const allFlights = response.data?.data?.flights || [];
        const validFlights = allFlights.filter((flight: FlightData) =>
          flight.purchaseLinks?.some((link) => link.totalPrice > 0)
        );

        if (validFlights.length > 0) {
          setFlights(validFlights.slice(0, 3));
        } else {
          setErrorMessage(
            "No flights found with valid pricing for the given criteria."
          );
        }
      } catch (error) {
        setErrorMessage("Failed to fetch flights. Please try again later.");
      } finally {
        setIsLoading(false);
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
  }, [source, destination, startDate, endDate, classOfService, numAdults]);

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

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className='mt-4 text-blue-600'>Loading...</div>
      ) : errorMessage ? (
        <div className='mt-4 text-red-500'>{errorMessage}</div>
      ) : flights.length === 0 ? (
        <div className='mt-4 text-red-500'>
          No flights found for the given criteria.
        </div>
      ) : (
        <div className='max-w-screen-xl w-full mt-4 px-4 sm:px-8 mx-auto'>
          <h1 className='text-2xl font-bold'>Results</h1>
          <p className='text-xs  mb-4'>Currently limited results.</p>
          <div className='mt-4'>
            {flights.map((flight, flightIndex) => (
              <div
                key={flightIndex}
                className='mb-4 p-4 bg-white shadow-md rounded-lg'
              >
                {flight.segments &&
                flight.segments.length > 0 &&
                flight.segments[0].legs ? (
                  <>
                    <div>
                      <h2 className='font-bold text-lg mb-2'>
                        Outbound Flight
                      </h2>
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
                              <p className=' text-lg'>
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
                    {flight.segments[1] && flight.segments[1].legs ? (
                      <div className='border-t pt-3'>
                        <h2 className='font-bold text-lg mb-2'>
                          Return Flight
                        </h2>
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
                                <p className=' text-lg'>
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
                      <div>
                        No return flight data available for this flight.
                      </div>
                    )}
                  </>
                ) : (
                  <div>No leg data available for this flight.</div>
                )}
                {flight.purchaseLinks && flight.purchaseLinks.length > 0 ? (
                  <div className='border-t flex justify-between items-center pt-4'>
                    <div>
                      <p className='font-bold text-lg'>Total</p>
                      <p className='text-lg'>
                        {flight.purchaseLinks[0].currency}$
                        {flight.purchaseLinks[0].totalPrice.toFixed(2)}
                      </p>
                      <p className='text-lg'>
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
                      className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-600'
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
