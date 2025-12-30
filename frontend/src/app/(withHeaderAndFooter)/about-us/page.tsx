"use client";

import React from "react";
import Image from "next/image";

import Testimonial from "@/components/testimonialCard";

import background1 from "@/assets/about/background1.webp";
import about1 from "@/assets/about/about1.webp";
import about2 from "@/assets/about/about2.webp";
import icon2 from "@/assets/about/icon2.webp";
import icon1 from "@/assets/about/icon1.webp";
import avatar1 from "@/assets/about/avatar1.webp";
import avatar2 from "@/assets/about/avatar2.webp";
import avatar3 from "@/assets/about/avatar3.webp";
import avatar4 from "@/assets/about/avatar4.webp";
import about3 from "@/assets/about/about3.webp";
import about4 from "@/assets/about/about4.webp";
import expert1 from "@/assets/about/expert1.webp";
import expert2 from "@/assets/about/expert2.webp";
import expert3 from "@/assets/about/expert3.webp";
import expert4 from "@/assets/about/expert4.webp";
import banner from "@/assets/about/bannerImage.webp";
import counter1 from "@/assets/about/counter1.webp";
import counter2 from "@/assets/about/counter2.webp";
import counter3 from "@/assets/about/counter3.webp";
import counter4 from "@/assets/about/counter4.webp";

