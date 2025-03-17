import { defineStore } from "pinia";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("user")) || null, // Recupera dallo storage
  }),
  actions: {
    login(userData) {
      this.user = userData;
      sessionStorage.setItem("user", JSON.stringify(userData)); // Salva nello storage
    },
    logout() {
      this.user = null;
      sessionStorage.removeItem("user"); // Rimuove dallo storage
    },
  },
});

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    message: "",
  }),
  actions: {
    setMessage(newMessage) {
      this.message = newMessage;
    },
  },
});

export const useAvatarStore = defineStore("avatarStore", {
  state: () => ({
    avatars: [],
  }),
  actions: {
    async fetchAvatars() {
      try {
        const response = await axios.get(`${API_URL}/avatars`);
        console.log(response);
        this.avatars = response.data.avatars.map(
          (file) => `http://localhost:3003/avatars/${file}`
        );
      } catch (error) {
        throw error;
      }
    },
  },
});
