"use client";

import Promo from "@/components/promo";
import React, { useState } from "react";
import Image from "next/image";
import Select from "react-select";

import {
  IoIosAirplane,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";

import { FaCar } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { TbPhoneCall } from "react-icons/tb";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineLocalDining } from "react-icons/md";
import { BsSuitcase, BsBackpack3 } from "react-icons/bs";
import { PiSuitcaseRollingLight } from "react-icons/pi";
import discover from "@/assets/Flight/discover.webp";
import mc from "@/assets/Flight/mc.webp";
import visa from "@/assets/Flight/visa.webp";
import group from "@/assets/Flight/Group.webp";
import { useRouter } from "next/navigation";

import hotelDetail from "@/assets/Hotels/hotel_detail.webp";
import AirIndia from "@/assets/Flight/AirIndia.webp";

export default function page() {
  const navigate = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [travelerDetail, setTravelerDetail] = useState(true);
  const [productInclusion, setProductInclusion] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showMoreDays, setShowMoreDays] = useState(false);


  return (
    <>
      <div className="max-w-7xl mx-auto p-6 my-10">
        <div className="mb-10">
          <div className="">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section - Flight Info and Ticket Selection */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm h-fit">
                {/* Hotel Card */}
                <div className="border rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    {/* Airline Logo */}
                    <div className="w-[16rem] h-60 mr-4 flex items-center justify-center">
                      <Image
                        src={hotelDetail}
                        alt="Paradise hotel"
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>

                    {/* Flight Details */}
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between mb-2 items-center">
                        <h3
                          className="text-[1.25rem] font-semibold"
                          style={{ fontFamily: "var(--font-playfair-display)" }}
                        >
                          Paradise on Earth - Kashmir
                        </h3>

                        <h2 className="text-sm font-semibold text-blue-500">
                          Customizable
                        </h2>
                      </div>

                      <div className="my-2">
                        <div className="flex flex-wrap mb-2 items-center">
                          <span className="font-medium text-sm mr-2">1N</span>
                          <span className="text-gray-500 text-sm">
                            Srinagar
                          </span>
                          <span className="mx-2 text-gray-400">|</span>
                          <span className="font-medium text-sm mr-2">1N</span>
                          <span className="text-gray-500 text-sm">Gulmarg</span>
                          <span className="mx-2 text-gray-400">|</span>
                          <span className="font-medium text-sm mr-2">2N</span>
                          <span className="text-gray-500 text-sm">
                            Pahalgam
                          </span>
                          <span className="mx-2 text-gray-400">|</span>
                          <span className="font-medium text-sm mr-2">1N</span>
                          <span className="text-gray-500 text-sm">
                            Srinagar
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-medium my-2">
                        1 Room - <span className="text-gray-500">2 Adults</span>
                      </h4>

                      <div className="flex items-center justify-center gap-2 text-gray-600 text-sm font-semibold my-4 ">
                        <span>Jan 9, 2024</span>
                        <div className="flex-1 border-t border-gray-400 mx-2"></div>
                        <span className="text-black font-bold">6D/5N</span>
                        <div className="flex-1 border-t border-gray-400 mx-2"></div>
                        <span>Jan 14, 2024 / From New Delhi</span>
                      </div>

                      <div className="flex items-start gap-6 mb-4 text-gray-500 mt-2">
                        <div className="flex flex-col items-center">
                          <IoIosAirplane className="w-4 h-4 mb-2" />
                          <span className="text-sm">2 Flight</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <PiBuildingApartmentFill className="w-4 h-4 mb-2" />
                          <span className="text-sm">4 Hotels</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <FaPersonWalkingLuggage className="w-4 h-4 mb-2" />
                          <span className="text-sm">11 Activities</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <FaCar className="w-4 h-4 mb-2" />
                          <span className="text-sm">5 Transfers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Traveller Detail */}
                <div className="border rounded-lg mb-4">
                  <button
                    className="w-full p-4 flex justify-between items-center"
                    onClick={() => {
                         setIsCancelling(false);
                         setProductInclusion(false);
                         setTravelerDetail(!travelerDetail)
                    }}
                  >
                    <h3 className="text-lg font-bold text-gray-600">
                      Traveler Details
                    </h3>
                    {travelerDetail ? (
                      <IoIosArrowUp size={24} />
                    ) : (
                      <IoIosArrowDown size={24} />
                    )}
                  </button>

                  {travelerDetail && (
                    <div className="p-4 pt-0">
                      <h3 className="text-lg font-bold text-gray-600 mb-2">
                        Travelers - 1 Room |{" "}
                        <span className="text-gray-500">2 Adults</span>
                      </h3>

                      <h4 className="text-sm font-medium my-4">
                        Traveler 1(Adult)
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            First Name
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your first name"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Last Name
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your last name"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Date of Birth
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="date"
                            value="18 Jan 2024"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                            Gender
                            <span className="text-sm">*</span>
                          </label>
                          <Select
                            options={[
                              {
                                value: "Male",
                                label: "Male",
                              },
                              {
                                value: "Female",
                                label: "Female",
                              },
                            ]}
                            placeholder="Select your Gender"
                            isSearchable={false}
                            required
                            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                            styles={{
                              control: (styles, { isFocused }) => ({
                                ...styles,
                                backgroundColor: "transparent",
                                border: isFocused
                                  ? "2px solid #9333ea"
                                  : "1px solid #d1d5db", // Revert to a visible border
                                borderRadius: "0.375rem",
                                boxShadow: "none",
                                minHeight: "48px",
                                zIndex: 0,
                              }),
                              option: (styles, { isFocused, isSelected }) => ({
                                ...styles,
                                backgroundColor: isSelected
                                  ? "#f8b738"
                                  : isFocused
                                  ? "#f8f4e5"
                                  : "transparent",
                                color: isSelected ? "black" : "inherit",
                                fontSize: "0.85rem",
                                fontWeight: "500",
                                cursor: "pointer",
                              }),
                              menu: (styles) => ({
                                ...styles,
                                backgroundColor: "white",
                                borderRadius: "0.375rem",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                marginTop: "4px",
                              }),
                              menuList: (styles) => ({
                                ...styles,
                                padding: "4px 0",
                                overflowY: "auto",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                              }),
                              placeholder: (styles) => ({
                                ...styles,
                                color: "#475569",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                              }),
                              singleValue: (styles) => ({
                                ...styles,
                                color: "#475569",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                              dropdownIndicator: (styles) => ({
                                ...styles,
                                color: "#6b7280",
                                padding: "4px",
                                "&:hover": {
                                  color: "#4a5568",
                                },
                              }),
                            }}
                          />
                        </div>
                      </div>

                      <h4 className="text-sm font-medium my-4">
                        Traveler 2(Adult)
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            First Name
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your first name"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Last Name
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your last name"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Date of Birth
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="date"
                            value="18 Jan 2024"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                            Gender
                            <span className="text-sm">*</span>
                          </label>
                          <Select
                            options={[
                              {
                                value: "Male",
                                label: "Male",
                              },
                              {
                                value: "Female",
                                label: "Female",
                              },
                            ]}
                            placeholder="Select your Gender"
                            isSearchable={false}
                            required
                            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                            styles={{
                              control: (styles, { isFocused }) => ({
                                ...styles,
                                backgroundColor: "transparent",
                                border: isFocused
                                  ? "2px solid #9333ea"
                                  : "1px solid #d1d5db", // Revert to a visible border
                                borderRadius: "0.375rem",
                                boxShadow: "none",
                                minHeight: "48px",
                                zIndex: 0,
                              }),
                              option: (styles, { isFocused, isSelected }) => ({
                                ...styles,
                                backgroundColor: isSelected
                                  ? "#f8b738"
                                  : isFocused
                                  ? "#f8f4e5"
                                  : "transparent",
                                color: isSelected ? "black" : "inherit",
                                fontSize: "0.85rem",
                                fontWeight: "500",
                                cursor: "pointer",
                              }),
                              menu: (styles) => ({
                                ...styles,
                                backgroundColor: "white",
                                borderRadius: "0.375rem",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                marginTop: "4px",
                              }),
                              menuList: (styles) => ({
                                ...styles,
                                padding: "4px 0",
                                overflowY: "auto",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                              }),
                              placeholder: (styles) => ({
                                ...styles,
                                color: "#475569",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                              }),
                              singleValue: (styles) => ({
                                ...styles,
                                color: "#475569",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                              dropdownIndicator: (styles) => ({
                                ...styles,
                                color: "#6b7280",
                                padding: "4px",
                                "&:hover": {
                                  color: "#4a5568",
                                },
                              }),
                            }}
                          />
                        </div>
                      </div>

                      <h4 className="text-sm font-medium my-4">
                        Contact Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Email
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="abc@gmail.com"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Mobile
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="46494-34564"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            City
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your city"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                          />
                        </div>

                        <div className="relative w-full mb-4">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Address
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your address"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <h4 className="text-sm font-medium my-4">
                        Special Request
                      </h4>
                      <div className="relative w-full mb-4">
                        <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                          Special Requests
                          <span className="text-sm">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your special requests"
                          className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Cancellation policy */}
                <div className="border rounded-lg mb-4">
                  <button
                    className="w-full p-4 flex justify-between items-center"
                    onClick={() => {
                      setTravelerDetail(false);
                      setIsCancelling(false);
                      setProductInclusion(!productInclusion);
                    }}
                  >
                    <h3 className="text-lg font-bold">
                      Package Itinerary & Inclusion
                    </h3>
                    {productInclusion ? (
                      <IoIosArrowUp size={24} />
                    ) : (
                      <IoIosArrowDown size={24} />
                    )}
                  </button>

                  {productInclusion && (
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
                                  Refreshments on Arrival at Stop-n-Snack Point
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
                                  Gulmarg Gondola Cable Car Ride - Phase 1 (Slot
                                  3 from 1:30PM to 3:30PM)
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

                {/* Important information */}
                <div className="border rounded-lg mb-6">
                  <button
                    className="w-full p-4 flex justify-between items-center"
                    onClick={() => {
                      setTravelerDetail(false);
                      setProductInclusion(false);
                      setIsCancelling(!isCancelling);
                    }}
                  >
                    <h3 className="text-lg font-bold">Important information</h3>
                    {isCancelling ? (
                      <IoIosArrowUp size={24} />
                    ) : (
                      <IoIosArrowDown size={24} />
                    )}
                  </button>

                  {isCancelling && (
                    <div className="">
                      <div className="p-6 space-y-8">
                        {/* Cancellation Policy Section */}
                        <div>
                          <h3 className="text-xl font-bold mb-4">
                            Package Cancellation Policy
                          </h3>
                          <p className="text-primarycolor font-medium mb-2">
                            Cancellation Possible till 25th Dec*
                          </p>
                          <p className="text-gray-600 mb-4">
                            After that Package is Non-Refundable.
                          </p>

                          {/* Timeline */}
                          <div className="flex items-center justify-center w-full mb-4">
                            <div className="relative w-[80%] text-center">
                              {/* Gradient Line */}
                              <div className="h-[0.15rem] bg-gradient-to-r from-green-500 via-orange-200 to-red-500 rounded"></div>

                              {/* Green and Red Dots */}
                              <div className="absolute left-0 -top-1 w-3 h-3 rounded-full bg-green-500"></div>
                              <div className="absolute right-0 -top-1 w-3 h-3 rounded-full bg-red-500"></div>

                              {/* Cancellation Policy Text */}
                              <div className="flex justify-between mt-2">
                                <div className="text-left">
                                  <p className="font-medium mb-1">
                                    Till 25 Dec 23
                                  </p>
                                  <p className="text-green-600">
                                    ₹24,000 Cancellation Fee
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium mb-1">
                                    After 25 Dec 23
                                  </p>
                                  <p className="text-red-500">Non Refundable</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Policy Notes */}
                          <div className="space-y-4 bg-blue-50 p-4 rounded-lg text-gray-600 text-sm">
                            <p>
                              • These are non-refundable amounts as per the
                              current components attached. In the case of
                              component change/modifications, the policy will
                              change accordingly.
                            </p>
                            <p>
                              • Please note, TCS once collected cannot be
                              refunded in case of any cancellation /
                              modification. You can claim the TCS amount as
                              adjustment against Income Tax payable at the time
                              of filing the return of income.
                            </p>
                            <p>
                              • Cancellation charges shown is exclusive of all
                              taxes and taxes will be added as per applicable.
                            </p>
                          </div>
                        </div>

                        {/* Date Change Policy Section */}
                        <div>
                          <h3 className="text-xl font-bold mb-4">
                            Package Date Change Policy
                          </h3>
                          <p className="text-primarycolor font-medium mb-2">
                            Date Change Possible till 25th Dec*
                          </p>
                          <p className="text-gray-600 mb-4">
                            After that Package date cannot be changed.
                          </p>

                          {/* Timeline */}
                          <div className="flex items-center justify-center w-full mb-4">
                            <div className="relative w-[80%] text-center">
                              {/* Gradient Line */}
                              <div className="h-[0.15rem] bg-gradient-to-r from-green-500 via-orange-200 to-red-500 rounded"></div>

                              {/* Green and Red Dots */}
                              <div className="absolute left-0 -top-1 w-3 h-3 rounded-full bg-green-500"></div>
                              <div className="absolute right-0 -top-1 w-3 h-3 rounded-full bg-red-500"></div>

                              {/* Cancellation Policy Text */}
                              <div className="flex justify-between mt-2">
                                <div className="text-left">
                                  <p className="font-medium mb-1">
                                    Till 25 Dec 23
                                  </p>
                                  <p className="text-green-600">
                                    ₹24,000 Cancellation Fee
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium mb-1">
                                    After 25 Dec 23
                                  </p>
                                  <p className="text-red-500">Non Refundable</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Policy Notes */}
                          <div className="space-y-4 bg-blue-50 p-4 rounded-lg text-gray-600 text-sm">
                            <p>
                              • These are non-refundable amounts as per the
                              current components attached. In the case of
                              component change/modifications, the policy will
                              change accordingly.
                            </p>
                            <p>
                              • Date Change fees don't include any fare change
                              in the components on the new date. Fare difference
                              as applicable will be charged separately.
                            </p>
                            <p>
                              • Date Change will depend on the availability of
                              the components on the new requested date.
                            </p>
                            <p>
                              • Please note, TCS once collected cannot be
                              refunded in case of any cancellation /
                              modification. You can claim the TCS amount as
                              adjustment against Income Tax payable at the time
                              of filing the return of income.
                            </p>
                            <p>
                              • Cancellation charges shown is exclusive of all
                              taxes and taxes will be added as per applicable.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section - Summary */}
              <div className="h-fit p-4 bg-gray-100/70 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] mb-4">
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
                  onClick={() =>
                    navigate.push("/book-homestay/booking-confirm")
                  }
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

        <Promo />
      </div>
    </>
  );
}
