<template>
  <h1>Lvie time chat</h1>
  <input
    v-model="message"
    placeholder="Type here..."
    @keyup.enter="sendMessage"
  />
  <button @click="sendMessage">Send</button>
  <ul>
    <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
  </ul>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import { getJWT } from "../api/authService";

const socket = inject("socket"); // Usa il socket globale dal plugin
const message = ref("");
const messages = ref([]);

const sendMessage = () => {
  console.log("sendMessage run...");
  if (message.value.trim() !== "") {
    if (socket.connected) {
      socket.emit("message", message.value);
      message.value = "";
    } else {
      console.log("❌ Socket non connesso");
    }
  }
};

const receiveMessage = (msg) => {
  messages.value.push(msg);
};

const handleGetJWT = async () => {
  try {
    const response = await getJWT();
    console.log("🔑 Token JWT ricevuto:", response);
    return response.JWT;
  } catch (error) {
    console.error("❌ Errore nel recuperare il JWT:", error);
    if (socket && socket.connected) {
      socket.disconnect();
      console.log("⚡ Socket disconnesso a causa di errore nel recupero JWT");
    }
    return null;
  }
};

onMounted(async () => {
  try {
    const token = await handleGetJWT();
    if (token) {
      socket.auth = { token }; // Aggiorna il token nel socket globale
      if (!socket.connected) {
        socket.connect(); // Assicura che il socket si connetta
      }

      socket.on("connect", () => {
        console.log("🔌 Connesso al server WebSocket con ID:", socket.id);
      });

      socket.on("message", receiveMessage);

      socket.on("disconnect", () => {
        console.log("❌ Disconnesso dal server WebSocket");
      });
    }
  } catch (error) {
    console.error("❌ Errore nella connessione WebSocket:", error);
  }
});

onUnmounted(() => {
  if (socket) {
    // Rimuovi i listener per evitare duplicazioni
    socket.off("connect"); // Rimuovi il listener precedente per "connect"
    socket.off("disconnect"); // Rimuovi il listener precedente per "disconnect"
    socket.off("message"); // Rimuovi il listener precedente per "message"
    console.log("💥 Eventi WebSocket rimossi");
    if (socket.connected) {
      socket.disconnect();
      console.log("⚡ Socket disconnesso");
    }
  }
});
</script>

<style scoped>
h1 {
  color: red;
}
</style>
