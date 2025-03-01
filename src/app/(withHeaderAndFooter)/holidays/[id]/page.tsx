"use client";

import React, { useState } from "react";
import Image from "next/image";

import { IoMdHeartEmpty, IoMdClose, IoMdStar } from "react-icons/io";
import { GoShareAndroid } from "react-icons/go";

import { IoIosAirplane } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { BsSuitcase, BsBackpack3 } from "react-icons/bs";
import { PiSuitcaseRollingLight } from "react-icons/pi";
import { MdOutlineLocalDining } from "react-icons/md";

import hotelDetail from "@/assets/Hotels/hotel_detail.webp";

import AirIndia from "@/assets/Flight/AirIndia.webp";
import img1 from "@/assets/Hotels/img1.webp";
import img2 from "@/assets/Hotels/img2.webp";
import img3 from "@/assets/Hotels/img3.webp";
import img4 from "@/assets/Hotels/img4.webp";
import img5 from "@/assets/Hotels/img5.webp";

import { useRouter } from "next/navigation";

export default function page() {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMoreDays, setShowMoreDays] = useState(false);

  const holidayEntity = [
    { id: 1, name: "Package Overview" },
    { id: 2, name: "Day Plan" },
    { id: 3, name: "Policies" },
    { id: 4, name: "Reviews" },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto p-6 my-10">
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-1 mb-4">
          {/* Top Left Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={img3}
              alt="Resort swimming pool at night"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Large Main Image - Center */}
          <div className="md:col-span-2 md:row-span-2 relative h-[400px] md:h-full">
            <Image
              src={img1}
              alt="Luxury wooden villa with infinity pool"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={img4}
              alt="Elegant hotel room interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={img2}
              alt="Tropical resort with cabanas"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right Image with Overlay */}
          <div className="relative h-48 md:h-full">
            <Image
              src={img5}
              alt="Beach loungers on wooden deck"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-md">
              <span className="text-white text-2xl font-semibold">
                50+ images
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start gap-3">
            <h2
              className="font-medium text-3xl"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Paradise on Earth - Kashmir
            </h2>
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
          </div>
          <div className="flex gap-2">
            <button className="p-2 border rounded-md hover:bg-gray-100">
              <IoMdHeartEmpty size={20} className="text-gray-400" />
            </button>
            <button className="p-2 border rounded-md hover:bg-gray-100">
              <GoShareAndroid size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 border-b border-gray-200 ">
          <ul className="flex items-center gap-8">
            {holidayEntity.map((entity, index) => (
              <li
                key={entity.id}
                onClick={() => setActiveTab(entity.id)}
                className={`cursor-pointer ${
                  activeTab === entity.id || (activeTab === 0 && index === 0)
                    ? "text-primarycolor border-b-2 border-primarycolor"
                    : "text-gray-600"
                } hover:text-primarycolor hover:border-b-2 hover:border-primarycolor transition-colors`}
              >
                {entity.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-start justify-between gap-4 w-full">
          <div className="flex flex-col text-black/80">
            {/* Header with hotel description */}
            <div className="mx-auto w-full">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left column - Hotel description and room options */}
                <div className="flex-1">
                  <h2 className="font-semibold text-xl mb-4">About Packages</h2>

                  <div className="mb-4">
                    <div className="flex flex-wrap mb-2 items-center">
                      <span className="font-medium text-sm mr-2">1N</span>
                      <span className="text-gray-500 text-sm">Srinagar</span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span className="font-medium text-sm mr-2">1N</span>
                      <span className="text-gray-500 text-sm">Gulmarg</span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span className="font-medium text-sm mr-2">2N</span>
                      <span className="text-gray-500 text-sm">Pahalgam</span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span className="font-medium text-sm mr-2">1N</span>
                      <span className="text-gray-500 text-sm">Srinagar</span>
                    </div>
                  </div>

                  <h2 className="font-semibold text-lg mb-4">What To Expect</h2>

                  <div className="mb-6">
                    <p className="text-sm mb-6">
                      Country Inn and Suites by Radisson, Sahibabad offers an
                      exceptional and luxurious experience with its modern
                      accommodations, pure spa/diving options, and world-class
                      amenities. Indulge in pampering spa treatments, take a
                      refreshing swim in the crystal-clear pool, and maintain
                      your fitness at the state-of-the-art gym. The on-site
                      restaurants serve a delightful array of non-vegetarian
                      Thai, Lebanese, Mexican, and Indian delicacies, providing
                      a feast for the senses. This hotel is a haven for those
                      seeking unparalleled luxury and relaxation.
                    </p>
                  </div>

                  <h2 className="font-semibold text-lg mb-4">
                    Things You Will Love
                  </h2>

                  <div className="mb-6">
                    <p className="text-sm mb-6">
                      Snowfall and visiting the frozen lakes in Srinagar and
                      Skiing and other adventure sports in Gulmarg .You will
                      also like Surreal vistas of snow-capped mountains and
                      indulging in winter sports like skiing, sledging and
                      rafting in Pahalgam and Snowfall and visiting the frozen
                      lakes in Srinagar .
                    </p>
                  </div>

                  <hr className="my-6" />

                  <h2 className="text-2xl font-semibold mt-6">Day Plan</h2>
                  <div className="mt-4 border border-gray-200 p-4 rounded-md">
                    {/* Header */}
                    <div className="p-4 border-b flex justify-between items-center">
                      <h2 className="text-xl font-bold">
                        Day 1 - Arrival in Srinagar
                      </h2>
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1"
                      >
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-4">
                        {/* Included Section */}
                        <div className="mb-6 flex items-center gap-8">
                          <p className="font-semibold">Included</p>
                          <div className="flex space-x-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2 text-xs">
                              <IoIosAirplane size={16} />
                              <span>2 Flight</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <PiBuildingApartmentFill size={16} />
                              <span>4 Hotels</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FaPersonWalkingLuggage size={16} />
                              <span>11 Activities</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FaCar size={16} />
                              <span>5 Transfers</span>
                            </div>
                          </div>
                        </div>

                        {/* Day 1 */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Day 1</h3>
                            <span className="text-gray-500 text-sm">
                              Wed, 10 Jan
                            </span>
                          </div>

                          {/* Timeline */}
                          <div className="relative">
                            {/* Onward Flight */}
                            <div className="flex">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center mb-2 text-sm">
                                  <h4 className="font-bold mr-2">
                                    Onward Flight
                                  </h4>
                                  <span className="text-gray-500">
                                    New Delhi to Srinagar
                                  </span>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                  <div className="flex flex-col md:flex-row gap-4 items-start flex-1">
                                    <div className="p-1 rounded-lg w-40 h-40 flex items-center justify-center">
                                      <div className="relative w-full h-full">
                                        <Image
                                          src={AirIndia}
                                          alt="Airline Logo"
                                          className="w-full h-full"
                                        />
                                      </div>
                                    </div>

                                    {/* Flight info */}
                                    <div className="flex flex-col gap-4 justify-between h-full w-[70%]">
                                      <div className="text-xl font-semibold">
                                        Air India
                                      </div>

                                      {/* Flight duration */}
                                      <div className="flex items-center gap-2 w-full">
                                        {/* Departure */}
                                        <div className="flex flex-col">
                                          <div className="text-lg font-medium">
                                            18:50
                                          </div>
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
                                          <div className="text-lg font-medium">
                                            22:45
                                          </div>
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
                                            <BsBackpack3
                                              size={20}
                                              className="text-gray-600"
                                            />
                                            <span className="text-gray-600 text-xs">
                                              Personal item
                                            </span>
                                          </div>

                                          {/* Cabin bag */}
                                          <div className="flex items-center gap-1">
                                            <BsSuitcase
                                              size={20}
                                              className="text-gray-600"
                                            />
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
                                </div>

                                <hr className="w-full border-gray-300 my-6" />
                              </div>
                            </div>

                            {/* Transfer */}
                            <div className="flex mb-6">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <h4 className="font-bold mr-2">Transfer</h4>
                                  <span className="text-gray-500 flex items-center gap-2">
                                    <FaCar size={16} />
                                    Airport to hotel in Srinagar
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Hotel Stay */}
                            <div className="flex">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center mb-2 text-sm">
                                  <h4 className="font-bold mr-2">Hotel Stay</h4>
                                  <span className="text-gray-500">
                                    1 Nights Stay | Check in - Tue, 9 Jan 2024
                                    Check out - Wed, 10 Jan 2024
                                  </span>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start gap-6 w-full mt-6">
                                  <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                                    <div className="p-1 rounded-lg w-[25%] flex items-center justify-center">
                                      <div className="relative w-full h-full">
                                        <Image
                                          src={hotelDetail}
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
                                            Hotel Milad Srinagar
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
                                          </div>
                                        </div>

                                        <div className="mt-4 flex gap-2 items-center text-sm">
                                          <span className="font-medium">
                                            Deluxe Room{" "}
                                            <span className="text-gray-500/50">
                                              (3rd Floor)
                                            </span>
                                          </span>
                                          <span className="text-gray-500 ml-2">
                                            1 King Bed
                                          </span>
                                        </div>

                                        {/* Room Details */}
                                        <div className="mt-4 flex gap-2 items-center text-sm">
                                          <span className="font-medium">
                                            Room 1:
                                          </span>
                                          <span className="text-gray-500 ml-2">
                                            2 Adult 1 King Bed
                                          </span>
                                        </div>

                                        {/* Cancellation Policy */}
                                        <div className="flex gap-4 items-center mt-2">
                                          <div className="flex items-center gap-2">
                                            <svg
                                              className="w-6 h-6 text-primarycolor"
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
                                            <span className="text-primarycolor text-sm">
                                              Free cancellation
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <hr className="w-full border-gray-300 my-6" />
                              </div>
                            </div>

                            {/* Activity 1 */}
                            <div className="flex mb-6">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center text-sm">
                                  <h4 className="font-bold mr-2">Activity</h4>
                                  <span className="text-gray-500">
                                    🚶 Duration : 1 hrs
                                  </span>
                                  <span className="ml-2 text-gray-500">
                                    Refreshments on Arrival at Stop-n-Snack
                                    Point
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Activity 2 */}
                            <div className="flex mb-16">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center text-sm">
                                  <h4 className="font-bold mr-2">Activity</h4>
                                  <span className="text-gray-500">
                                    🚶 Duration : 8 hrs
                                  </span>
                                  <span className="ml-2 text-gray-500">
                                    On-Ground Assistance by Tour Manager
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Day 2 */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Day 2</h3>
                            <span className="text-gray-500">Thu, 11 Jan</span>
                          </div>

                          {/* Timeline */}
                          <div className="relative">
                            {/* Checkout */}
                            <div className="flex mb-6">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center text-sm">
                                  <h4 className="font-bold mr-2">Checkout</h4>
                                  <span className="text-gray-500">
                                    from Hotel in Srinagar
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Transfer */}
                            <div className="flex mb-6">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center text-sm">
                                  <h4 className="font-bold mr-2">Transfer</h4>
                                  <span className="text-gray-500 flex items-center gap-2 text-sm">
                                    <FaCar size={16} />
                                    Srinagar to Gulmarg
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Hotel Stay */}
                            <div className="flex mb-6">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center text-sm mb-2">
                                  <h4 className="font-bold mr-2">Hotel Stay</h4>
                                  <span className="text-gray-500">
                                    1 Nights Stay | Check in - Thu, 11 Jan 2024
                                    Check out - Fri, 12 Jan 2024
                                  </span>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start gap-6 w-full mt-6">
                                  <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                                    <div className="p-1 rounded-lg w-[25%] flex items-center justify-center">
                                      <div className="relative w-full h-full">
                                        <Image
                                          src={hotelDetail}
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
                                            Hotel Milad Srinagar
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
                                          </div>
                                        </div>

                                        <div className="mt-4 flex gap-2 items-center text-sm">
                                          <span className="font-medium">
                                            Deluxe Room{" "}
                                            <span className="text-gray-500/50">
                                              (3rd Floor)
                                            </span>
                                          </span>
                                          <span className="text-gray-500 ml-2">
                                            1 King Bed
                                          </span>
                                        </div>

                                        {/* Room Details */}
                                        <div className="mt-4 flex gap-2 items-center text-sm">
                                          <span className="font-medium">
                                            Room 1:
                                          </span>
                                          <span className="text-gray-500 ml-2">
                                            2 Adult 1 King Bed
                                          </span>
                                        </div>

                                        {/* Cancellation Policy */}
                                        <div className="flex gap-4 items-center mt-2">
                                          <div className="flex items-center gap-2">
                                            <svg
                                              className="w-6 h-6 text-primarycolor"
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
                                            <span className="text-primarycolor text-sm">
                                              Free cancellation
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <hr className="w-full border-gray-300 my-6" />
                              </div>
                            </div>

                            {/* Activity 1 */}
                            <div className="flex mb-6">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <h4 className="font-bold mr-2">Activity</h4>
                                  <span className="text-gray-500 flex items-center gap-2 text-sm">
                                    <FaPersonWalkingLuggage size={16} />
                                    Duration : 1 hrs
                                  </span>
                                  <span className="ml-2 text-gray-500">
                                    Complimentary Chain Vehicle
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Activity 2 */}
                            <div className="flex mb-6">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="h-full w-0.5 bg-gray-300 absolute top-6 bottom-0 left-1/2 -translate-x-1/2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center text-sm gap-2">
                                  <h4 className="font-bold mr-2">Activity</h4>
                                  <span className="text-gray-500 flex items-center gap-2 text-sm">
                                    <FaPersonWalkingLuggage size={16} />
                                    Duration : 2 hrs
                                  </span>
                                  <span className="ml-2 text-gray-500 text-sm">
                                    Gulmarg Gondola Cable Car Ride - Phase 1
                                    (Slot 3 from 1:30PM to 3:30PM)
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Day Meals */}
                            <div className="flex mb-6">
                              <div className="relative mr-4 flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center z-10">
                                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center text-sm gap-2">
                                  <h4 className="font-bold mr-2">Day Meals</h4>
                                  <span className="text-gray-500 flex items-center gap-2 text-sm">
                                    <MdOutlineLocalDining size={16} />
                                    Breakfast
                                  </span>
                                  <span className="ml-2 text-gray-500">
                                    Included at Hotel Milad Srinagar, Srinagar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* View More Button */}
                        <div className="text-center text-xs">
                          <button
                            onClick={() => setShowMoreDays(!showMoreDays)}
                            className="text-blue-500 flex items-center justify-center mx-auto"
                          >
                            <svg
                              className={`w-5 h-5 mr-1 transition-transform ${
                                showMoreDays ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                            View 3 more days itinerary
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-semibold mt-6">Policies</h2>
                  <div className="mt-6">
                    <ul className="list-disc list-outside space-y-2 text-sm text-gray-600 pl-4">
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                    </ul>
                  </div>

                  <hr className="my-6" />

                  {/* Reviews */}
                  <h2 className="text-2xl font-semibold mt-6">Reviews</h2>
                  <div className="mt-6">
                    <p className="mb-4">
                      Guests rave about the Wind THINK Room's peaceful
                      atmosphere, lush greenery, and exceptional service from
                      the staff, particularly Romana (a warm hospitality and
                      cooking skills). Adiba from buffbreakfast is noted for
                      effective coordination, enhancing the overall memorable
                      and comfortable stay experience.
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 mt-4">
                        <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white">
                          A
                        </div>
                        <div className="flex flex-col items-start gap-2 ">
                          <h3 className="font-semibold">Ankit Sharma</h3>
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-yellow-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <span className="text-xs ml-2 text-gray-400">
                              04/01/2024
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsOpenModal(!isOpenModal)}
                        className="w-fit px-4 py-2 bg-gray-800 text-white rounded-md"
                      >
                        Write Reviews
                      </button>
                    </div>

                    <p className="mt-4 text-sm">
                      <span className="font-semibold my-2 text-sm">Classy</span>{" "}
                      <br />
                      Booking with Homstay was a delight. The user-friendly
                      interface and comprehensive search filters made finding
                      the perfect stay a breeze. Real-time updates and attentive
                      customer support added a personal touch. A vast range of
                      accommodations ensured options for every budget.
                      Trustworthy and highly recommended!
                    </p>
                  </div>
                </div>

                {/* Right column - Room details and booking */}
                <div className="w-full md:w-80 lg:w-96">
                  <div className="bg-white text-black rounded-md overflow-hidden">
                    <div className="p-4 bg-gray-100/70 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] mb-4">
                      <Image
                        src={hotelDetail}
                        alt="Luxurious Room"
                        className="w-full object-cover rounded-md"
                      />
                      <h2 className="font-bold mt-4">Luxurious Room</h2>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between font-semibold">
                          <span>1 room x 1 night</span>
                          <span>₹ 2490.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes and service fees</span>
                          <span>₹ 499.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>other charges</span>
                          <span>₹ 0.00</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t text-[1rem]">
                          <span>Total</span>
                          <span>₹ 2,990.00</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Includes taxes and charges
                        </p>
                      </div>

                      <button
                        onClick={() => navigate.push("/book-holiday")}
                        className="w-full py-3 bg-secondarycolor text-white rounded-md mt-4 font-medium"
                      >
                        Book Now
                      </button>

                      <p className="text-xs text-start mt-2 text-blue-600 mt-2">
                        No hidden fees • Cancel anytime
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-[60rem] mx-auto p-6 rounded-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpenModal(false)}
              className="absolute top-3 right-4 text-3xl text-gray-600"
            >
              <IoMdClose size={24} />
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-bold mb-6">Write Review</h2>

            <form className="space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full py-3 px-4 bg-gray-100 rounded text-gray-600 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full py-3 px-4 bg-gray-100 rounded text-gray-600 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  className="w-full py-3 px-4 bg-gray-100 rounded text-gray-600 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      {star <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Review Title
                </label>
                <textarea
                  placeholder="Write your comments here"
                  className="w-full h-32 py-3 px-4 bg-gray-100 rounded text-gray-600 text-sm"
                />
              </div>

              <p className="text-xs text-gray-500">
                How we use your data: We'll only contact you about the review
                you left, and only if necessary. By submitting your review, you
                agree to Judge.me's terms and conditions and privacy policy.
              </p>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-900 text-white rounded text-lg font-medium"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
