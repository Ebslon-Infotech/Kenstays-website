"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import signin1 from "@/assets/signin/signin1.webp";
import signin2 from "@/assets/signin/signin2.webp";
import logo from "@/assets/signin/logo.webp";

export default function page() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
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
              <div className="w-full bg-transparent px-16">
                <h3 className="text-xl font-semibold uppercase mb-10">
                  Login Account
                </h3>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="relative w-full mb-6">
                    <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="abc@gmail.com"
                      className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative w-full mb-4">
                    <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1 flex items-center gap-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="***********"
                      className="w-full p-[0.74rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
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
                      disabled={loading}
                      className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-secondarycolor hover:bg-secondarycolor-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarycolor disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Signing in..." : "Sign in"}
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
    </>
  );
}
