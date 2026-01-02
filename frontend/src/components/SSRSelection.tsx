'use client';

import React, { useState, useEffect } from 'react';
import { flightsAPI } from '@/lib/api';

interface BaggageOption {
  AirlineCode: string;
  FlightNumber: string;
  WayType: number;
  Code: string;
  Description: number;
  Weight: number;
  Currency: string;
  Price: number;
  Origin: string;
  Destination: string;
}

interface MealOption {
  AirlineCode: string;
  FlightNumber: string;
  WayType: number;
  Code: string;
  Description: number;
  AirlineDescription: string;
  Quantity: number;
  Currency: string;
  Price: number;
  Origin: string;
  Destination: string;
}

interface SeatOption {
  AirlineCode: string;
  FlightNumber: string;
  CraftType: string;
  Origin: string;
  Destination: string;
  AvailablityType: number;
  Description: number;
  Code: string;
  RowNo: string;
  SeatNo: string | null;
  SeatType: number;
  SeatWayType: number;
  Compartment: number;
  Deck: number;
  Currency: string;
  Price: number;
}

interface SeatPreference {
  Code: string;
  Description: string;
}

interface MealPreference {
  Code: string;
  Description: string;
}

interface SSRData {
  isLCC: boolean;
  baggage?: BaggageOption[][];
  mealDynamic?: MealOption[][];
  seatDynamic?: any[];
  seatPreference?: SeatPreference[];
  meal?: MealPreference[];
  traceId: string;
}

interface SSRSelectionProps {
  traceId: string;
  resultIndex: string;
  passengerCount: number;
  onSelectionChange: (selections: PassengerSSRSelections[]) => void;
}

interface PassengerSSRSelections {
  passengerIndex: number;
  baggage?: BaggageOption;
  meal?: MealOption | MealPreference;
  seat?: SeatOption | SeatPreference;
}

