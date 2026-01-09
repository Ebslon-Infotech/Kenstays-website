// Type definitions for TekTravels Flight Booking API

export interface PassengerFare {
  Currency: string;
  BaseFare: number;
  Tax: number;
  YQTax: number;
  AdditionalTxnFeePub: number;
  AdditionalTxnFeeOfrd: number;
  OtherCharges: number;
  Discount: number;
  PublishedFare: number;
  OfferedFare: number;
  TdsOnCommission: number;
  TdsOnPLB: number;
  TdsOnIncentive: number;
  ServiceFee: number;
}

export interface PassengerMeal {
  Code: string;
  Description: string;
}

export interface PassengerSeat {
  Code: string;
  Description: string;
}

export interface BookingPassenger {
  Title: string;
  FirstName: string;
  LastName: string;
  PaxType: number; // 1=Adult, 2=Child, 3=Infant
  DateOfBirth: string; // ISO format: "1987-12-06T00:00:00"
  Gender: number; // 1=Male, 2=Female
  PassportNo?: string;
  PassportExpiry?: string;
  PassportIssueDate?: string;
  AddressLine1: string;
  AddressLine2?: string;
  City: string;
  CountryCode: string;
  CountryName: string;
  ContactNo: string;
  Email: string;
  IsLeadPax: boolean;
  Nationality: string;
  FFAirlineCode?: string | null;
  FFNumber?: string;
  GSTCompanyAddress?: string;
  GSTCompanyContactNumber?: string;
  GSTCompanyName?: string;
  GSTNumber?: string;
  GSTCompanyEmail?: string;
  CellCountryCode?: string;
  Fare: PassengerFare;
  Meal?: PassengerMeal;
  Seat?: PassengerSeat;
}

export interface BookFlightRequest {
  traceId: string;
  resultIndex: string;
  passengers: BookingPassenger[];
}

export interface FlightSegment {
  TripIndicator: number;
  SegmentIndicator: number;
  Airline: {
    AirlineCode: string;
    AirlineName: string;
    FlightNumber: string;
    FareClass: string;
    OperatingCarrier: string;
  };
  Origin: {
    Airport: {
      AirportCode: string;
      AirportName: string;
      Terminal: string;
      CityCode: string;
      CityName: string;
      CountryCode: string;
      CountryName: string;
    };
    DepTime: string;
  };
  Destination: {
    Airport: {
      AirportCode: string;
      AirportName: string;
      Terminal: string;
      CityCode: string;
      CityName: string;
      CountryCode: string;
      CountryName: string;
    };
    ArrTime: string;
  };
  Duration: number;
  AccumulatedDuration?: number;
  GroundTime?: number;
  Mile?: number;
  StopOver: boolean;
  StopPoint?: string;
  StopPointArrivalTime?: string;
  StopPointDepartureTime?: string;
  Craft?: string;
  Remark?: string;
  IsETicketEligible: boolean;
  FlightStatus: string;
  Status: string;
  AirlinePNR?: string;
  Baggage?: string;
  CabinBaggage?: string;
}

export interface FareRule {
  Origin: string;
  Destination: string;
  Airline: string;
  FareBasisCode: string;
  FareRuleDetail: string;
  FareRestriction: string;
}

export interface BookedPassenger {
  PaxId: number;
  Title: string;
  FirstName: string;
  LastName: string;
  PaxType: number;
  DateOfBirth: string;
  Gender: number;
  PassportNo?: string;
  PassportExpiry?: string;
  AddressLine1: string;
  AddressLine2?: string;
  City: string;
  CountryCode: string;
  CountryName: string;
  ContactNo: string;
  Email: string;
  IsLeadPax: boolean;
  Nationality: string;
  FFAirlineCode?: string | null;
  FFNumber?: string;
  Fare: PassengerFare;
  Meal?: PassengerMeal;
  Seat?: PassengerSeat;
  GSTCompanyAddress?: string;
  GSTCompanyContactNumber?: string;
  GSTCompanyName?: string;
  GSTNumber?: string;
  GSTCompanyEmail?: string;
}

