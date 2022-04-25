import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../components/main/Homepage.vue";
import Authpage from "../components/main/Authpage.vue";
import Tools from "../components/main/Tools.vue";
import Profile from "../components/main/Profile.vue";
import Buttontool from "../components/tailwinderTools/Buttontool.vue";

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
    path: "/users/:id",
    name: "UserProfile",
    component: Profile,
    props: true,
  },
  {
    path: "/tools",
    name: "Tools",
    component: Tools,
  },
  {
    path: "/tools/buttontool",
    name: "Buttontool",
    component: Buttontool,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
