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
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Tailwinder Tool
          </span>
        </button>
        <Primarybtn> Tailwinder Tool </Primarybtn>
      </div>
    </header>
    <div
      class="bg-gray-500 w-72 h-72 basis-4/5 order-1 md:-order-none mt-16 md:mt-0"
    ></div>
  </main>
</template>

<script>
import Primarybtn from "../buttons/Primarybtn.vue";
export default {
  name: "Homepage",
  components: {
    Primarybtn,
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
