const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to set auth token
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Helper function to remove auth token
export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Helper function to get user from localStorage
export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Helper function to set user in localStorage
export const setUser = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network error');
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
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (data.token) {
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
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
      await apiCall('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local storage
      removeAuthToken();
    }
  },

  getMe: async () => {
    return await apiCall('/auth/me');
  },

  forgotPassword: async (email: string) => {
    return await apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, password: string) => {
    return await apiCall(`/auth/reset-password/${token}`, {
      method: 'PUT',
      body: JSON.stringify({ password }),
    });
  },
};

// Hotels API calls
export const hotelsAPI = {
  getAll: async (filters?: any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiCall(`/hotels?${queryParams}`);
  },

  getById: async (id: string) => {
    return await apiCall(`/hotels/${id}`);
  },

  create: async (hotelData: any) => {
    return await apiCall('/hotels', {
      method: 'POST',
      body: JSON.stringify(hotelData),
    });
  },

  update: async (id: string, hotelData: any) => {
    return await apiCall(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hotelData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/hotels/${id}`, {
      method: 'DELETE',
    });
  },

  addReview: async (id: string, review: { rating: number; comment: string }) => {
    return await apiCall(`/hotels/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
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
    return await apiCall('/homestays', {
      method: 'POST',
      body: JSON.stringify(homestayData),
    });
  },

  update: async (id: string, homestayData: any) => {
    return await apiCall(`/homestays/${id}`, {
      method: 'PUT',
      body: JSON.stringify(homestayData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/homestays/${id}`, {
      method: 'DELETE',
    });
  },

  addReview: async (id: string, review: { rating: number; comment: string }) => {
    return await apiCall(`/homestays/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    });
  },
};

// Flights API calls
export const flightsAPI = {
  getAll: async (filters?: any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiCall(`/flights?${queryParams}`);
  },

  getById: async (id: string) => {
    return await apiCall(`/flights/${id}`);
  },

  create: async (flightData: any) => {
    return await apiCall('/flights', {
      method: 'POST',
      body: JSON.stringify(flightData),
    });
  },

  update: async (id: string, flightData: any) => {
    return await apiCall(`/flights/${id}`, {
      method: 'PUT',
      body: JSON.stringify(flightData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/flights/${id}`, {
      method: 'DELETE',
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
    return await apiCall('/holidays', {
      method: 'POST',
      body: JSON.stringify(holidayData),
    });
  },

  update: async (id: string, holidayData: any) => {
    return await apiCall(`/holidays/${id}`, {
      method: 'PUT',
      body: JSON.stringify(holidayData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/holidays/${id}`, {
      method: 'DELETE',
    });
  },

  addReview: async (id: string, review: { rating: number; comment: string }) => {
    return await apiCall(`/holidays/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    });
  },
};

// Bookings API calls
export const bookingsAPI = {
  getAll: async () => {
    return await apiCall('/bookings');
  },

  getById: async (id: string) => {
    return await apiCall(`/bookings/${id}`);
  },

  create: async (bookingData: any) => {
    return await apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  update: async (id: string, bookingData: any) => {
    return await apiCall(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData),
    });
  },

  cancel: async (id: string) => {
    return await apiCall(`/bookings/${id}/cancel`, {
      method: 'PUT',
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/bookings/${id}`, {
      method: 'DELETE',
    });
  },
};

// Users API calls
export const usersAPI = {
  getProfile: async () => {
    return await apiCall('/users/profile');
  },

  updateProfile: async (userData: any) => {
    return await apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  updatePassword: async (passwords: { currentPassword: string; newPassword: string }) => {
    return await apiCall('/users/update-password', {
      method: 'PUT',
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
    return await apiCall('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  },

  update: async (id: string, blogData: any) => {
    return await apiCall(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  },

  delete: async (id: string) => {
    return await apiCall(`/blogs/${id}`, {
      method: 'DELETE',
    });
  },

  addComment: async (id: string, comment: string) => {
    return await apiCall(`/blogs/${id}/comments`, {
      method: 'POST',
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
    return await apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};
