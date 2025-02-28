"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import Image from "next/image";

import Flight from "@/assets/Homepage/flightBanner.webp";
import Hotel from "@/assets/Homepage/hotelBanner.webp";
import line1 from "@/assets/Homepage/line1.webp";
import line2 from "@/assets/Homepage/line2.webp";
import line3 from "@/assets/Homepage/line3.webp";
import line11 from "@/assets/Homepage/line-1.webp";
import line12 from "@/assets/Homepage/line-2.webp";

import { FaPlane, FaBuilding, FaPaperPlane, FaCheck } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { BsGlobeAmericas } from "react-icons/bs";
import { LuArrowRightLeft } from "react-icons/lu";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { useSearchParams } from "next/navigation";

interface Option {
  id: string;
  label: string;
}
export default function travellBooking() {
  const searchparams = useSearchParams();
  const type = searchparams.get("type") || "Flight";
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(["one-way", "direct", "India"])
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMenuTab, setActiveMenuTab] = useState("Flight");

  const optionFlight: Option[] = [
    { id: "one-way", label: "One Way" },
    { id: "round-trip", label: "Round Trip" },
    { id: "multi-city", label: "Multi-city" },
    { id: "direct", label: "Direct flights only" },
  ];

  const option: Option[] = [
    { id: "India", label: "India" },
    { id: "International", label: "International" },
  ];

  const toggleOption = (id: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (optionFlight.some((option) => option.id === id)) {
        if (["one-way", "round-trip", "multi-city"].includes(id)) {
          ["one-way", "round-trip", "multi-city"].forEach((tripType) => {
            newSelected.delete(tripType);
          });
        }
        newSelected.add(id);
      } else {
        newSelected.add(id);
      }
    }
    setSelectedOptions(newSelected);
  };

  const menulist = [
    { icon: <FaPlane className="h-5 w-5" />, name: "Flight" },
    { icon: <FaBuilding className="h-5 w-5" />, name: "Hotel" },
    { icon: <IoBed className="h-5 w-5" />, name: "Homestays" },
    { icon: <BsGlobeAmericas className="h-5 w-5" />, name: "Holidays" },
  ];
  return (
    <>
      {type === "Flight" && (
        <Image
          src={Flight}
          alt="Home Page"
          className="w-full h-[70vh] object-cover relative"
        />
      )}

      {type !== "Flight" && (
        <Image
          src={Hotel}
          alt="Home Page"
          className="w-full h-[70vh] object-cover relative"
        />
      )}

      <div className="absolute top-1/3 left-[32%] transform -translate-x-1/2 -translate-y-1/2 text-black text-center space-y-4">
        <div className="flex items-center gap-2">
          <h2
            className={`text-3xl font-semibold ${
              type === "Flight" ? "text-white" : "text-primarycolor"
            }`}
            style={{ fontFamily: "var(--font-dancing-script)" }}
          >
            Relax and Enjoy
          </h2>
          {type === "Flight" ? (
            <Image src={line1} alt="Home Page" className={`w-10`} />
          ) : (
            <Image src={line11} alt="Home Page" className={`w-10`} />
          )}

          {type === "Flight" ? (
            <Image src={line2} alt="Home Page" className={`w-[10px] h-[1px]`} />
          ) : (
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
          )}

          {type === "Flight" ? (
            <Image src={line2} alt="Home Page" className={`w-[10px] h-[1px]`} />
          ) : (
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
          )}
        </div>
        <h1
          className={`text-start text-[3.35rem] leading-[2.8rem] font-medium ${
            type === "Flight" ? "text-secondarycolor" : "text-white"
          }  capitalize`}
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Make your Holiday <br /> Memorable
        </h1>
        <h3 className="text-start text-[1.2rem] font-medium text-white">
          Fine Hotel And Ticket With Best Experience. Intrinsicly architect
          <br /> superior core competencies vis-a-vis interactive partnerships.
        </h3>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-center bg-white p-6 shadow-xl rounded-2xl w-[70%]">
        <h2 className="text-3xl font-semibold">Plan your travel now!</h2>

        <div className="bg-white px-6 pt-6 text-center">
          {/* Tabs/Options */}
          <div className="flex justify-between items-center mb-6">
            <ul className="flex flex-wrap justify-center gap-2">
              {menulist.map((menu, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    activeIndex === index
                      ? "text-yellow-600 font-semibold border-b-2 border-yellow-600 pb-1"
                      : "text-gray-600"
                  }`}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200"
                    onClick={() => {
                      setActiveIndex(index);
                      setActiveMenuTab(menu.name);
                    }}
                  >
                    {menu.icon}
                    <span className="text-sm font-medium">{menu.name}</span>
                  </div>
                </li>
              ))}
            </ul>
            {activeMenuTab == "Flight" && (
              <div className="flex flex-wrap gap-2 p-4">
                {optionFlight.map((option) => {
                  const isSelected = selectedOptions.has(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ${
                        isSelected
                          ? "bg-[#F7B928] text-white"
                          : "bg-gray-100 text-gray-600"
                      } hover:opacity-90 `}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isSelected ? "bg-white" : "border-2 border-gray-400"
                        }`}
                      >
                        {isSelected && (
                          <FaCheck className="w-3 h-3 text-[#F7B928]" />
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {activeMenuTab !== "Flight" && (
              <div className="flex flex-wrap gap-2 p-4">
                {option.map((option) => {
                  const isSelected = selectedOptions.has(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ${
                        isSelected
                          ? "bg-[#F7B928] text-white"
                          : "bg-gray-100 text-gray-600"
                      } hover:opacity-90 `}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isSelected ? "bg-white" : "border-2 border-gray-400"
                        }`}
                      >
                        {isSelected && (
                          <FaCheck className="w-3 h-3 text-[#F7B928]" />
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search Form */}
          {activeMenuTab === "Flight" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From */}
              <div className="flex items-center gap-2 w-full">
                <div className="relative w-full">
                  <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                    From
                    <BiSolidPlaneAlt size={12} />
                  </label>
                  <input
                    type="text"
                    value="New Delhi"
                    className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <span className="text-gray-600">
                  <LuArrowRightLeft size={24} />
                </span>
                {/* To */}
                <div className="relative flex items-center w-full">
                  <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                    To
                    <BiSolidPlaneAlt size={12} />
                  </label>
                  <input
                    type="text"
                    value="Dubai"
                    className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-[1.5rem] w-full">
                {/* Departure */}
                <div className="relative w-full">
                  <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                    Departure
                  </label>
                  <input
                    type="date"
                    value="18 Jan 2024"
                    className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                  />
                </div>

                {/* Travelers & Class */}
                <div className="relative w-full">
                  <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                    Travelers & Class
                  </label>
                  <Select
                    options={[
                      {
                        value: "1 Passenger, Economy",
                        label: "1 Passenger, Economy",
                      },
                      {
                        value: "2 Passengers, Economy",
                        label: "2 Passengers, Economy",
                      },
                      {
                        value: "1 Passenger, Business",
                        label: "1 Passenger, Business",
                      },
                    ]}
                    placeholder="1 Passenger, Economy"
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
                        fontSize: "0.9rem",
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
                        fontSize: "0.9rem",
                        fontWeight: "600",
                      }),
                      singleValue: (styles) => ({
                        ...styles,
                        color: "#475569",
                        fontSize: "1rem",
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
            </div>
          )}

          {(activeMenuTab === "Hotel" || activeMenuTab === "Homestays") && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* From */}
              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                  Where
                </label>
                <input
                  type="text"
                  placeholder="Area, Landmark or Property Name"
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Property Type
                </label>
                <Select
                  options={[
                    {
                      value: "1 Passenger, Economy",
                      label: "1 Passenger, Economy",
                    },
                    {
                      value: "2 Passengers, Economy",
                      label: "2 Passengers, Economy",
                    },
                    {
                      value: "1 Passenger, Business",
                      label: "1 Passenger, Business",
                    },
                  ]}
                  placeholder="Select Property Type"
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

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                  Check-In
                </label>
                <input
                  type="date"
                  value="18 Jan 2024"
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
              </div>

              {/* Departure */}
              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                  Check-Out
                </label>
                <input
                  type="date"
                  value="18 Jan 2024"
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
              </div>

              {/* Travelers & Class */}
              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Guest & Rooms
                </label>
                <Select
                  options={[
                    {
                      value: "1 Passenger, Economy",
                      label: "1 Passenger, Economy",
                    },
                    {
                      value: "2 Passengers, Economy",
                      label: "2 Passengers, Economy",
                    },
                    {
                      value: "1 Passenger, Business",
                      label: "1 Passenger, Business",
                    },
                  ]}
                  placeholder="Select guest & rooms"
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
                      fontSize: "0.9rem",
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
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }),
                    singleValue: (styles) => ({
                      ...styles,
                      color: "#475569",
                      fontSize: "1rem",
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
          )}

          {activeMenuTab === "Holidays" && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* From */}
              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                  From
                </label>
                <input
                  type="text"
                  placeholder="Area, Landmark or Property Name"
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Property Type
                </label>
                <Select
                  options={[
                    {
                      value: "1 Passenger, Economy",
                      label: "1 Passenger, Economy",
                    },
                    {
                      value: "2 Passengers, Economy",
                      label: "2 Passengers, Economy",
                    },
                    {
                      value: "1 Passenger, Business",
                      label: "1 Passenger, Business",
                    },
                  ]}
                  placeholder="Select Property Type"
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

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                  Departure
                </label>
                <input
                  type="date"
                  value="18 Jan 2024"
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Guest & Rooms
                </label>
                <Select
                  options={[
                    {
                      value: "1 Passenger, Economy",
                      label: "1 Passenger, Economy",
                    },
                    {
                      value: "2 Passengers, Economy",
                      label: "2 Passengers, Economy",
                    },
                    {
                      value: "1 Passenger, Business",
                      label: "1 Passenger, Business",
                    },
                  ]}
                  placeholder="Select guest & rooms"
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
                      fontSize: "0.9rem",
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
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }),
                    singleValue: (styles) => ({
                      ...styles,
                      color: "#475569",
                      fontSize: "1rem",
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

              {/* Travelers & Class */}
              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Guest & Rooms
                </label>
                <Select
                  options={[
                    {
                      value: "1 Passenger, Economy",
                      label: "1 Passenger, Economy",
                    },
                    {
                      value: "2 Passengers, Economy",
                      label: "2 Passengers, Economy",
                    },
                    {
                      value: "1 Passenger, Business",
                      label: "1 Passenger, Business",
                    },
                  ]}
                  placeholder="Select guest & rooms"
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
                      fontSize: "0.9rem",
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
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }),
                    singleValue: (styles) => ({
                      ...styles,
                      color: "#475569",
                      fontSize: "1rem",
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
          )}

          {/* Trip Type and Direct Flights */}

          {/* Show Flights Button */}

          {activeMenuTab === "Flight" && (
            <div className="flex justify-center mt-5">
              <Link
                href="/flights"
                className="mt-6 w-fit bg-secondarycolor text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <FaPaperPlane className="h-5 w-5" />
                Show Flights
              </Link>
            </div>
          )}

          {activeMenuTab === "Hotel"  && (
            <div className="flex justify-center mt-5">
              <Link
                href="/hotels"
                className="mt-6 w-fit bg-secondarycolor text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <FaPaperPlane className="h-5 w-5" />
                Show Hotels
              </Link>
            </div>
          )}

          {activeMenuTab === "Homestays" && (
            <div className="flex justify-center mt-5">
              <Link
                href="/homestays"
                className="mt-6 w-fit bg-secondarycolor text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <FaPaperPlane className="h-5 w-5" />
                Show Homestays
              </Link>
            </div>
          )}

          {activeMenuTab === "Holidays" && (
            <div className="flex justify-center mt-5">
              <Link
                href="/holidays"
                className="mt-6 w-fit bg-secondarycolor text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <FaPaperPlane className="h-5 w-5" />
                Show Holidays
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
