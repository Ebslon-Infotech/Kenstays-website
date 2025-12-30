"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";

import Promo from "@/components/promo";
import AirIndia from "@/assets/Flight/AirIndia.webp";
import AirIndia1 from "@/assets/Flight/AirIndia1.webp";
import discover from "@/assets/Flight/discover.webp"
import mc from "@/assets/Flight/mc.webp"
import visa from "@/assets/Flight/visa.webp"
import group from "@/assets/Flight/Group.webp"

import {
  IoIosAirplane,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { GoPerson } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { BsSuitcase, BsBackpack3 } from "react-icons/bs";
import { PiSuitcaseRollingLight } from "react-icons/pi";
import { TbPhoneCall } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";

export default function page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState("flexible");
  const [contactEmail, setContactEmail] = useState(
    "ankitsharma.dev07@gmail.com"
  );
  const [phoneNumber, setPhoneNumber] = useState("+91 7042094710");
  const [firstName, setFirstName] = useState("Ankit");
  const [lastName, setLastName] = useState("Sharma");
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  const steps = [
    { id: 1, title: "Ticket type" },
    { id: 2, title: "Who's flying?" },
    { id: 3, title: "Select your seat" },
    { id: 4, title: "Check and pay" },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto p-6 my-10">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center cursor-pointer ${
                  currentStep >= step.id ? "text-primarycolor" : "text-gray-300"
                }`}
              >
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center border-2 mr-2 ${
                    currentStep >= step.id
                      ? "border-primarycolor bg-primarycolor text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  {step.id}
                </div>
                <div
                  className={`font-medium text-sm ${
                    currentStep >= step.id
                      ? "text-primarycolor"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-[10rem] mx-4 rounded-lg ${
                      currentStep > step.id ? "bg-primarycolor" : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="my-10">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section - Flight Info and Ticket Selection */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm h-fit">
                {/* Flight Card */}
                <div className="border rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    {/* Airline Logo */}
                    <div className="w-40 bg-gray-100 p-2 rounded mr-4 flex items-center justify-center">
                      <Image
                        src={AirIndia}
                        alt="Air India"
                        className="w-full"
                      />
                    </div>

                    {/* Flight Details */}
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-semibold">Air India</h3>
                        <span className="text-yellow-500 text-sm font-semibold">
                          One Way
                        </span>
                      </div>

                      <div className="flex justify-between mb-4">
                        {/* Departure */}
                        <div>
                          <div className="text-lg font-semibold">20:20</div>
                          <div className="text-sm text-gray-600">
                            DEL 18 JAN
                          </div>
                        </div>

                        {/* Flight Duration */}
                        <div className="flex flex-col items-center flex-1 min-w-[150px] px-4">
                          <div className="flex items-center text-gray-500 text-xs">
                            {/* <Clock size={14} className="mr-1" /> */}
                            <span>3h 55m</span>
                          </div>

                          <div className="relative w-[80%] flex items-center justify-center my-2">
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
                        <div className="text-right">
                          <div className="text-lg font-semibold">22:45</div>
                          <div className="text-sm text-gray-600">
                            DXB 18 JAN
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
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

                        <div className="flex justify-between mt-2">
                          <div className="flex items-center">
                            <span className="mr-4 text-sm font-medium">
                              Direct
                            </span>
                            <span className="text-gray-500 text-xs">
                              3h 55m, Economy
                            </span>
                          </div>
                          <button className="text-blue-500 text-sm">
                            View flight details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {currentStep === 1 && (
                  <div>
                    {/* Ticket Selection */}
                    <h2 className="text-xl font-bold mb-6">
                      Select your ticket type
                    </h2>

                    {/* Standard Ticket Option */}
                    <div
                      className={`mb-4 cursor-pointer ${
                        selectedTicket === "standard" ? "border-blue-500" : ""
                      }`}
                      onClick={() => setSelectedTicket("standard")}
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-medium">Standard ticket</h3>
                        <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                          {selectedTicket === "standard" && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>

                      <ul className="list-disc ml-5 text-gray-600 mb-4 text-sm">
                        <li className="mb-2">Cheapest price</li>
                        <li>
                          simply dummy text of the printing and typesetting
                          industry.
                        </li>
                      </ul>

                      <div className="border-t pt-4 flex justify-between items-start mb-10">
                        <div className="font-semibold">Total</div>
                        <div className="text-end">
                          <div className="text-lg font-bold">INR 26,490.89</div>
                          <div className="text-sm text-gray-500">
                            Total price for all Travelers
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Flexible Ticket Option */}
                    <div
                      className={`mb-4 cursor-pointer ${
                        selectedTicket === "flexible" ? "border-blue-500" : ""
                      }`}
                      onClick={() => setSelectedTicket("flexible")}
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-medium">Flexible ticket</h3>
                        <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                          {selectedTicket === "flexible" && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>

                      <ul className="list-disc ml-5 text-gray-600 mb-4 text-sm">
                        <li className="mb-2">
                          Switch flights up to 24 hours before your departure
                          time – with no penalties
                        </li>
                        <li className="mb-2">
                          Change your flight to another with the same airline
                          for free, subject to availability
                        </li>
                        <li>
                          Pay only the difference between the two if the new
                          flight costs more than the original flight
                        </li>
                      </ul>

                      <div className="border-t pt-4 flex justify-between items-start mb-10">
                        <div className="font-semibold">Total</div>
                        <div className="text-end">
                          <div className="text-lg font-bold">INR 28,490.89</div>
                          <div className="text-sm text-gray-500">
                            Total price for all Travelers
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                      Flexible tickets are only available when you book your
                      flight. See
                      <a href="#" className="text-blue-500">
                        {" "}
                        Flexible ticket section for terms and conditions
                      </a>
                      .
                    </p>

                    <div className="flex justify-between">
                      <button
                        disabled
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center gap-2 cursor-not-allowed"
                      >
                        <IoIosArrowBack size={16} />
                        Back
                      </button>

                      <button
                        onClick={() => setCurrentStep(2)}
                        className="bg-secondarycolor text-white px-8 py-2 rounded flex items-center gap-2 cursor-pointer"
                      >
                        Next
                        <IoIosArrowForward size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <>
                    <div className=" flex flex-col justify-center">
                      <h2 className="text-xl font-bold mb-6">Who's flying?</h2>

                      <div className="border rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Contact details
                        </h3>

                        <div className="relative w-full mb-6">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Contact Email
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="abc@gmail.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="mb-6">
                          <p className="text-xs text-red-500">
                            Note*{" "}
                            <span className="text-gray-600">
                              We'll send your flight confirmation here.
                            </span>
                          </p>
                        </div>

                        <div className="relative w-full mb-6">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Phone Number
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="99999-99999"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="smsUpdates"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded-full mr-2"
                            checked={receiveUpdates}
                            onChange={() => setReceiveUpdates(!receiveUpdates)}
                          />
                          <label
                            htmlFor="smsUpdates"
                            className="text-sm text-gray-600"
                          >
                            Get free SMS updates about your flight
                          </label>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Traveler 1 (Adult)
                        </h3>

                        <div className="relative w-full mb-6">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            First Name
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full mb-6">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Last Name
                            <span className="text-sm">*</span>
                          </label>

                          <input
                            type="text"
                            placeholder="Enter your Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                            Gender specified on your travel document
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

                      <div className="flex justify-between">
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center gap-2 cursor-pointer"
                        >
                          <IoIosArrowBack size={16} />
                          Back
                        </button>

                        <button
                          onClick={() => setCurrentStep(3)}
                          className="bg-secondarycolor text-white px-8 py-2 rounded flex items-center gap-2 cursor-pointer"
                        >
                          Next
                          <IoIosArrowForward size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div className=" flex flex-col justify-center">
                      <h2 className="text-xl font-bold mb-6">
                        Select Your Seat
                      </h2>

                      <div className="border rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Ankit Sharma
                        </h3>

                        <div className="flex items-center justify-between">
                          <h4 className="text-sm text-blue-500">
                            Select a seat from INR 0.00
                          </h4>

                          <h4 className="text-sm text-blue-500 flex gap-2 items-center">
                            No seat Selected
                            <IoIosArrowDown size={16} />
                          </h4>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center gap-2 cursor-pointer"
                        >
                          <IoIosArrowBack size={16} />
                          Back
                        </button>

                        <button
                          onClick={() => setCurrentStep(4)}
                          className="bg-secondarycolor text-white px-8 py-2 rounded flex items-center gap-2 cursor-pointer"
                        >
                          Next
                          <IoIosArrowForward size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <div className=" flex flex-col justify-center">
                      <h2 className="text-xl font-bold mb-6">Check and Pay</h2>

                      <div className="flex items-center gap-6 w-full">
                        <div className="border rounded-lg p-6 mb-6 w-full">
                          <h3 className="text-lg font-medium mb-4">
                            Travellers details
                          </h3>

                          <div className="flex items-center gap-3">
                            <GoPerson size={16} className="text-primarycolor" />
                            Ankit Sharma
                          </div>

                          <h4 className="text-xs font-normal text-gray-500 ml-6 mt-4">
                            Adult - Male
                          </h4>
                        </div>

                        <div className="border rounded-lg p-6 mb-6 w-full">
                          <h3 className="text-lg font-medium mb-4">
                            Contact details
                          </h3>

                          <div className="flex items-center gap-3 mb-2">
                            <TbPhoneCall
                              size={16}
                              className="text-primarycolor"
                            />
                            +91 7034268920
                          </div>

                          <div className="flex items-center gap-3">
                            <IoMailOutline
                              size={16}
                              className="text-primarycolor"
                            />
                            abc@gmail.com
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6 mb-6 w-full">
                        <h3 className="text-lg font-medium mb-4">
                          Included Baggage
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Total Number of bags included for all Travelers
                        </p>

                        <div className="flex items-start gap-2 my-4">
                          <BsBackpack3 size={35} />
                          <div className="flex flex-col gap-1 items-start">
                            <h3 className="text-sm font-medium">
                              1 Personal Item
                            </h3>
                            <p className="text-xs text-gray-400 font-normal">
                              Fits under the seat in front of you
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 my-6">
                          <BsSuitcase size={35} />
                          <div className="flex flex-col gap-1 items-start">
                            <h3 className="text-sm font-medium">1 Cabin Bag</h3>
                            <p className="text-xs text-gray-400 font-normal">
                              25 x 35 x 55 cm • Up to 8Kg.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 my-6">
                          <PiSuitcaseRollingLight size={35} />
                          <div className="flex flex-col gap-1 items-start">
                            <h3 className="text-sm font-medium">
                              1 Personal Item
                            </h3>
                            <p className="text-xs text-gray-400 font-normal">
                              Up to 30Kg
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-blue-500">
                          View baggage per Traveler
                        </p>

                        <p className="text-xs mt-4">
                          For more detailed baggage information and options,
                          check airline baggage policies: Air India.
                        </p>
                      </div>

                      <div className="border rounded-lg p-6 mb-6 w-full">
                        <h3 className="text-lg font-medium mb-4">
                          Your Payment
                        </h3>

                        <p className="text-xs tesxt-gray-500 mt-4">
                          Simple, Safe and Secure
                        </p>

                        <div className="flex flex-col items-start gap-4 mt-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <span className="text-sm">
                              How would you like to pay?
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Image src={group} alt="group" height={25} />
                            <Image src={visa} alt="visa" height={25} />
                            <Image src={mc} alt="mastercard" height={25} />
                            <Image src={discover} alt="americanexpress" height={25} />
                          </div>
                        </div>

                        <div className="mt-6">
                          <div className="flex gap-4">
                            <div className="relative w-full my-4">
                              <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                                Card Number
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-3 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <CiCreditCard1
                                  size={24}
                                  className="text-gray-600"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="relative w-1/2 my-4">
                              <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                                Expiry Date
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>

                            <div className="relative w-1/2 my-4">
                              <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                                CVV
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="password"
                                placeholder="123"
                                maxLength={3}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>

                          <div className="relative w-full my-4">
                            <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                              Name on Card
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div className="flex items-center gap-2 mt-4">
                            <p className="text-xs">
                              By clicking "pay now" you agree with the terms and
                              conditions and privacy policies of abc.com,
                              Gotogate International AB, Air India and with the
                              fare rules.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={() => setCurrentStep(3)}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center gap-2 cursor-pointer"
                        >
                          <IoIosArrowBack size={16} />
                          Back
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Section - Summary */}
              <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                {/* Air India Logo */}
                <div className="bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <Image src={AirIndia1} alt="Air India" className="w-full" />
                </div>

                <h3 className="text-lg font-semibold mb-4">Air India AI947</h3>

                <div className="text-gray-700 mb-6">
                  <div className="flex justify-between mb-2 text-sm">
                    <div>Ticket (1 adult)</div>
                    <div>₹ 26,490.00</div>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <div>Flight fare</div>
                    <div>₹ 24,490.00</div>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <div>Taxes and charges</div>
                    <div>₹ 2000.00</div>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <div>Flexible ticket</div>
                    <div>₹ 2000.00</div>
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-sm">
                    <div>Total</div>
                    <div>₹ 26,490.00</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Includes taxes and charges
                  </div>
                </div>

                <button className="bg-secondarycolor text-white w-full py-3 rounded mb-3">
                  Book Now
                </button>

                <p className="text-xs text-blue-500">
                  No hidden fees - track your price at every step*
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
