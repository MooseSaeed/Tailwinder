import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../components/main/Homepage.vue";
import Authpage from "../components/main/Authpage.vue";
import Components from "../components/main/Components.vue";
import Tools from "../components/main/Tools.vue";
import Profile from "../components/main/Profile.vue";
import Addcomponent from "../components/main/Addcomponent.vue";
import Componentview from "../components/main/Componentview.vue";

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
    path: "/components",
    name: "Components",
    component: Components,
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
    path: "/addcomponent",
    name: "Addcomponent",
    component: Addcomponent,
  },
  {
    path: "/components/:colname/:id",
    name: "Componentview",
    component: Componentview,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