export interface FlightItinerary {
  BookingId: number;
  PNR: string;
  IsDomestic: boolean;
  Source: number;
  Origin: string;
  Destination: string;
  AirlineCode: string;
  ValidatingAirlineCode: string;
  AirlineRemarks?: string;
  IsLCC: boolean;
  NonRefundable: boolean;
  FareType: string;
  LastTicketDate: string;
  Fare: PassengerFare & {
    TaxBreakup?: Array<{
      Key: string;
      Value: number;
    }>;
    ChargeBU?: Array<{
      Key: string;
      Value: number;
    }>;
    TotalBaggageCharges?: number;
    TotalMealCharges?: number;
    TotalSeatCharges?: number;
    TotalSpecialServiceCharges?: number;
  };
  Passenger: BookedPassenger[];
  Segments: FlightSegment[];
  FareRules?: FareRule[];
  Status: number;
  BookingHistory?: Array<{
    BookingId: number;
    EventCategory: number;
    Remarks: string;
    CreatedOn: string;
    CreatedBy: number;
    CreatedByName: string;
    LastModifiedOn: string;
    LastModifiedBy: number;
    LastModifiedByName: string;
  }>;
}

export interface BookFlightResponse {
  success: boolean;
  message?: string;
  priceChanged?: boolean;
  timeChanged?: boolean;
  data: {
    traceId: string;
    pnr: string;
    bookingId: number;
    status: number; // 0=NotSet, 1=Successful, 2=Failed, 3=OtherFare, 4=OtherClass, 5=BookedOther, 6=NotConfirmed
    isPriceChanged: boolean;
    isTimeChanged: boolean;
    ssrDenied: boolean;
    ssrMessage?: string;
    flightItinerary: FlightItinerary;
    error?: {
      ErrorCode: number;
      ErrorMessage: string;
    };
    responseStatus: {
      status: boolean;
      code: number;
    };
    savedToDatabase?: boolean;
  };
}

export interface BookingError {
  success: false;
  message: string;
  data?: any;
}

// Helper types for form handling
export type PaxType = 1 | 2 | 3; // Adult | Child | Infant
export type Gender = 1 | 2; // Male | Female
export type Title = 'Mr' | 'Ms' | 'Mrs' | 'Master' | 'Miss';

export interface PassengerFormData {
  title: Title;
  firstName: string;
  lastName: string;
  paxType: PaxType;
  dateOfBirth: Date | string;
  gender: Gender;
  passportNo?: string;
  passportExpiry?: Date | string;
  passportIssueDate?: Date | string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  countryCode: string;
  countryName: string;
  contactNo: string;
  email: string;
  isLeadPax: boolean;
  nationality: string;
  // GST Details
  gstCompanyAddress?: string;
  gstCompanyContactNumber?: string;
  gstCompanyName?: string;
  gstNumber?: string;
  gstCompanyEmail?: string;
  // SSR selections
  selectedMeal?: PassengerMeal;
  selectedSeat?: PassengerSeat;
}

// Booking status constants
export enum BookingStatus {
  NotSet = 0,
  Successful = 1,
  Failed = 2,
  OtherFare = 3,
  OtherClass = 4,
  BookedOther = 5,
  NotConfirmed = 6,
}

// Ticket status for database
export enum TicketStatus {
  NotBooked = 'not_booked',
  Booked = 'booked',
  Ticketed = 'ticketed',
  Cancelled = 'cancelled',
}

// Ticket API Request (for LCC flights)
export interface TicketFlightRequestLCC {
  traceId: string;
  resultIndex: string;
  isLCC: true;
  passengers: BookingPassenger[];
  isPriceChangeAccepted?: boolean;
}

// Ticket API Request (for Non-LCC flights)
export interface TicketFlightRequestNonLCC {
  traceId: string;
  pnr: string;
  bookingId: number;
  isLCC: false;
  passport?: Array<{
    PaxId: number;
    PassportNo: string;
    PassportExpiry: string;
    DateOfBirth: string;
  }>;
  isPriceChangeAccepted?: boolean;
}

export type TicketFlightRequest = TicketFlightRequestLCC | TicketFlightRequestNonLCC;

// Ticket API Response
export interface TicketFlightResponse {
  success: boolean;
  message?: string;
  priceChanged?: boolean;
  timeChanged?: boolean;
  data: {
    traceId: string;
    pnr: string;
    bookingId: number;
    ticketStatus: number; // 1 = Successful
    isPriceChanged: boolean;
    isTimeChanged: boolean;
    flightItinerary: FlightItinerary;
    savedToDatabase?: boolean;
  };
}
