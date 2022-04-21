<template>
  <div class="relative group block w-full">
    <span
      class="absolute inset-0 border-2 border-black dark:border-white border-dashed rounded-xl translate-x-0.5 group-hover:translate-x-0 delay-150 duration-300 translate-y-0.5 group-hover:translate-y-0"
    ></span>

    <div
      class="relative flex items-end h-full transition-all transform border-2 rounded-xl border-black dark:border-white -translate-x-1 group-hover:-translate-x-0 -translate-y-1 group-hover:-translate-y-0 bg-gradient-to-r from-green-400/50 to-blue-500/50 group-hover:from-green-400 group-hover:to-blue-500"
    >
      <div class="py-2.5 px-7 transition-opacity group-hover:relative">
        <h2
          class="font-semibold group-hover:text-white dark:group-hover:text-black text-black dark:text-white"
        >
          <slot />
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