export default function SSRSelection({ 
  traceId, 
  resultIndex, 
  passengerCount,
  onSelectionChange 
}: SSRSelectionProps) {
  const [ssrData, setSSRData] = useState<SSRData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selections, setSelections] = useState<PassengerSSRSelections[]>([]);
  const [activeTab, setActiveTab] = useState<'baggage' | 'meal' | 'seat'>('baggage');

  useEffect(() => {
    fetchSSRData();
    // Initialize selections for all passengers
    const initialSelections: PassengerSSRSelections[] = Array.from(
      { length: passengerCount },
      (_, i) => ({ passengerIndex: i })
    );
    setSelections(initialSelections);
  }, [traceId, resultIndex, passengerCount]);

  const fetchSSRData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await flightsAPI.getSSR({ traceId, resultIndex });
      
      if (response.success) {
        setSSRData(response.data);
      } else {
        throw new Error('Failed to fetch SSR data');
      }
    } catch (err: any) {
      console.error('SSR fetch error:', err);
      setError(err.message || 'Failed to load additional services');
    } finally {
      setLoading(false);
    }
  };

  const handleBaggageSelection = (passengerIndex: number, baggage: BaggageOption) => {
    const newSelections = [...selections];
    newSelections[passengerIndex] = {
      ...newSelections[passengerIndex],
      baggage
    };
    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  const handleMealSelection = (passengerIndex: number, meal: MealOption | MealPreference) => {
    const newSelections = [...selections];
    newSelections[passengerIndex] = {
      ...newSelections[passengerIndex],
      meal
    };
    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  const handleSeatSelection = (passengerIndex: number, seat: SeatOption | SeatPreference) => {
    const newSelections = [...selections];
    newSelections[passengerIndex] = {
      ...newSelections[passengerIndex],
      seat
    };
    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  const getTotalSSRCost = () => {
    return selections.reduce((total, selection) => {
      let cost = 0;
      if (selection.baggage && 'Price' in selection.baggage) {
        cost += selection.baggage.Price;
      }
      if (selection.meal && 'Price' in selection.meal) {
        cost += selection.meal.Price;
      }
      if (selection.seat && 'Price' in selection.seat) {
        cost += selection.seat.Price;
      }
      return total + cost;
    }, 0);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading additional services...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchSSRData}
            className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!ssrData) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Additional Services (Optional)
        </h2>
        <p className="text-blue-100">
          Enhance your travel experience with extra baggage, meals, and preferred seating
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('baggage')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'baggage'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Baggage
            </span>
          </button>
          <button
            onClick={() => setActiveTab('meal')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'meal'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Meals
            </span>
          </button>
          <button
            onClick={() => setActiveTab('seat')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'seat'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Seats
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'baggage' && (
          <BaggageSelection
            ssrData={ssrData}
            passengerCount={passengerCount}
            selections={selections}
            onSelect={handleBaggageSelection}
          />
        )}
        {activeTab === 'meal' && (
          <MealSelection
            ssrData={ssrData}
            passengerCount={passengerCount}
            selections={selections}
            onSelect={handleMealSelection}
          />
        )}
        {activeTab === 'seat' && (
          <SeatSelection
            ssrData={ssrData}
            passengerCount={passengerCount}
            selections={selections}
            onSelect={handleSeatSelection}
          />
        )}
      </div>

      {/* Summary */}
      {getTotalSSRCost() > 0 && (
        <div className="bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">
              Total Additional Charges:
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {ssrData.isLCC && ssrData.baggage?.[0]?.[0]?.Currency} {getTotalSSRCost().toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Baggage Selection Component
function BaggageSelection({ ssrData, passengerCount, selections, onSelect }: any) {
  if (ssrData.isLCC && ssrData.baggage && ssrData.baggage.length > 0) {
    // LCC Baggage
    const baggageOptions = ssrData.baggage[0] || [];
    
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Select additional baggage allowance for each passenger. 
            The fare you selected may already include free baggage.
          </p>
        </div>

        {Array.from({ length: passengerCount }, (_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">
              Passenger {i + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {baggageOptions.map((baggage: BaggageOption, index: number) => {
                const isSelected = selections[i]?.baggage?.Code === baggage.Code;
                const isIncluded = baggage.Description === 1;
                
                return (
                  <button
                    key={index}
                    onClick={() => onSelect(i, baggage)}
                    disabled={baggage.Code === 'NoBaggage'}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    } ${baggage.Code === 'NoBaggage' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-lg">{baggage.Weight} kg</span>
                      {isIncluded && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Included
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {baggage.Origin} → {baggage.Destination}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {baggage.Price === 0 ? 'Free' : `${baggage.Currency} ${baggage.Price.toFixed(2)}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-8 text-gray-600">
      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <p>No additional baggage options available for this flight.</p>
    </div>
  );
}

// Meal Selection Component
function MealSelection({ ssrData, passengerCount, selections, onSelect }: any) {
  if (ssrData.isLCC && ssrData.mealDynamic && ssrData.mealDynamic.length > 0) {
    // LCC Meals
    const mealOptions = ssrData.mealDynamic[0] || [];
    
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Pre-order your meals and save time during your flight. 
            Selection of meals is subject to availability.
          </p>
        </div>

        {Array.from({ length: passengerCount }, (_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">
              Passenger {i + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mealOptions.map((meal: MealOption, index: number) => {
                const isSelected = selections[i]?.meal?.Code === meal.Code;
                const isIncluded = meal.Description === 1;
                
                return (
                  <button
                    key={index}
                    onClick={() => onSelect(i, meal)}
                    disabled={meal.Code === 'NoMeal'}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    } ${meal.Code === 'NoMeal' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {isIncluded && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2 inline-block">
                        Included
                      </span>
                    )}
                    <div className="font-semibold text-gray-800 mb-2">
                      {meal.AirlineDescription || meal.Code}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {meal.Origin} → {meal.Destination}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {meal.Price === 0 ? 'Free' : `${meal.Currency} ${meal.Price.toFixed(2)}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (!ssrData.isLCC && ssrData.meal && ssrData.meal.length > 0) {
    // Non-LCC Meal Preferences
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> For non-LCC flights, meal preferences are indicative only. 
            The airline will try to accommodate your preference based on availability.
          </p>
        </div>

        {Array.from({ length: passengerCount }, (_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">
              Passenger {i + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ssrData.meal.map((meal: MealPreference, index: number) => {
                const isSelected = selections[i]?.meal?.Code === meal.Code;
                
                return (
                  <button
                    key={index}
                    onClick={() => onSelect(i, meal)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800 text-sm">
                      {meal.Code}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {meal.Description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-8 text-gray-600">
      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <p>No meal options available for this flight.</p>
    </div>
  );
}

// Seat Selection Component
function SeatSelection({ ssrData, passengerCount, selections, onSelect }: any) {
  if (ssrData.isLCC && ssrData.seatDynamic && ssrData.seatDynamic.length > 0) {
    // LCC Seat Selection
    const seatData = ssrData.seatDynamic[0];
    const allSeats: SeatOption[] = [];
    
    // Flatten seat structure
    if (seatData.SegmentSeat) {
      seatData.SegmentSeat.forEach((segment: any) => {
        if (segment.RowSeats) {
          segment.RowSeats.forEach((row: any) => {
            if (row.Seats) {
              allSeats.push(...row.Seats);
            }
          });
        }
      });
    }

    // Filter out unavailable seats and NoSeat options
    const availableSeats = allSeats.filter(
      seat => seat.AvailablityType === 1 && seat.Code !== 'NoSeat'
    );

    if (availableSeats.length === 0) {
      return (
        <div className="text-center py-8 text-gray-600">
          <p>Seat selection not available for this flight.</p>
        </div>
      );
    }

    // Group seats by row
    const seatsByRow: { [key: string]: SeatOption[] } = {};
    availableSeats.forEach(seat => {
      if (!seatsByRow[seat.RowNo]) {
        seatsByRow[seat.RowNo] = [];
      }
      seatsByRow[seat.RowNo].push(seat);
    });

    const getSeatTypeIcon = (seatType: number) => {
      switch (seatType) {
        case 1: return '🪟'; // Window
        case 2: return '🚶'; // Aisle
        case 3: return '⬜'; // Middle
        default: return '💺';
      }
    };

    const getSeatTypeName = (seatType: number) => {
      switch (seatType) {
        case 1: return 'Window';
        case 2: return 'Aisle';
        case 3: return 'Middle';
        default: return 'Standard';
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Select your preferred seat for each passenger. 
            Seats marked with 🪟 are window seats, 🚶 are aisle seats.
          </p>
        </div>

        {Array.from({ length: passengerCount }, (_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">
              Passenger {i + 1}
            </h3>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Object.entries(seatsByRow).map(([rowNo, seats]) => (
                <div key={rowNo} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 w-12">
                    Row {rowNo}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {seats.map((seat, index) => {
                      const isSelected = selections[i]?.seat?.Code === seat.Code;
                      const isOccupied = selections.some(
                        (s: PassengerSSRSelections, idx: number) => idx !== i && s.seat?.Code === seat.Code
                      );
                      
                      return (
                        <button
                          key={index}
                          onClick={() => !isOccupied && onSelect(i, seat)}
                          disabled={isOccupied}
                          className={`min-w-[80px] p-2 rounded border-2 text-sm transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 font-semibold'
                              : isOccupied
                              ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                              : 'border-gray-200 hover:border-blue-300 cursor-pointer'
                          }`}
                          title={`${seat.SeatNo} - ${getSeatTypeName(seat.SeatType)} - ${seat.Currency} ${seat.Price}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{getSeatTypeIcon(seat.SeatType)} {seat.SeatNo}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {seat.Currency} {seat.Price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (!ssrData.isLCC && ssrData.seatPreference && ssrData.seatPreference.length > 0) {
    // Non-LCC Seat Preferences
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> For non-LCC flights, seat preferences are indicative only. 
            The airline will try to accommodate your preference based on availability.
          </p>
        </div>

        {Array.from({ length: passengerCount }, (_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">
              Passenger {i + 1}
            </h3>
            <div className="flex gap-4">
              {ssrData.seatPreference.map((seat: SeatPreference, index: number) => {
                const isSelected = selections[i]?.seat?.Code === seat.Code;
                
                return (
                  <button
                    key={index}
                    onClick={() => onSelect(i, seat)}
                    className={`flex-1 p-4 rounded-lg border-2 text-center transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {seat.Code === 'W' ? '🪟' : '🚶'}
                    </div>
                    <div className="font-medium text-gray-800">
                      {seat.Description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-8 text-gray-600">
      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
      <p>No seat selection available for this flight.</p>
    </div>
  );
}
