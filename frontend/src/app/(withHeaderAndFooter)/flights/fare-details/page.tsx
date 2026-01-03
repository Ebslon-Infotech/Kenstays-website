"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { flightsAPI } from "@/lib/api";
import { IoIosAirplane, IoIosInformationCircle } from "react-icons/io";
import { MdFlightTakeoff, MdFlightLand, MdClose } from "react-icons/md";
import { BsLuggage, BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface FareRule {
  Airline: string;
  Origin: string;
  Destination: string;
  FareBasisCode: string;
  FareRestriction: string | null;
  FareRuleDetail: string;
}

export default function FareDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fareRules, setFareRules] = useState<FareRule[]>([]);
  const [showFullRules, setShowFullRules] = useState(false);
  const [resultIndex, setResultIndex] = useState<string | null>(null);
  const [traceId, setTraceId] = useState<string | null>(null);
  const [flight, setFlight] = useState<any>(null);

  useEffect(() => {
    // Try to get params from URL first
    let rIndex = searchParams.get("resultIndex");
    let tId = searchParams.get("traceId");
    let fData = searchParams.get("flightData");

    // If not in URL, check localStorage
    if (!rIndex || !tId) {
      const storedParams = localStorage.getItem('fareDetailsParams');
      if (storedParams) {
        try {
          const params = JSON.parse(storedParams);
          rIndex = params.resultIndex;
          tId = params.traceId;
          fData = params.flightData ? JSON.stringify(params.flightData) : null;
          // Clear after reading
          localStorage.removeItem('fareDetailsParams');
        } catch (e) {
          console.error("Failed to parse stored params:", e);
        }
      }
    }

    setResultIndex(rIndex);
    setTraceId(tId);

    // Parse flight data if available
    if (fData) {
      try {
        const parsedFlight = typeof fData === 'string' ? JSON.parse(decodeURIComponent(fData)) : fData;
        setFlight(parsedFlight);
      } catch (e) {
        console.error("Failed to parse flight data:", e);
      }
    }

    if (rIndex && tId) {
      fetchFareRules(rIndex, tId);
    } else {
      setError("Missing required parameters");
      setLoading(false);
    }
  }, [searchParams]);

  const fetchFareRules = async (rIndex: string, tId: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await flightsAPI.getFareRules({
        traceId: tId,
        resultIndex: rIndex,
      });

      if (response.success) {
        setFareRules(response.data.fareRules || []);
      } else {
        setError(response.message || "Failed to fetch fare rules");
      }
    } catch (err: any) {
      console.error("Fare rules error:", err);
      setError(err.message || "Failed to fetch fare rules");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Sanitize HTML to prevent XSS attacks
  const sanitizeHTML = (html: string): string => {
    // Basic sanitization - remove script tags and dangerous attributes
    let sanitized = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '');
    return sanitized;
  };

  // Clean and format HTML content
  const cleanHTML = (text: string): string => {
    if (!text) return '';
    
    // Replace common HTML entities
    let cleaned = text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // Convert <br/>, <br />, <br> to proper line breaks
    cleaned = cleaned.replace(/<br\s*\/?>/gi, '<br />');
    
    // Ensure proper spacing around lists
    cleaned = cleaned.replace(/<\/ul>/gi, '</ul><br />');
    cleaned = cleaned.replace(/<ul>/gi, '<br /><ul>');
    
    // Add styling classes to HTML elements
    cleaned = cleaned.replace(/<ul>/gi, '<ul class="fare-rules-list">');
    cleaned = cleaned.replace(/<li>/gi, '<li class="fare-rules-item">');
    
    return sanitizeHTML(cleaned);
  };

  const parseFareRules = (ruleDetail: string) => {
    // Split the fare rules into sections for better display
    const sections = ruleDetail.split("\r\n\r\n").filter((s) => s.trim());
    return sections;
  };

  const extractKeyPoints = (ruleDetail: string) => {
    const keyPoints = [];
    
    // Remove HTML tags for key point extraction
    const stripHTML = (html: string) => {
      return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };
    
    const cleanText = stripHTML(ruleDetail);
    
    // Extract baggage allowance
    const baggageMatch = cleanText.match(/Check-in Baggage Allowance:([^\r\n.]+)/i);
    if (baggageMatch) {
      keyPoints.push({
        icon: <BsLuggage className="text-blue-600" />,
        label: "Check-in Baggage",
        value: baggageMatch[1].trim(),
      });
    }

    // Extract hand baggage
    const handBaggageMatch = cleanText.match(/Hand Baggage Allowance:([^\r\n.]+)/i);
    if (handBaggageMatch) {
      keyPoints.push({
        icon: <BsLuggage className="text-green-600" />,
        label: "Hand Baggage",
        value: handBaggageMatch[1].trim(),
      });
    }

    // Check if refundable
    if (cleanText.toLowerCase().includes("refundable") || cleanText.toLowerCase().includes("cancellation")) {
      keyPoints.push({
        icon: <BsCheckCircle className="text-green-600" />,
        label: "Cancellation",
        value: "Cancellation fees apply (see details below)",
      });
    }

    // Check if changes allowed
    if (cleanText.toLowerCase().includes("change fee") || cleanText.toLowerCase().includes("date change")) {
      keyPoints.push({
        icon: <AiOutlineInfoCircle className="text-blue-600" />,
        label: "Date Change",
        value: "Date change fees apply (see details below)",
      });
    }

    return keyPoints;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primarycolor mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Loading fare details...</p>
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
            Error Loading Fare Details
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
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-primarycolor hover:underline mb-4 flex items-center gap-2"
          >
            ← Back to Search Results
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Fare Rules & Details</h1>
          <p className="text-gray-600 mt-2">
            Review the fare rules and terms before proceeding to booking
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-start">
            <BsExclamationTriangle className="text-yellow-600 text-xl mr-3 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-800 mb-1">Important Notes:</p>
              <ul className="list-disc list-inside text-yellow-700 space-y-1">
                <li>Mentioned fees are indicative per passenger per sector</li>
                <li>GST + RAF + applicable charges will be charged apart from airline charges</li>
                <li>For domestic: Submit cancellation/reissue request at least 2 hours before departure</li>
                <li>For international: Submit cancellation/reissue request at least 4 hours before departure</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Flight Summary (if available) */}
        {flight && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Selected Flight</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <IoIosAirplane className="text-4xl text-primarycolor" />
                <div>
                  <p className="font-semibold text-lg">
                    {flight.Segments?.[0]?.[0]?.Airline?.AirlineName}
                  </p>
                  <p className="text-gray-600">
                    {flight.Segments?.[0]?.[0]?.Airline?.AirlineCode}-
                    {flight.Segments?.[0]?.[0]?.Airline?.FlightNumber}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primarycolor">
                  ₹{flight.Fare?.OfferedFare?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  {flight.IsRefundable ? "Refundable" : "Non-refundable"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fare Rules Content */}
        {fareRules.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <IoIosInformationCircle className="text-5xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No fare rules available for this flight</p>
          </div>
        ) : (
          fareRules.map((rule, index) => {
            const keyPoints = extractKeyPoints(rule.FareRuleDetail);
            const sections = parseFareRules(rule.FareRuleDetail);

            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                {/* Rule Header */}
                <div className="flex justify-between items-start mb-6 pb-4 border-b">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {rule.Origin} → {rule.Destination}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Airline: {rule.Airline} • Fare Basis: {rule.FareBasisCode}
                    </p>
                  </div>
                </div>

                {/* Key Points */}
                {keyPoints.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-md">
                          <div className="text-2xl mt-0.5">{point.icon}</div>
                          <div>
                            <p className="font-medium text-gray-700">{point.label}</p>
                            <p className="text-sm text-gray-600">{point.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full Fare Rules */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">Complete Fare Rules</h4>
                    <button
                      onClick={() => setShowFullRules(!showFullRules)}
                      className="text-primarycolor hover:underline text-sm flex items-center gap-1"
                    >
                      {showFullRules ? (
                        <>
                          Hide Details <MdClose />
                        </>
                      ) : (
                        <>
                          Show Full Details
                        </>
                      )}
                    </button>
                  </div>

                  {showFullRules ? (
                    <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
                      <style jsx>{`
                        .fare-rules-list {
                          list-style: disc;
                          margin-left: 1.5rem;
                          margin-top: 0.5rem;
                          margin-bottom: 0.5rem;
                        }
                        .fare-rules-item {
                          margin-bottom: 0.5rem;
                          color: #374151;
                          line-height: 1.6;
                        }
                        .fare-rules-content {
                          line-height: 1.8;
                        }
                        .fare-rules-content br {
                          display: block;
                          margin: 0.5rem 0;
                          content: "";
                        }
                        .fare-rules-content ul {
                          margin: 1rem 0;
                        }
                        .fare-rules-content li {
                          padding: 0.25rem 0;
                        }
                      `}</style>
                      <div 
                        className="fare-rules-content text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: cleanHTML(rule.FareRuleDetail) }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div 
                        className="text-sm text-gray-700 line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: cleanHTML(rule.FareRuleDetail.substring(0, 500)) + '...'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Fare Restriction */}
                {rule.FareRestriction && (
                  <div className="mt-4 p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                    <p className="text-sm font-medium text-orange-800">
                      Restrictions: {rule.FareRestriction}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6 sticky bottom-0">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-semibold"
            >
              Back to Results
            </button>
            <button
              onClick={() => {
                // Get passenger counts from URL
                const adults = searchParams.get('adults') || '1';
                const children = searchParams.get('children') || '0';
                const infants = searchParams.get('infants') || '0';
                
                // Store data in localStorage to avoid 431 error from long URL
                localStorage.setItem('fareQuoteParams', JSON.stringify({
                  resultIndex: resultIndex,
                  traceId: traceId,
                  adults: parseInt(adults),
                  children: parseInt(children),
                  infants: parseInt(infants)
                }));
                router.push(`/flights/fare-quote?adults=${adults}&children=${children}&infants=${infants}`);
              }}
              className="px-8 py-3 bg-secondarycolor text-white rounded-md hover:bg-opacity-90 transition-colors font-semibold"
            >
              View Fare Quote →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
