<template>
  <main>
    <Navbar
      :class="
        (scrollingUp
          ? 'animate__animated animate__fadeInDown '
          : 'animate__animated animate__fadeOutUp ',
        scrollingDown
          ? 'animate__animated animate__fadeOutUp '
          : 'animate__animated animate__fadeInDown ')
      "
    />
    <div class="items-center max-w-7xl px-10 mx-auto min-h-screen">
      <router-view v-slot="{ Component, route }">
        <transition
          :enter-active-class="route.meta.enterClass"
          :leave-active-class="route.meta.leaveClass"
          mode="out-in"
        >
          <div :key="route.name">
            <Component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
    <Footer />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      lastScrollTop: 0,
      scrollingDown: false,
      scrollingUp: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function (e) {
      let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > this.lastScrollTop) {
        this.scrollingDown = true;
        this.scrollingUp = false;
      } else {
        this.scrollingDown = false;
        this.scrollingUp = true;
      }
      this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

.bgBright {
  background-color: rgb(255, 255, 255);
  background-image: radial-gradient(
      at 0% 0%,
      rgb(209, 229, 255) 0,
      transparent 30%
    ),
    radial-gradient(at 2% 28%, rgb(220, 252, 231) 0, transparent 17%),
    radial-gradient(at 99% 69%, rgb(209, 250, 229) 0, transparent 11%),
    radial-gradient(at 100% 81%, rgb(219, 234, 254) 0, transparent 21%),
    radial-gradient(at 29% 0%, rgb(254, 252, 232) 0, transparent 15%),
    radial-gradient(at 100% 54%, rgb(255, 228, 230) 0, transparent 15%);
}
.background-animate {
  background-size: 400%;
  -webkit-animation: gradColor 3s ease infinite;
  -moz-animation: gradColor 3s ease infinite;
  animation: gradColor 3s ease infinite;
}

@keyframes gradColor {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
.ripple-loader {
  position: relative;
  width: 64px;
  height: 64px;
}

.ripple-loader div {
  position: absolute;
  border: 4px solid #454ade;
  border-radius: 50%;
  animation: ripple-loader 1s ease-out infinite;
}

.ripple-loader div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes ripple-loader {
  0% {
    top: 32px;
    left: 32px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    opacity: 0;
  }
}
</style>
