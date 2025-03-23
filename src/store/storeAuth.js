import { defineStore } from "pinia";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URL_AVATAR = import.meta.env.VITE_API_URL_AVATAR;

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
          (file) => `${API_URL_AVATAR}/${file}`
        );
      } catch (error) {
        throw error;
      }
    },
  },
});

export const useShowHillsStore = defineStore("showHills", {
  state: () => ({
    isHills: false,
  }),
  actions: {
    showHills() {
      this.isHills = true;
    },
    hideHills() {
      this.isHills = false;
    },
  },
});
