"use client";

import React, { useState } from "react";
import Image from "next/image";

import { IoMdHeartEmpty, IoMdClose, IoMdStar } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { BiBorderAll } from "react-icons/bi";
import { GoShareAndroid } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbLogout, TbLogin, TbInfoSquare } from "react-icons/tb";
import { VscPerson } from "react-icons/vsc";
import { LiaPawSolid } from "react-icons/lia";
import { RiGroupLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";

import { hotelFacility, superiorRoom } from "@/assets/data";
import bed from "@/assets/Hotels/bed.webp";
import Hotel from "@/assets/Hotels/hotel.webp";
import hotelDetail from "@/assets/Hotels/hotel_detail.webp";

import visa from "@/assets/Flight/visa.webp";
import mc from "@/assets/Flight/mc.webp";
import discover from "@/assets/Flight/discover.webp";
import group from "@/assets/Flight/Group.webp";

import img1 from "@/assets/Hotels/img1.webp";
import img2 from "@/assets/Hotels/img2.webp";
import img3 from "@/assets/Hotels/img3.webp";
import img4 from "@/assets/Hotels/img4.webp";
import img5 from "@/assets/Hotels/img5.webp";

import { useRouter } from "next/navigation";

export default function page() {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rating, setRating] = useState(0);

  const hotelEntity = [
    { id: 1, name: "Overview" },
    { id: 2, name: "Rooms" },
    { id: 3, name: "Amenities" },
    { id: 4, name: "Hotel Rules" },
    { id: 5, name: "Policies" },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto p-6 my-10">
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-1 mb-4">
          {/* Top Left Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={img3}
              alt="Resort swimming pool at night"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Large Main Image - Center */}
          <div className="md:col-span-2 md:row-span-2 relative h-[400px] md:h-full">
            <Image
              src={img1}
              alt="Luxury wooden villa with infinity pool"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={img4}
              alt="Elegant hotel room interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={img2}
              alt="Tropical resort with cabanas"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right Image with Overlay */}
          <div className="relative h-48 md:h-full">
            <Image
              src={img5}
              alt="Beach loungers on wooden deck"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-md">
              <span className="text-white text-2xl font-semibold">
                50+ images
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start gap-3">
            <h2
              className="font-medium text-3xl"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Paradise Hotel
            </h2>
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
          </div>
          <div className="flex gap-2">
            <button className="p-2 border rounded-md hover:bg-gray-100">
              <IoMdHeartEmpty size={20} className="text-gray-400" />
            </button>
            <button className="p-2 border rounded-md hover:bg-gray-100">
              <GoShareAndroid size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 border-b border-gray-200 ">
          <ul className="flex items-center gap-6">
            {hotelEntity.map((entity, index) => (
              <li
                key={entity.id}
                onClick={() => setActiveTab(entity.id)}
                className={`cursor-pointer ${
                  activeTab === entity.id || (activeTab === 0 && index === 0)
                    ? "text-primarycolor border-b-2 border-primarycolor"
                    : "text-gray-600"
                } hover:text-primarycolor hover:border-b-2 hover:border-primarycolor transition-colors`}
              >
                {entity.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-start justify-between gap-4 w-full">
          <div className="flex flex-col text-black/80">
            {/* Header with hotel description */}
            <div className="mx-auto w-full">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left column - Hotel description and room options */}
                <div className="flex-1">
                  <h2 className="font-semibold text-xl mb-6">About</h2>
                  <div className="mb-6">
                    <p className="text-sm mb-6">
                      Country Inn and Suites by Radisson, Sahibabad offers an
                      exceptional and luxurious experience with its modern
                      accommodations, pure spa/diving options, and world-class
                      amenities. Indulge in pampering spa treatments, take a
                      refreshing swim in the crystal-clear pool, and maintain
                      your fitness at the state-of-the-art gym. The on-site
                      restaurants serve a delightful array of non-vegetarian
                      Thai, Lebanese, Mexican, and Indian delicacies, providing
                      a feast for the senses. This hotel is a haven for those
                      seeking unparalleled luxury and relaxation.
                    </p>
                  </div>

                  {/* Room options */}
                  <h2 className="font-bold mb-2">Rooms</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-48">
                      <Image src={Hotel} alt="hotel" className="w-full" />
                    </div>
                    <div className="mb-6">
                      <div className="bg-white text-black p-4 rounded-t-md">
                        <h2 className="font-bold">Superior Room</h2>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <BiBorderAll size={20} />
                            <span className="text-sm">400 sq ft</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BiBorderAll size={20} />
                            <span className="text-sm">City View</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IoBedOutline size={20} strokeWidth={2} />
                            <span className="text-sm">
                              1 king bed or 2 twin bed(s)
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {superiorRoom.map((room, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-sm">{room}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Room booking options */}
                  <div className="mt-4 space-y-4">
                    {/* Option 1 */}
                    <div className="border border-gray-300 rounded-md p-4 hover:border-blue-500 cursor-pointer">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id="room1"
                          name="roomOption"
                          className="mt-1"
                          checked={selectedRoom === 1}
                          onChange={() => setSelectedRoom(1)}
                        />
                        <label htmlFor="room1" className="ml-2 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                Room with fee cancellation
                              </p>
                              <p className="text-xs mt-1">
                                Free cancellation till 24hrs before check in
                              </p>
                              <p className="text-xs mt-1">No meals included</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                ₹10,664{" "}
                                <span className="text-xs font-normal">
                                  per night
                                </span>
                              </p>
                              <p className="text-xs text-gray-400">
                                +₹2,665 taxes & fees
                              </p>
                              <button className="text-blue-400 text-xs mt-2">
                                More details
                              </button>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Option 2 */}
                    <div className="border border-gray-300 rounded-md p-4 hover:border-blue-500 cursor-pointer">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id="room2"
                          name="roomOption"
                          className="mt-1"
                          checked={selectedRoom === 2}
                          onChange={() => setSelectedRoom(2)}
                        />
                        <label htmlFor="room2" className="ml-2 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                Room with fee cancellation | Breakfast only
                              </p>
                              <p className="text-xs mt-1">
                                Free cancellation till 24hrs before check in
                              </p>
                              <p className="text-xs mt-1">Free Breakfast</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                ₹10,799{" "}
                                <span className="text-xs font-normal">
                                  per night
                                </span>
                              </p>
                              <p className="text-xs text-gray-400">
                                +₹2,700 taxes & fees
                              </p>
                              <button className="text-blue-400 text-xs mt-2">
                                More details
                              </button>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Option 3 */}
                    <div className="border border-gray-300 rounded-md p-4 hover:border-blue-500 cursor-pointer">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id="room3"
                          name="roomOption"
                          className="mt-1"
                          checked={selectedRoom === 3}
                          onChange={() => setSelectedRoom(3)}
                        />
                        <label htmlFor="room3" className="ml-2 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                Room with fee cancellation | Breakfast +
                                Lunch/Dinner
                              </p>
                              <p className="text-xs mt-1">
                                Free cancellation till 24hrs before check in
                              </p>
                              <p className="text-xs mt-1">
                                Free Breakfast + Lunch/Dinner
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                ₹19,799{" "}
                                <span className="text-xs font-normal">
                                  per night
                                </span>
                              </p>
                              <p className="text-xs text-gray-400">
                                +₹4,950 taxes & fees
                              </p>
                              <button className="text-blue-400 text-xs mt-2">
                                More details
                              </button>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr className="my-6" />

                  {/* Amenities */}
                  <h2 className="font-semibold text-xl">Amenities</h2>
                  <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 mt-6 w-[70%]">
                    {hotelFacility.map((facility, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="border border-gray-400 rounded-xl p-3 w-[4rem] h-[4rem] flex items-center justify-center">
                          <Image
                            src={facility.image}
                            alt={facility.name}
                            width={45}
                            height={45}
                          />
                        </div>
                        <p className="mt-2 text-center text-gray-600 text-xs">
                          {facility.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr className="my-6" />

                  {/* Hotel policies */}
                  <h2 className="font-semibold text-xl">Hotel Rules</h2>
                  <div className="space-y-4 mt-6 text-sm">
                    <table className="w-full border-collapse">
                      <tbody>
                        {/* Check-in */}
                        <tr className="border-none">
                          <td className=" flex items-center gap-2 py-3 pr-5">
                            <TbLogin size={30} className="rotate-180" />
                            <h3 className="font-semibold text-[1rem]">
                              Check-in
                            </h3>
                          </td>
                          <td className="py-3 pl-5">From 11:00 to 23:00</td>
                        </tr>

                        {/* Check-out */}
                        <tr className="border-none">
                          <td className="flex items-center gap-2 py-3 pr-5">
                            <TbLogout size={30} />
                            <h3 className="font-semibold text-[1rem]">
                              Check-out
                            </h3>
                          </td>
                          <td className="py-3 pl-5">From 11:00 to 12:00</td>
                        </tr>

                        {/* Cancellation/Prepayment */}
                        <tr>
                          <td className="flex items-center gap-2 py-3 pr-5">
                            <TbInfoSquare size={30} />
                            <h3 className="font-semibold text-[1rem]">
                              Cancellation/Prepayment
                            </h3>
                          </td>
                          <td className="py-3 pl-5">
                            Cancellation and prepayment policies vary according
                            to accommodation type. Please check what conditions
                            may apply to each option when making your selection.
                          </td>
                        </tr>

                        {/* Child Policy */}
                        <tr>
                          <td className="flex items-center gap-2 py-3 pr-5">
                            <TbInfoSquare size={30} />
                            <h3 className="font-semibold text-[1rem]">
                              Children and beds
                            </h3>
                          </td>
                          <td className="py-3 pl-5">
                            <h3 className="font-semibold text-[0.8rem]">
                              Child Policy
                            </h3>
                            <p className="my-2">
                              Children of any age are welcome.
                            </p>
                            <p>
                              To see correct prices and occupancy information,
                              please add the number of children in your group
                              and their ages to your search.
                            </p>

                            <h3 className="font-semibold text-[0.8rem]">
                              Cot and extra beds policy
                            </h3>
                            <div className="border border-gray-200 border-b-none px-4 py-3 mt-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span>0 - 2 years</span>
                                </div>
                              </div>
                            </div>

                            <div className="border border-gray-200 px-4 py-2">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={bed}
                                    alt="bed"
                                    width={30}
                                    height={30}
                                  />
                                  <span>Cot upon request</span>
                                </div>
                                <span className="text-green-500">Free</span>
                              </div>
                            </div>

                            <p className="my-3">
                              The number of extra beds and cots allowed is
                              dependent on the option you choose. Please check
                              your selected option for more information. All
                              cots and extra beds are subject to availability.
                            </p>
                          </td>
                        </tr>

                        {/* Age */}
                        <tr>
                          <td className="flex items-center gap-2 py-3 pr-5">
                            <VscPerson size={30} />
                            <h3 className="font-semibold text-[1rem]">
                              No age restriction
                            </h3>
                          </td>
                          <td className="py-3 pl-5">
                            There is no age requirement for check-in.
                          </td>
                        </tr>

                        {/* Pets */}
                        <tr>
                          <td className="flex items-center gap-2 py-3 pr-5">
                            <LiaPawSolid size={30} />
                            <h3 className="font-semibold text-[1rem]">Pets</h3>
                          </td>
                          <td className="py-3 pl-5">
                            Pets are allowed on request. Charges may be
                            applicable.
                          </td>
                        </tr>

                        {/* Groups */}
                        <tr>
                          <td className="flex items-center gap-2 py-3 pr-5">
                            <RiGroupLine size={30} />
                            <h3 className="font-semibold text-[1rem]">
                              Groups
                            </h3>
                          </td>
                          <td className="py-3 pl-5">
                            When booking more than 7 rooms, different policies
                            and additional supplements may apply.
                          </td>
                        </tr>

                        {/* Groups */}
                        <tr>
                          <td className="flex items-center gap-2 py-3 pr-5">
                            <CiCreditCard1 size={30} />
                            <h3 className="font-semibold text-[1rem]">
                              Accepted Payment Methods
                            </h3>
                          </td>
                          <td className="py-3 pl-5">
                            <div className="flex gap-2 mt-4">
                              <Image src={visa} alt="visa" width={50} />
                              <Image src={mc} alt="master" width={50} />
                              <Image src={discover} alt="discover" width={50} />
                              <Image src={group} alt="group" width={50} />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <hr className="my-6" />

                  <h2 className="text-2xl font-semibold mt-6">Policies</h2>
                  <div className="mt-6">
                    <ul className="list-disc list-outside space-y-2 text-sm text-gray-600 pl-4">
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                    </ul>
                  </div>

                  <hr className="my-6" />

                  {/* Reviews */}
                  <h2 className="text-2xl font-semibold mt-6">Reviews</h2>
                  <div className="mt-6">
                    <p className="mb-4">
                      Guests rave about the Wind THINK Room's peaceful
                      atmosphere, lush greenery, and exceptional service from
                      the staff, particularly Romana (a warm hospitality and
                      cooking skills). Adiba from buffbreakfast is noted for
                      effective coordination, enhancing the overall memorable
                      and comfortable stay experience.
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 mt-4">
                        <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white">
                          A
                        </div>
                        <div className="flex flex-col items-start gap-2 ">
                          <h3 className="font-semibold">Ankit Sharma</h3>
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-yellow-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <span className="text-xs ml-2 text-gray-400">
                              04/01/2024
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsOpenModal(!isOpenModal)}
                        className="w-fit px-4 py-2 bg-gray-800 text-white rounded-md"
                      >
                        Write Reviews
                      </button>
                    </div>

                    <p className="mt-4 text-sm">
                      <span className="font-semibold my-2 text-sm">Classy</span>{" "}
                      <br />
                      Booking with Homstay was a delight. The user-friendly
                      interface and comprehensive search filters made finding
                      the perfect stay a breeze. Real-time updates and attentive
                      customer support added a personal touch. A vast range of
                      accommodations ensured options for every budget.
                      Trustworthy and highly recommended!
                    </p>
                  </div>
                </div>

                {/* Right column - Room details and booking */}
                <div className="w-full md:w-80 lg:w-96">
                  <div className="bg-white text-black rounded-md overflow-hidden">
                    <div className="p-4 bg-gray-100/70 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] mb-4">
                      <Image
                        src={hotelDetail}
                        alt="Luxurious Room"
                        className="w-full object-cover rounded-md"
                      />
                      <h2 className="font-bold mt-4">Luxurious Room</h2>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between font-semibold">
                          <span>1 room x 1 night</span>
                          <span>₹ 2490.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes and service fees</span>
                          <span>₹ 499.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>other charges</span>
                          <span>₹ 0.00</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t text-[1rem]">
                          <span>Total</span>
                          <span>₹ 2,990.00</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Includes taxes and charges
                        </p>
                      </div>

                      <button
                        onClick={() => navigate.push("/book-homestay")}
                        className="w-full py-3 bg-secondarycolor text-white rounded-md mt-4 font-medium"
                      >
                        Book Now
                      </button>

                      <p className="text-xs text-start mt-2 text-blue-600 mt-2">
                        No hidden fees • Cancel anytime
                      </p>
                    </div>

                    <div className="p-4 bg-gray-100/70">
                      <h3
                        className="font-medium text-lg"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                      >
                        Explore the area
                      </h3>
                      <div className="mt-4 h-56 bg-gray-200 rounded-md relative">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.859393695435!2d77.22944851484255!3d28.55056198234423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b473ce681%3A0x656a8c9a768e3f2a!2sThe%20Imperial%20Palace!5e0!3m2!1sen!2sin!4v1643729111766!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                        ></iframe>
                      </div>
                      <p className="text-sm mt-6">
                        Luxury hotel connected to a shopping centre in New Delhi
                        with 2 restaurants
                      </p>

                      <button className="w-full py-3 bg-secondarycolor rounded-md mt-4 text-sm text-white">
                        View in a map
                      </button>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <HiOutlineLocationMarker
                              size={16}
                              className="text-blue-600"
                            />
                            <span className="text-sm">Worldmark</span>
                          </div>
                          <span className="text-xs">8 min walk</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <HiOutlineLocationMarker
                              size={16}
                              className="text-blue-600"
                            />
                            <span className="text-sm">DLF Cyber City</span>
                          </div>
                          <span className="text-xs">9 min drive</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <HiOutlineLocationMarker
                              size={16}
                              className="text-blue-600"
                            />
                            <span className="text-sm">Ambience Mall</span>
                          </div>
                          <span className="text-xs">10 min drive</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <HiOutlineLocationMarker
                              size={16}
                              className="text-blue-600"
                            />
                            <span className="text-sm">
                              Delhi (DEL-Indira Gandhi Int.)
                            </span>
                          </div>
                          <span className="text-xs">11 min drive</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-[60rem] mx-auto p-6 rounded-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpenModal(false)}
              className="absolute top-3 right-4 text-3xl text-gray-600"
            >
              <IoMdClose size={24} />
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-bold mb-6">Write Review</h2>

            <form className="space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full py-3 px-4 bg-gray-100 rounded text-gray-600 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full py-3 px-4 bg-gray-100 rounded text-gray-600 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  className="w-full py-3 px-4 bg-gray-100 rounded text-gray-600 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      {star <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Review Title
                </label>
                <textarea
                  placeholder="Write your comments here"
                  className="w-full h-32 py-3 px-4 bg-gray-100 rounded text-gray-600 text-sm"
                />
              </div>

              <p className="text-xs text-gray-500">
                How we use your data: We'll only contact you about the review
                you left, and only if necessary. By submitting your review, you
                agree to Judge.me's terms and conditions and privacy policy.
              </p>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-900 text-white rounded text-lg font-medium"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
