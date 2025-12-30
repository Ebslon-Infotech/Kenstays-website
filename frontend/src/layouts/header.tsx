"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlane, FaBuilding, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { BsGlobeAmericas } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import logo from "../assets/logo.webp";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type")?.toLowerCase() || "flight";
  const { user, logout, loading } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { name: "Flight", icon: <FaPlane size={22} />, href: "/?type=Flight" },
    { name: "Hotel", icon: <FaBuilding size={22} />, href: "/?type=Hotel" },
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

        {/* Login Button or Profile Dropdown */}
        <div className="hidden lg:block relative" ref={dropdownRef}>
          {!loading && user ? (
            <div>
              {/* Profile Button */}
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 border border-secondarycolor text-secondarycolor px-4 py-2 rounded-md font-medium hover:bg-secondarycolor hover:text-white transition"
              >
                <FaUser className="text-lg" />
                <span>{user.firstName}</span>
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {/* Profile Option */}
                    <Link
                      href="/my-account"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <FiUser className="text-lg" />
                      <span className="text-sm font-medium">My Profile</span>
                    </Link>

                    {/* Logout Option */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition w-full text-left"
                    >
                      <HiOutlineLogout className="text-lg" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="border border-secondarycolor text-secondarycolor px-4 py-2 rounded-md font-medium hover:bg-secondarycolor hover:text-white transition"
            >
              Log In
            </Link>
          )}
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

        {/* Mobile Login/Profile Section */}
        {!loading && user ? (
          <div className="w-full space-y-2">
            {/* User Info */}
            <div className="px-4 py-3 bg-gray-50 rounded-md">
              <p className="text-sm font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {/* Profile Link */}
            <Link
              href="/my-account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 border border-secondarycolor text-secondarycolor px-6 py-2 rounded-md font-medium hover:bg-secondarycolor hover:text-white transition w-full justify-center"
            >
              <FiUser />
              My Profile
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 border border-red-500 text-red-600 px-6 py-2 rounded-md font-medium hover:bg-red-500 hover:text-white transition w-full justify-center"
            >
              <HiOutlineLogout />
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="border border-secondarycolor text-secondarycolor px-6 py-2 rounded-md font-medium hover:bg-secondarycolor hover:text-white transition w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}
