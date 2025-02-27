"use client";

import React from "react";

export default function exploreCard({ explore }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-300 mx-auto w-full shadow-md hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:border-none cursor-pointer">
      <div className="relative">
        <img
          src={explore.image.src}
          className="w-full object-cover rounded-t-xl"
          alt={explore.name}
        />
        <div className="absolute bottom-4 w-full text-center px-4">
          <h3 className="text-white text-[1rem] font-normal">Create Memories in</h3>
          <p className="text-white text-4xl font-medium mt-2" style={{fontFamily : "var(--font-playfair)"}}>{explore.name}</p>
        </div>
      </div>
    </div>
  );
}
