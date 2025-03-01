import React from "react";

import Image from "next/image";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoIosAirplane } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { PiBuildingApartmentFill } from "react-icons/pi";

import CoverImage from "@/assets/Holiday/coverImage.webp";
import { IMAGES_MANIFEST } from "next/dist/shared/lib/constants";

const KashmirTravelCard = () => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-300  bg-white">
      {/* Card Image with Overlay Elements */}
      <div className="relative">
        <Image
          src={CoverImage}
          alt="Kashmir Lake with Traditional Boat"
          className="w-full h-64 object-cover"
        />

        {/* Package Duration */}
        <div className="absolute top-3 left-3 bg-indigo-900 text-white py-1 px-4 rounded-md font-medium text-sm">
          5N/6D
        </div>

        {/* Bookmark Button */}
        <div className="absolute top-3 right-3 bg-white bg-opacity-70 p-3 rounded-full">
          <CiBookmarkCheck className="text-gray-500 w-5 h-5" />
        </div>

        {/* Customizable Badge */}
        <div className="absolute bottom-0 right-0 rounded-tl-xl bg-black/80 text-white py-2 px-4 font-medium">
          CUSTOMIZABLE
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Paradise on Earth - Kashmir
        </h2>

        {/* Trip Features */}
        <div className="flex justify-between mb-4">
          <div className="flex flex-col items-center">
            <IoIosAirplane className="w-6 h-6 mb-2" />
            <span className="text-sm">2 Flight</span>
          </div>
          <div className="flex flex-col items-center">
            <PiBuildingApartmentFill className="w-6 h-6 mb-2" />
            <span className="text-sm">4 Hotels</span>
          </div>
          <div className="flex flex-col items-center">
            <FaPersonWalkingLuggage className="w-6 h-6 mb-2" />
            <span className="text-sm">11 Activities</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCar className="w-6 h-6 mb-2" />
            <span className="text-sm">5 Transfers</span>
          </div>
        </div>

        {/* Itinerary */}
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

        {/* Rating */}
        <div className="flex gap-3 items-end mb-4">
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
          <p className="text-blue-500 text-right text-sm">306 reviews</p>
        </div>

        {/* Inclusions and Price */}
        <div className="flex justify-between">
          <ul className="mb-4">
            <li className="flex items-center mb-2">
              <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
              <span className="text-gray-500 text-sm">Night Tour</span>
            </li>
            <li className="flex items-center">
              <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
              <span className="text-gray-500 text-sm">
                Gondola Ticket Phase 1
              </span>
            </li>
          </ul>

          {/* Final Price */}
          <div className="flex flex-col items-end">
            <span className="text-gray-400 line-through text-sm">₹42,264</span>
            <div className="text-right">
              <div className="text-lg font-bold">₹32,264</div>
              <div className="text-gray-400 text-xs">per person</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KashmirTravelCard;
