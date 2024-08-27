import React from "react";

const PopularDestinationsGrid: React.FC = () => {
  const destinations = [
    {
      city: "Miami",
      price: "$74",
      image: "https://placehold.co/600x400/EEE/31343C",
    },
    {
      city: "Dallas",
      price: "$122",
      image: "https://placehold.co/600x400/EEE/31343C",
    },
    {
      city: "Las Vegas",
      price: "$136",
      image: "https://placehold.co/600x400/EEE/31343C",
    },
    {
      city: "London",
      price: "$609",
      image: "https://placehold.co/600x400/EEE/31343C",
    },
    {
      city: "Dhaka City",
      price: "$846",
      image: "https://placehold.co/600x400/EEE/31343C",
    },
  ];

  return (
    <div className='max-w-screen-xl mx-auto mt-4 bg-white rounded-2xl'>
      <h2 className='text-black text-lg font-medium'>Popular destinations</h2>
      <p className='text-xs text-gray-600 mb-4'>
        Fare data may be cached and not reflect real-time pricing
      </p>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
        {destinations.map((destination, index) => (
          <a
            href='#'
            key={index}
            className='block rounded-lg overflow-hidden group'
          >
            <div className='group-hover:underline'>
              <img
                src={destination.image}
                alt={destination.city}
                className='w-full h-48 object-cover group-hover:opacity-80'
              />
              <div className='p-2'>
                <p className='text-black text-lg'>{destination.city}</p>
                <p className='text-sm text-gray-600'>
                  from {destination.price}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinationsGrid;
