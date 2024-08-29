import Head from "next/head";
import Navbar from "./components/Navbar";
import ReviewGrid from "./components/ReviewGrid";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import PopularDestinationsGrid from "./components/PopularDestinationsGrid";
import SearchBar from "./components/SearchBar";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Navbar />
      <div
        className='relative w-full'
        style={{ height: "400px", overflow: "visible", zIndex: 10 }}
      >
        <img
          src='https://images6.alphacoders.com/526/526622.jpg'
          className='w-full h-full object-cover object-[20%_56%]'
          alt='Fixed Height Image'
          style={{ zIndex: 1 }}
        />
        <h1 className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md whitespace-nowrap text-xl sm:text-3xl text-outline-emerald-mob font-medium text-outline-emerald-reg'>
          Find the best flight for the right price
        </h1>
        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4'
          style={{ zIndex: 20 }}
        >
          <SearchBar />
        </div>
      </div>
      <div className='max-w-screen-xl mx-auto mt-4 bg-white rounded-2xl'>
        <h2 className='text-black text-lg font-medium'>Recent searches</h2>
        <p className='text-black text-sm'></p>
      </div>

      <PopularDestinationsGrid />

      <div className='max-w-screen-xl mx-auto mt-4 bg-white rounded-2xl'>
        <h2 className='text-black text-lg font-medium'>Best Flight Deals</h2>
        <p className='text-black text-sm'>
          No need to shop multiple sites any more. We&apos;ve already done that
          by searching hundreds of cheap flights for you- scouring premium
          airlines, low-cost carriers and the biggest online travel agencies for
          the best deals. We&apos;ll even check alternate dates and nearby
          airports to help you save money, time, even sanity on airline tickets.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Home;
