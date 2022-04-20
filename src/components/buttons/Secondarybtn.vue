<template>
  <div class="relative group w-fit inline-block">
    <span
      class="absolute inset-0 border-2 border-white border-dashed rounded-xl translate-x-0.5 group-hover:translate-x-0 delay-150 duration-300 translate-y-0.5 group-hover:translate-y-0"
    ></span>

    <div
      class="relative flex items-end h-full transition-all transform border-2 rounded-xl border-white -translate-x-1 group-hover:-translate-x-0 -translate-y-1 group-hover:-translate-y-0 bg-gradient-to-r from-slate-400/50 to-gray-500/50 group-hover:bg-white"
    >
      <div class="py-2.5 px-7 transition-opacity group-hover:relative">
        <h2 class="text-md font-semibold group-hover:text-black text-white">
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
