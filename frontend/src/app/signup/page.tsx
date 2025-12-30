"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import signin1 from "@/assets/signin/signin1.webp";
import signin2 from "@/assets/signin/signin2.webp";
import logo from "@/assets/signin/logo.webp";

import { RxInfoCircled } from "react-icons/rx";

export default function page() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name Field */}
                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    {/* Last Name Field */}
                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abc@gmail.com"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    {/* Phone Number Field */}
                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="***********"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative w-full mb-2">
                      <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="***********"
                        className="w-full p-[0.74rem] text-[0.9rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <RxInfoCircled size={15} />
                    <p>Password must be at least 6 characters long</p>
                  </div>

                  <div className="flex items-center mt-5 mb-10 ">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
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
                      disabled={loading}
                      className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-secondarycolor hover:bg-secondarycolor-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarycolor disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Creating Account..." : "Register"}
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
