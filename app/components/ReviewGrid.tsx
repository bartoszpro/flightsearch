import React from "react";

interface Review {
  airline: string;
  reviews: string;
  rating: number;
  category: string;
  reviewText: string;
  reviewer: string;
  imageUrl: string;
}

const reviews: Review[] = [
  {
    airline: "American Airlines",
    reviews: "80,445",
    rating: 4,
    category: "Customer Service",
    reviewText:
      "They are a good crew, and were very responsible for taking care of my child on the flight from Baltimore to Des Moines.",
    reviewer: "John Doe",
    imageUrl: "https://i.imgur.com/vfeNkgz.png",
  },
  {
    airline: "Delta Air Lines",
    reviews: "62,823",
    rating: 4,
    category: "Inflight Entertainment",
    reviewText:
      "My husband and I traveled from Amsterdam to Atlanta and as always, flying Delta was a pleasure.",
    reviewer: "Jane Smith",
    imageUrl: "https://i.imgur.com/vfeNkgz.png",
  },
  {
    airline: "United Airlines",
    reviews: "55,560",
    rating: 4,
    category: "Customer Service",
    reviewText:
      "Chuy Santiago my gate agent was extremely helpful and after having a long day was able to help me resolve my issue with a smile on his face.",
    reviewer: "Emily Johnson",
    imageUrl: "https://i.imgur.com/vfeNkgz.png",
  },
  {
    airline: "JetBlue",
    reviews: "21,015",
    rating: 4,
    category: "Legroom",
    reviewText:
      "I had a flight with JetBlue from Tulum in Mexico to Dublin, Ireland, with a connection in JFK.",
    reviewer: "Michael Brown",
    imageUrl: "https://i.imgur.com/vfeNkgz.png",
  },
];

const ReviewGrid: React.FC = () => {
  return (
    <div className='bg-[#f0f0f0] p-6 rounded-2xl shadow-lg max-w-screen-xl mx-auto mt-10'>
      <h2 className='text-emerald-600 text-center text-2xl font-medium mb-4'>
        See traveler reviews
      </h2>
      <p className='text-center text-gray-500 mb-6'>
        Customer service, legroom, meals—find out what travelers loved (or
        didn’t love) in their airline reviews.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className='bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between'
          >
            <div>
              <h3 className='font-medium text-md'>{review.airline}</h3>
              <p className='text-sm text-gray-500'>{review.reviews} reviews</p>
              <p className='text-xs text-gray-500'>
                Top rated in {review.category}
              </p>
              <p className='text-sm mt-2'>"{review.reviewText}"</p>
            </div>
            <div className='flex items-center mt-4'>
              <img
                src={review.imageUrl}
                alt={review.reviewer}
                className='w-8 h-8 rounded-full mr-2'
              />
              <span className='text-xs text-gray-600'>{review.reviewer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewGrid;
