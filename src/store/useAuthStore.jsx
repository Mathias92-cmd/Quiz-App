import { create } from "zustand";
import axios from "axios";

const API_URL = "https://quiz-app-6rr9.onrender.com/api";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  // initial states
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });

      set({
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error signing up",
      });

      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, message: null, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { user, message } = response.data;

      set({ user, message, isLoading: false });

      return { email, message };
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });

      throw error;
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/fetch-user`);

      set({
        user: response.data.user,
        fetchingUser: false,
      });
    } catch (error) {
      set({ error: null, fetchingUser: false, user: null });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      const { message } = response.data;
      set({ message, isLoading: false, user: null, error: null });
      return message;
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },
}));
