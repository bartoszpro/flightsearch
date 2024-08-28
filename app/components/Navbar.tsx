"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<string>("USD");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency(event.target.value);
  };

  return (
    <header className='text-black drop-shadow-sm'>
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
          <p className='text-xs text-gray-600 leading-none mt-1'>
            Powered by Tripadvisor.
          </p>
        </div>

        <div className='flex-1 flex justify-center items-center space-x-2 sm:space-x-6'>
          <div className='relative flex-grow max-w-xs sm:max-w-lg'>
            <input
              type='text'
              placeholder='Search...'
              className='border w-full min-w-[120px] sm:min-w-[200px] px-4 sm:px-7 py-2 rounded-3xl text-black focus:outline-emerald-600'
            />
          </div>
          <nav className='font-medium hidden lg:flex space-x-2 sm:space-x-6'>
            <a href='/' className='hover:text-emerald-600'>
              Flights
            </a>
            <a href='#' className='hover:text-emerald-600'>
              Discover
            </a>
            <a href='#' className='hover:text-emerald-600'>
              More
            </a>
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
              <option value='EUR'>EUR</option>
              <option value='GBP'>GBP</option>
            </select>
          </div>
          <a href='#' className='hover:text-emerald-600 whitespace-nowrap'>
            Sign In
          </a>
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
            <a href='#' className='hover:text-gray-200'>
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
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
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
