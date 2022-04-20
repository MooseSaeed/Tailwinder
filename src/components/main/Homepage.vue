<template>
  <main
    class="flex md:flex-row flex-col justify-between items-center h-screen px-10 md:px-16 pt-16 gap-10"
  >
    <header class="basis-full order-2 md:-order-none">
      <h1 class="text-white font-bold text-3xl leading-relaxed">
        An open source tool for creative tailwinders.
      </h1>
      <p class="text-white text-lg">
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
  background: radial-gradient(
    at right center,
    rgb(56, 189, 248),
    rgb(49, 46, 129)
  );
}
main .test {
  background: radial-gradient(
    at right center,
    rgb(25, 91, 119),
    rgb(30, 28, 78)
  );
}

main .test {
  background: linear-gradient(to right, rgb(96, 165, 250), rgb(52, 211, 153));
}
</style>
