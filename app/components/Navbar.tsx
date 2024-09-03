"use client";
import { useState } from "react";
import { airports } from "../data/airports";
import { IoSearchOutline } from "react-icons/io5";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<string>("USD");
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { city: string; code: string; country: string }[]
  >([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = airports
        .filter(
          (airport) =>
            airport.city &&
            airport.country &&
            typeof airport.city === "string" &&
            airport.city.toLowerCase().includes(query.toLowerCase())
        )
        .map((airport) => ({
          city: airport.city as string,
          code: airport.code as string,
          country: airport.country as string,
        }));

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const randomAirportCodes = [
    "LHR", // London Heathrow
    "CDG", // Paris Charles de Gaulle
    "HND", // Tokyo Haneda
    "SYD", // Sydney
    "DXB", // Dubai
    "JNB", // Johannesburg
    "FRA", // Frankfurt
    "SIN", // Singapore Changi
    "AMS", // Amsterdam Schiphol
    "GRU", // São Paulo-Guarulhos
    "WAW", // Warsaw Chopin
    "PEK", // Beijing Capital
    "ICN", // Incheon
    "BKK", // Suvarnabhumi
  ];

  const getRandomLink = () => {
    const randomIndex = Math.floor(Math.random() * randomAirportCodes.length);
    const randomDestination = randomAirportCodes[randomIndex];
    return `/pages/results?source=JFK&destination=${randomDestination}&startDate=2024-09-15&endDate=2024-09-21&classOfService=ECONOMY&numAdults=1&tripType=Round%20Trip`;
  };

  return (
    <header className='text-black drop-shadow-sm text-sm z-50 relative'>
      <div className='container mx-auto max-w-screen-xl flex justify-between items-center p-4'>
        <div>
          <a
            href='/'
            className='flex items-center space-x-2 text-with-drop-effect text-2xl font-medium sm:text-2xl text-emerald-600 hover:text-opacity-60 hover:opacity-60'
            data-text='FlightSearch'
          >
            <img
              src='https://i.imgur.com/Fljj5sd.png'
              className='h-8 w-auto'
              alt='Flight Search Logo'
            />
            <span>FlightSearch</span>
          </a>
          <p className='text-xs text-gray-600 leading-none mt-1'></p>
        </div>

        <div className='flex-1 flex justify-center items-center space-x-2 sm:space sm:space-x-6 mx-6'>
          <div className='relative flex-grow max-w-xs sm:max-w-lg'>
            <div className='flex items-center border w-full min-w-[120px] sm:min-w-[200px] px-4 py-2 rounded-3xl text-black focus-within:outline-emerald-600 relative z-[9999]'>
              <IoSearchOutline className='text-gray-400 mr-3' />
              <input
                type='text'
                value={query}
                onChange={handleSearchChange}
                placeholder='Search'
                className='w-full bg-transparent focus:outline-none'
              />
            </div>
            {suggestions.length > 0 && (
              <div className='absolute bg-white border mt-1 rounded-md shadow-lg w-full max-h-60 overflow-y-auto z-[9999]'>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className='p-2 hover:bg-emerald-100 cursor-pointer'
                    onClick={() => {
                      setQuery(
                        `${suggestion.city}, ${suggestion.country} (${suggestion.code})`
                      );
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.city}, {suggestion.country} ({suggestion.code})
                  </div>
                ))}
              </div>
            )}
          </div>
          <nav className='font-medium hidden lg:flex space-x-2 sm:space-x-6'>
            <a href='/' className='hover:text-emerald-600'>
              Flights
            </a>
            <a href={getRandomLink()} className='hover:text-emerald-600'>
              Discover
            </a>
            {/*
            <a href='#' className='hover:text-emerald-600 '>
              More
            </a> */}
          </nav>
        </div>

        <div className='font-medium hidden lg:flex items-center space-x-2 sm:space-x-6'>
          <div className='flex items-center'>
            <label htmlFor='currency' className='mr-2'>
              Currency:
            </label>
            <select
              id='currency'
              value={currency}
              onChange={handleCurrencyChange}
              className='px-2 py-1 rounded-md text-black focus:outline-none focus:ring focus:ring-emerald-600'
            >
              <option value='USD'>USD</option>
            </select>
          </div>
          {/*
          <a
            href='#'
            className='hover:bg-emerald-500 whitespace-nowrap bg-emerald-600 p-2 rounded-3xl text-white'
          >
            Sign In
          </a> */}
        </div>

        <div className='lg:hidden'>
          <button onClick={toggleMenu} className='focus:outline-none'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className='lg:hidden'>
          <nav className='flex flex-col items-center space-y-4 pb-4 bg-white'>
            <a href='#' className='hover:text-gray-200'>
              Flights
            </a>
            <a href={getRandomLink()} className='hover:text-gray-200'>
              Discover
            </a>
            <a href='#' className='hover:text-gray-200'>
              More
            </a>
            <div className='flex items-center'>
              <label htmlFor='currency-mobile' className='mr-2'>
                Currency:
              </label>
              <select
                id='currency-mobile'
                value={currency}
                onChange={handleCurrencyChange}
                className='px-2 py-1 rounded-md text-black'
              >
                <option value='USD'>USD</option>
              </select>
            </div>
            <a href='#' className='hover:text-gray-200'>
              Sign In
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
