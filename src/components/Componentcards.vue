<template>
  <article
    class="hover:bg-blue-100 focus:ring-4 relative text-black dark:text-white transition-colors py-6 px-5 flex flex-col justify-between duration-300 border border-gray-200 rounded-xl"
  >
    <div class="z-10">
      <img
        src="../assets/images/pic-sample-2.jpg"
        alt="thumbnail"
        class="rounded-xl"
      />
    </div>

    <header class="mt-4 z-10">
      <span
        class="text-white text-xs font-semibold bg-blue-500 px-3 py-1 rounded-xl"
        >{{ collectionName }}</span
      >
      <div class="mt-4">
        <router-link :to="buttonUrl">
          <h1 class="text-3xl font-bold">{{ buttonName }}</h1>
        </router-link>
      </div>
    </header>

    <div class="text-sm mt-8 z-10">
      <p>{{ description }}</p>
    </div>

    <footer
      class="z-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-center mt-8"
    >
      <div class="flex justify-center items-center gap-2 group">
        <router-link :to="userAccUrl">
          <img
            src="../assets/images/test.jpg"
            class="rounded-full h-12 w-12 border-black border-2 transition-transform group-hover:scale-110 z-50"
            alt=""
          />
        </router-link>
        <router-link :to="userAccUrl">
          <h4 class="font-semibold">{{ owner }}</h4>
        </router-link>
      </div>

      <router-link :to="buttonUrl">
        <Infobtn> Have a 👀 </Infobtn>
      </router-link>
    </footer>
  </article>
</template>

<script>
import Infobtn from "./buttons/Infobtn.vue";

export default {
  props: [
    "collectionName",
    "buttonId",
    "buttonName",
    "owner",
    "ownerId",
    "description",
  ],
  data() {
    return {
      userAccUrl: "/users/" + this.ownerId,
      buttonUrl: "/community/buttons/" + this.buttonId,
    };
  },
  components: {
    Infobtn,
  },
};
</script>
Secondarybtn

<style scoped>
.background-animate:hover {
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
