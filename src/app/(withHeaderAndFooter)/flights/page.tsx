"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  airlineData,
  stops,
  departureTimeRanges,
  arrivalTimeRanges,
  airlineDetails,
} from "@/assets/data";

import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowDown, IoIosAirplane } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { BsSuitcase, BsBackpack3 } from "react-icons/bs";
import { PiSuitcaseRollingLight } from "react-icons/pi";

export default function page() {
  const [visibleItems, setVisibleItems] = useState(6);
  const [selectedStop, setSelectedStop] = useState(stops[0]?.id || null);
  const [airlines, setAirlines] = useState(airlineData);
  const [duration, setDuration] = useState(10);

  const showAll = visibleItems === airlineData.length;
  const handleCheckboxChange = (id: any) => {
    setAirlines((prev) =>
      prev.map((airline) =>
        airline.id === id ? { ...airline, checked: !airline.checked } : airline
      )
    );
  };

  const handleRadioChange = (id: any) => {
    setSelectedStop(id);
  };

  return (
    <>
      <div className="max-w-[85rem] mx-auto px-4 md:px-10 lg:px-20 py-4 flex justify-between items-center py-3 border border-gray-300 rounded-md my-10">
        <h2 className="text-sm font-medium text-gray-500">
          From <span className="text-black/90 font-semibold">India</span> To{" "}
          <span className="text-black/90 font-semibold">World</span>
        </h2>
        <h2 className="text-sm font-medium text-gray-500">
          Departure{" "}
          <span className="text-black/90 font-semibold">18 April 2025</span>
        </h2>
        <h2 className="text-sm font-medium text-gray-500">
          Travelers & Class{" "}
          <span className="text-black/90 font-semibold">1 Adult, Economy</span>
        </h2>

        <button className="border border-secondarycolor text-secondarycolor font-medium px-4 py-2 rounded-md flex items-center gap-2">
          <FaRegEdit /> Edit
        </button>
      </div>

      <div className="max-w-[85rem] mx-auto  flex flex-col md:flex-row gap-4">
        <div className="w-[30%] h-fit mx-auto px-4 py-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-md mb-10">
          <h2
            className="text-3xl font-medium text-gray-800 flex justify-between items-center w-full px-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Filters
            <span
              className="text-primarycolor cursor-pointer hover:underline font-semibold text-xs"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Clear
            </span>
          </h2>

          <hr className="border-gray-300 my-4" />

          <div className="flex flex-col gap-2 py-2">
            <h3 className="text-lg font-semibold text-gray-600 mb-2 px-2">
              Airlines
            </h3>
            <div className="flex flex-col gap-2">
              {airlines.slice(0, visibleItems).map((airline) => (
                <div
                  key={airline.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 px-2">
                    <input
                      type="checkbox"
                      className="cursor-pointer w-4 h-4 accent-secondarycolor rounded border-gray-300"
                      checked={airline.checked}
                      onChange={() => handleCheckboxChange(airline.id)}
                    />
                    <label
                      className={`text-[0.8rem] font-semibold ${
                        airline.checked ? "text-black/80" : "text-gray-500/80"
                      }`}
                    >
                      {airline.name}
                    </label>
                  </div>
                  <h4 className="text-[0.8rem] font-semibold text-gray-800">
                    {airline.code}
                  </h4>
                </div>
              ))}

              <button
                onClick={() =>
                  setVisibleItems(showAll ? 6 : airlineData.length)
                }
                className="text-xs text-blue-600 font-medium mt-2 hover:underline"
              >
                <IoIosArrowDown className="inline-block mr-2" />
                {showAll ? "See Less" : "See More"}
              </button>
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="flex flex-col gap-2 py-2">
            <h3 className="text-lg font-semibold text-gray-600 mb-2 px-2">
              Stops
            </h3>
            {stops.map((stop) => (
              <div key={stop.id} className="flex items-center justify-between">
                <div className="flex items-start gap-2 px-2">
                  <input
                    type="radio"
                    className="cursor-pointer w-3 h-3 accent-secondarycolor rounded border-gray-300 mt-1"
                    checked={selectedStop === stop.id}
                    onChange={() => handleRadioChange(stop.id)}
                  />
                  <label
                    className={`text-[0.8rem] font-semibold flex flex-col items-start gap-1 ${
                      stop.selected ? "text-gray-800" : "text-gray-500/80"
                    }`}
                  >
                    {stop.name}
                    <span className="text-gray-400 text-[0.6rem]">
                      {stop.desc}
                    </span>
                  </label>
                </div>
                <h4 className="text-[0.8rem] font-semibold text-gray-800">
                  {stop.code}
                </h4>
              </div>
            ))}
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="flex flex-col gap-2 py-2">
            <h3 className="text-lg font-semibold text-gray-600 px-2">
              Flight Times
            </h3>

            <p className="text-sm font-medium text-gray-400 mb-2 px-2">
              Outbound Flight
            </p>

            <p className="bg-gray-100 text-xs font-medium text-gray-600 my-2 px-2 py-2 rounded-md">
              Departs from Delhi International Airport
            </p>

            <div className="flex flex-col gap-2">
              {departureTimeRanges.map((departure) => (
                <div
                  key={departure.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 px-2">
                    <input
                      type="checkbox"
                      className="cursor-pointer w-4 h-4 accent-secondarycolor rounded border-gray-300"
                      checked={departure.checked}
                      //onChange={() => handleCheckboxChange(departure.id)}
                    />
                    <label
                      className={`text-[0.8rem] font-semibold ${
                        departure.checked ? "text-black/80" : "text-gray-500/80"
                      }`}
                    >
                      {departure.range}
                    </label>
                  </div>
                  <h4 className="text-[0.8rem] font-semibold text-gray-800">
                    {departure.code}
                  </h4>
                </div>
              ))}
            </div>

            <p className="bg-gray-100 text-xs font-medium text-gray-600 my-2 px-2 py-2 rounded-md">
              Arrives at Dubai International Airport
            </p>

            <div className="flex flex-col gap-2">
              {arrivalTimeRanges.map((arrive) => (
                <div
                  key={arrive.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 px-2">
                    <input
                      type="checkbox"
                      className="cursor-pointer w-4 h-4 accent-secondarycolor rounded border-gray-300"
                      checked={arrive.checked}
                      //onChange={() => handleCheckboxChange(arrive.id)}
                    />
                    <label
                      className={`text-[0.8rem] font-semibold ${
                        arrive.checked ? "text-black/80" : "text-gray-500/80"
                      }`}
                    >
                      {arrive.range}
                    </label>
                  </div>
                  <h4 className="text-[0.8rem] font-semibold text-gray-800">
                    {arrive.code}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="flex flex-col gap-2 py-2">
            <h3 className="text-lg font-semibold text-gray-600 px-2">
              Durations
            </h3>

            <p className="text-sm font-medium text-gray-400 mb-2 px-2">
              Maximum travel time
            </p>

            <div className="relative px-2 flex flex-col items-center">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>

              <input
                type="range"
                min="1"
                max="24"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-[0.15rem] bg-gray-300 rounded-lg appearance-none cursor-pointer 
                     accent-gray-700 transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, #4b5563 0%,  #4b5563 ${
                    (duration / 24) * 100
                  }%, #D1D5DB ${(duration / 24) * 100}%, #D1D5DB 100%)`,
                }}
              />

              <div
                className="absolute top-0 mt-2 px-2 py-1 text-xs text-gray-700 rounded-md"
                style={{ left: `calc(${(duration / 24) * 100}% - 15px)` }}
              >
                {duration} hrs
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 px-2">
              <span>1 hr</span>
            </div>
          </div>

          <button className="w-full px-6 py-2 mt-5 rounded-[0.5rem] bg-secondarycolor text-white font-semibold hover:bg-secondarycolor-dark transition-all duration-300">
            Apply
          </button>
        </div>
        <div className="w-full mx-auto px-4 py-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-md mb-10">
          <h2 className="flex justify-between items-center w-full px-2">
            <span
              className="text-3xl font-medium text-gray-800"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              List Of Flights
            </span>
            <button className="flex items-center gap-2 border border-gray-600 text-gray-600 text-sm font-medium py-2 px-4 rounded-md hover:bg-secondarycolor hover:text-white hover:border-none transition-all duration-300">
              <HiOutlineAdjustmentsHorizontal size={20} />
              Sort By
            </button>
          </h2>

          <div className="mt-10 flex flex-col gap-4 overflow-y-auto">
            {airlineDetails.map((airline) => (
              <div
                key={airline.id}
                className="rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start flex-1">
                    <div className="p-1 rounded-lg w-40 h-40 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image src={airline.image} alt="Airline Logo" className="w-full h-full" />
                      </div>
                    </div>

                    {/* Flight info */}
                    <div className="flex flex-col gap-4 justify-between h-full w-[70%]">
                      <div className="text-xl font-semibold">
                        {airline.title}
                      </div>

                      {/* Flight duration */}
                      <div className="flex items-center gap-2 w-full">
                        {/* Departure */}
                        <div className="flex flex-col">
                          <div className="text-lg font-medium">18:50</div>
                          <div className="text-gray-700 font-medium text-sm">
                            DEL 17 JAN
                          </div>
                        </div>

                        {/* Flight info */}
                        <div className="flex flex-col items-center flex-1 min-w-[150px] px-4">
                          <div className="flex items-center text-gray-500 text-xs">
                            {/* <Clock size={14} className="mr-1" /> */}
                            <span>3h 55m</span>
                          </div>

                          <div className="relative w-full flex items-center justify-center my-2">
                            <hr className="w-full border-gray-300" />
                            <div className="bg-white px-2 absolute">
                              <IoIosAirplane
                                size={20}
                                className="text-gray-600"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <span>1 stop</span>
                          </div>

                          <div className="flex items-center gap-1 text-gray-500 text-sm mt-2"></div>
                        </div>

                        {/* Arrival */}
                        <div className="flex flex-col">
                          <div className="text-lg font-medium">22:45</div>
                          <div className="text-gray-700 font-medium text-sm">
                            DXB 18 JAN
                          </div>
                        </div>
                      </div>

                      {/* Included items */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-gray-700 font-semibold text-sm">
                          Included :
                        </div>
                        <div className="flex items-center gap-10">
                          {/* Personal item */}
                          <div className="flex items-center gap-1">
                            <BsBackpack3 size={20} className="text-gray-600" />
                            <span className="text-gray-600 text-xs">
                              Personal item
                            </span>
                          </div>

                          {/* Cabin bag */}
                          <div className="flex items-center gap-1">
                            <BsSuitcase size={20} className="text-gray-600" />
                            <span className="text-gray-600 text-xs">
                              Cabin bag
                            </span>
                          </div>

                          {/* Checked bag */}
                          <div className="flex items-center gap-1">
                            <PiSuitcaseRollingLight
                              size={20}
                              className="text-gray-600"
                            />
                            <span className="text-gray-600 text-xs">
                              Checked bag
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right section - Price and button */}
                  <div className="flex flex-col items-end justify-between gap-4">
                    <div className="text-right">
                      <div className="text-xl font-semibold">
                        ₹ {airline.price}
                      </div>
                      <div className="text-gray-500 text-sm mt-2">
                        Total price for all Travelers
                      </div>
                    </div>
                    <Link 
                    href={`/flights/${airline.id}`}
                    className="border border-secondarycolor text-secondarycolor hover:bg-secondarycolor hover:text-white hover:border-none rounded-md px-6 py-3 font-medium text-lg w-full mt-8">
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
