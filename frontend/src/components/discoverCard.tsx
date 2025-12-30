"use client";

import React from "react";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";

export default function discoverCard({ discover }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-300 mx-auto w-full shadow-md hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:border-none cursor-pointer">
      <div className="relative">
        <img
          src={discover.image.src}
          className="w-full h-56 object-cover rounded-t-xl"
          alt={discover.name}
        />
        <div className="flex absolute top-4 w-full justify-between px-4 items-center">
          <div className="bg-black/90 rounded-md text-white px-4 py-2"> 
            Featured
          </div>
          <div className="bg-gray-300/50 rounded-full p-1">
            <IoHeartOutline size={24} strokeWidth={2} />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mt-2">
          {discover.title} {discover.time ? `(- ${discover.time})` : ""}
        </h2>
        <p className="text-gray-600 text-sm mt-2 flex items-center gap-2">
          <HiOutlineLocationMarker size={20} strokeWidth={1} />
          {discover.location}
        </p>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill={i < discover.rating ? "green" : "none"}
              stroke="green"
              strokeWidth="1.5"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <div className="flex items-center justify-between gap-1 mt-2">
          <p className="text-xl font-bold">${discover.price.toFixed(2)}</p>

          <button className="bg-secondarycolor text-white py-2 px-4 rounded-md w-fit">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
