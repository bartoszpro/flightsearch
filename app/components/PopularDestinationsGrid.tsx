import React from "react";

const PopularDestinationsGrid: React.FC = () => {
  const destinations = [
    {
      city: "Miami",
      price: "$74",
      image: "https://www.triptipedia.com/tip/img/FenEayqS9.jpg",
    },
    {
      city: "Dallas",
      price: "$122",
      image:
        "https://www.parker.edu/wp-content/uploads/2022/04/iStock-1286951857.jpg",
    },
    {
      city: "Las Vegas",
      price: "$136",
      image:
        "https://greennv.com/wp-content/uploads/2021/07/Cannabis-Tourism-in-Las-Vegas.jpeg",
    },
    {
      city: "London",
      price: "$609",
      image:
        "https://www.planetware.com/wpimages/2023/01/england-london-top-attractions-things-to-do-intro-paragraph-big-ben-thames-bridge.jpg",
    },
    {
      city: "Sydney",
      price: "$1,268",
      image:
        "https://media2.thrillophilia.com/images/photos/000/110/418/original/1606295412_shutterstock_1025960785.jpg?width=975&height=600",
    },
  ];

  return (
    <div className='max-w-screen-xl mx-auto mt-4 bg-white rounded-2xl'>
      <h2 className='text-black text-lg font-medium'>Popular destinations</h2>
      <p className='text-xs text-gray-600 mb-4'>
        Fare data may be cached and not reflect real-time pricing.
      </p>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
        {destinations.map((destination, index) => (
          <a href='#' key={index} className='block overflow-hidden group'>
            <div className='group-hover:underline'>
              <img
                src={destination.image}
                alt={destination.city}
                className='w-full h-48 object-cover group-hover:opacity-80 rounded-lg'
              />
              <div className='py-2'>
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
