"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

import signin1 from "@/assets/signin/signin1.webp";
import signin2 from "@/assets/signin/signin2.webp";
import logo from "@/assets/signin/logo.webp";

export default function page(){
     return(
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

              {/* Sign-in Form */}
              <div className="w-full bg-transparent px-16">
                <h3 className="text-xl font-semibold uppercase mb-10">
                  Create New Password
                </h3>
                <form>
                  {/* Email Field */}
                  <div className="relative w-full mb-4">
                    <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="***********"
                      className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative w-full mb-4">
                    <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                      Re-enter Password
                    </label>
                    <input
                      type="password"
                      placeholder="***********"
                      className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-10">
                    {/* Remember Me */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember-me"
                        className="mr-2"
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-gray-500"
                      >
                        Remember Me
                      </label>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                      <Link
                        href="/signin/forget-password"
                        className="text-sm text-primarycolor hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
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
                      Don't have an account?
                      <Link
                        href="/signup"
                        className="text-primarycolor hover:underline ml-2"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     )
}