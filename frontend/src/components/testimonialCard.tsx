import React from "react";
import Image from "next/image";
import man from "@/assets/about/man.webp";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-start p-6 max-w-3xl mx-auto">
      {/* Star Rating */}
      <div className="flex">
        {[1, 2, 3, 4].map((star) => (
          <svg
            key={star}
            className="w-5 h-5 text-primarycolor fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>

      {/* Testimonial Quote */}
      <div className="my-6">
        <p className="text-sm font-medium leading-tight">
          "Objectively deploy open-source web-readiness impactful bandwidth.
          Compellingly coordinate business deliverables rather equity invested
          technologies. Phosfluorescently reinvent."
        </p>
      </div>

      {/* Author Info and Quote Marks */}
      <div className="flex items-center justify-between w-full relative">
        <div className="flex items-center">
          {/* Profile Image */}
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={man}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Position */}
          <div>
            <h3 className="text-2xl font-semibold text-secondarycolor" style={{fontFamily : "var(--font-playfair-display)"}}>
              Mary Cruzleen
            </h3>
            <p className="text-sm text-yellow-500">CEO of Maithon</p>
          </div>
        </div>

        {/* Quote Mark */}
        <div className="text-8xl text-gray-200/70 font-serif leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
