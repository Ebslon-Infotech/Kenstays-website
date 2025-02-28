"use client";

import React from "react";
import Link from "next/link";

export default function footer() {
  return (
    <footer className="bg-secondarycolor text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-yellow-500 text-4xl font-semibold mb-4" style={{fontFamily: "var(--font-playfair-display)"}}>Company</h3>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:text-primarycolor">About us</li>
              <li className="cursor-pointer hover:text-primarycolor">List your property</li>
              <li className="cursor-pointer hover:text-primarycolor">Partnerships</li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-yellow-500 text-4xl font-semibold mb-4" style={{fontFamily: "var(--font-playfair-display)"}}>Explore</h3>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:text-primarycolor">India travel guide</li>
              <li className="cursor-pointer hover:text-primarycolor">Hotels in India</li>
              <li className="cursor-pointer hover:text-primarycolor">Holiday rentals in India</li>
              <li className="cursor-pointer hover:text-primarycolor">Holiday packages in India</li>
              <li className="cursor-pointer hover:text-primarycolor">Domestic flights</li>
              <li className="cursor-pointer hover:text-primarycolor">
                <Link href="/blog">
                Travel blog
                </Link>
                </li>
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h3 className="text-yellow-500 text-4xl font-semibold mb-4" style={{fontFamily: "var(--font-playfair-display)"}}>
              Policies
            </h3>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:text-primarycolor">Privacy</li>
              <li className="cursor-pointer hover:text-primarycolor">Terms of use</li>
              <li className="cursor-pointer hover:text-primarycolor">Cookies</li>
              <li className="cursor-pointer hover:text-primarycolor">Terms and Conditions</li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-yellow-500 text-4xl font-semibold mb-4" style={{fontFamily: "var(--font-playfair-display)"}}>Help</h3>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:text-primarycolor">Support</li>
              <li className="cursor-pointer hover:text-primarycolor">Change or cancel your booking</li>
              <li className="cursor-pointer hover:text-primarycolor">Refund process and timelines</li>
              <li className="cursor-pointer hover:text-primarycolor">Book a flight using an airline credit</li>
              <li className="cursor-pointer hover:text-primarycolor">International travel documents</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-600 pt-4 text-center text-yellow-500">
          Copyright © 2024, Website name, Design & Developed by Ebslon Infotech
        </div>
      </div>
    </footer>
  );
}
