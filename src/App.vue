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
  position: fixed;
  width: 100%;
  height: 100vh;
  background: linear-gradient(#1d1e28, #261a2d);
  /* overflow: hidden; */
  /* border: 1px solid rgb(144, 234, 0); */
}

.stars {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(./images/bg-stars.svg);
  height: 100%;
}

.header {
  margin: 0 auto;
  width: 100%;
  /* border: 1px solid rgb(190, 22, 22); */
}

.main {
  width: 100%;
  max-height: 100%;
  flex-grow: 1;
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
  z-index: -100;
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
</style>
