"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdHeartEmpty , IoIosAirplane } from "react-icons/io";
import { GoShareAndroid } from "react-icons/go";
import { BsSuitcase, BsBackpack3 } from "react-icons/bs";
import { PiSuitcaseRollingLight } from "react-icons/pi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import Support from "@/assets/Flight/support.webp"

import Promo from "@/components/promo";

const FlightDetailsPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 my-10">
      {/* Header */}
      <h1 className="text-4xl font-semibold mb-8"  style={{ fontFamily: "var(--font-playfair-display)" }}>Your flight to Dubai</h1>

      {/* Airline Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-semibold">Air India AI947</div>
        <div className="flex gap-2">
          <button className="p-2 border rounded-md hover:bg-gray-100">
            <IoMdHeartEmpty size={20} className="text-gray-400" />
          </button>
          <button className="p-2 border rounded-md hover:bg-gray-100">
            <GoShareAndroid size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <div className="text-xl font-semibold">20:20</div>
          <div className="text-gray-500 text-sm">DEL (DELHI) 18 JAN 2023</div>
          <div className="flex items-center text-yellow-500 mt-1">
            <HiOutlineLocationMarker size={16} className="mr-2" />
            <span className="text-xs">Indira Gandhi International Airport</span>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 min-w-[150px] px-4">
          <div className="flex items-center text-gray-500 text-xs">
            <span>3h 55m</span>
          </div>

          <div className="relative w-[80%] flex items-center justify-center my-2">
            <hr className="w-full border-gray-300" />
            <div className="bg-white px-2 absolute">
              <IoIosAirplane size={20} className="text-gray-600" />
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <span>1 stop</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-sm mt-2"></div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-semibold">22:45</div>
          <div className="text-gray-500 text-sm">DXB(DUBAI) 18 JAN 2023</div>
          <div className="flex items-center text-yellow-500 mt-1">
            <HiOutlineLocationMarker size={16} className="mr-2" />
            <span className="text-xs">Indira Gandhi International Airport</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Included Baggage</h3>
          <p className="text-gray-500 text-sm mb-4">
            The total baggage included in the price
          </p>

          <div className="space-y-6">
            {/* Personal Item */}
            <div className="flex items-start justify-between">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <BsBackpack3 size={30} className="text-gray-700" />
                </div>
                <div>
                  <div className="font-medium text-sm">1 Personal item</div>
                  <div className="text-gray-500 text-xs">
                    Fits under the seat in front of you
                  </div>
                </div>
              </div>
              <div className="text-blue-500 text-xs">Included</div>
            </div>

            {/* Cabin Bag */}
            <div className="flex items-start justify-between">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <BsSuitcase size={30} className="text-gray-700" />
                </div>
                <div>
                  <div className="font-medium text-sm">1 Cabin bag</div>
                  <div className="text-gray-500 text-xs">
                    25 x 35 x 55 cm · Up to 8 kg
                  </div>
                </div>
              </div>
              <div className="text-blue-500 text-xs">Included</div>
            </div>

            {/* Personal Item */}
            <div className="flex items-start justify-between">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <PiSuitcaseRollingLight size={30} className="text-gray-700" />
                </div>
                <div>
                  <div className="font-medium text-sm">1 Personal item</div>
                  <div className="text-gray-500 text-xs">Up to 30 kg</div>
                </div>
              </div>
              <div className="text-blue-500 text-xs">Included</div>
            </div>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
          <p className="text-gray-500 text-sm mb-4">Text here</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 mt-1">
                <Image src={Support} alt="Support" width={25} height={25} />
              </div>
              <div>
                <div className="font-medium text-sm">
                  Our 24/7 Support for your booked flight
                </div>
              </div>
            </div>
            <div className="text-blue-500 text-xs">Included</div>
          </div>
        </div>
      </div>

      {/* Price and Booking */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-xl font-semibold">INR 28,490.89</div>
          <div className="text-gray-500 text-sm">Total price for all Travelers</div>
        </div>
        <Link href="/book-flight" className="bg-secondarycolor text-white px-8 py-3 rounded-md font-medium transition-transform duration-300 ease-in-out hover:scale-105">
          Book Now
        </Link>
      </div>

      {/* Promo Banner */}
      <Promo />
    </div>
  );
};

export default FlightDetailsPage;
