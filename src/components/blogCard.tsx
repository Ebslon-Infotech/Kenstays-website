"use client"

import React from "react"
import Image from "next/image"
import blogCover from "@/assets/blogs/blogCover.webp"
export default function BlogCard() {
     return (
       <div className="max-w-2xl mx-auto">
         <div className="bg-white rounded-md overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
           {/* Image Container */}
           <div className="relative h-[250px] w-full">
             <Image
               src={blogCover}
               alt="Singapore Marina Bay Sands and ArtScience Museum aerial view"
               className="w-full h-full object-cover"
             />
           </div>
   
           {/* Content Container */}
           <div className="p-6">
             {/* Title */}
             <h2 className="text-[1rem] font-bold text-gray-900 mb-4 leading-tight">
               Top 10 Singapore Attractions Not To Miss
             </h2>
   
             {/* Description */}
             <p className="text-gray-600 text-sm mb-6">
               Singapore has for centuries, been a melting pot for colliding cultures. Once a key port connecting the major
               shipping lanes of the East, now an Asian busi...
             </p>
   
             {/* Read More Button */}
             <button className="bg-[#4B2E83] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#3b2366] transition-colors duration-300">
               Read More
             </button>
           </div>
         </div>
       </div>
     )
   }