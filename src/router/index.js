import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../components/main/Homepage.vue";
import Authpage from "../components/main/Authpage.vue";
import Tools from "../components/main/Tools.vue";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/auth",
    name: "Authpage",
    component: Authpage,
  },
  {
    path: "/tools",
    name: "Tools",
    component: Tools,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
