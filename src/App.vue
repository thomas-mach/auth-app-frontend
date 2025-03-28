<template>
  <div id="app" class="app-wrapper">
    <div class="stars">
      <header class="header">
        <Header />
      </header>

      <main class="main">
        <router-view />
      </main>

      <footer
        class="footer"
        :class="useShowHillsStore().isHills ? 'footer-over' : 'footer-under'"
      >
        <img
          class="hills"
          src="./images/pattern-hills.svg"
          alt="Pattern Hills"
        />
      </footer>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import { useShowHillsStore } from "../src/store/storeAuth";
</script>

<style scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100dvh;
  background: linear-gradient(#1d1e28, #261a2d);
  /* border: 1px solid rgb(144, 234, 0); */
}

.stars {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-image: url(./images/bg-stars.svg);
  height: 100%;
  z-index: 0;
}

.header {
  width: 100%;
  height: 10%;
  /* border: 1px solid rgb(190, 22, 22); */
}

.main {
  width: 100%;
  height: 90%;
  z-index: 50;
  /* border: 1px solid rgb(11, 32, 221); */
}

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
}

.footer-over {
  z-index: 100;
}

.footer-under {
  z-index: 0;
}

.hills {
  transform: translateX(-20%);
}

@media (min-width: 1430px) {
  .hills {
    transform: translateX(0%);
    width: 100%;
  }
}

@media (min-width: 1140px) {
  .hills {
    transform: translateX(0%);
  }
}

@media (min-width: 750px) {
  .header {
    height: 15%;
  }
  .main {
    height: 85%;
  }
}
</style>
