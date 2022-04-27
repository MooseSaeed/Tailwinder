<template>
  <Navbar />
  <div class="items-center max-w-7xl px-10 mx-auto">
    <router-view></router-view>
  </div>
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
[v-cloak] {
  display: inline-block;
  width: 80px;
  height: 80px;
}

[v-cloak]:after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: spinner 1.2s linear infinite;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

[v-cloak] > * {
  display: none;
}
</style>
