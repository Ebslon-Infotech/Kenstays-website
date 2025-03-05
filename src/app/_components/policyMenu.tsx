"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PolicyMenu = () => {
  const pathname = usePathname(); // Current route ka path get kar raha hai

  return (
    <ul className="space-y-3">
      {[
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms-of-use", label: "Terms of Use" },
        { href: "/terms-and-condition", label: "Terms and Conditions" },
      ].map((item) => (
        <li
          key={item.href}
          className={`cursor-pointer hover:text-primarycolor py-3 px-6 font-semibold rounded-md 
            ${
              pathname === item.href
                ? "bg-purple-50 text-purple-900 border-l-4 border-purple-900"
                : ""
            }`}
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PolicyMenu;
