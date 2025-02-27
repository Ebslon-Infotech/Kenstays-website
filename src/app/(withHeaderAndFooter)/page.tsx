"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import offer1 from "@/assets/Homepage/offer1.webp";
import offer2 from "@/assets/Homepage/offer2.webp";
import offer3 from "@/assets/Homepage/offer3.webp";
import offer4 from "@/assets/Homepage/offer4.webp";

import Singapore from "@/assets/Homepage/Gallery/singapore.webp";
import Singapore1 from "@/assets/Homepage/Gallery/singapore2.webp";
import Seoul from "@/assets/Homepage/Gallery/seoul.webp";
import Sapporo from "@/assets/Homepage/Gallery/sapporo.webp";
import Harbin from "@/assets/Homepage/Gallery/harbin.webp";

import Hotel from "@/assets/Homepage/Gallery/hotel.webp";
import Cottage from "@/assets/Homepage/Gallery/cottages.webp";
import Cabin from "@/assets/Homepage/Gallery/cabins.webp";
import Resort from "@/assets/Homepage/Gallery/resort.webp";
import Glamping from "@/assets/Homepage/Gallery/glamping.webp";
import Villas from "@/assets/Homepage/Gallery/villas.webp";
import Appartment from "@/assets/Homepage/Gallery/appartment.webp";

import line1 from "@/assets/Homepage/line-1.webp";
import line2 from "@/assets/Homepage/line-2.webp";

import go1 from "@/assets/Homepage/go1.webp"
import go2 from "@/assets/Homepage/go2.webp"

import background1 from "@/assets/Homepage/background1.webp";
import travell from "@/assets/Homepage/travell.webp";
import { cities, discover, exploreIndia, exploreWorld } from "@/assets/data";

import TravelBooking from "../_components/travellBooking";
import OffersSection from "../_components/offers";
import CitiesCard from "@/components/citiesCard";
import DiscoverCard from "@/components/discoverCard";
import ExploreCard from "@/components/exploreCard";
import GetInTouch from "../_components/getInTouch";


