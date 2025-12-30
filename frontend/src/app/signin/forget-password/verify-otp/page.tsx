"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation"

import signin1 from "@/assets/signin/signin1.webp";
import signin2 from "@/assets/signin/signin2.webp";
import logo from "@/assets/signin/logo.webp";

export default function page() {
  const navigate = useRouter();
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
              {/* Sign-in Form */}
              <div className="w-full bg-transparent p-16">
                <h3 className="text-xl font-semibold uppercase mb-3">
                  Verify Email Address
                </h3>
                <p className="text-sm text-gray-500 mb-10">
                  An 6 digit code has been sent to <br /> abc@gmail.com.{" "}
                  <Link
                    href="/signin/forget-password"
                    className="text-primarycolor hover:underline"
                  >
                    Change
                  </Link>
                </p>
                <form>
                  {/* Email Field */}
                  <div className="flex flex-col items-start gap-3">
                    <label className="text-sm font-semibold text-gray-500">
                      Enter OTP
                    </label>
                    <div className="flex gap-4 mb-10">
                      {[...Array(6)].map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          className="w-12 h-12 text-center border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-secondarycolor text-lg"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      onClick={() => navigate.push("/signin/reset-password")}
                      type="button"
                      className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-secondarycolor hover:bg-secondarycolor-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarycolor"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>

                <div className="text-center mt-5">
                    <p className="text-sm text-gray-500">
                      Didn't receive the code?
                      <Link
                        href="/signup"
                        className="text-primarycolor hover:underline ml-2"
                      >
                        Resend
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
