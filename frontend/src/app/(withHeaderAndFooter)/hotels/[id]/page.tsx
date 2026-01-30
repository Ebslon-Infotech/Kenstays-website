"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  IoMdHeartEmpty,
  IoMdClose,
  IoMdStar,
  IoMdArrowBack,
  IoMdArrowForward,
} from "react-icons/io";
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

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { hotelsAPI } from "@/lib/api";

export default function HotelDetailsPage() {
  const navigate = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const hotelCode = params.id as string;
  const traceId = searchParams.get("traceId");

  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hotelData, setHotelData] = useState<any>(null);
  const [showCopyToast, setShowCopyToast] = useState(false);

  React.useEffect(() => {
    if (hotelCode) {
      fetchDetails();
    }
  }, [hotelCode]);

  // Keyboard navigation for image gallery
  React.useEffect(() => {
    if (!isGalleryOpen || !hotelData) return;

    const images = hotelData?.Images || [];

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1,
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1,
        );
      } else if (e.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGalleryOpen, hotelData]);

  const handleShare = async () => {
    const url = window.location.href;
    const title = hotelData?.HotelName || "Hotel Details";
    const text = `Check out ${title}`;

    try {
      // Check if Web Share API is available (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(url);
        setShowCopyToast(true);
        setTimeout(() => setShowCopyToast(false), 3000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  React.useEffect(() => {
    if (hotelCode) {
      fetchDetails();
    }
  }, [hotelCode]);

  // Keyboard navigation for image gallery
  React.useEffect(() => {
    if (!isGalleryOpen || !hotelData) return;

    const images = hotelData?.Images || [];

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1,
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1,
        );
      } else if (e.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGalleryOpen, hotelData]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      console.log("Fetching details for hotel code:", hotelCode);

      const response = await hotelsAPI.getDetails(hotelCode);
      console.log("Hotel Details API Response:", response);

      if (response.success && response.data?.HotelDetails?.[0]) {
        const h = response.data.HotelDetails[0];
        console.log("Raw hotel data from TBO:", h);

        // Normalize StarRating from "5Star" or similar to a number
        const normalized = {
          ...h,
          // Ensure HotelName field exists
          HotelName: h.HotelName || h.Name || "Hotel",
          // Normalize star rating
          StarRating: (() => {
            // Handle if HotelRating or Rating is already a number
            const rating = h.HotelRating ?? h.Rating;

            if (typeof rating === "number") {
              return rating;
            }

            if (!rating) return 0;

            // Convert to string and lowercase
            const r = String(rating).toLowerCase();

            // Parse text-based ratings
            if (r.includes("one") || r === "1") return 1;
            if (r.includes("two") || r === "2") return 2;
            if (r.includes("three") || r === "3") return 3;
            if (r.includes("four") || r === "4") return 4;
            if (r.includes("five") || r === "5") return 5;

            // Try to extract number (handles "5Star", "5 Star", etc.)
            const match = r.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
          })(),
          // Ensure Images array
          Images: h.Images || h.HotelPictures || [],
          // Ensure Facilities
          HotelFacilities: h.HotelFacilities || h.Facilities || [],
          // Ensure Address
          Address: h.Address || h.HotelAddress || "",
        };

        console.log("Normalized hotel data:", normalized);
        setHotelData(normalized);
      } else {
        console.error("Invalid response structure:", response);
        setError("Hotel details not found.");
      }
    } catch (err) {
      console.error("Fetch details error:", err);
      setError("Failed to load hotel details.");
    } finally {
      setLoading(false);
    }
  };

  const hotelEntity = [
    { id: 1, name: "Overview" },
    { id: 2, name: "Rooms" },
    { id: 3, name: "Amenities" },
    { id: 4, name: "Hotel Rules" },
    { id: 5, name: "Policies" },
  ];

  if (loading)
    return (
      <div className="max-w-7xl mx-auto p-6 my-10 text-center">
        Loading hotel details...
      </div>
    );
  if (error)
    return (
      <div className="max-w-7xl mx-auto p-6 my-10 text-center text-red-500">
        {error}
      </div>
    );
  if (!hotelData) return null;

  const images = hotelData?.Images || [];
  const mainImage = images[0] || Hotel;

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 my-10">
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-1 mb-4">
          {/* Top Left Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={images[1] || img3}
              alt="Hotel image 2"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Large Main Image - Center */}
          <div className="md:col-span-2 md:row-span-2 relative h-[400px] md:h-full">
            <Image
              src={mainImage}
              alt={hotelData?.HotelName || "Hotel"}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={images[2] || img4}
              alt="Hotel image 3"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left Image */}
          <div className="relative h-48 md:h-full">
            <Image
              src={images[3] || img2}
              alt="Hotel image 4"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right Image with Overlay */}
          <div className="relative h-48 md:h-full">
            <Image
              src={images[4] || img5}
              alt="Hotel image 5"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
            <div
              onClick={() => {
                setIsGalleryOpen(true);
                setCurrentImageIndex(0);
              }}
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-md cursor-pointer hover:bg-opacity-60 transition-all"
            >
              <span className="text-white text-2xl font-semibold">
                {images.length > 5
                  ? `+${images.length - 5} images`
                  : "View Gallery"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker size={18} className="text-gray-500" />
              <p className="text-sm text-gray-600">
                {hotelData?.Address ||
                  hotelData?.HotelAddress ||
                  "Location not available"}
              </p>
            </div>
            <h2
              className="font-medium text-3xl"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              {hotelData?.HotelName || "Paradise Hotel"}
            </h2>
            <div className="flex">
              {Array.from({ length: hotelData?.StarRating || 0 }).map(
                (_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-green-600 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ),
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border rounded-md hover:bg-gray-100">
              <IoMdHeartEmpty size={20} className="text-gray-400" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 border rounded-md hover:bg-gray-100 transition-colors"
              title="Share this hotel"
            >
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
                    <p
                      className="text-sm mb-6"
                      dangerouslySetInnerHTML={{
                        __html:
                          hotelData?.Description || "No description available.",
                      }}
                    />
                  </div>

                  {/* Room options */}
                  <h2 className="font-bold mb-2">Rooms</h2>
                  {hotelData.HotelRooms && hotelData.HotelRooms.length > 0 ? (
                    <div className="space-y-6">
                      {hotelData.HotelRooms.map((room: any, index: number) => (
                        <div
                          key={index}
                          className="flex flex-col md:flex-row items-start gap-4 border border-gray-200 rounded-lg p-4"
                        >
                          <div className="w-full md:w-48 h-32 relative flex-shrink-0">
                            <Image
                              src={mainImage}
                              alt={room.RoomName}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {room.RoomName}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {room.Amenities?.slice(0, 4).map(
                                (amenity: string, i: number) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-1 text-xs text-gray-600"
                                  >
                                    <svg
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
                                    <span>{amenity}</span>
                                  </div>
                                ),
                              )}
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <p className="text-xs text-blue-600 font-medium">
                                {room.Inclusions?.join(" • ") || "Room only"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Contact us for room availability and pricing.
                    </p>
                  )}

                  <hr className="my-6" />

                  {/* Amenities */}
                  <h2 className="font-semibold text-xl">Amenities</h2>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {(hotelData?.HotelFacilities || []).map(
                      (facility: string, index: number) => (
                        <div
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600"
                        >
                          {facility}
                        </div>
                      ),
                    )}
                  </div>

                  <hr className="my-6" />

                  {/* Hotel policies */}
                  <h2 className="font-semibold text-xl">
                    Hotel Rules & Information
                  </h2>
                  <div className="space-y-6 mt-6 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-md shadow-sm">
                          <TbLogin
                            size={24}
                            className="text-secondarycolor rotate-180"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">
                            Check-in
                          </p>
                          <p className="text-base font-medium">
                            {hotelData.CheckInTime || "14:00"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-md shadow-sm">
                          <TbLogout size={24} className="text-secondarycolor" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">
                            Check-out
                          </p>
                          <p className="text-base font-medium">
                            {hotelData.CheckOutTime || "11:00"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none text-gray-600">
                      <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                        <TbInfoSquare
                          size={20}
                          className="text-secondarycolor"
                        />
                        Hotel Policies
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            hotelData.HotelPolicy ||
                            "Please contact hotel for detailed policies.",
                        }}
                      />
                    </div>

                    {hotelData.Attractions &&
                      hotelData.Attractions.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                            <HiOutlineLocationMarker
                              size={20}
                              className="text-secondarycolor"
                            />
                            Nearby Attractions
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            {hotelData.Attractions.map(
                              (attr: any, i: number) => (
                                <div
                                  key={i}
                                  className="flex justify-between items-center py-2 border-b border-gray-100"
                                >
                                  <span className="text-gray-700 font-medium">
                                    {attr.key}
                                  </span>
                                  <span className="text-xs text-secondarycolor bg-secondarycolor/10 px-2 py-0.5 rounded">
                                    {attr.value}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
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
                        onClick={() => navigate.push("/book-hotel")}
                        className="w-full py-3 bg-secondarycolor text-white rounded-md mt-4 font-medium"
                      >
                        Book Now
                      </button>

                      <p className="text-xs text-start mt-2 text-blue-600">
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

      {/* Image Gallery Modal */}
      {isGalleryOpen && images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
              <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-white">
                  <h2 className="text-2xl font-bold">
                    {hotelData?.HotelName || "Hotel Gallery"}
                  </h2>
                  <p className="text-sm text-gray-300">
                    Image {currentImageIndex + 1} of {images.length}
                  </p>
                </div>
                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <IoMdClose size={40} />
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center p-4 mt-20 mb-32">
              <div className="relative w-full h-full max-w-6xl max-h-[70vh]">
                <Image
                  src={images[currentImageIndex]}
                  alt={`Hotel image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all"
                >
                  <IoMdArrowBack size={32} />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all"
                >
                  <IoMdArrowForward size={32} />
                </button>
              </>
            )}

            {/* Thumbnail Strip */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="max-w-7xl mx-auto overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {images.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-24 h-16 flex-shrink-0 rounded overflow-hidden transition-all ${
                        currentImageIndex === index
                          ? "ring-4 ring-white scale-110"
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copy Toast Notification */}
      {showCopyToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-up">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">Link copied to clipboard!</span>
        </div>
      )}
    </>
  );
}
