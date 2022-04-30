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
      @click="closeFlash"
      v-show="showFlash"
      class="max-w-sm z-50 fixed bottom-3 right-3 rounded-xl py-2 px-4 font-semibold text-sm text-white"
    >
      <p><slot /></p>
    </div>
  </transition>
</template>

<script>
import { ref } from "@vue/runtime-core";
export default {
  name: "Flashmessage",
  setup() {
    const showFlash = ref(true);

    const hideFlash = setTimeout(() => {
      showFlash.value = false;
    }, 8000);

    const closeFlash = () => {
      showFlash.value = false;
    };

    return {
      showFlash,
      hideFlash,
      closeFlash,
    };
  },
};
</script>

<style></style>
