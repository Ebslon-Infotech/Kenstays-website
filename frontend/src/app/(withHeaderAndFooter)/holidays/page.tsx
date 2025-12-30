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

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HolidayCard from "@/components/holidayCard";

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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-[85rem] mx-auto px-4 md:px-10 lg:px-20 py-4 flex justify-between items-center py-3 border border-gray-300 rounded-md my-10">
        <h2 className="text-sm font-medium text-gray-500">
          From <span className="text-black/90 font-semibold">New Delhi,</span>{" "}
          To Kashmir{"  "}
          <span className="text-black/90 font-semibold">World</span>
        </h2>
        <h2 className="text-sm font-medium text-gray-500">
          Check-in{" "}
          <span className="text-black/90 font-semibold">18 May 2025</span>{" "}
          Duration
          {"  "}
          <span className="text-black/90 font-semibold">5N/6D</span>
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
        <div className="w-[25%] h-fit mx-auto px-4 py-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-md mb-10">
          <h2
            className="text-3xl font-medium text-gray-800 flex justify-between items-center w-full px-2"
            style={{ fontFamily: "var(--font-playfair-display)" }}
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

        <div className="w-[75%] mx-auto px-4 py-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-md mb-10 h-fit">
          <h2 className="flex flex-col justify-between items-start gap-2 w-full px-2">
            <span
              className="text-3xl font-medium text-gray-800"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Super Saver Packages
            </span>

            <p className="text-sm font-medium text-gray-400">
              Start your bucket list with our handpicked best sellers!
            </p>
          </h2>

          <div className="mt-10">
            <Slider {...settings}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Link href={`/holidays/${index}`} key={index} className="px-2">
                  {" "}
                  {/* Adds spacing between slides */}
                  <HolidayCard />
                </Link>
              ))}
            </Slider>
          </div>

          <h2 className="flex flex-col justify-between items-start gap-2 w-full px-2 mt-8">
            <span
              className="text-3xl font-medium text-gray-800"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Kashmir Honeymoon Packages
            </span>

            <p className="text-sm font-medium text-gray-400">
              Get ready to sweep your bae away to the emerald valleys of
              Kashmir!
            </p>
          </h2>

          <div className="mt-10">
            <Slider {...settings}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Link href={`/holidays/${index}`} key={index} className="px-2">
                {" "}
                {/* Adds spacing between slides */}
                <HolidayCard />
              </Link>
              ))}
            </Slider>
          </div>

          <h2 className="flex flex-col justify-between items-start gap-2 w-full px-2 mt-8">
            <span
              className="text-3xl font-medium text-gray-800"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Skiing in Paradise
            </span>

            <p className="text-sm font-medium text-gray-400">
              Add the thrill of skiing to your Kashmir trip with these holiday
              packages!
            </p>
          </h2>

          <div className="mt-10">
            <Slider {...settings}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Link href={`/holidays/${index}`} key={index} className="px-2">
                {" "}
                {/* Adds spacing between slides */}
                <HolidayCard />
              </Link>
              ))}
            </Slider>
          </div>

          <h2 className="flex flex-col justify-between items-start gap-2 w-full px-2 mt-8">
            <span
              className="text-3xl font-medium text-gray-800"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Kashmir Packages with Sonmarg Stay!
            </span>

            <p className="text-sm font-medium text-gray-400">
              Savour a trip to Sonmarg a.k.a Meadow of Gold!
            </p>
          </h2>

          <div className="mt-10">
            <Slider {...settings}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Link href={`/holidays/${index}`} key={index} className="px-2">
                {" "}
                {/* Adds spacing between slides */}
                <HolidayCard />
              </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
