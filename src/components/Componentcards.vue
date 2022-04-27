<template>
  <article
    class="bg-blue-300 focus:ring-4 relative text-white dark:text-black dark:hover:bg-blue-50 transition-colors py-6 px-5 flex flex-col justify-between duration-300 border border-gray-200 rounded-xl"
  >
    <div class="z-10">
      <img
        src="../assets/images/pic-sample-2.jpg"
        alt="thumbnail"
        class="rounded-xl"
      />
    </div>

    <header class="mt-4 z-10">
      <div class="mt-4">
        <a href="#">
          <h1 class="text-3xl font-bold">{{ buttonName }}</h1>
        </a>

        <div class="mt-4 text-gray-400 text-xs items-center">
          <div>collection name: {{ collectionName }}</div>
          <div>Button ID: {{ buttonId }}</div>
          <div>Button Owner: {{ owner }}</div>
          <div>Owner ID: {{ ownerId }}</div>
        </div>
      </div>
    </header>

    <div class="text-sm mt-8 z-10">
      <p>some excerpt</p>
    </div>

    <footer
      class="z-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-center mt-8"
    >
      <div></div>

      <a href="#" class="bg-gray-500">Read More </a>
    </footer>
  </article>
</template>

<script>
export default {
  props: ["collectionName", "buttonId", "buttonName", "owner", "ownerId"],
};
</script>

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
