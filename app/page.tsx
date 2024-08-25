import Head from "next/head";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Navbar />
      <div
        className='relative w-full overflow-hidden'
        style={{ height: "400px" }}
      >
        <img
          src='https://i.imgur.com/ddHANjb.png'
          className='w-full h-full object-cover object-[20%_30%]'
          alt='Fixed Height Image'
        />
        <h1 className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white whitespace-nowrap text-xl sm:text-3xl'>
          Find the best flight for the right price
        </h1>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-grow max-w-lg'>
          <input
            type='text'
            placeholder='Search...'
            className='border w-full min-w-[120px] sm:min-w-[200px] px-7 py-2 rounded-3xl text-black'
          />
        </div>
      </div>
    </>
  );
}
