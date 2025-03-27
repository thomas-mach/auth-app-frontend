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
    setUserId(id) {
      if (this.user) {
        this.user.id = id; // Aggiungi o aggiorna l'ID all'interno dell'oggetto user
        sessionStorage.setItem("user", JSON.stringify(this.user)); // Salva l'utente aggiornato nel sessionStorage
      }
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
    avatars: JSON.parse(sessionStorage.getItem("avatars")) || [],
  }),
  actions: {
    async fetchAvatars() {
      // if (this.avatars) return;
      try {
        const response = await axios.get(`${API_URL}/avatars`);
        this.avatars = response.data.avatars;
        sessionStorage.setItem("avatars", JSON.stringify(this.avatars));
      } catch (error) {
        console.error("Errore nel recupero degli avatar:", error);
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
