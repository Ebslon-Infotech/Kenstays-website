"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Select = dynamic(() => import("react-select"), { ssr: false });

import Flight from "@/assets/Homepage/flightBanner.webp";
import HotelBanner from "@/assets/Homepage/hotelBanner.webp";
import HomestayBanner from "@/assets/Homepage/Gallery/pexels-jonathanborba-30767888.jpg";
import HolidayBanner from "@/assets/Homepage/Gallery/vidar-nordli-mathisen-AvnXCFX25GA-unsplash.jpg";
import line1 from "@/assets/Homepage/line1.webp";
import line2 from "@/assets/Homepage/line2.webp";
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

interface FlightFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: number;
}

export default function TravelBooking() {
  const searchparams = useSearchParams();
  const router = useRouter();
  const type = searchparams.get("type") || "Flight";
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(["one-way", "direct", "India"])
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMenuTab, setActiveMenuTab] = useState("Flight");

  // Flight search form state
  const [flightForm, setFlightForm] = useState<FlightFormData>({
    origin: "DEL",
    destination: "DXB",
    departureDate: new Date().toISOString().split("T")[0],
    returnDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 2,
  });

  // Hotel search form state
  const [hotelForm, setHotelForm] = useState({
    location: "",
    propertyType: null,
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    guests: null,
  });

  // Handle hotel search submission
  // Handle hotel search submission
  const handleHotelSearch = async () => {
    try {
      if (!hotelForm.location) {
        alert("Please enter a location");
        return;
      }

      // In a real app we'd need to map the location name to a CityCode or HotelCode first.
      // For this demo, let's assume we search by providing a valid CityCode or similar requirement if API enforces it.
      // Or we send the location string to backend and backend resolves it.

      // Construct search payload matching what our backend controller expects
      const searchPayload = {
        checkIn: hotelForm.checkIn,
        checkOut: hotelForm.checkOut,
        cityId: "130443", // Mocking a CityCode for 'Delhi' or similar for now as we don't have a City Auto-suggest yet
        guestNationality: "IN",
        paxRooms: [
          {
            Adults: 1, // Defaulting for simple search
            Children: 0,
          },
        ],
      };

      console.log("Searching hotels with:", searchPayload);

      // We redirect to a search results page with query params so the results page can fetch data
      // OR we fetch here and pass data. Usually query params are better for distinct URLs.
      const params = new URLSearchParams({
        cityId: "130443",
        checkIn: hotelForm.checkIn,
        checkOut: hotelForm.checkOut,
        adults: "1",
        children: "0",
      });

      router.push(`/hotels?${params.toString()}`);
    } catch (error) {
      console.error("Error searching hotels:", error);
    }
  };

  const [selectedTravelersClass, setSelectedTravelersClass] = useState<any>({
    value: "1 Adult, Economy",
    label: "1 Adult, Economy",
  });

  const menulist = [
    { icon: <FaPlane className="h-5 w-5" />, name: "Flight" },
    { icon: <FaBuilding className="h-5 w-5" />, name: "Hotel" },
    { icon: <IoBed className="h-5 w-5" />, name: "Homestays" },
    { icon: <BsGlobeAmericas className="h-5 w-5" />, name: "Holidays" },
  ];

  useEffect(() => {
    const menuIndex = menulist.findIndex(
      (menu) => menu.name.toLowerCase() === type.toLowerCase()
    );
    if (menuIndex !== -1) {
      setActiveMenuTab(menulist[menuIndex].name);
      setActiveIndex(menuIndex);
    }
  }, [type]);

  // Handle flight search submission
  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      origin: flightForm.origin,
      destination: flightForm.destination,
      departureDate: flightForm.departureDate,
      adults: flightForm.adults.toString(),
      children: flightForm.children.toString(),
      infants: flightForm.infants.toString(),
      cabinClass: flightForm.cabinClass.toString(),
      directFlight: selectedOptions.has("direct").toString(),
    });

    if (flightForm.returnDate) {
      params.append("returnDate", flightForm.returnDate);
    }

    router.push(`/flights/search-results?${params.toString()}`);
  };

  // Update travelers and class selection
  const handleTravelersClassChange = (selectedOption: any) => {
    setSelectedTravelersClass(selectedOption);

    // Parse the selection (e.g., "2 Adults, 1 Child, Business")
    const value = selectedOption.value;
    const parts = value.split(", ");

    // Extract adults/children/infants
    parts.forEach((part: string) => {
      if (part.includes("Adult")) {
        const count = parseInt(part);
        setFlightForm((prev) => ({ ...prev, adults: count }));
      } else if (part.includes("Child")) {
        const count = parseInt(part);
        setFlightForm((prev) => ({ ...prev, children: count }));
      } else if (part.includes("Infant")) {
        const count = parseInt(part);
        setFlightForm((prev) => ({ ...prev, infants: count }));
      }
    });

    // Extract cabin class
    if (value.includes("Economy")) {
      setFlightForm((prev) => ({ ...prev, cabinClass: 2 }));
    } else if (value.includes("Business")) {
      setFlightForm((prev) => ({ ...prev, cabinClass: 4 }));
    } else if (value.includes("First")) {
      setFlightForm((prev) => ({ ...prev, cabinClass: 6 }));
    }
  };

  // Travelers & Class options
  const travelersClassOptions = [
    { value: "1 Adult, Economy", label: "1 Adult, Economy" },
    { value: "2 Adults, Economy", label: "2 Adults, Economy" },
    { value: "3 Adults, Economy", label: "3 Adults, Economy" },
    { value: "4 Adults, Economy", label: "4 Adults, Economy" },
    { value: "1 Adult, 1 Child, Economy", label: "1 Adult, 1 Child, Economy" },
    {
      value: "2 Adults, 1 Child, Economy",
      label: "2 Adults, 1 Child, Economy",
    },
    {
      value: "2 Adults, 2 Children, Economy",
      label: "2 Adults, 2 Children, Economy",
    },
    { value: "1 Adult, Business", label: "1 Adult, Business" },
    { value: "2 Adults, Business", label: "2 Adults, Business" },
    { value: "1 Adult, First", label: "1 Adult, First Class" },
  ];

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

          // Clear return date if switching to one-way
          if (id === "one-way") {
            setFlightForm({ ...flightForm, returnDate: "" });
          }
        }
        newSelected.add(id);
      } else {
        newSelected.add(id);
      }
    }
    setSelectedOptions(newSelected);
  };
  const getBannerImage = () => {
    switch (type) {
      case "Flight":
        return Flight;
      case "Hotel":
        return HotelBanner;
      case "Homestays":
        return HomestayBanner;
      case "Holidays":
        return HolidayBanner;
      default:
        return Flight;
    }
  };

  return (
    <>
      <Image
        src={getBannerImage()}
        alt={`${type} Banner`}
        className="w-full h-[70vh] object-cover relative"
      />

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
            <form onSubmit={handleFlightSearch}>
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
                      value={flightForm.origin}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          origin: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="Airport Code (e.g., DEL)"
                      required
                      maxLength={3}
                      className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                    />
                  </div>

                  <span
                    className="text-gray-600 cursor-pointer"
                    onClick={() => {
                      const temp = flightForm.origin;
                      setFlightForm({
                        ...flightForm,
                        origin: flightForm.destination,
                        destination: temp,
                      });
                    }}
                  >
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
                      value={flightForm.destination}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          destination: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="Airport Code (e.g., DXB)"
                      required
                      maxLength={3}
                      className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
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
                      value={flightForm.departureDate}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          departureDate: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Return Date - Only show if round-trip selected */}
                  {selectedOptions.has("round-trip") && (
                    <div className="relative w-full">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                        Return
                      </label>
                      <input
                        type="date"
                        value={flightForm.returnDate}
                        onChange={(e) =>
                          setFlightForm({
                            ...flightForm,
                            returnDate: e.target.value,
                          })
                        }
                        min={flightForm.departureDate}
                        className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Travelers & Class */}
                  <div className="relative w-full">
                    <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                      Travelers & Class
                    </label>
                    <Select
                      instanceId="flight-travelers-class"
                      options={travelersClassOptions}
                      value={selectedTravelersClass}
                      onChange={handleTravelersClassChange}
                      isSearchable={false}
                      required
                      className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                      styles={{
                        control: (styles, { isFocused }) => ({
                          ...styles,
                          backgroundColor: "transparent",
                          border: isFocused
                            ? "2px solid #9333ea"
                            : "1px solid #d1d5db",
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

              {/* Search Button */}
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="mt-6 w-fit bg-secondarycolor text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors hover:bg-opacity-90"
                >
                  <FaPaperPlane className="h-5 w-5" />
                  Search Flights
                </button>
              </div>
            </form>
          )}

          {(activeMenuTab === "Hotel" || activeMenuTab === "Homestays") && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                  Where
                </label>
                <input
                  type="text"
                  placeholder="Area, Landmark or Property Name"
                  value={hotelForm.location}
                  onChange={(e) =>
                    setHotelForm({ ...hotelForm, location: e.target.value })
                  }
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Property Type
                </label>
                <Select
                  instanceId="hotel-property-type"
                  options={[
                    {
                      value: "Hotel",
                      label: "Hotel",
                    },
                    {
                      value: "Resort",
                      label: "Resort",
                    },
                    {
                      value: "Homestay",
                      label: "Homestay",
                    },
                  ]}
                  value={hotelForm.propertyType}
                  onChange={(option: any) =>
                    setHotelForm({ ...hotelForm, propertyType: option })
                  }
                  placeholder="Select Property Type"
                  isSearchable={false}
                  // required // React-select doesn't support required prop directly in the same way
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
                  value={hotelForm.checkIn}
                  onChange={(e) =>
                    setHotelForm({ ...hotelForm, checkIn: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1">
                  Check-Out
                </label>
                <input
                  type="date"
                  value={hotelForm.checkOut}
                  onChange={(e) =>
                    setHotelForm({ ...hotelForm, checkOut: e.target.value })
                  }
                  min={hotelForm.checkIn}
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Guest & Rooms
                </label>
                <Select
                  instanceId="hotel-guest-rooms"
                  options={[
                    {
                      value: "1 Room, 1 Guest",
                      label: "1 Room, 1 Guest",
                    },
                    {
                      value: "1 Room, 2 Guests",
                      label: "1 Room, 2 Guests",
                    },
                    {
                      value: "2 Rooms, 4 Guests",
                      label: "2 Rooms, 4 Guests",
                    },
                  ]}
                  value={hotelForm.guests}
                  onChange={(option: any) =>
                    setHotelForm({ ...hotelForm, guests: option })
                  }
                  placeholder="Select guest & rooms"
                  isSearchable={false}
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
                  instanceId="holiday-property-type"
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
                  defaultValue="2024-01-18"
                  className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Guest & Rooms
                </label>
                <Select
                  instanceId="holiday-guest-rooms-1"
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

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 z-10">
                  Guest & Rooms
                </label>
                <Select
                  instanceId="holiday-guest-rooms-2"
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

          {/* Show Hotels/Homestays/Holidays Buttons */}
          {activeMenuTab === "Hotel" && (
            <div className="flex justify-center mt-5">
              <button
                onClick={handleHotelSearch}
                className="mt-6 w-fit bg-secondarycolor text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors hover:bg-opacity-90"
              >
                <FaPaperPlane className="h-5 w-5" />
                Show Hotels
              </button>
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
