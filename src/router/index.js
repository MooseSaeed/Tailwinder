import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
    meta: {
      enterClass: "animate__animated animate__slideInDown",
      leaveClass: "animate__animated animate__slideOutUp",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
