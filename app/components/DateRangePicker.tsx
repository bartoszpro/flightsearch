"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

const DateRangePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 7));
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <div
        className='flex items-center border border-gray-300 rounded-md p-2 cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaCalendarAlt className='text-gray-500 mr-2' />
        <span>
          {startDate && endDate
            ? `${format(startDate, "MMM d")} — ${format(endDate, "MMM d")}`
            : "Select dates"}
        </span>
      </div>

      {isOpen && (
        <div className='absolute z-10 bg-white p-4 rounded-md shadow-lg mt-2'>
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
