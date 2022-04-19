import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../components/main/Homepage.vue";
import Signup from "../components/auth/Signup.vue";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
