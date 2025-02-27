"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import signin1 from "@/assets/signin/signin1.webp";
import signin2 from "@/assets/signin/signin2.webp";
import logo from "@/assets/signin/logo.webp";

import { RxInfoCircled } from "react-icons/rx";

export default function page() {
  return (
    <>
      <div className="bg-[#EBE3FF] p-28">
        <div className="rounded-2xl flex justify-center">
          <Image
            src={signin1}
            alt="signin"
            height={700}
            className="rounded-l-2xl"
          />
          <div className="relative">
            <Image
              src={signin2}
              alt="signin"
              height={700}
              className="rounded-r-2xl"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
              {/* Logo & Welcome Text */}
              <div className="text-center space-y-3">
                <Image
                  src={logo}
                  alt="Logo"
                  height={50}
                  width={50}
                  className="mx-auto"
                />
                <h3 className="text-secondarycolor text-2xl font-bold uppercase">
                  Welcome
                </h3>
              </div>

              {/* Sign-in Form */}
              <div className="w-full bg-transparent px-12">
                <h3 className="text-xl font-semibold uppercase mb-10">
                  Create Account
                </h3>
                <form>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Email Field */}
                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="abc@gmail.com"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        MObile Number
                      </label>
                      <input
                        type="tel"
                        placeholder="99999-99999"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        Create Password
                      </label>
                      <input
                        type="password"
                        placeholder="***********"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="***********"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <RxInfoCircled size={15} />
                    <p>Password must be at least 8 characters long</p>
                  </div>

                    <div className="flex items-center mt-5 mb-10 ">
                      <input
                        type="checkbox"
                        id="remember-me"
                        className="mr-2 h-4 w-4 text-primarycolor focus:ring-primarycolor border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-[0.75rem] font-semibold text-gray-500"
                      >
                        I accept all terms and conditions
                      </label>
                    </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-secondarycolor hover:bg-secondarycolor-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarycolor"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <div className="text-center mt-5">
                  <p className="text-sm text-gray-500">
                    Already have an account?
                    <Link
                      href="/signin"
                      className="text-primarycolor hover:underline ml-2"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
