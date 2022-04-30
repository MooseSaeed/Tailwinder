<template>
  <main>
    <Navbar />
    <div class="items-center max-w-7xl px-10 mx-auto">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {},
};
</script>

<style>
html {
  scroll-behavior: smooth;
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
</style>
