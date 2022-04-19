<template>
  <Navbar />
  <Homepage />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Navbar from "./components/Navbar.vue";
import Homepage from "./components/main/Homepage.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Homepage,
    Navbar,
  },
};
</script>

<style></style>
