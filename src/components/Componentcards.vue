<template>
  <article
    class="bg-blue-500 post-card text-white dark:text-black dark:hover:bg-blue-50 dark:hover:bg-none transition-colors py-6 px-5 flex flex-col justify-between duration-300 border border-black border-opacity-0 hover:border-opacity-5 rounded-xl"
  >
    <div>
      <img
        src="../assets/images/pic-sample-2.jpg"
        alt="thumbnail"
        class="rounded-xl"
      />
    </div>

    <header class="mt-4">
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

    <div class="text-sm mt-8">
      <p>some excerpt</p>
    </div>

    <footer
      class="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-center mt-8"
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

<style></style>