import line11 from "@/assets/Homepage/line-1.webp";
import line12 from "@/assets/Homepage/line-2.webp";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function page() {
  return (
    <>
      <div className="max-w-7xl mx-auto my-10 flex gap-6 items-start">
        <div className="relative w-full">
          <Image src={background1} alt="background" />

          <div className="absolute top-0 left-[20%]">
            <Image
              src={about1}
              alt="about"
              height={350}
              width={350}
              className="relative"
            />
            <Image
              src={about2}
              alt="about"
              height={300}
              width={250}
              className="absolute -bottom-[38%] -right-[30%]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-2">
            <h2
              className={`text-3xl font-semibold text-primarycolor`}
              style={{ fontFamily: "var(--font-dancing-script)" }}
            >
              Get About Us
            </h2>

            <Image src={line11} alt="Home Page" className={`w-10`} />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
          </div>

          <h1
            className={`text-start text-[3rem] leading-[3.5rem] font-medium text-black/80 capitalize`}
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            We Create Journeys Worth Taking For The Traveler
          </h1>

          <p className="text-gray-700/80 font-medium text-lg mt-2">
            Progressively impact multidisciplinary leadership skills via
            e-business leadership skills. Holisticly repurpose multifunctional
            data before turnkey information. Globally restore client-focused
            potentialities before scalable core competencies.
          </p>

          <div className="flex justify-between gap-6 my-4">
            <div className="flex gap-3 items-start">
              <Image src={icon1} alt="icon" height={30} width={30} />
              <div className="flex flex-col items-start">
                <p
                  className="font-medium text-xl"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  24 Year Experience
                </p>
                <p className="text-sm">
                  Holisticly procrastinate real-time solutions for services.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Image src={icon2} alt="icon" height={30} width={30} />
              <div className="flex flex-col items-start">
                <p
                  className="font-medium text-xl"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Best Travel Agents
                </p>
                <p className="text-sm">
                  Holisticly procrastinate real-time solutions for services.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-6">
            <button className="border border-secondarycolor text-secondarycolor px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#3b2366] transition-colors duration-300 hover:border-none hover:bg-secondarycolor hover:text-white">
              Discover More
            </button>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-4 rtl:space-x-reverse">
                <Image
                  className="w-12 h-12 border-2 border-white rounded-full"
                  src={avatar1}
                  alt=""
                />
                <Image
                  className="w-12 h-12 border-2 border-white rounded-full"
                  src={avatar2}
                  alt=""
                />
                <Image
                  className="w-12 h-12 border-2 border-white rounded-full"
                  src={avatar3}
                  alt=""
                />
                <Image
                  className="w-12 h-12 border-2 border-white rounded-full"
                  src={avatar4}
                  alt=""
                />
              </div>
              <h3 className="text-sm font-medium text-black/80">
                <span className="text-primarycolor font-semibold">500k+</span>
                Happy Customers
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F6F6F6] py-10">
        <div className="max-w-7xl mx-auto flex gap-6 items-start">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <h2
                className={`text-3xl font-semibold text-primarycolor`}
                style={{ fontFamily: "var(--font-dancing-script)" }}
              >
                Tour Percentage
              </h2>

              <Image src={line11} alt="Home Page" className={`w-10`} />
              <Image
                src={line12}
                alt="Home Page"
                className={`w-[10px] h-[1px]`}
              />
              <Image
                src={line12}
                alt="Home Page"
                className={`w-[10px] h-[1px]`}
              />
            </div>

            <h1
              className={`text-start text-[3rem] leading-[3.5rem] font-medium text-black/80 capitalize`}
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Perfect Travel Place For You & Your Family
            </h1>

            <p className="text-gray-700/80 font-medium text-lg mt-2">
              Progressively impact multidisciplinary leadership skills via
              e-business leadership skills. Holisticly repurpose multifunctional
              data before turnkey information. Globally restore client-focused
              potentialities before scalable core competencies.
            </p>

            <div className="flex flex-col items-start justify-between gap-5 my-4">
              <div className="flex flex-col items-start justify-between gap-2 w-full">
                <div className="text-sm font-semibold">CountrySide</div>
                <div className="w-full bg-gray-300 rounded-full h-1.5 mb-4 relative">
                  <div className="bg-primarycolor h-1.5 rounded-full w-[85%] relative group">
                    <span
                      className="absolute -top-6 right-0 font-medium text-xs px-2 py-1 rounded-md 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      85%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-2 w-full">
                <div className="text-sm font-semibold">Vineyard</div>
                <div className="w-full bg-gray-300 rounded-full h-1.5 mb-4 relative">
                  <div className="bg-primarycolor h-1.5 rounded-full w-[95%] relative group">
                    <span
                      className="absolute -top-6 right-0 font-medium text-xs px-2 py-1 rounded-md 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      95%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-2 w-full">
                <div className="text-sm font-semibold">Wine Tasting</div>
                <div className="w-full bg-gray-300 rounded-full h-1.5 mb-4 relative">
                  <div className="bg-primarycolor h-1.5 rounded-full w-[60%] relative group">
                    <span
                      className="absolute -top-6 right-0 font-medium text-xs px-2 py-1 rounded-md 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      60%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <Image src={background1} alt="background" />

            <div className="absolute top-[10%] left-[25%]">
              <div className="relative">
                {/* Semicircle Background */}
                <div className="relative w-[450px] h-[450px]">
                  <div className="absolute -bottom-[5%] left-[5%] w-[500px] h-[250px] bg-primarycolor rounded-b-[20rem] rotate-[-22deg] "></div>
                  <Image
                    src={about3}
                    alt="about"
                    height={480}
                    width={480}
                    className="relative"
                  />
                </div>
              </div>

              <Image
                src={about4}
                alt="about"
                height={300}
                width={300}
                className="absolute -top-[15%] -left-[15%]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondarycolor py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 items-start">
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="bg-purple-400/30 rounded-full p-2">
              <div className="bg-purple-300/30 rounded-full p-3">
                <Image src={counter1} alt="Home Page" className={`w-10`} />
              </div>
            </div>
            <h2 className="text-4xl font-semibold text-white">100,000+</h2>
            <p className="text-white font-medium text-lg">Our Explorers</p>
          </div>

          <div className="flex flex-col gap-4 w-full items-center">
            <div className="bg-purple-400/30 rounded-full p-2">
              <div className="bg-purple-300/30 rounded-full p-3">
                <Image src={counter2} alt="Home Page" className={`w-10`} />
              </div>
            </div>
            <h2 className="text-4xl font-semibold text-white">5000+</h2>
            <p className="text-white font-medium text-lg">Destination</p>
          </div>

          <div className="flex flex-col gap-4 w-full items-center">
            <div className="bg-purple-400/30 rounded-full p-2">
              <div className="bg-purple-300/30 rounded-full p-3">
                <Image src={counter3} alt="Home Page" className={`w-10`} />
              </div>
            </div>
            <h2 className="text-4xl font-semibold text-white">10,000+</h2>
            <p className="text-white font-medium text-lg">More Trips</p>
          </div>

          <div className="flex flex-col gap-4 w-full items-center">
            <div className="bg-purple-400/30 rounded-full p-2">
              <div className="bg-purple-300/30 rounded-full p-3">
                <Image src={counter4} alt="Home Page" className={`w-10`} />
              </div>
            </div>
            <h2 className="text-4xl font-semibold text-white">2000+</h2>
            <p className="text-white font-medium text-lg">Luxary Hotels</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10 flex gap-6 items-start">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex items-center gap-2">
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image src={line11} alt="Home Page" className={`w-10`} />

            <h2
              className={`text-3xl font-semibold text-primarycolor`}
              style={{ fontFamily: "var(--font-dancing-script)" }}
            >
              Travel Experts
            </h2>

            <Image src={line11} alt="Home Page" className={`w-10`} />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="border-2 border-primarycolor p-3 rounded-full">
              <FaArrowLeftLong size={22} className="text-primarycolor" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <Image src={expert4} alt="about" height={270} width={270} />
                <h2
                  className="text-2xl font-semibold mt-3"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Famhida Ruko
                </h2>
                <p className="text-sm text-primarycolor">Indonesia Guide</p>
              </div>

              <div className="flex flex-col items-center">
                <Image src={expert1} alt="about" height={270} width={270} />
                <h2
                  className="text-2xl font-semibold mt-3"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Michel Richard
                </h2>
                <p className="text-sm text-primarycolor">Maldives Guide</p>
              </div>

              <div className="flex flex-col items-center">
                <Image src={expert2} alt="about" height={270} width={270} />
                <h2
                  className="text-2xl font-semibold mt-3"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Joseph Carter
                </h2>
                <p className="text-sm text-primarycolor">Morocco Guide</p>
              </div>

              <div className="flex flex-col items-center">
                <Image src={expert3} alt="about" height={270} width={270} />
                <h2
                  className="text-2xl font-semibold mt-3"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Alex Anfantino
                </h2>
                <p className="text-sm text-primarycolor">Switzerland Guide</p>
              </div>
            </div>
            <button className="border-2 border-primarycolor p-3 rounded-full">
              <FaArrowRightLong size={22} className="text-primarycolor" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-20 flex gap-6 items-start">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex items-center gap-2">
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image src={line11} alt="Home Page" className={`w-10`} />

            <h2
              className={`text-3xl font-semibold text-primarycolor`}
              style={{ fontFamily: "var(--font-dancing-script)" }}
            >
              Watch Our Story
            </h2>

            <Image src={line11} alt="Home Page" className={`w-10`} />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
          </div>

          <div className="w-full">
            <Image src={banner} alt="about" className="w-full" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-20 flex gap-6 items-start">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex items-center gap-2">
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image src={line11} alt="Home Page" className={`w-10`} />

            <h2
              className={`text-3xl font-semibold text-primarycolor`}
              style={{ fontFamily: "var(--font-dancing-script)" }}
            >
              Watch Our Story
            </h2>

            <Image src={line11} alt="Home Page" className={`w-10`} />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
            <Image
              src={line12}
              alt="Home Page"
              className={`w-[10px] h-[1px]`}
            />
          </div>

          <h2
            className="text-[2.8rem] leading-[3.2rem] font-semibold capitalize"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            What our customer sy about us
          </h2>

          <div className="flex items-center gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="p-3 rounded-md0 shadow-2xl ">
                <Testimonial key={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
