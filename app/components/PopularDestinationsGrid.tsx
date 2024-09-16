import React from "react";

const PopularDestinationsGrid: React.FC = () => {
  const destinations = [
    {
      city: "Miami",
      price: "$107",
      image: "https://www.triptipedia.com/tip/img/FenEayqS9.jpg",
      link: "/pages/results?source=JFK&destination=MIA&startDate=2024-09-15&endDate=2024-09-21&classOfService=ECONOMY&numAdults=1&tripType=Round%20Trip",
    },
    {
      city: "Dallas",
      price: "$154",
      image:
        "https://www.parker.edu/wp-content/uploads/2022/04/iStock-1286951857.jpg",
      link: "/pages/results?source=JFK&destination=DAL&startDate=2024-09-15&endDate=2024-09-21&classOfService=ECONOMY&numAdults=1&tripType=Round%20Trip",
    },
    {
      city: "Las Vegas",
      price: "$135",
      image:
        "https://greennv.com/wp-content/uploads/2021/07/Cannabis-Tourism-in-Las-Vegas.jpeg",
      link: "/pages/results?source=EWR&destination=LAS&startDate=2024-09-15&endDate=2024-09-21&classOfService=ECONOMY&numAdults=1&tripType=Round%20Trip",
    },
    {
      city: "London",
      price: "$598",
      image:
        "https://www.planetware.com/wpimages/2023/01/england-london-top-attractions-things-to-do-intro-paragraph-big-ben-thames-bridge.jpg",
      link: "/pages/results?source=JFK&destination=LHR&startDate=2024-09-15&endDate=2024-09-21&classOfService=ECONOMY&numAdults=1&tripType=Round%20Trip",
    },
    {
      city: "Sydney",
      price: "$1,539",
      image:
        "https://media2.thrillophilia.com/images/photos/000/110/418/original/1606295412_shutterstock_1025960785.jpg?width=975&height=600",
      link: "/pages/results?source=JFK&destination=SYD&startDate=2024-09-15&endDate=2024-09-21&classOfService=ECONOMY&numAdults=1&tripType=Round%20Trip",
    },
  ];

  return (
    <div className='max-w-screen-xl mx-auto mt-4 bg-white rounded-2xl px-2'>
      <h2 className='text-black text-lg font-medium'>Popular destinations</h2>
      <p className='text-xs text-gray-600 mb-4'>
        Fare data may be cached and not reflect real-time pricing.
      </p>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
        {destinations.map((destination, index) => (
          <a
            href={destination.link}
            key={index}
            className='block overflow-hidden group'
          >
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
