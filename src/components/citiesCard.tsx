"use client";

import React from "react";

export default function CitiesCard({ city }: any) {
  
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-300 mx-auto w-full shadow-md hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:border-none cursor-pointer">
        <img
          src={city.image.src}
          className="w-full object-cover rounded-t-xl"
          alt={city.name}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mt-2">
            {city.cityName}, {city.countryName}
          </h2>
          <p className="text-gray-600 text-sm mt-2">{city.flightFrom}</p>
          <p className="text-gray-600 text-sm mt-2">
            {city.startDate} - {city.endDate} • {city.tripDescription}
          </p>

          <button className="bg-secondarycolor text-white py-2 px-4 rounded-md mt-4 w-full">
            Book Now     
          </button>
        </div>
      </div>
    </>
  );
}
