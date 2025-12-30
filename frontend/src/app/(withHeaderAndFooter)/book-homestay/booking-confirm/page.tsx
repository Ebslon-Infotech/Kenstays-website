"use client";

import React from "react";
import Image from "next/image";

import Logo from "@/assets/logo.webp"
import hotelDetail from "@/assets/Hotels/hotel_detail.webp"
import mastercard from "@/assets/Flight/mc.webp"

export default function page() {
  return (
    <>
      <div className="max-w-7xl mx-auto my-10 flex flex-col bg-gray-100/30">
        {/* Header */}
        <header className="bg-secondarycolor text-white py-4 px-20 flex justify-between items-center">
          <div>
            <Image src={Logo} alt="KENSTAY" width={60} />
          </div>
          <div className="text-right">
            <p>Booking Conformation : 852369417852</p>
            <p>Booking ID : 852369417852</p>
          </div>
        </header>

        {/* Confirmation Section */}
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl text-yellow-500 font-bold">Thanks Ankit!</h2>
          <p className="text-xl mt-2">Your booking in Hotel confirmed.</p>
        </div>

        {/* Booking Info */}
        <div className="container mx-auto px-20 mb-8">
          <div className="space-y-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Paradise Hotel is expecting you on 14 February</p>
            </div>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                Your payment will be handled by Paradise Hotel. The 'Payment'
                section below has more details
              </p>
            </div>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                Make changes to your booking or ask the property a question in
                just a few clicks
              </p>
            </div>
          </div>

          {/* Hotel Information */}
          <div className="mt-8">
            <h2 className="text-3xl text-secondarycolor font-bold" style={{fontFamily: "var(--font-playfair-display)"}}>
              Paradise Hotel
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              <div>
                <p className="text-gray-500">Address</p>
                <p>Asset Area 12, New Delhi, 110096 India</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p>+91 8596231485</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p>Info@paradise.com</p>
              </div>
            </div>
          </div>

          {/* Room Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
            <Image
              src={hotelDetail}
              alt="Room"
              className="w-full rounded"
            />
            <Image
              src={hotelDetail}
              alt="Room"
              className="w-full rounded"
            />
          </div>

          {/* Room Details */}
          <div className="mt-8">
            <h3 className="font-bold text-lg">Room Details</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Room No.</span>
                <span>201, 2nd Floor</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Your reservation</span>
                <span>1 night, 1 dormitory bed</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Check-in</span>
                <span>Wednesday 14 February 2024 (from 11:00 am)</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Check-out</span>
                <span>February 15 Feb 2024 (until 10:00 am)</span>
              </div>

              <div className="flex justify-between ">
                <span className="text-gray-500">Pre-Payment</span>
                <span>
                  You will be charged a prepayment of the total price at any
                  time.
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Cancellation Cost</span>
                <span>From now on:₹ 1499.00</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mt-8">
            <h3 className="font-bold text-lg">Your payment</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span>Confirmed</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span>-00.00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span>26,490</span>
              </div>
            </div>

            <div className="mt-6 pb-2 border-t">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-lg">Total Pay</p>
                  <p className="text-sm text-gray-500">
                    Includes taxes and charges
                  </p>
                </div>
                <p className="font-bold text-lg">₹ 26,490.00</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="font-bold text-lg">Payment Method</h3>
            <div className="flex items-center mt-4">
              <Image src={mastercard} alt="master" height={30} />
              <span className="ml-3">xxxx xxxx xxxx 8596</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4 w-full">
            <button className="bg-purple-900 text-white py-3 rounded px-4 w-[30%]">
              Make changes to your booking
            </button>
            <button className="border border-red-500 text-red-500 py-3 rounded px-4 w-[30%]">
              Cancel your booking
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center ">
            <p>
              <span className="text-red-600">Note :</span> 
               This booking is non-refundable. Changing the dates of your
              stay is not possible.<span className="text-sm text-red-600">*</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
