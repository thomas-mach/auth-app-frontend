import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("auth", () => {
  const user = ref(
    JSON.parse(localStorage.getItem("user")) || { isLoggedIn: false }
  );

  const isLoggedIn = computed(() => user.value?.isLoggedIn || false);

  function login(userData) {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function setUserId(id) {
    if (user.value) {
      user.value = { ...user.value, id };
      localStorage.setItem("user", JSON.stringify(user.value));
    }
  }

  function logout() {
    user.value = { isLoggedIn: false };
    localStorage.removeItem("user");
  }

  return { user, isLoggedIn, login, logout, setUserId };
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
    avatars: JSON.parse(localStorage.getItem("avatars")) || [],
  }),
  actions: {
    async fetchAvatars() {
      // if (this.avatars) return;
      try {
        const response = await axios.get(`${API_URL}/avatars`);
        this.avatars = response.data.avatars;
        localStorage.setItem("avatars", JSON.stringify(this.avatars));
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
