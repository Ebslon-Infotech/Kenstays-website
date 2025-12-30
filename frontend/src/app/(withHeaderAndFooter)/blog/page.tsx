"use client";

import React from "react";
import Image from "next/image";

import BlogCard from "@/components/blogCard";

import line11 from "@/assets/Homepage/line-1.webp";
import line12 from "@/assets/Homepage/line-2.webp";
import blogCover from "@/assets/blogs/blogCover.webp";
import BlogBanner from "@/assets/blogs/blogBanner.webp";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
export default function page() {
  return (
    <>
      <div className="relative">
        <Image src={BlogBanner} alt="blog" />
        <div className="absolute top-1/2 left-[10%] text-white">
          <h3
            className="text-5xl mb-5 font-medium"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Love Where You're Going
          </h3>
          <p className="text-lg font-semibold">
            Book incredible things to do around the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center gap-2">
          <h2
            className={`text-3xl font-semibold text-primarycolor`}
            style={{ fontFamily: "var(--font-dancing-script)" }}
          >
            Flights Blogs
          </h2>

          <Image src={line11} alt="Home Page" className={`w-10`} />
          <Image src={line12} alt="Home Page" className={`w-[10px] h-[1px]`} />
          <Image src={line12} alt="Home Page" className={`w-[10px] h-[1px]`} />
        </div>

        <h1
          className={`text-start text-[2.5rem] leading-[2.8rem] font-medium  capitalize mt-2`}
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Flights blogs
        </h1>

        <div className="flex items-center gap-6 my-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCard key={i} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="text-secondarycolor border border-secondarycolor py-3 px-6 rounded-md hover:bg-secondarycolor hover:text-white hover:border-none">
            Explore More
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center gap-2">
          <h2
            className={`text-3xl font-semibold text-primarycolor`}
            style={{ fontFamily: "var(--font-dancing-script)" }}
          >
            Hotels Blogs
          </h2>

          <Image src={line11} alt="Home Page" className={`w-10`} />
          <Image src={line12} alt="Home Page" className={`w-[10px] h-[1px]`} />
          <Image src={line12} alt="Home Page" className={`w-[10px] h-[1px]`} />
        </div>

        <h1
          className={`text-start text-[2.5rem] leading-[2.8rem] font-medium  capitalize mt-2`}
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Hotels blogs
        </h1>

        <div className="flex items-center gap-6 my-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCard key={i} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="text-secondarycolor border border-secondarycolor py-3 px-6 rounded-md hover:bg-secondarycolor hover:text-white hover:border-none">
            Explore More
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center gap-2">
          <h2
            className={`text-3xl font-semibold text-primarycolor`}
            style={{ fontFamily: "var(--font-dancing-script)" }}
          >
            Holidays Blogs
          </h2>

          <Image src={line11} alt="Home Page" className={`w-10`} />
          <Image src={line12} alt="Home Page" className={`w-[10px] h-[1px]`} />
          <Image src={line12} alt="Home Page" className={`w-[10px] h-[1px]`} />
        </div>

        <h1
          className={`text-start text-[2.5rem] leading-[2.8rem] font-medium  capitalize mt-2`}
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Holidays blogs
        </h1>

        <div className="flex items-center gap-6 my-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCard key={i} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="text-secondarycolor border border-secondarycolor py-3 px-6 rounded-md hover:bg-secondarycolor hover:text-white hover:border-none">
            Explore More
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10">
        <h1
          className={`text-start text-[2.5rem] leading-[2.8rem] font-medium  capitalize mt-2`}
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Popular Articles
        </h1>

        <div className="flex items-center gap-6 my-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div className="bg-white rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] flex items-start gap-6">
              {/* Image Container */}
              <div className="relative h-[250px] w-full">
                <Image
                  src={blogCover}
                  alt="Singapore Marina Bay Sands and ArtScience Museum aerial view"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Container */}
              <div className="p-2 flex flex-col justify-between items-start gap-6">
                {/* Title */}
                <h2 className="text-[1rem] font-bold text-gray-900 mb-4 leading-tight">
                  Top 10 Singapore Attractions Not To Miss
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6">
                  Singapore has for centuries, been a melting pot for colliding
                  cultures. Once a key port connecting the major shipping lanes
                  of the East, now an Asian busi...
                </p>

                {/* Read More Button */}
                <button className="bg-[#4B2E83] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#3b2366] transition-colors duration-300">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="text-secondarycolor border border-secondarycolor py-3 px-6 rounded-md hover:bg-secondarycolor hover:text-white hover:border-none">
            Explore More
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10">
        <div className="flex justify-between items-center">
          <h1
            className={`text-start text-[2.5rem] leading-[2.8rem] font-medium  capitalize mt-2`}
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Recent Blog
          </h1>

          <div className="flex items-center gap-4 mt-6">
            <button className="bg-[#351C78]/10 p-3 rounded-full">
              <FaArrowLeftLong size={20} />
            </button>
            <button className="bg-[#351C78]/10 p-3 rounded-full">
              <FaArrowRightLong size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 my-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                {/* Image Container */}
                <div className="relative h-[200px] w-full">
                  <Image
                    src={blogCover}
                    alt="Singapore Marina Bay Sands and ArtScience Museum aerial view"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Container */}
                <div className="p-4">
                  {/* Title */}
                  <h2 className="text-[1rem] font-bold text-gray-900 mb-4 leading-tight">
                    Top 10 Singapore Attractions Not To Miss
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6">
                    Singapore has for centuries, been a melting pot for
                    colliding cultures. Once a key port connecting the major
                    shipping lanes of the East, now an Asian busi...
                  </p>

                  {/* Read More Button */}
                  <div className="w-full">
                  <button className="w-full bg-[#4B2E83] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#3b2366] transition-colors duration-300">
                    Read More
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
