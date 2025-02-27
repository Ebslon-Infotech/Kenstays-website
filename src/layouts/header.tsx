"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaPlane, FaBuilding, FaBars, FaTimes } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { BsGlobeAmericas } from "react-icons/bs";
import logo from "../assets/logo.webp";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get("type")?.toLowerCase() || "flight";

  const navItems = [
    { name: "Flight", icon: <FaPlane size={22} />, href: "/?type=Flight" },
    { name: "Hotel", icon: <FaBuilding size={22} />, href: "/?type=hotel" },
    { name: "Homestays", icon: <IoBed size={22} />, href: "/?type=Homestays" },
    {
      name: "Holidays",
      icon: <BsGlobeAmericas size={22} />,
      href: "/?type=Holidays",
    },
  ];

  return (
    <header className="bg-white shadow-md top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 flex justify-between items-center py-3">
        {/* Logo */}
        <Link href="/">
          <img
            src={logo.src}
            alt="logo"
            className="w-14 h-14 md:w-20 md:h-20 cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-center gap-2 px-6 py-2 text-lg font-medium rounded-md transition
              ${
                type === item.name.toLowerCase()
                  ? "bg-secondarycolor text-white"
                  : "text-black hover:text-white hover:bg-secondarycolor"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <div className="hidden lg:block">
          <Link
            href="/signin"
            className="border border-secondarycolor text-secondarycolor px-4 py-2 rounded-md font-medium hover:bg-secondarycolor hover:text-white transition"
          >
            Log In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation - Slide-in from Right */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col items-start py-10 px-2 lg:hidden`}
      >
        {/* Close Button */}
        <button
          className="self-end text-2xl mb-4"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        {/* Logo */}
        <Link href="/" className="w-full flex justify-center">
          <img
            src={logo.src}
            alt="logo"
            className="w-20 h-20 md:w-20 md:h-20 mx-auto"
          />
        </Link>

        <hr className="w-full border-t border-gray-300 my-2" />

        {navItems.map((item) => (
          <div key={item.name} className="w-full">
            <Link
              href={item.href}
              className={`flex items-center gap-2 text-lg font-medium transition py-2 px-4 rounded-sm w-full
            ${
              type === item.name.toLowerCase()
                ? "bg-secondarycolor text-white"
                : "text-black hover:text-white hover:bg-secondarycolor"
            }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>

            <hr className="w-full border-t border-gray-300 my-2" />
          </div>
        ))}

        <Link
          href="/signin"
          className="border border-secondarycolor text-secondarycolor px-6 py-2 rounded-md font-medium hover:bg-secondarycolor hover:text-white transition w-full text-center"
          onClick={() => setIsOpen(false)}
        >
          Log In
        </Link>
      </div>
    </header>
  );
}
