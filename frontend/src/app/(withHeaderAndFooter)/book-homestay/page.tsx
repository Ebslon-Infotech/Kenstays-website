"use client";

import Promo from "@/components/promo";
import React, { useState } from "react";
import Image from "next/image";

import {
  IoIosAirplane,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { TbPhoneCall } from "react-icons/tb";
import { IoMailOutline } from "react-icons/io5";

import hotelDetail from "@/assets/Hotels/hotel_detail.webp";
import discover from "@/assets/Flight/discover.webp";
import mc from "@/assets/Flight/mc.webp";
import visa from "@/assets/Flight/visa.webp";
import group from "@/assets/Flight/Group.webp";
import { useRouter } from "next/navigation";

export default function page() {
  const navigate = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("now");
  const [isShowingCancellation, setIsShowingCancellation] = useState(true);
  const [isShowingInformation, setIsShowingInformation] = useState(true);

  const steps = [
    { id: 1, title: "Payment type" },
    { id: 2, title: "Who's checking in?" },
    { id: 3, title: "Check and pay" },
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
                {/* Hotel Card */}
                <div className="border rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    {/* Airline Logo */}
                    <div className="w-48 h-60 mr-4 flex items-center justify-center">
                      <Image
                        src={hotelDetail}
                        alt="Paradise hotel"
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>

                    {/* Flight Details */}
                    <div className="flex flex-col justify-between">
                      <div className="flex justify-between mb-2">
                        <h3
                          className="text-[1.25rem] font-semibold"
                          style={{ fontFamily: "var(--font-playfair-display)" }}
                        >
                          Paradise Hotel
                        </h3>
                      </div>

                      <h4 className="text-sm font-normal my-2">
                        1 Room: Deluxe Room, 1 King Bed
                      </h4>

                      <h4 className="text-sm font-normal my-2">1-night stay</h4>

                      <h4 className="text-sm font-normal my-2">
                        Room 1: 2 Adults, 1 King Bed
                      </h4>

                      <div className="flex items-center gap-6 mt-4">
                        {/* Check-in Section */}
                        <div className="flex flex-col gap-1 text-sm">
                          <p className="text-gray-500 font-medium">Check-in</p>
                          <p className=" font-semibold text-gray-900">
                            Monday, 08 May 2025
                          </p>
                          <p className="text-gray-500">11:00 AM</p>
                        </div>

                        {/* Vertical Separator */}
                        <div className="h-12 w-[2px] bg-gray-300"></div>

                        {/* Check-out Section */}
                        <div className="flex flex-col gap-1 text-sm">
                          <p className="text-gray-500 font-medium">Check-out</p>
                          <p className=" font-semibold text-gray-900">
                            Tuesday, 09 May 2025
                          </p>
                          <p className="text-gray-500">10:00 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {currentStep === 1 && (
                  <div>
                    {/* Payment Type */}
                    <h3 className="text-xl font-bold mb-4">Payment Type</h3>

                    {/* Pay when you stay */}
                    <div className="my-6 pb-4">
                      <div className="flex items-start mb-2">
                        <label className="flex items-center flex-1">
                          <span className="font-semibold">
                            Pay when you stay
                          </span>
                        </label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="later"
                          checked={paymentMethod === "later"}
                          onChange={() => setPaymentMethod("later")}
                          className="mr-2 h-5 w-5"
                        />
                      </div>

                      <ul className="pl-6 text-gray-600 mb-4">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <p>
                            Please note that Kenstay will not issue a tax
                            invoice. You will receive a commercial receipt for
                            the purpose of the transaction. Upon request, a tax
                            invoice would be issued by the property
                          </p>
                        </li>
                      </ul>

                      <hr className="my-4" />

                      <div className="flex justify-between items-center">
                        <div className="font-bold text-lg">Total</div>
                        <div>
                          <div className="text-right font-bold text-lg">
                            INR 2,490.00
                          </div>
                          <div className="text-right text-xs text-gray-500">
                            (includes taxes & fees)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pay now */}
                    <div className="my-6 pb-4 ">
                      <div className="flex items-start mb-2">
                        <label className="flex items-center flex-1">
                          <span className="font-semibold">Pay now</span>
                        </label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="now"
                          checked={paymentMethod === "now"}
                          onChange={() => setPaymentMethod("now")}
                          className="mr-2 h-5 w-5"
                        />
                      </div>

                      <ul className="pl-6 text-gray-600 mb-4">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <p>
                            We will process your payment in your local currency
                          </p>
                        </li>
                        <li className="flex items-start mt-2">
                          <span className="mr-2">•</span>
                          <p>
                            Please note that Kenstay will not issue a tax
                            invoice. You will receive a commercial receipt for
                            the purpose of the transaction
                          </p>
                        </li>
                      </ul>

                      <hr className="my-4" />

                      <div className="flex justify-between items-center">
                        <div className="font-bold text-lg">Total</div>
                        <div>
                          <div className="text-right font-bold text-lg">
                            INR 2,490.00
                          </div>
                          <div className="text-right text-xs text-gray-500">
                            (includes taxes & fees)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation policy */}
                    <div className="border rounded-lg mb-4">
                      <button
                        className="w-full p-4 flex justify-between items-center"
                        onClick={() =>
                          setIsShowingCancellation(!isShowingCancellation)
                        }
                      >
                        <h3 className="text-lg font-bold">
                          Cancellation policy
                        </h3>
                        {isShowingCancellation ? (
                          <IoIosArrowUp size={24} />
                        ) : (
                          <IoIosArrowDown size={24} />
                        )}
                      </button>

                      {isShowingCancellation && (
                        <div className="p-4 pt-0">
                          <ul className="pl-6 text-gray-600 text-sm">
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>Fully refundable before Thu, 14 Dec</p>
                            </li>
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                Cancellations or changes made after 18:00
                                (property local time) on 14 Dec 2023 or no-shows
                                are subject to a property fee equal to 100% of
                                the total amount paid for the reservation.
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Important information */}
                    <div className="border rounded-lg mb-6">
                      <button
                        className="w-full p-4 flex justify-between items-center"
                        onClick={() =>
                          setIsShowingInformation(!isShowingInformation)
                        }
                      >
                        <h3 className="text-lg font-bold">
                          Important information
                        </h3>
                        {isShowingInformation ? (
                          <IoIosArrowUp size={24} />
                        ) : (
                          <IoIosArrowDown size={24} />
                        )}
                      </button>

                      {isShowingInformation && (
                        <div className="p-4 pt-0">
                          <ul className="pl-6 text-gray-600 text-sm">
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                This property offers transfers from the airport
                                (surcharges may apply). To arrange pick-up,
                                guests must contact the property 24 hours prior
                                to arrival, using the contact information on the
                                booking confirmation. Front desk staff will
                                greet guests on arrival.
                              </p>
                            </li>
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                Please note that Kenstay and the hotel will not
                                issue a tax invoice. You will receive a
                                commercial receipt for the purpose of the
                                transaction.
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Refund notice */}
                    <p className="text-blue-500 mb-4 text-sm">
                      *Fully refundable before Thu, 14 Dec
                    </p>

                    {/* Terms acknowledgment */}
                    <p className="text-gray-600 mb-6 text-sm">
                      By clicking on the button below, I acknowledge that I have
                      reviewed the{" "}
                      <span className="text-blue-500">Privacy Statement</span>{" "}
                      and{" "}
                      <span className="text-blue-500">
                        Government Travel Advice
                      </span>{" "}
                      and have reviewed and accept the{" "}
                      <span className="text-blue-500">
                        Rules & Restrictions
                      </span>{" "}
                      and <span className="text-blue-500">Terms of Use</span>
                    </p>

                    {/* Navigation buttons */}
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
                  <div>
                    {/* Payment Type */}
                    <h3 className="text-xl font-bold mb-4">
                      Who's checking in?
                    </h3>

                    <div className="border rounded-lg mb-4 p-4">
                      <h2 className="mb-4 text-lg font-semibold ">
                        Booking Details
                      </h2>

                      <h4 className="my-2 text-sm font-semibold">
                        Guest 1( Adult )
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="relative w-full mb-6">
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

                        <div className="relative w-full mb-6">
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
                      </div>

                      <h4 className="mb-2 text-sm font-semibold">
                        Guest 2( Adult )
                      </h4>
                      <div className="grid grid-cols-2 gap-4 ">
                        <div className="relative w-full">
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

                        <div className="relative w-full">
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

                        <div className="relative w-full">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Phone Number
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="94644-34546"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Email Address
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="abc@gmail.com"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div className="relative w-full my-4">
                        <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                          Special Request(optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your request"
                          className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Cancellation policy */}
                    <div className="border rounded-lg mb-4">
                      <button
                        className="w-full p-4 flex justify-between items-center"
                        onClick={() =>
                          setIsShowingCancellation(!isShowingCancellation)
                        }
                      >
                        <h3 className="text-lg font-bold">
                          Cancellation policy
                        </h3>
                        {isShowingCancellation ? (
                          <IoIosArrowUp size={24} />
                        ) : (
                          <IoIosArrowDown size={24} />
                        )}
                      </button>

                      {isShowingCancellation && (
                        <div className="p-4 pt-0">
                          <ul className="pl-6 text-gray-600 text-sm">
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>Fully refundable before Thu, 14 Dec</p>
                            </li>
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                Cancellations or changes made after 18:00
                                (property local time) on 14 Dec 2023 or no-shows
                                are subject to a property fee equal to 100% of
                                the total amount paid for the reservation.
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Important information */}
                    <div className="border rounded-lg mb-6">
                      <button
                        className="w-full p-4 flex justify-between items-center"
                        onClick={() =>
                          setIsShowingInformation(!isShowingInformation)
                        }
                      >
                        <h3 className="text-lg font-bold">
                          Important information
                        </h3>
                        {isShowingInformation ? (
                          <IoIosArrowUp size={24} />
                        ) : (
                          <IoIosArrowDown size={24} />
                        )}
                      </button>

                      {isShowingInformation && (
                        <div className="p-4 pt-0">
                          <ul className="pl-6 text-gray-600 text-sm">
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                This property offers transfers from the airport
                                (surcharges may apply). To arrange pick-up,
                                guests must contact the property 24 hours prior
                                to arrival, using the contact information on the
                                booking confirmation. Front desk staff will
                                greet guests on arrival.
                              </p>
                            </li>
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                Please note that Kenstay and the hotel will not
                                issue a tax invoice. You will receive a
                                commercial receipt for the purpose of the
                                transaction.
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Refund notice */}
                    <p className="text-blue-500 mb-4 text-sm">
                      *Fully refundable before Thu, 14 Dec
                    </p>

                    {/* Terms acknowledgment */}
                    <p className="text-gray-600 mb-6 text-sm">
                      By clicking on the button below, I acknowledge that I have
                      reviewed the{" "}
                      <span className="text-blue-500">Privacy Statement</span>{" "}
                      and{" "}
                      <span className="text-blue-500">
                        Government Travel Advice
                      </span>{" "}
                      and have reviewed and accept the{" "}
                      <span className="text-blue-500">
                        Rules & Restrictions
                      </span>{" "}
                      and <span className="text-blue-500">Terms of Use</span>
                    </p>

                    {/* Navigation buttons */}
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
                )}

                {currentStep === 3 && (
                  <div>
                    {/* Payment Type */}
                    <h3 className="text-xl font-bold mb-4">Check & Pay</h3>

                    <div className="flex items-center gap-6 w-full">
                      <div className="border rounded-lg p-6 mb-6 w-full">
                        <h3 className="text-lg font-medium mb-4">
                          Booking details
                        </h3>

                        <div className="flex items-center gap-3">
                          <GoPerson size={16} className="text-primarycolor" />
                          Ankit Sharma
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                          <GoPerson size={16} className="text-primarycolor" />
                          Ankit Sharma
                        </div>
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
                      <h3 className="text-lg font-medium mb-4">Your Payment</h3>

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
                          <Image
                            src={discover}
                            alt="americanexpress"
                            height={25}
                          />
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
                            conditions and privacy policies of abc.com, Gotogate
                            International AB, Air India and with the fare rules.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg mb-4 p-4">
                      <h2 className="mb-4 text-lg font-semibold ">
                        Booking Details
                      </h2>

                      <h4 className="my-2 text-sm font-semibold">
                        Guest 1( Adult )
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="relative w-full mb-6">
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

                        <div className="relative w-full mb-6">
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
                      </div>

                      <h4 className="mb-2 text-sm font-semibold">
                        Guest 2( Adult )
                      </h4>
                      <div className="grid grid-cols-2 gap-4 ">
                        <div className="relative w-full">
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

                        <div className="relative w-full">
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

                        <div className="relative w-full">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Phone Number
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="94644-34546"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div className="relative w-full">
                          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                            Email Address
                            <span className="text-sm">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="abc@gmail.com"
                            className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div className="relative w-full my-4">
                        <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center">
                          Special Request(optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your request"
                          className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Cancellation policy */}
                    <div className="border rounded-lg mb-4">
                      <button
                        className="w-full p-4 flex justify-between items-center"
                        onClick={() =>
                          setIsShowingCancellation(!isShowingCancellation)
                        }
                      >
                        <h3 className="text-lg font-bold">
                          Cancellation policy
                        </h3>
                        {isShowingCancellation ? (
                          <IoIosArrowUp size={24} />
                        ) : (
                          <IoIosArrowDown size={24} />
                        )}
                      </button>

                      {isShowingCancellation && (
                        <div className="p-4 pt-0">
                          <ul className="pl-6 text-gray-600 text-sm">
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>Fully refundable before Thu, 14 Dec</p>
                            </li>
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                Cancellations or changes made after 18:00
                                (property local time) on 14 Dec 2023 or no-shows
                                are subject to a property fee equal to 100% of
                                the total amount paid for the reservation.
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Important information */}
                    <div className="border rounded-lg mb-6">
                      <button
                        className="w-full p-4 flex justify-between items-center"
                        onClick={() =>
                          setIsShowingInformation(!isShowingInformation)
                        }
                      >
                        <h3 className="text-lg font-bold">
                          Important information
                        </h3>
                        {isShowingInformation ? (
                          <IoIosArrowUp size={24} />
                        ) : (
                          <IoIosArrowDown size={24} />
                        )}
                      </button>

                      {isShowingInformation && (
                        <div className="p-4 pt-0">
                          <ul className="pl-6 text-gray-600 text-sm">
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                This property offers transfers from the airport
                                (surcharges may apply). To arrange pick-up,
                                guests must contact the property 24 hours prior
                                to arrival, using the contact information on the
                                booking confirmation. Front desk staff will
                                greet guests on arrival.
                              </p>
                            </li>
                            <li className="flex items-start mt-2">
                              <span className="mr-2">•</span>
                              <p>
                                Please note that Kenstay and the hotel will not
                                issue a tax invoice. You will receive a
                                commercial receipt for the purpose of the
                                transaction.
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Refund notice */}
                    <p className="text-blue-500 mb-4 text-sm">
                      *Fully refundable before Thu, 14 Dec
                    </p>

                    {/* Terms acknowledgment */}
                    <p className="text-gray-600 mb-6 text-sm">
                      By clicking on the button below, I acknowledge that I have
                      reviewed the{" "}
                      <span className="text-blue-500">Privacy Statement</span>{" "}
                      and{" "}
                      <span className="text-blue-500">
                        Government Travel Advice
                      </span>{" "}
                      and have reviewed and accept the{" "}
                      <span className="text-blue-500">
                        Rules & Restrictions
                      </span>{" "}
                      and <span className="text-blue-500">Terms of Use</span>
                    </p>

                    {/* Navigation buttons */}
                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center gap-2 cursor-pointer"
                      >
                        <IoIosArrowBack size={16} />
                        Back
                      </button>
                    </div>
                  </div>
                )}
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
                 onClick={() => navigate.push("/book-homestay/booking-confirm")}
                className="w-full py-3 bg-secondarycolor text-white rounded-md mt-4 font-medium">
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
