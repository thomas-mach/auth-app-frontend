<template>
  <div class="chat-wrapper">
    <div class="users-online">
      <span>Online: </span>
      <div>
        <p>{{ userCount }}</p>
      </div>
    </div>
    <div class="messages-wrapper" ref="chatContainer">
      <div
        class="message-wrapper"
        v-for="(msg, index) in messages"
        :key="msg._id"
        :class="userId === msg.sender._id ? 'align-right' : 'align-left'"
      >
        <div class="header">
          <div class="sender-avatar-wrapper">
            <img
              class="avatar"
              :src="`${API_URL_AVATAR}/${msg.sender.avatar}`"
              alt=""
            />
            <p class="name">{{ msg.sender.name }}</p>
          </div>
          <p class="date">{{ formatTime(msg.createdAt) }}</p>
        </div>
        <p class="message">{{ msg.message }}</p>
      </div>
    </div>
    <div class="input-message-wrapper">
      <div class="textarea-wrapper">
        <textarea
          class="input-message"
          v-model="message"
          placeholder="Type here..."
          @keyup.enter="sendMessage"
          @input="adjustHeight"
          ref="textarea"
          @keydown.enter.prevent
        ></textarea>
      </div>

      <button class="btn" @click="sendMessage">
        <font-awesome-icon class="send-icon" :icon="['fas', 'paper-plane']" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, nextTick, watch } from "vue";
import { getMessages } from "../api/messageService";
import { useAuthStore } from "../store/storeAuth.js";

const API_URL_AVATAR = import.meta.env.VITE_API_URL_AVATAR;
const socket = inject("socket"); // Usa il socket globale dal plugin
const message = ref("");
const messages = ref([]);
const chatContainer = ref(null);
const userId = ref("");
const authStore = useAuthStore();
const userCount = ref(0);
const textarea = ref(null);

const handleGetMessges = async () => {
  console.log("handleGetMessges run");
  messages.value = [];
  try {
    const response = await getMessages();
    messages.value = response.data.messages;
    console.log(response);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = () => {
  console.log("sendMessage run...", messages.value);
  if (message.value.trim() !== "") {
    if (socket?.connected) {
      socket.emit("message", message.value);
      message.value = "";
      nextTick(() => {
        if (textarea.value) {
          textarea.value.style.height = "30px"; // Torna all'altezza minima
        }
      });
      setTimeout(() => {
        scrollToBottom();
      }, 100);
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
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const adjustHeight = () => {
  if (textarea.value) {
    // textarea.value.style.height = "auto";
    textarea.value.style.height = textarea.value.scrollHeight + "px"; // Imposta l'altezza dinamicamente
    scrollToBottom();
  }
};

onMounted(() => {
  handleGetMessges();
  socket.emit("getUserCount"); // Richiede manualmente il numero di utenti

  socket.on("userCount", (count) => {
    userCount.value = count;
    console.log("✅ USERS online:", userCount.value);
  });

  socket.on("message", (msg) => {
    messages.value.push(msg);
    scrollToBottom();
  });

  socket.on("connect", () => {
    console.log("✅ Socket connesso!");
    socket.emit("getUserCount"); // Chiede il numero di utenti dopo la connessione
  });

  userId.value = authStore.user.id.userId;
});

onUnmounted(() => {
  socket.off("message");
  socket.off("userCount");
});

watch(userCount, (newVal) => {
  console.log("🔄 Numero utenti aggiornato:", newVal);
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
  max-width: 600px;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: auto;
  scrollbar-width: none;
}

.messages-wrapper::-webkit-scrollbar {
  display: none;
}

.message-wrapper {
  min-width: 0px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--clr-light-dark);
  padding: 0.5em;
  border-radius: 0.75em;
  word-wrap: break-word;
}

.input-message-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0.5em 0;
  /* border: 1px solid green; */
}

.textarea-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--clr-light-dark);
  border-radius: 10px;
  padding: 0.3em;
  padding-top: 0.7em;
}

.input-message {
  margin: 0;
  padding: 0;
  max-height: 100px;
  height: 30px;
  width: 100%;
  font-size: var(--fs-body);
  border: none;
  resize: none;
  overflow: auto;
  background-color: var(--clr-light-dark);
}

.input-message:focus {
  outline: none;
  /* background-color: var(--clr-light); */
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
  align-self: flex-end;
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

.align-left {
  align-self: flex-start;
}

.users-online {
  display: flex;
  gap: 0.5em;
  align-items: center;
  margin-bottom: 0.5em;
}

.users-online span {
  font-size: var(--fs-small);
  color: var(--clr-light);
  font-weight: var(--fw-bold);
}

.users-online div {
  width: 2em;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--clr-error);
  border-radius: 50%;
  color: var(--clr-light);
  font-weight: var(--fw-bold);
  font-size: var(--fs-small);
}
</style>
