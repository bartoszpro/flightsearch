import React from "react";
import { FaSearchDollar, FaFilter, FaShieldAlt } from "react-icons/fa"; // Example icons

const features = [
  {
    icon: <FaSearchDollar size={30} className='text-emerald-600' />,
    title: "Get the best deals",
    description:
      "Compare flight prices from hundreds of airlines and travel sites in one place.",
  },
  {
    icon: <FaFilter size={30} className='text-emerald-600' />,
    title: "Customise your results",
    description:
      "Filter for your preferred airlines, flight times, desired price, and more.",
  },
  {
    icon: <FaShieldAlt size={30} className='text-emerald-600' />,
    title: "Search without worry",
    description:
      "We’re completely free to use—no hidden charges or fees on flight prices at all.",
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <div className='max-w-screen-xl mx-auto mt-10   rounded-2xl  grid grid-cols-1 sm:grid-cols-3 gap-6'>
      {features.map((feature, index) => (
        <div key={index} className='text-center'>
          <div className='flex justify-center mb-4'>{feature.icon}</div>
          <h3 className='text-lg font-medium mb-2'>{feature.title}</h3>
          <p className='text-black text-sm'>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
