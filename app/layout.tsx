import type { Metadata } from "next";
import {
  Aladin,
  Alegreya,
  Aleo,
  Arvo,
  Besley,
  Graduate,
  Inter,
  Lato,
  Modern_Antiqua,
  Montserrat,
  Open_Sans,
  Poppins,
  Roboto_Slab,
  Rokkitt,
  Zen_Antique_Soft,
} from "next/font/google";
import "./globals.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cheap Flights, Airline Tickets and Airfare Search - FlightSearch",
  description: "FlightSearch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='description' content='FlightSearch' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Cheap Flights, Airline Tickets and Airfare Search - FlightSearch
        </title>
      </head>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
