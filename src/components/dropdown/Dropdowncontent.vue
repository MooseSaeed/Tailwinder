<template>
  <transition
    :duration="1000"
    enter-active-class="transform transition duration-300 ease-custom"
    enter-class="-translate-y-1/2 scale-y-0 opacity-0"
    enter-to-class="translate-y-0 scale-y-100 opacity-100"
    leave-active-class="transform transition duration-300 ease-custom"
    leave-class="translate-y-0 scale-y-100 opacity-100"
    leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
  >
    <div
      v-show="sharedState"
      class="font-semibold absolute left-0 right-0 z-40 mt-2 w-full rounded-lg bg-gradient-to-r from-green-400 to-blue-500 py-1 px-2"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import { inject, ref } from "vue";
export default {
  name: "Dropdowncontent",

  setup() {
    const sharedState = inject("sharedState");

    return {
      sharedState,
    };
  },
};
</script>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
