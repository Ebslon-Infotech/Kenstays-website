"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoIosAirplane, IoIosTime } from "react-icons/io";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { BsLuggage } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { flightsAPI } from "@/lib/api";

interface Segment {
  Origin: {
    Airport: { AirportCode: string; AirportName: string; CityName: string };
    DepTime: string;
  };
  Destination: {
    Airport: { AirportCode: string; AirportName: string; CityName: string };
    ArrTime: string;
  };
  Airline: {
    AirlineCode: string;
    AirlineName: string;
    FlightNumber: string;
  };
  Duration: number;
  CabinBaggage: string;
  Baggage: string;
}

interface FlightResult {
  ResultIndex: string;
  Segments: Segment[][];
  Fare: {
    PublishedFare: number;
    OfferedFare: number;
    Currency: string;
  };
  IsRefundable: boolean;
}

export default function FlightSearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [results, setResults] = useState<FlightResult[]>([]);
  const [traceId, setTraceId] = useState("");
  const [filters, setFilters] = useState({
    sortBy: "price",
    maxPrice: 50000,
    airlines: [] as string[],
    stops: "all"
  });

  useEffect(() => {
    searchFlights();
  }, []);

  const searchFlights = async () => {
    try {
      setLoading(true);
      setError("");

      // Get search parameters from URL
      const origin = searchParams.get("origin") || "DEL";
      const destination = searchParams.get("destination") || "BOM";
      const departureDate = searchParams.get("departureDate") || new Date().toISOString().split("T")[0];
      const returnDate = searchParams.get("returnDate") || "";
      const adults = parseInt(searchParams.get("adults") || "1");
      const children = parseInt(searchParams.get("children") || "0");
      const infants = parseInt(searchParams.get("infants") || "0");
      const cabinClass = parseInt(searchParams.get("cabinClass") || "2");
      const journeyType = returnDate ? 2 : 1;
      const directFlight = searchParams.get("directFlight") === "true";

      // Format dates to yyyy-MM-dd format (backend will convert to TekTravels format)
      const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const response = await flightsAPI.search({
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departureDate: formatDate(departureDate),
        returnDate: returnDate ? formatDate(returnDate) : undefined,
        adults,
        children,
        infants,
        cabinClass,
        journeyType,
        directFlight,
        oneStopFlight: false,
        sources: null
      });

      if (response.success) {
        // Handle nested results array structure from TekTravels API
        const resultsData = response.data.results || [];
        const flatResults = resultsData.flat(); // Flatten nested arrays
        setResults(flatResults);
        setTraceId(response.data.traceId || "");
      } else {
        setError(response.message || "Failed to search flights");
      }
    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "Failed to search flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getFilteredAndSortedResults = () => {
    let filtered = [...results];

    // Filter by price
    filtered = filtered.filter(
      (flight) => flight.Fare.OfferedFare <= filters.maxPrice
    );

    // Filter by airlines
    if (filters.airlines.length > 0) {
      filtered = filtered.filter((flight) =>
        flight.Segments[0].some((segment) =>
          filters.airlines.includes(segment.Airline.AirlineCode)
        )
      );
    }

    // Filter by stops
    if (filters.stops !== "all") {
      if (filters.stops === "direct") {
        filtered = filtered.filter(
          (flight) => flight.Segments[0].length === 1
        );
      } else if (filters.stops === "1-stop") {
        filtered = filtered.filter(
          (flight) => flight.Segments[0].length === 2
        );
      }
    }

    // Sort
    filtered.sort((a, b) => {
      if (filters.sortBy === "price") {
        return a.Fare.OfferedFare - b.Fare.OfferedFare;
      } else if (filters.sortBy === "duration") {
        const aDuration = a.Segments[0].reduce(
          (sum, seg) => sum + seg.Duration,
          0
        );
        const bDuration = b.Segments[0].reduce(
          (sum, seg) => sum + seg.Duration,
          0
        );
        return aDuration - bDuration;
      }
      return 0;
    });

    return filtered;
  };

  const filteredResults = getFilteredAndSortedResults();

  // Get unique airlines for filter
  const availableAirlines = Array.from(
    new Set(
      results.flatMap((flight) =>
        flight.Segments[0].map((seg) => seg.Airline.AirlineCode)
      )
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primarycolor mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Searching for flights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Search Failed
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-primarycolor text-white px-6 py-2 rounded-md hover:bg-opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {searchParams.get("origin")} → {searchParams.get("destination")}
              </h1>
              <p className="text-gray-600">
                {formatDate(searchParams.get("departureDate") || "")}
                {searchParams.get("returnDate") &&
                  ` - ${formatDate(searchParams.get("returnDate") || "")}`}
                {" • "}
                {searchParams.get("adults")} Adult(s)
                {parseInt(searchParams.get("children") || "0") > 0 &&
                  `, ${searchParams.get("children")} Child(ren)`}
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="text-primarycolor hover:underline"
            >
              Modify Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-bold mb-4">Filters</h3>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="price">Price (Low to High)</option>
                  <option value="duration">Duration (Shortest)</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: ₹{filters.maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              {/* Stops Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stops
                </label>
                <div className="space-y-2">
                  {["all", "direct", "1-stop"].map((stopType) => (
                    <label key={stopType} className="flex items-center">
                      <input
                        type="radio"
                        name="stops"
                        value={stopType}
                        checked={filters.stops === stopType}
                        onChange={(e) =>
                          setFilters({ ...filters, stops: e.target.value })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">
                        {stopType.replace("-", " ")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600">
                  Showing {filteredResults.length} of {results.length} flights
                </p>
              </div>
            </div>
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3">
            {filteredResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg">
                  No flights found matching your criteria
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((flight, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    {flight.Segments.map((journey, journeyIndex) => (
                      <div
                        key={journeyIndex}
                        className={journeyIndex > 0 ? "mt-6 pt-6 border-t" : ""}
                      >
                        {journeyIndex > 0 && (
                          <p className="text-sm font-medium text-gray-600 mb-4">
                            Return Journey
                          </p>
                        )}

                        {journey.map((segment, segmentIndex) => (
                          <div key={segmentIndex}>
                            {segmentIndex > 0 && (
                              <div className="flex items-center justify-center my-4">
                                <div className="border-t border-gray-300 flex-1"></div>
                                <span className="px-4 text-sm text-gray-500">
                                  Layover
                                </span>
                                <div className="border-t border-gray-300 flex-1"></div>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              {/* Airline Info */}
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                                  <IoIosAirplane className="text-3xl text-primarycolor" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800">
                                    {segment.Airline.AirlineName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {segment.Airline.AirlineCode}-
                                    {segment.Airline.FlightNumber}
                                  </p>
                                </div>
                              </div>

                              {/* Flight Times */}
                              <div className="flex items-center gap-8 flex-1 justify-center">
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-gray-800">
                                    {formatTime(segment.Origin.DepTime)}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {segment.Origin.Airport.AirportCode}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {segment.Origin.Airport.CityName}
                                  </p>
                                </div>

                                <div className="text-center flex-1 max-w-xs">
                                  <p className="text-sm text-gray-600 mb-1">
                                    {formatDuration(segment.Duration)}
                                  </p>
                                  <div className="flex items-center">
                                    <MdFlightTakeoff className="text-gray-400" />
                                    <div className="border-t-2 border-gray-300 flex-1 mx-2"></div>
                                    <MdFlightLand className="text-gray-400" />
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {journey.length === 1 ? "Non-stop" : ""}
                                  </p>
                                </div>

                                <div className="text-center">
                                  <p className="text-2xl font-bold text-gray-800">
                                    {formatTime(segment.Destination.ArrTime)}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {segment.Destination.Airport.AirportCode}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {segment.Destination.Airport.CityName}
                                  </p>
                                </div>
                              </div>

                              {/* Amenities */}
                              <div className="flex gap-4 text-gray-600">
                                <div className="flex items-center gap-1">
                                  <BsLuggage />
                                  <span className="text-xs">
                                    {segment.Baggage || "7 Kg"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* Price and Book Button */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t">
                      <div>
                        <p className="text-xs text-gray-500 line-through">
                          ₹{flight.Fare.PublishedFare.toLocaleString()}
                        </p>
                        <p className="text-3xl font-bold text-primarycolor">
                          ₹{flight.Fare.OfferedFare.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">
                          {flight.IsRefundable ? "Refundable" : "Non-refundable"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          // Store in localStorage to avoid 431 error with long URLs
                          localStorage.setItem('fareDetailsParams', JSON.stringify({
                            resultIndex: flight.ResultIndex,
                            traceId: traceId,
                            flightData: flight
                          }));
                          window.location.href = '/flights/fare-details';
                        }}
                        className="bg-secondarycolor text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
                      >
                        View Fare Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
