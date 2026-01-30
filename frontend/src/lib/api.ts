const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Helper function to set auth token
export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

// Helper function to remove auth token
export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

// Helper function to get user from localStorage
export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Helper function to set user in localStorage
export const setUser = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

// Generic API call function with timeout
const apiCall = async (
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = 90000,
) => {
  const token = getAuthToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    // Create an abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(
        "Request timeout. The server is taking too long to respond. Please try again.",
      );
    }
    throw new Error(error.message || "Network error");
  }
};

// Auth API calls
export const authAPI = {
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
  }) => {
    const data = await apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (data.token) {
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const data = await apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (data.token) {
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  },

  logout: async () => {
    try {
      // Call the backend logout endpoint
      await apiCall("/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local storage
      removeAuthToken();
    }
  },

  getMe: async () => {
    return await apiCall("/auth/me");
  },

  forgotPassword: async (email: string) => {
    return await apiCall("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, password: string) => {
    return await apiCall(`/auth/reset-password/${token}`, {
      method: "PUT",
      body: JSON.stringify({ password }),
    });
  },
};

// Hotels API calls
export const hotelsAPI = {
  search: async (searchParams: any) => {
    return await apiCall("/hotels/search", {
      method: "POST",
      body: JSON.stringify(searchParams),
    });
  },

  browse: async (cityName: string, countryCode: string = "IN") => {
    return await apiCall("/hotels/browse", {
      method: "POST",
      body: JSON.stringify({ CityName: cityName, CountryCode: countryCode }),
    });
  },

  getAll: async (filters?: any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiCall(`/hotels?${queryParams}`);
  },

  getById: async (id: string) => {
    return await apiCall(`/hotels/${id}`);
  },

  create: async (hotelData: any) => {
    return await apiCall("/hotels", {
      method: "POST",
      body: JSON.stringify(hotelData),
    });
  },

  update: async (id: string, hotelData: any) => {
    return await apiCall(`/hotels/${id}`, {
      method: "PUT",
      body: JSON.stringify(hotelData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/hotels/${id}`, {
      method: "DELETE",
    });
  },

  addReview: async (
    id: string,
    review: { rating: number; comment: string },
  ) => {
    return await apiCall(`/hotels/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    });
  },

  getDetails: async (hotelCode: string, language = "EN") => {
    return await apiCall("/hotels/static/hotel-details", {
      method: "POST",
      body: JSON.stringify({ Hotelcodes: hotelCode, Language: language }),
    });
  },
};

// Homestays API calls
export const homestaysAPI = {
  getAll: async (filters?: any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiCall(`/homestays?${queryParams}`);
  },

  getById: async (id: string) => {
    return await apiCall(`/homestays/${id}`);
  },

  create: async (homestayData: any) => {
    return await apiCall("/homestays", {
      method: "POST",
      body: JSON.stringify(homestayData),
    });
  },

  update: async (id: string, homestayData: any) => {
    return await apiCall(`/homestays/${id}`, {
      method: "PUT",
      body: JSON.stringify(homestayData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/homestays/${id}`, {
      method: "DELETE",
    });
  },

  addReview: async (
    id: string,
    review: { rating: number; comment: string },
  ) => {
    return await apiCall(`/homestays/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    });
  },
};

// Flights API calls
export const flightsAPI = {
  search: async (searchParams: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults?: number;
    children?: number;
    infants?: number;
    cabinClass?: number;
    journeyType?: number;
    directFlight?: boolean;
    oneStopFlight?: boolean;
    sources?: string[] | null;
  }) => {
    return await apiCall("/flights/search", {
      method: "POST",
      body: JSON.stringify(searchParams),
    });
  },

  getFareRules: async (params: { traceId: string; resultIndex: string }) => {
    return await apiCall("/flights/fare-rules", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  getFareQuote: async (params: { traceId: string; resultIndex: string }) => {
    return await apiCall(
      "/flights/fare-quote",
      {
        method: "POST",
        body: JSON.stringify(params),
      },
      150000,
    ); // 150 seconds timeout for slow TekTravels fare quote API
  },

  getSSR: async (params: {
    traceId?: string;
    resultIndex?: string;
    bookingId?: number;
  }) => {
    return await apiCall("/flights/ssr", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  book: async (bookingParams: {
    traceId: string;
    resultIndex: string;
    passengers: Array<{
      Title: string;
      FirstName: string;
      LastName: string;
      PaxType: number;
      DateOfBirth: string;
      Gender: number;
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
      Fare: {
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
      };
      Meal?: {
        Code: string;
        Description: string;
      };
      Seat?: {
        Code: string;
        Description: string;
      };
    }>;
  }) => {
    return await apiCall("/flights/book", {
      method: "POST",
      body: JSON.stringify(bookingParams),
    });
  },

  ticket: async (ticketParams: {
    traceId: string;
    isLCC: boolean;
    // For LCC
    resultIndex?: string;
    passengers?: Array<{
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
      Fare: {
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
      };
      Meal?: {
        Code: string;
        Description: string;
      };
      Seat?: {
        Code: string;
        Description: string;
      };
      Baggage?: Array<{
        WayType: number;
        Code: string;
        Description: number;
        Weight: number;
        Currency: string;
        Price: number;
        Origin: string;
        Destination: string;
      }>;
      MealDynamic?: Array<{
        WayType: number;
        Code: string;
        Description: number;
        AirlineDescription: string;
        Quantity: number;
        Price: number;
        Currency: string;
        Origin: string;
        Destination: string;
      }>;
      SeatDynamic?: Array<{
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
      }>;
      GSTCompanyAddress?: string;
      GSTCompanyContactNumber?: string;
      GSTCompanyName?: string;
      GSTNumber?: string;
      GSTCompanyEmail?: string;
    }>;
    // For Non-LCC
    pnr?: string;
    bookingId?: number;
    passport?: Array<{
      PaxId: number;
      PassportNo: string;
      PassportExpiry: string;
      DateOfBirth: string;
    }>;
    isPriceChangeAccepted?: boolean;
  }) => {
    return await apiCall("/flights/ticket", {
      method: "POST",
      body: JSON.stringify(ticketParams),
    });
  },

  // Get booking details - retrieve existing booking information
  getBookingDetails: async (params: {
    bookingId?: number;
    pnr?: string;
    firstName?: string;
    lastName?: string;
    traceId?: string;
  }) => {
    // Build query string from provided parameters
    const queryParams = new URLSearchParams();
    if (params.bookingId)
      queryParams.append("bookingId", params.bookingId.toString());
    if (params.pnr) queryParams.append("pnr", params.pnr);
    if (params.firstName) queryParams.append("firstName", params.firstName);
    if (params.lastName) queryParams.append("lastName", params.lastName);
    if (params.traceId) queryParams.append("traceId", params.traceId);

    return await apiCall(`/flights/booking-details?${queryParams.toString()}`, {
      method: "GET",
    });
  },

  getAll: async (filters?: any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiCall(`/flights?${queryParams}`);
  },

  getById: async (id: string) => {
    return await apiCall(`/flights/${id}`);
  },

  create: async (flightData: any) => {
    return await apiCall("/flights", {
      method: "POST",
      body: JSON.stringify(flightData),
    });
  },

  update: async (id: string, flightData: any) => {
    return await apiCall(`/flights/${id}`, {
      method: "PUT",
      body: JSON.stringify(flightData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/flights/${id}`, {
      method: "DELETE",
    });
  },
};

// Holidays API calls
export const holidaysAPI = {
  getAll: async (filters?: any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiCall(`/holidays?${queryParams}`);
  },

  getById: async (id: string) => {
    return await apiCall(`/holidays/${id}`);
  },

  create: async (holidayData: any) => {
    return await apiCall("/holidays", {
      method: "POST",
      body: JSON.stringify(holidayData),
    });
  },

  update: async (id: string, holidayData: any) => {
    return await apiCall(`/holidays/${id}`, {
      method: "PUT",
      body: JSON.stringify(holidayData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/holidays/${id}`, {
      method: "DELETE",
    });
  },

  addReview: async (
    id: string,
    review: { rating: number; comment: string },
  ) => {
    return await apiCall(`/holidays/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    });
  },
};

// Bookings API calls
export const bookingsAPI = {
  getAll: async () => {
    return await apiCall("/bookings");
  },

  getById: async (id: string) => {
    return await apiCall(`/bookings/${id}`);
  },

  create: async (bookingData: any) => {
    return await apiCall("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  },

  update: async (id: string, bookingData: any) => {
    return await apiCall(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(bookingData),
    });
  },

  cancel: async (id: string) => {
    return await apiCall(`/bookings/${id}/cancel`, {
      method: "PUT",
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/bookings/${id}`, {
      method: "DELETE",
    });
  },
};

// Users API calls
export const usersAPI = {
  getProfile: async () => {
    return await apiCall("/users/profile");
  },

  updateProfile: async (userData: any) => {
    return await apiCall("/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  updatePassword: async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return await apiCall("/users/update-password", {
      method: "PUT",
      body: JSON.stringify(passwords),
    });
  },
};

// Blogs API calls
export const blogsAPI = {
  getAll: async (filters?: any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiCall(`/blogs?${queryParams}`);
  },

  getById: async (id: string) => {
    return await apiCall(`/blogs/${id}`);
  },

  create: async (blogData: any) => {
    return await apiCall("/blogs", {
      method: "POST",
      body: JSON.stringify(blogData),
    });
  },

  update: async (id: string, blogData: any) => {
    return await apiCall(`/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(blogData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/blogs/${id}`, {
      method: "DELETE",
    });
  },

  addComment: async (id: string, comment: string) => {
    return await apiCall(`/blogs/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ comment }),
    });
  },
};

// Contact API calls
export const contactAPI = {
  submit: async (contactData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => {
    return await apiCall("/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
    });
  },
};
