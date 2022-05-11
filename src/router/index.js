import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../components/main/Homepage.vue";
import Authpage from "../components/main/Authpage.vue";
import Components from "../components/main/Components.vue";
import Tools from "../components/main/Tools.vue";
import Profile from "../components/main/Profile.vue";
import Addcomponent from "../components/main/Addcomponent.vue";
import Componentview from "../components/main/Componentview.vue";
import Academy from "../components/main/Academy.vue";
import Addacademy from "../components/main/Addacademy.vue";
import Videoview from "../components/main/Videoview.vue";
import Community from "../components/main/Community.vue";
import Addthread from "../components/main/Addthread.vue";
import Threadview from "../components/main/Threadview.vue";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
    meta: {},
  },
  {
    path: "/auth",
    name: "Authpage",
    component: Authpage,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/components",
    name: "Components",
    component: Components,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/users/:id",
    name: "UserProfile",
    component: Profile,
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/tools",
    name: "Tools",
    component: Tools,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/addcomponent",
    name: "Addcomponent",
    component: Addcomponent,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/components/:colname/:id",
    name: "Componentview",
    component: Componentview,
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/academy",
    name: "Academy",
    component: Academy,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/academy/:videoId",
    name: "Videoview",
    component: Videoview,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/addvideo",
    name: "Addacademy",
    component: Addacademy,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/community",
    name: "Community",
    component: Community,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/addthread",
    name: "Addthread",
    component: Addthread,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
  {
    path: "/community/:threadId",
    name: "Threadview",
    component: Threadview,
    meta: {
      enterClass: "animate__animated animate__fadeIn animate__faster",
      leaveClass: "animate__animated animate__fadeOut animate__faster",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    //In case i need a delay for transition to complete
    /*     return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    }) */

    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
