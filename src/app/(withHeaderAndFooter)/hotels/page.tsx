"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  propertyType,
  propertyRating,
  reservationPolicy,
  facility,
  roomFacility,
} from "@/assets/data";

import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowDown, IoIosAirplane } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { TbAirConditioning, TbHours24 } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { FcWiFiLogo } from "react-icons/fc";

import hotel from "@/assets/Hotels/hotel.webp";

export default function page() {
  const [visibleItems, setVisibleItems] = useState(6);
  const [property, setProperty] = useState(propertyType);
  const [rating, setRating] = useState(propertyRating);
  const [reservation, setReservation] = useState(reservationPolicy);
  const [facilities, setFacilities] = useState(facility);
  const [room, setRoom] = useState(roomFacility);
  const [price, setPrice] = useState(5000);

  const showAll = visibleItems === propertyType.length;
  const handleChange = (
    id: any,
    field: "type" | "rating" | "reservation" | "facility" | "room",
    value?: any
  ) => {
    if (field === "type") {
      setProperty((prev) =>
        prev.map((airline) =>
          airline.id === id
            ? { ...airline, checked: !airline.checked }
            : airline
        )
      );
    } else if (field === "rating") {
      setRating((prev) =>
        prev.map((rate) =>
          rate.id === id ? { ...rate, checked: !rate.checked } : rate
        )
      );
    } else if (field === "reservation") {
      setReservation((prev) =>
        prev.map((reserve) =>
          reserve.id === id
            ? { ...reserve, checked: !reserve.checked }
            : reserve
        )
      );
    } else if (field === "facility") {
      setFacilities((prev) =>
        prev.map((facility) =>
          facility.id === id
            ? { ...facility, checked: !facility.checked }
            : facility
        )
      );
    } else if (field === "room") {
      setRoom((prev) =>
        prev.map((room) =>
          room.id === id ? { ...room, checked: !room.checked } : room
        )
      );
    }
  };

  return (
    <>
      <div className="max-w-[85rem] mx-auto px-4 md:px-10 lg:px-20 py-4 flex justify-between items-center py-3 border border-gray-300 rounded-md my-10">
        <h2 className="text-sm font-medium text-gray-500">
          Where <span className="text-black/90 font-semibold">New Delhi,</span>{" "}
          Property{"  "}
          <span className="text-black/90 font-semibold">World</span>
        </h2>
        <h2 className="text-sm font-medium text-gray-500">
          Check-in{" "}
          <span className="text-black/90 font-semibold">18 May 2025</span> To
          {"  "}
          <span className="text-black/90 font-semibold">22 May 2025</span>
        </h2>
        <h2 className="text-sm font-medium text-gray-500">
          Guest & Rooms{" "}
          <span className="text-black/90 font-semibold">2 Guest, 1 Room</span>
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
              Property Type
            </h3>
            <div className="flex flex-col gap-2">
              {property.slice(0, visibleItems).map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 px-2">
                    <input
                      type="checkbox"
                      className="cursor-pointer w-4 h-4 accent-secondarycolor rounded border-gray-300"
                      checked={property.checked}
                      onChange={() => handleChange(property.id, "type")}
                    />
                    <label
                      className={`text-[0.8rem] font-semibold ${
                        property.checked ? "text-black/80" : "text-gray-500/80"
                      }`}
                    >
                      {property.name}
                    </label>
                  </div>
                  <h4 className="text-[0.8rem] font-semibold text-gray-800">
                    {property.code}
                  </h4>
                </div>
              ))}

              <button
                onClick={() =>
                  setVisibleItems(showAll ? 6 : propertyType.length)
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
              Property Rating
            </h3>

            {rating.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2 px-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer w-4 h-4 accent-secondarycolor rounded border-gray-300"
                    checked={property.checked}
                    onChange={() => handleChange(property.id, "rating")}
                  />
                  <label
                    className={`text-[0.8rem] font-semibold ${
                      property.checked ? "text-black/80" : "text-gray-500/80"
                    }`}
                  >
                    {property.rating}
                  </label>
                </div>
                <h4 className="text-[0.8rem] font-semibold text-gray-800">
                  {property.code}
                </h4>
              </div>
            ))}
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="flex flex-col gap-2 py-2">
            <h3 className="text-lg font-semibold text-gray-600 px-2">
              Reservation Policy
            </h3>

            {reservation.map((reserve) => (
              <div
                key={reserve.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2 px-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer w-4 h-4 accent-secondarycolor rounded border-gray-300"
                    checked={reserve.checked}
                    onChange={() => handleChange(reserve.id, "reservation")}
                  />
                  <label
                    className={`text-[0.8rem] font-semibold ${
                      reserve.checked ? "text-black/80" : "text-gray-500/80"
                    }`}
                  >
                    {reserve.name}
                  </label>
                </div>
                <h4 className="text-[0.8rem] font-semibold text-gray-800">
                  {reserve.code}
                </h4>
              </div>
            ))}
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="flex flex-col gap-2 py-2">
            <h3 className="text-lg font-semibold text-gray-600 mb-2 px-2">
              Facility
            </h3>
            <div className="flex flex-col gap-2">
              {facilities.slice(0, visibleItems).map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 px-2">
                    <input
                      type="checkbox"
                      className="cursor-pointer w-4 h-4 accent-secondarycolor rounded border-gray-300"
                      checked={facility.checked}
                      onChange={() => handleChange(facility.id, "facility")}
                    />
                    <label
                      className={`text-[0.8rem] font-semibold ${
                        facility.checked ? "text-black/80" : "text-gray-500/80"
                      }`}
                    >
                      {facility.name}
                    </label>
                  </div>
                  <h4 className="text-[0.8rem] font-semibold text-gray-800">
                    {facility.code}
                  </h4>
                </div>
              ))}

              <button
                onClick={() =>
                  setVisibleItems(showAll ? 6 : propertyType.length)
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
              Room Facility
            </h3>
            <div className="flex flex-col gap-2">
              {room.slice(0, visibleItems).map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 px-2">
                    <input
                      type="checkbox"
                      className="cursor-pointer w-4 h-4 accent-secondarycolor rounded border-gray-300"
                      checked={room.checked}
                      onChange={() => handleChange(room.id, "room")}
                    />
                    <label
                      className={`text-[0.8rem] font-semibold ${
                        room.checked ? "text-black/80" : "text-gray-500/80"
                      }`}
                    >
                      {room.name}
                    </label>
                  </div>
                  <h4 className="text-[0.8rem] font-semibold text-gray-800">
                    {room.code}
                  </h4>
                </div>
              ))}

              <button
                onClick={() =>
                  setVisibleItems(showAll ? 6 : propertyType.length)
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
            <h3 className="text-lg font-semibold text-gray-600 px-2">
              Your Budget (Per Night)
            </h3>

            <p className="text-sm font-medium text-gray-400 mb-2 px-2">
              ₹1000 - ₹{price}
            </p>

            <div className="relative px-2 flex flex-col items-center">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>

              <input
                type="range"
                min="1000"
                max="10000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-[0.15rem] bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-700 transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, #4b5563 0%,  #4b5563 ${
                    ((price - 1000) / (10000 - 1000)) * 100
                  }%, #D1D5DB ${
                    ((price - 1000) / (10000 - 1000)) * 100
                  }%, #D1D5DB 100%)`,
                }}
              />

              <div
                className="absolute top-0 mt-2 px-2 py-1 text-xs text-gray-700 rounded-md"
                style={{
                  left: `calc(${
                    ((price - 1000) / (10000 - 1000)) * 100
                  }% - 15px)`,
                }}
              >
                ₹{price}
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 px-2">
              <span>₹1000</span>
            </div>
          </div>

          <button className="w-full px-6 py-2 mt-5 rounded-[0.5rem] bg-secondarycolor text-white font-semibold hover:bg-secondarycolor-dark transition-all duration-300">
            Apply
          </button>
        </div>

        <div className="w-full mx-auto px-4 py-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-md mb-10 h-fit">
          <h2 className="flex justify-between items-center w-full px-2">
            <span
              className="text-3xl font-medium text-gray-800"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              List Of Hotels
            </span>
            <button className="flex items-center gap-2 border border-gray-600 text-gray-600 text-sm font-medium py-2 px-4 rounded-md hover:bg-secondarycolor hover:text-white hover:border-none transition-all duration-300">
              <HiOutlineAdjustmentsHorizontal size={20} />
              Sort By
            </button>
          </h2>

          <div className="mt-10 flex flex-col gap-4 overflow-y-auto">
            {Array.from({ length: 7 }).map((airline, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 w-full">
                  <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                    <div className="p-1 rounded-lg w-[25%] flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={hotel}
                          alt="Airline Logo"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 w-[75%]">

                      {/* Hotel Details */}
                      <div className="flex flex-col justify-between w-full">
                        {/* Header with Rating */}
                        <div className="flex justify-between items-start">
                          <h2 className="text-xl font-bold text-gray-800">
                            Staybook Atlanta
                          </h2>
                          <div className="flex flex-col items-end">
                            <div className="flex">
                              {[1, 2, 3, 4].map((star) => (
                                <svg
                                  key={star}
                                  className="w-5 h-5 text-green-600 fill-current"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                              <svg
                                className="w-5 h-5 text-gray-300 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            </div>
                            <p className="text-blue-500 text-right text-sm">
                              306 reviews
                            </p>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="mt-2 text-sm">
                          <p className="text-gray-600">
                            7977, Main Arakasha Pathway, Arya Nagar,
                          </p>
                          <p className="text-gray-600">
                            Paharganj, New Delhi, 110055
                          </p>
                        </div>

                        {/* Room Details */}
                        <div className="mt-4 flex gap-2 items-center text-sm">
                          <span className="font-medium">
                            Standard double room
                          </span>
                          <span className="text-gray-500 ml-2">
                            1 double bed
                          </span>
                        </div>

                        {/* Facilities */}
                        <div className="mt-4">
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-[1rem] font-semibold">
                              Facilities :
                            </span>
                            <div className="flex gap-4 ml-2">
                              {/* Bed icon */}
                              <IoBedOutline size={20} />
                              
                              {/* AC icon */}
                              <TbAirConditioning size={20} />

                              {/* WiFi icon */}
                              <FcWiFiLogo size={20} color="darkgray" />

                              {/* 24h icon */}
                              <TbHours24 size={20} />
                            </div>
                          </div>
                        </div>

                        {/* Cancellation Policy */}
                        <div className="flex gap-4 items-center mt-2">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-6 h-6 text-gray-500"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-gray-600 text-sm">
                              Free cancellation
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <svg
                              className="w-6 h-6 text-gray-500"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-gray-600 text-sm">
                              Reserve now , pay later
                            </span>
                          </div>
                        </div>

                        {/* Price and Button */}
                        <div className="mt-4 flex justify-between items-end">
                          <div>
                            <div className="flex items-end gap-1">
                              <span className="text-xl font-bold">
                                ₹2,490.00
                              </span>
                              <span className="text-gray-600 text-sm mb-1">
                                Per Night
                              </span>
                            </div>
                            <p className="text-gray-500 text-xs">
                              +₹120 taxes and charges
                            </p>
                          </div>

                          <button className="px-8 py-3 border-2 border-indigo-800 text-secondarycolor rounded-lg font-semibold text-[1rem] hover:bg-secondarycolor hover:text-white transition-colors">
                            See availability
                          </button>
                        </div>
                      </div>
                    </div>
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