export default function page() {
  return (
    <>
      <div className="h-screen">
        <TravelBooking />
      </div>

      {/* What we offer */}
      <div className="bg-[#F8F8F8] flex items-center justify-between py-8 px-[15rem] w-full ">
        <ul className="flex items-center justify-between gap-4 w-full">
          <li className="flex items-center gap-2">
            <Image src={offer1} alt="offer1" width={40} height={40} />
            <p className="font-medium text-[1.12rem]">Best Price Gurantee</p>
          </li>
          <li className="flex items-center gap-2">
            <Image src={offer4} alt="offer2" width={40} height={40} />
            <p className="font-medium text-[1.12rem]">Transparent Pricing</p>
          </li>
          <li className="flex items-center gap-2">
            <Image src={offer2} alt="offer3" width={40} height={40} />
            <p className="font-medium text-[1.12rem]">24/7 Concierge</p>
          </li>
          <li className="flex items-center gap-2">
            <Image src={offer3} alt="offer4" width={40} height={40} />
            <p className="font-medium text-[1.12rem]">Expert Assistance</p>
          </li>
        </ul>
      </div>

      {/* Offers */}
      <div className="my-16">
        <OffersSection />
      </div>

      {/* Trending Cities */}
      <div className="p-10">
        <div className="max-w-[90rem] mx-auto">
          <h1
            className="text-6xl font-semibold text-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Trending Cities
          </h1>
          <p className="text-gray-500 text-[1.13rem] font-medium mb-4">
            These popular destination have lot to offer
          </p>

          <div className="grid grid-cols-4 gap-8 mt-12">
            {cities.map((city, index) => (
              <CitiesCard city={city} key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* DIscover Weekly */}
      <div className="p-10">
        <div className="max-w-[90rem] mx-auto">
          <h1
            className="text-6xl font-semibold text-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Discover Weekly
          </h1>
          <p className="text-gray-500 text-[1.13rem] font-medium mb-4 capitalize">
            Explore new horizons every week
          </p>

          <div className="grid grid-cols-4 gap-8 mt-12">
            {discover.map((discover, index) => (
              <DiscoverCard discover={discover} key={index} />
            ))}
          </div>

          <div className="flex items-center justify-center mt-12">
            <button className="w-fit border border-secondarycolor text-secondarycolor px-4 py-3 rounded-[0.25rem] font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Explore India */}
      <div className="p-10">
        <div className="max-w-[90rem] mx-auto">
          <h1
            className="text-6xl font-semibold text-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explore India
          </h1>
          <p className="text-gray-500 text-[1.13rem] font-medium mb-4 capitalize">
            These Popular destination have alot to offer
          </p>

          <div className="grid grid-cols-4 gap-8 mt-12">
            {exploreIndia.map((discover, index) => (
              <ExploreCard explore={discover} key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Explore World */}
      <div className="p-10">
        <div className="max-w-[90rem] mx-auto">
          <h1
            className="text-6xl font-semibold text-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explore India
          </h1>
          <p className="text-gray-500 text-[1.13rem] font-medium mb-4 capitalize">
            These Popular destination have alot to offer
          </p>

          <div className="grid grid-cols-4 gap-8 mt-12">
            {exploreWorld.map((discover, index) => (
              <ExploreCard explore={discover} key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Inspiration */}
      <div className="p-10">
        <div className="max-w-[90rem] mx-auto">
          <h1
            className="text-6xl font-semibold text-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Get Inspiration for your next trip
          </h1>

          <div className="container my-10">
            <div className="grid grid-cols-4 gap-6 h-[600px]">
              {/* Large banner image - spans 3 columns */}
              <div className="col-span-3 relative">
                <Image
                  src={Singapore}
                  alt="Singapore Temple with Autumn Colors"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3">
                  Singapore
                </div>
              </div>

              {/* Tall right image - spans 2 rows */}
              <div className="row-span-2 relative">
                <Image
                  src={Singapore1}
                  alt="Singapore Night Scene"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3">
                  Singapore
                </div>
              </div>

              {/* Bottom row with 3 images */}
              <div className="col-span-3 grid grid-cols-3 gap-4">
                <div className="relative">
                  <Image
                    src={Harbin}
                    alt="Harbin Ice Festival"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3">
                    Harbin
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={Seoul}
                    alt="Seoul Light Festival"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3">
                    Seoul
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={Sapporo}
                    alt="Sapporo Winter"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3">
                    Sapporo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div className="p-10">
        <div className="max-w-[90rem] mx-auto">
          <h1
            className="text-6xl font-semibold text-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Browse by Property Type
          </h1>
          <p className="text-gray-500 text-[1.13rem] font-medium mb-4 capitalize">
            These Popular destination have alot to offer
          </p>

          <div className="container my-10">
            <div className="grid grid-cols-4 gap-6 h-[600px]">
              {/* Large banner image - spans 3 columns */}
              <div className="col-span-1 row-span-2 relative">
                <Image
                  src={Hotel}
                  alt="Hotel"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3 rounded-b-lg">
                  Hotels
                </div>
              </div>

              <div className="col-span-1 relative">
                <Image
                  src={Appartment}
                  alt="Appartment"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3 rounded-b-lg">
                  Appartments
                </div>
              </div>

              <div className="col-span-1 relative">
                <Image
                  src={Resort}
                  alt="Resort"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3 rounded-b-lg">
                  Resorts
                </div>
              </div>

              <div className="col-span-1 relative">
                <Image
                  src={Villas}
                  alt="Villas"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3 rounded-b-lg">
                  Villas
                </div>
              </div>

              <div className="col-span-1 relative">
                <Image
                  src={Cabin}
                  alt="Cabin"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3 rounded-b-lg">
                  Cabins
                </div>
              </div>

              <div className="col-span-1  relative">
                <Image
                  src={Cottage}
                  alt="Cottage"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3 rounded-b-lg">
                  Cottages
                </div>
              </div>

              <div className="col-span-1 relative">
                <Image
                  src={Glamping}
                  alt="Glamping"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="bg-black/50 bg-opacity-80 text-white text-center font-medium absolute bottom-0 w-full py-3 rounded-b-lg">
                  Glamping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Travell */}
      <div className="relative">
        <Image src={background1} alt="background" />
        <div className="absolute top-1/2 left-[6%] bottom-1/2 flex items-center gap-10 justify-between w-full px-20">
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex items-center gap-2">
              <h2
                className={`text-3xl font-semibold text-primarycolor `}
                style={{ fontFamily: "var(--font-dancing-script)" }}
              >
                Take a Tour
              </h2>
              <Image
                src={line1}
                alt="Home Page"
                className={`w-10 text-primarycolor`}
              />
              <Image
                src={line2}
                alt="Home Page"
                className={`w-[8px] h-[1px] text-priamrycolor`}
              />
              <Image
                src={line2}
                alt="Home Page"
                className={`w-[8px] h-[1px] text-primarycolor`}
              />
            </div>
            <h1
              className={`text-start text-[3.35rem] leading-[2.8rem] font-medium   capitalize`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Discover Our Travel <br /> Guideline
            </h1>
            <h3 className="text-start text-[1.2rem] font-medium text-gray-600 pr-16">
              Embark on worry-free adventures with our 'Discover Our Travel
              Guidelines'. From trip preparation to cultural etiquette, our
              curated guide offers expert insights for all explorers. Whether
              you're a seasoned globetrotter or a first-time traveler, find
              practical wisdom to enhance every aspect of your journey. Let's
              navigate the world together!
            </h3>

            <ul className="text-start text-[1.2rem] font-medium text-gray-600 px-8 space-y-4">
              <li className="list-disc pl-4">
                Expert Tips for Seamless Journeys
              </li>
              <li className="list-disc pl-4">Reasonable Travel Practices</li>
              <li className="list-disc pl-4">Immersive cultural Insights</li>
              <li className="list-disc pl-4">
                Transformative Adventures Begin Here
              </li>
            </ul>
          </div>
          <div className="w-full">
            <Image src={travell} alt="travell" height={600} width={600} />
          </div>
        </div>
      </div>

      <div className=" h-[75vh]">
      <GetInTouch />
      </div>

      <div className="bg-[#E5F0F3] py-6 px-56 flex gap-6 justify-around items-center">
        <div className="flex gap-4 items-start">
         <Image src={go1} alt="kenstay" height={180} width={400} />
         <div className="flex flex-col justify-between gap-4 h-full">
           <h2 className="text-5xl font-semibold px-10 mb-6" style={{fontFamily: "var(--font-playfair)"}}>
            Go Further with the Kenstay app
           </h2>
           <p className="text-lg font-medium px-10 leading-5 mb-6">
           Save on select hotels and earn double points when you book on the app. Our app deals help you to save on trips so you can travel more and manage it all on the go.
           </p>
           <h3 className="text-primarycolor text-[1.5rem] font-medium pl-10" style={{fontFamily: "var(--font-playfair)"}}>
           Scan the QR code with your device camera and download our app
           </h3>
         </div>
         </div>
         <Image src={go2} alt="kenstay" height={200} width={200} />
      </div>
    </>
  );
}
