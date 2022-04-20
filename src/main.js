import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";
import "./utils.js";
import "animate.css";

createApp(App).use(router).mount("#app");
