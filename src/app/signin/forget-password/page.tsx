"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import signin1 from "@/assets/signin/signin1.webp";
import signin2 from "@/assets/signin/signin2.webp";
import logo from "@/assets/signin/logo.webp";
import { useRouter } from "next/navigation";

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
                  Forget Password
                </h3>
                <p className="text-sm text-gray-500 mb-10">
                  Please enter the email address you'd like your password reset
                  information sent to
                </p>
                <form>
                  {/* Email Field */}
                  <div className="relative w-full mb-6">
                    <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="abc@gmail.com"
                      className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      onClick={() => navigate.push("/signin/forget-password/verify-otp")}
                      type="button"
                      className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-secondarycolor hover:bg-secondarycolor-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarycolor"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
