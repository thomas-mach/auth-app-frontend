import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import socketPlugin from "./plugins/socket";
import { FontAwesomeIcon } from "./plugins/icons";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/700.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(socketPlugin);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
