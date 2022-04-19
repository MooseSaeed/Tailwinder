<template>
  <div class="relative group w-fit inline-block">
    <span
      class="absolute inset-0 border-2 border-white border-dashed rounded-xl group-hover:translate-x-0.5 delay-150 duration-300 group-hover:translate-y-0.5"
    ></span>

    <div
      class="relative flex items-end h-full transition-transform transform border-2 rounded-xl border-white group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-gradient-to-r from-green-400 to-blue-500"
    >
      <div class="py-2.5 px-7 transition-opacity group-hover:relative">
        <h2 class="text-md font-semibold text-black group-hover:text-white">
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
