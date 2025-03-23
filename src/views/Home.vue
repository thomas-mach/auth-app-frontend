<template>
  <div class="home-wrapper">
    <p class="message" v-if="messagesStore.message && messageTime">
      {{ messagesStore.message }}
    </p>

    <h1>
      This is an authentication app. Please
      <router-link to="/signup" class="link">sign up</router-link>.
    </h1>
    <AllComents />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useMessagesStore, useShowHillsStore } from "../store/storeAuth.js";
import AllComents from "../components/AllComents.vue";

const messagesStore = useMessagesStore();
let messageTime = ref(true);

const setFalseAfterDelay = () => {
  setTimeout(() => {
    messageTime.value = false;
    messagesStore.setMessage("");
  }, 3500);
};

onMounted(() => {
  useShowHillsStore().showHills();
});

onUnmounted(() => {
  useShowHillsStore().hideHills();
});

setFalseAfterDelay();
</script>

<style scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: 100%;
  max-width: 1224px;
  margin: 0 auto;
}

h1 {
  margin: 0.5em 0;
  color: var(--clr-light-dark);
  font-size: var(--fs-h1);
  text-align: center;
  letter-spacing: 3px;
}

.message {
  text-align: center;
  font-size: var(--fs-h2);
  color: var(--clr-valid);
}

.link {
  color: var(--clr-accent);
}
</style>
