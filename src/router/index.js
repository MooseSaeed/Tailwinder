import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../components/main/Homepage.vue";
import Authpage from "../components/main/Authpage.vue";
import Community from "../components/main/Community.vue";
import Tools from "../components/main/Tools.vue";
import Profile from "../components/main/Profile.vue";
import Buttontool from "../components/tailwinderTools/Buttontool.vue";
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
    path: "/community",
    name: "Community",
    component: Community,
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
  {
    path: "/community/:colname/:id",
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
