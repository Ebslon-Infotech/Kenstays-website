"use client";

import React, { useState } from "react";
import Link from "next/link";

import PolicyMenu from "@/app/_components/policyMenu";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function page() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="bg-secondarycolor text-white p-10 flex flex-col items-center justify-center">
        <h1
          className="text-3xl font-medium"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Terms of Use
        </h1>
        <p className="text-lg font-medium mt-4">
          Last updated on March 12, 2025
        </p>
      </div>

      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-start w-full gap-6">
          <div className="w-[25%] border border-gray-300 p-4 h-fit rounded-md">
            <PolicyMenu />
          </div>
          <div className="w-[75%] border border-gray-300 p-8 h-fit rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Kenstays</h2>
            <p className="text-[1rem] font-medium mb-4">
              These terms and conditions outline the rules and regulations for
              the use of Kenstay's Website, located at{" "}
              <Link
                href="https://www.kenstay.com"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                www.kenstay.com.
              </Link>
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Summary Of These Terms
            </h2>
            <p className="text-[1rem] font-medium mb-4">
              Along with the Terms on this page, there are two other documents
              that form part of our contract with you:
              <ul className="list-disc ml-6 my-4">
                <li className="mb-2">
                  Our How we Work page helps you to use our Platform and
                  understand our reviews, our rankings, our recommendations, how
                  we make money, and more.
                </li>
                <li className="mb-2">
                  Our Content Standards and Guidelines help us to keep
                  everything on our Platform relevant to and appropriate for our
                  global audience, without limiting freedom of expression. They
                  tell you how we manage content and take action against
                  anything inappropriate.
                </li>
              </ul>
              By agreeing to our Terms, you’re agreeing to everything in all
              three documents. If you don’t accept any of these Terms, please do
              not use our Platform.
              <br />
              All this information is important because it (along with your
              booking confirmation email, and any pre-contractual information
              provided before you book), sets out the legal terms on which
              Service Providers offer their Travel Experiences through our
              Platform.
              <br />
              If something goes wrong with your Travel Experience, Section A15
              of these Terms explains what you can do about it. This includes
              making a complaint to us, going to court, and (in some cases)
              using an online dispute resolution service.
              <br />
              If you want to appeal a moderation decision, or report any content
              on our Platform, our Content Standards and Guidelines explain how
              to do so, and how we manage these requests.
              <br />
              This summary isn’t part of our Terms, or a legal document. It’s
              just a simple explanation of our Terms. We encourage you to read
              each document in full. Some of the words in this summary have very
              specific meanings, so please check out the ‘Kenstay dictionary’ at
              the end of these Terms.
            </p>

            <div className="border border-gray-300 rounded-md w-full">
              {/* Table Header */}
              <div
                className="flex justify-between items-center px-5 py-3 cursor-pointer"
                onClick={toggleOpen}
              >
                <h2 className="text-xl font-semibold">Table of contents</h2>
                {isOpen ? (
                  <IoIosArrowUp size={24} strokeWidth={2} />
                ) : (
                  <IoIosArrowDown size={24} strokeWidth={2} />
                )}
              </div>

              {/* Content Section */}
              {isOpen && (
                <div className="px-5 py-4 border-t border-gray-300">
                  <a
                    href="#flights"
                    className="block text-lg text-blue-600 hover:underline mb-2"
                  >
                    1. Flights
                  </a>
                  <a
                    href="#hotels"
                    className="block text-lg text-blue-600 hover:underline mb-2"
                  >
                    2. Hotels
                  </a>
                  <a
                    href="#packages"
                    className="block text-lg text-blue-600 hover:underline mb-2"
                  >
                    3. Holidays Packages
                  </a>
                </div>
              )}
            </div>

            <div id="flights" className="my-6">
              <h2 className="text-xl font-semibold mb-4 px-3">
                1. Flights
              </h2>
              <p className="mb-4 text-[1rem] font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                </p>
                <p className="mb-4 text-[1rem] font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>

            <div id="hotels" className="my-6">
              <h2 className="text-xl font-semibold mb-4 px-3">
                2. Hotels
              </h2>
              <p className="mb-4 text-[1rem] font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                </p>
                <p className="mb-4 text-[1rem] font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>

            <div id="packages" className="my-6">
              <h2 className="text-xl font-semibold mb-4 px-3">
                3. Holidays Packages
              </h2>
              <p className="mb-4 text-[1rem] font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                </p>
                <p className="mb-4 text-[1rem] font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
