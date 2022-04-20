<template>
  <main
    class="flex md:flex-row flex-col justify-between items-center h-screen px-10 md:px-16 pt-16 gap-10"
  >
    <section class="basis-full order-2 md:-order-none p-2">
      <header class="py-2 overflow-hidden">
        <h1
          class="dark:text-white flex text-black font-bold text-3xl leading-relaxed animate__animated animate__bounceInUp"
        >
          <div>Open source tool for</div>

          <span class="inline"> <Changingname /> </span>
          <div>tailwinders.</div>
        </h1>
        <p
          class="text-lg dark:text-white text-black animate__animated animate__bounceInUp animate__slow"
        >
          Create the best button design patterns for your website. Sign up to be
          able to save your favourite patterns in your profile or publish you
          creative patterns to the word.
        </p>
      </header>
      <footer>
        <div class="flex items-center mt-5 max-w-sm">
          <router-link
            to="#"
            class="animate__animated animate__bounceInUp animate__delay-1s"
          >
            <Primarybtn> Tailwinder Tool </Primarybtn>
          </router-link>

          <router-link
            class="ml-3 animate__animated animate__bounceInUp animate__slow animate__delay-1s"
            to="#"
          >
            <Secondarybtn> Explore Community </Secondarybtn>
          </router-link>
        </div>
      </footer>
    </section>
    <div
      class="bg-gray-500 w-72 h-72 basis-4/5 order-1 md:-order-none mt-16 md:mt-0"
    ></div>
  </main>
</template>

<script>
import Primarybtn from "../buttons/Primarybtn.vue";
import Secondarybtn from "../buttons/Secondarybtn.vue";
import Changingname from "../Changingname.vue";
export default {
  name: "Homepage",
  components: {
    Primarybtn,
    Secondarybtn,
    Changingname,
  },
};
</script>

<style>
body {
  background-color: rgb(255, 255, 255);
  background-image: radial-gradient(
      at 0% 0%,
      rgb(191, 219, 254) 0,
      transparent 30%
    ),
    radial-gradient(at 2% 28%, rgb(220, 252, 231) 0, transparent 17%),
    radial-gradient(at 99% 69%, rgb(209, 250, 229) 0, transparent 11%),
    radial-gradient(at 100% 81%, rgb(219, 234, 254) 0, transparent 21%),
    radial-gradient(at 29% 0%, rgb(254, 252, 232) 0, transparent 15%),
    radial-gradient(at 100% 54%, rgb(255, 228, 230) 0, transparent 15%);
}
</style>
