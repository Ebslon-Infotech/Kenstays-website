"use client";

import React from "react";
import Image from "next/image";

import background2 from "@/assets/Homepage/background2.webp";

import { IoLocationSharp } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";

export default function getInTouch() {
  return (
    <div className="relative h-[300px]">
      <Image src={background2} alt="background" />
      <div className="absolute left-[10%] top-1/4 text-center">
        <h2
          className="text-6xl font-semibold text-primarycolor"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Get In Touch
        </h2>
        <p className="text-lg font-medium text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ullam!
        </p>

        <div className="bg-primarycolor h-[20rem] w-[80vw] mb-10 mt-32 relative">
          <div className="bg-white absolute h-[25rem] w-[86.5rem] left-[2%] -top-[12%]">
            <div className="flex justify-between gap-6 w-full">
              <div className="p-16 flex flex-col justify-between gap-6 w-full">
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="bg-primarycolor text-white rounded-full p-2 w-fit">
                    <IoLocationSharp size={30} />
                  </div>
                  <p className="font-semibold text-lg mt-4">
                    121 Rock Sreet, 21 Avenue, New York,
                    <br /> NY 92103-9000
                  </p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="bg-primarycolor text-white rounded-full p-2 w-fit">
                    <PiPhoneCallFill size={30} />
                  </div>
                  <p className="font-semibold text-lg mt-4">+91 8596231458</p>
                  <p className="font-semibold text-lg">+91 8596231458</p>
                </div>
              </div>
              <div className="px-10 py-12  w-full flex flex-col justify-between gap-6">
                <div className="relative w-full">
                  <label className="absolute -top-2 left-2 text-xs font-semibold text-gray-500 bg-white px-1 flex items-center gap-2">
                    Enter your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="relative w-full">
                  <label className="absolute -top-2 left-2 text-xs font-semibold text-gray-500 bg-white px-1 flex items-center gap-2">
                    Enter your Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="relative w-full">
                  <label className="absolute -top-2 left-2 text-xs font-semibold text-gray-500 bg-white px-1 flex items-center gap-2">
                    Enter your Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Enter your message"
                    className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
