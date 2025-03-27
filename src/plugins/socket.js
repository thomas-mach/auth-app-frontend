import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SERVER_URL, {
  // autoConnect: false,
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

socket.on("connect", () => {
  console.log("🔗 Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.warn("⚠️ Socket disconnected:", reason);
});

const originalOn = socket.on;
socket.on = function (event, callback) {
  console.log(`📥 Ricevuto evento: ${event}`);
  originalOn.call(socket, event, (...args) => {
    console.log(`📥 Dati ricevuti per "${event}":`, args);
    callback(...args);
  });
};
export default {
  install: (app) => {
    app.config.globalProperties.$socket = socket;
    app.provide("socket", socket); // Per compatibilità con Composition API
  },
};

export { socket };
