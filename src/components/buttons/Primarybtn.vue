<template>
  <div class="relative group w-fit inline-block">
    <span
      class="absolute inset-0 border-2 border-black border-dashed rounded-xl"
    ></span>

    <div
      class="relative flex items-end h-full transition-transform transform bg-white border-2 rounded-xl border-black group-hover:-translate-x-2 group-hover:-translate-y-2"
    >
      <div class="py-2.5 px-7 transition-opacity group-hover:relative">
        <h2 class="text-md font-semibold">
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
