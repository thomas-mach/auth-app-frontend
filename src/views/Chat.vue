<template>
  <div class="chat-wrapper">
    <div class="messages-wrapper" ref="chatContainer">
      <div
        class="message-wrapper"
        v-for="(msg, index) in messages"
        :key="msg._id"
        :class="userId === msg.sender._id ? 'align-right' : ''"
      >
        <div class="header">
          <div class="sender-avatar-wrapper">
            <img class="avatar" :src="msg.sender.avatar" alt="" />
            <p class="name">{{ msg.sender.name }}</p>
          </div>
          <p class="date">{{ formatTime(msg.createdAt) }}</p>
        </div>
        <p class="message">{{ msg.message }}</p>
      </div>
    </div>
    <div class="input-message-wrapper">
      <input
        class="input-message"
        v-model="message"
        placeholder="Type here..."
        @keyup.enter="sendMessage"
      />
      <button class="btn" @click="sendMessage">
        <font-awesome-icon class="send-icon" :icon="['fas', 'paper-plane']" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from "vue";
import { getJWT } from "../api/authService";
import { jwtDecode } from "jwt-decode";

const socket = inject("socket"); // Usa il socket globale dal plugin
const message = ref("");
const messages = ref([]);
const chatContainer = ref(null);
const userId = ref("");

const sendMessage = () => {
  console.log("sendMessage run...");
  if (message.value.trim() !== "") {
    if (socket?.connected) {
      socket.emit("message", message.value);
      message.value = "";
    } else {
      console.log("❌ Socket non connesso");
    }
  }
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
    }
  });
};

onMounted(() => {
  socket.on("message", (msg) => {
    messages.value.push(msg);
    console.log(msg);
    scrollToBottom();
  });
  // const decoded = jwtDecode(socket.auth.token);
  // userId.value = decoded.id;
});
</script>

<style scoped>
.chat-wrapper {
  width: 90%;
  height: 100%;
  max-width: 1224px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* border: 1px solid yellow; */
}
.messages-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: auto;
}

.message-wrapper {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  background-color: var(--clr-light-dark);
  padding: 0.5em;
  border-radius: 0.75em;
  word-wrap: break-word;
}

.message-wrapper:last-child {
  margin-bottom: 2em;
}

.input-message-wrapper {
  height: 10%;
  display: flex;
  align-items: center;
  gap: 0.5em;
  /* border: 1px solid green; */
}

.input-message {
  width: 100%;
  padding: 1em;
  border: none;
  border-radius: 10px;
  background-color: var(--clr-light-dark);
}

.input-message:focus {
  outline: none;
  background-color: var(--clr-light);
}

.btn {
  width: 3.25em;
  height: 3.25em;
  border: none;
  border-radius: 50%;
  background-color: var(--clr-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.send-icon {
  color: var(--clr-light);
  font-size: var(--fs-body);
  transform: translate(-50% -50%);
}

.sender-avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 0.25em;
}

.header {
  display: flex;
  gap: 1em;
  justify-content: space-between;
}

.avatar {
  width: 1.75em;
}

.date {
  font-size: var(--fs-small);
}

.name {
  font-size: var(--fs-small);
  font-weight: var(--fw-bold);
}
.message {
  margin-top: 0.5em;
}

.align-right {
  align-self: flex-end;
  background-color: var(--clr-complementary);
}
</style>
