import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className='bg-[#f0f0f0] py-6 mt-10'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-8'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-gray-600 text-sm'>
            &copy; {new Date().getFullYear()} FlightSearch. All rights reserved.
          </p>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            <a href='#' className='text-gray-600 hover:text-gray-900 text-sm'>
              Privacy Policy
            </a>
            <a href='#' className='text-gray-600 hover:text-gray-900 text-sm'>
              Terms of Service
            </a>
            <a href='#' className='text-gray-600 hover:text-gray-900 text-sm'>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
