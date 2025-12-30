"use client";

import React, { useState } from "react";

import offer1 from "@/assets/Homepage/Offers/offer1.webp";
import offer2 from "@/assets/Homepage/Offers/offer2.webp";
import offer3 from "@/assets/Homepage/Offers/offer3.webp";
export default function OffersSection() {
  const [activeIndexTabs, setActiveIndexTabs] = useState(0);
  const offers = [
    {
      title: "Grab Flat 10% OFF* on Domestic Flights",
      description:
        "Book with Credit Card & fly away to a soomthing destination for a break.",
      image: offer1,
      buttonText: "Book Now",
    },
    {
      title: "Up to 45% OFF* on Homestays & Villas in India",
      description: "To maKe your winter break unforgettable!",
      image:offer2,
      buttonText: "Book Now",
    },
    {
      title: "For a Peaceful, Spiritual Break",
      description:
        "Grab up to 30% OFF* on our specially-curated pilgrimage holiday packages.",
      image: offer3,
      buttonText: "Book Now",
    },
  ];

  const tabs = ["All", "Flights", "Hotels", "Holidays"];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-semibold text-black mb-2"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Offers
        </h1>

        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-500 text-[1.13rem] font-medium mb-4">
            Adventure Unveiled: Explore New Horizons Every Week
          </p>

          {/* Tabs */}
          <div className="flex gap-4 mb-4">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveIndexTabs(index)}
                className={`text-sm font-medium px-4 ${
                  index === activeIndexTabs
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-400 hover:text-gray-300"
                } pb-2`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg p-4 shadow-xl hover:shadow-2xl flex items-start gap-3"
            >
              <img
                src={offer.image.src}
                alt={offer.title}
                className="w-[9rem] object-cover rounded-md"
              />
              <div className="flex flex-col justify-between h-full">
                <h3 className="text-[1.12rem] font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                <button className="w-fit text-[1rem] bg-secondarycolor text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  {offer.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
