"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { FiUser } from "react-icons/fi";
import { LuFileText } from "react-icons/lu";
import { IoIosLogOut, IoIosArrowDown, IoIosAirplane } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import AirIndia from "@/assets/Flight/AirIndia.webp";

import hotelDetail from "@/assets/Hotels/hotel_detail.webp";


export default function page() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Load user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: "", // You can add phone to user model if needed
        country: "",
        address: "",
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save logic would go here
      // You can implement an API call to update user data
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const [selectedOption, setSelectedOption] = useState("All Booking");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    "All Booking",
    "Flight Booking",
    "Hotel Booking",
    "Holiday Booking",
  ];

  const handleSelect = (option: any) => {
    setSelectedOption(option); // Update button text
    setIsOpen(false); // Close dropdown after selection
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto my-10 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondarycolor mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show message if not logged in (should redirect but just in case)
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto my-10 flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h2
        className="text-3xl font-semibold text-secondarycolor mb-4"
        style={{ fontFamily: "var(--font-playfair-display)" }}
      >
        My Account
      </h2>
      <div className="flex border border-gray-200 w-full">
        {/* Sidebar */}
        <div className="w-96 bg-lavender-50">
          <div className="p-8">
            <div className="space-y-6">
              <div
                className={`flex items-center p-4 hover:bg-purple-200/50 rounded-md cursor-pointer ${
                  selectedTab === "profile" ? "bg-purple-200/50" : ""
                }`}
                onClick={() => setSelectedTab("profile")}
              >
                {selectedTab === "profile" ? (
                  <>
                    <div className="bg-secondarycolor w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                      <FiUser className="text-gray-200 w-5 h-5" />
                    </div>
                    <span className="text-gray-600 text-lg">My Profile</span>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                      <FiUser className="text-gray-500 w-5 h-5" />
                    </div>
                    <span className="text-gray-600 text-lg">My Profile</span>
                  </>
                )}
              </div>

              <div
                className={`flex items-center p-4 hover:bg-purple-200/50 rounded-md cursor-pointer ${
                  selectedTab === "booking" ? "bg-purple-200/50" : ""
                }`}
                onClick={() => setSelectedTab("booking")}
              >
                {selectedTab === "booking" ? (
                  <>
                    <div className="bg-secondarycolor w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                      <LuFileText className="text-gray-200 w-5 h-5" />
                    </div>
                    <span className="text-gray-600 text-lg">My Booking</span>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                      <LuFileText className="text-gray-500 w-5 h-5" />
                    </div>
                    <span className="text-gray-600 text-lg">My Booking</span>
                  </>
                )}
              </div>

              <div
                className="flex items-center p-4 rounded-lg hover:bg-purple-200/50 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                  <IoIosLogOut className="text-gray-500 w-5 h-5" />
                </div>
                <span className="text-gray-600 text-lg">Logout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}

        {selectedTab === "profile" && (
          <div className="flex-1 p-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Personal Information</h2>
              <button
                className={`flex items-center ${
                  isEditing ? "text-green-500" : "text-blue-500"
                }`}
                onClick={handleEditToggle}
              >
                {!isEditing && (
                  <>
                    <FaRegEdit className="w-5 h-5 mr-2" />
                    <span className="text-lg">Edit profile</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-gray-500 mb-2">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    isEditing ? "border-blue-300" : "border-gray-300"
                  } rounded ${isEditing ? "bg-white" : "bg-gray-50"}`}
                  readOnly={!isEditing}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-500 mb-2">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    isEditing ? "border-blue-300" : "border-gray-300"
                  } rounded ${isEditing ? "bg-white" : "bg-gray-50"}`}
                  readOnly={!isEditing}
                />
              </div>

              {/* Email Address - Full Width */}
              <div className="col-span-2">
                <label className="block text-gray-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    isEditing ? "border-blue-300" : "border-gray-300"
                  } rounded ${isEditing ? "bg-white" : "bg-gray-50"}`}
                  readOnly={!isEditing}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-500 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    isEditing ? "border-blue-300" : "border-gray-300"
                  } rounded ${isEditing ? "bg-white" : "bg-gray-50"}`}
                  readOnly={!isEditing}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-gray-500 mb-2">Country</label>
                <div className="relative">
                  {isEditing ? (
                    <Select
                      options={[
                        {
                          value: "India",
                          label: "India",
                        },
                        {
                          value: "United States",
                          label: "United States",
                        },
                        {
                          value: "United Kingdom",
                          label: "United Kingdom",
                        },
                      ]}
                      placeholder="Select a country"
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
                  ) : (
                    <input
                      type="text"
                      value={formData.country}
                      className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                      readOnly
                    />
                  )}
                  {/* <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" /> */}
                </div>
              </div>

              {/* Address - Full Width */}
              <div className="col-span-2">
                <label className="block text-gray-500 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    isEditing ? "border-blue-300" : "border-gray-300"
                  } rounded ${isEditing ? "bg-white" : "bg-gray-50"}`}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex items-center justify-center gap-4 w-full">
                <button className="border border-gray-500 text-gray-500 py-2 rounded px-6">
                  Cancel
                </button>
                <button className="bg-purple-900 text-white py-2 rounded px-6">
                  Submit
                </button>
              </div>
            )}
          </div>
        )}

        {selectedTab === "booking" && (
          <div className="flex flex-col my-8 mx-4 w-[75%]">
            <h2 className="flex justify-between items-center w-full px-2">
              <span
                className="text-3xl font-medium text-gray-800"
                style={{ fontFamily: "var(--font-playfair-display)" }}
              >
                List Of Flights
              </span>
              <div className="relative inline-block w-48">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center justify-between w-48 border border-gray-600 text-gray-600 text-sm font-medium py-2 px-4 rounded-md
          hover:bg-secondarycolor hover:text-white hover:border-none transition-all duration-300"
                >
                  {selectedOption} <IoIosArrowDown className="ml-2" size={16} />
                </button>

                {isOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul className="text-gray-700 text-sm">
                      {options.map((option) => (
                        <li
                          key={option}
                          onClick={() => handleSelect(option)}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </h2>

            <div className="mt-4 border border-gray-300 rounded">
              <div className="border-b border-gray-300 flex justify-between items-center px-6">
                <h3 className="px-4 py-2 text-gray-800 font-semibold">
                  <span className="text-sm text-gray-500">Booking ID:</span>{" "}
                  #2324-435367-3535
                </h3>

                <h3 className="px-4 py-2 text-gray-800 font-semibold">
                  <span className="text-sm text-gray-500">Grand Total - </span>{" "}
                  ₹ 26,490.00
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-start">
                  {/* Airline Logo */}
                  <div className="w-48 bg-gray-100 p-2 rounded mr-4 flex items-center justify-center">
                    <Image src={AirIndia} alt="Air India" className="w-full" />
                  </div>

                  {/* Flight Details */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2 items-center">
                      <h3
                        className="text-[1.25rem] font-semibold"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                      >
                        Air India
                      </h3>

                      <h2 className="text-sm font-semibold text-blue-500">
                        View Details
                      </h2>
                    </div>

                    <div className="flex justify-between mb-4">
                      {/* Departure */}
                      <div>
                        <div className="text-lg font-medium">
                          New Delhi(DEL)
                        </div>
                        <div className="text-sm text-gray-600">18 MAY 2025</div>
                      </div>

                      {/* Flight Duration */}
                      <div className="flex flex-col items-center flex-1 min-w-[150px] px-4">
                        <div className="relative w-[80%] flex items-center justify-center my-2">
                          <hr className="w-full border-gray-300" />
                          <div className="bg-white px-2 absolute">
                            <IoIosAirplane
                              size={20}
                              className="text-gray-600"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2"></div>
                      </div>

                      {/* Arrival */}
                      <div className="text-right">
                        <div className="text-lg font-semibold">Dubai(DXB)</div>
                        <div className="text-sm text-gray-600">18 MAY 2025</div>
                      </div>
                    </div>

                    <table className="w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="w-[20%] pr-4 py-2 text-gray-800 font-semibold">
                            Direct Flight
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            3h 55m, Economy
                          </td>
                        </tr>
                        <tr>
                          <td className="w-[20%] pr-4 py-2 text-gray-800 font-semibold">
                            Passenger
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            1 Adult, 0 Child
                          </td>
                        </tr>
                        <tr>
                          <td className="w-[20%] pr-4 py-2 text-gray-800 font-semibold">
                            Seat
                          </td>
                          <td className="px-4 py-2 text-gray-600">21B</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 border border-gray-300 rounded">
              <div className="border-b border-gray-300 flex justify-between items-center px-6">
                <h3 className="px-4 py-2 text-gray-800 font-semibold">
                  <span className="text-sm text-gray-500">Booking ID:</span>{" "}
                  #2324-435367-3535
                </h3>

                <h3 className="px-4 py-2 text-gray-800 font-semibold">
                  <span className="text-sm text-gray-500">Grand Total - </span>{" "}
                  ₹ 26,490.00
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-start">
                  {/* Airline Logo */}
                  <div className="w-56 h-56 mr-4 flex items-center justify-center">
                    <Image
                      src={hotelDetail}
                      alt="Paradise hotel"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>

                  {/* Flight Details */}
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between mb-2 items-center">
                      <h3
                        className="text-[1.25rem] font-semibold"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                      >
                        Paradise Hotel
                      </h3>

                      <h2 className="text-sm font-semibold text-blue-500">
                        View Details
                      </h2>
                    </div>

                    <h4 className="text-sm font-normal my-2">
                      1 Room: Deluxe Room, 1 King Bed
                    </h4>

                    <div className="flex items-center gap-6 mt-4">
                      {/* Check-in Section */}
                      <div className="flex flex-col gap-1 text-sm">
                        <p className="text-gray-500 font-medium">Check-in</p>
                        <p className=" font-semibold text-gray-900">
                          Monday, 08 May 2025
                        </p>
                        <p className="text-gray-500">11:00 AM</p>
                      </div>

                      {/* Vertical Separator */}
                      <div className="h-12 w-[2px] bg-gray-300"></div>

                      {/* Check-out Section */}
                      <div className="flex flex-col gap-1 text-sm">
                        <p className="text-gray-500 font-medium">Check-out</p>
                        <p className=" font-semibold text-gray-900">
                          Tuesday, 09 May 2025
                        </p>
                        <p className="text-gray-500">10:00 AM</p>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold mt-4">
                      Location:{" "}
                      <span className="text-gray-500">New Delhi, India</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 border border-gray-300 rounded">
              <div className="border-b border-gray-300 flex justify-between items-center px-6">
                <h3 className="px-4 py-2 text-gray-800 font-semibold">
                  <span className="text-sm text-gray-500">Booking ID:</span>{" "}
                  #2324-435367-3535
                </h3>

                <h3 className="px-4 py-2 text-gray-800 font-semibold">
                  <span className="text-sm text-gray-500">Grand Total - </span>{" "}
                  ₹ 26,490.00
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-start">
                  {/* Airline Logo */}
                  <div className="w-56 h-56 mr-4 flex items-center justify-center">
                    <Image
                      src={hotelDetail}
                      alt="Paradise hotel"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>

                  {/* Flight Details */}
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between mb-2 items-center">
                      <h3
                        className="text-[1.25rem] font-semibold"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                      >
                        Paradise on Earth - Kashmir
                      </h3>

                      <h2 className="text-sm font-semibold text-blue-500">
                        View Details
                      </h2>
                    </div>

                    <div className="mt-2">
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

                    <h4 className="text-sm font-medium my-2">
                      1 Room - <span className="text-gray-500">2 Adults</span>
                    </h4>

                    <div className="flex items-center gap-6 mt-2">
                      {/* Check-in Section */}
                      <div className="flex flex-col gap-1 text-sm">
                        <p className="text-gray-500 font-medium">Check-in</p>
                        <p className=" font-semibold text-gray-900">
                          Monday, 08 May 2025
                        </p>
                        <p className="text-gray-500">11:00 AM</p>
                      </div>

                      {/* Vertical Separator */}
                      <div className="flex-1 border-t border-gray-400 mx-2"></div>
                      <span className="text-black font-bold">6D/5N</span>
                      <div className="flex-1 border-t border-gray-400 mx-2"></div>

                      {/* Check-out Section */}
                      <div className="flex flex-col gap-1 text-sm">
                        <p className="text-gray-500 font-medium">Check-out</p>
                        <p className=" font-semibold text-gray-900">
                          Tuesday, 09 May 2025
                        </p>
                        <p className="text-gray-500">10:00 AM</p>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold mt-2">
                      Location:{" "}
                      <span className="text-gray-500">New Delhi, India</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 flex flex-col items-center justify-center">
               <div className="bg-red-800/70 p-3 w-fit rounded-full">
               <HiOutlineLogout size={30} className="text-white" />
               </div>
              <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
              <p className="mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
