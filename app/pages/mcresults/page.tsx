"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface FlightData {
  status: boolean;
  message: string;
  // Define other expected fields here
}

export default function MultiCityResults() {
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const searchFlights = async () => {
      const options = {
        method: "GET",
        url: "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlightsMultiCity",
        params: {
          legs: JSON.stringify([
            {
              sourceAirportCode: "EWR",
              destinationAirportCode: "PHX",
              date: "2024-09-15",
            },
            {
              sourceAirportCode: "LAS",
              destinationAirportCode: "EWR",
              date: "2024-09-21",
            },
          ]),
          classOfService: "ECONOMY",
          sortOrder: "ML_BEST_VALUE",
          currencyCode: "USD",
        },
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
        },
      };

      console.log("Sending API request with the following options:", options);

      try {
        const response = await axios.request(options);
        setFlightData(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setErrorMessage("Failed to fetch flight data.");
      }
    };

    searchFlights();
  }, []);

  return (
    <div>
      <h1>Multi-City Flight Results</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {flightData ? (
        <pre>{JSON.stringify(flightData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
