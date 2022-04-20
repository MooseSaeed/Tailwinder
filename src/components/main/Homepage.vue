<template>
  <main
    class="flex md:flex-row flex-col justify-between items-center h-screen px-10 md:px-16 pt-16 gap-10"
  >
    <header class="basis-full order-2 md:-order-none">
      <h1 class="dark:text-white text-black font-bold text-3xl leading-relaxed">
        An open source tool for creative tailwinders.
      </h1>
      <p class="text-lg dark:text-white text-black">
        Create the best button design patterns for your website. Sign up to be
        able to save your favourite patterns in your profile or publish you
        creative patterns to the word.
      </p>
      <div class="flex items-center mt-5 max-w-sm">
        <router-link to="#">
          <Primarybtn> Tailwinder Tool </Primarybtn>
        </router-link>

        <router-link class="ml-3" to="#">
          <Secondarybtn> Explore Community </Secondarybtn>
        </router-link>
      </div>
    </header>
    <div
      class="bg-gray-500 w-72 h-72 basis-4/5 order-1 md:-order-none mt-16 md:mt-0"
    ></div>
  </main>
</template>

<script>
import Primarybtn from "../buttons/Primarybtn.vue";
import Secondarybtn from "../buttons/Secondarybtn.vue";
export default {
  name: "Homepage",
  components: {
    Primarybtn,
    Secondarybtn,
  },
};
</script>

<style scoped>
main {
  background-color: rgb(207, 250, 254);
  background-image: radial-gradient(
      at 67% 51%,
      rgb(255, 241, 242) 0,
      transparent 45%
    ),
    radial-gradient(at 18% 33%, rgb(204, 251, 241) 0, transparent 38%),
    radial-gradient(at 27% 50%, rgb(241, 245, 249) 0, transparent 16%),
    radial-gradient(at 36% 73%, rgb(241, 245, 249) 0, transparent 68%),
    radial-gradient(at 100% 70%, rgb(240, 253, 244) 0, transparent 43%),
    radial-gradient(at 42% 10%, rgb(199, 210, 254) 0, transparent 58%);
}
</style>
