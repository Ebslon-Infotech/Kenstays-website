import React from "react";
import Image from "next/image";
import Ads from "@/assets/Flight/Ads.webp";

export default function Promo() {
  return (
    <div className="bg-purple-50 py-4 pl-12 pr-40 rounded-2xl flex justify-between items-center">
      <div>
        <div className="text-amber-500 mb-2 text-sm font-semibold">
          Trip Savings
        </div>
        <h3 className="text-2xl text-indigo-800 font-medium mb-2">
          Grab Flat 10% OFF* on Domestic Flights
        </h3>
        <p className="text-gray-600 text-sm">
          Book with Credit Card & fly away to a soomthing destination for a
          break.
        </p>
      </div>
      <div>
        <Image src={Ads} alt="Ads" width={150} height={150} />
      </div>
    </div>
  );
}
