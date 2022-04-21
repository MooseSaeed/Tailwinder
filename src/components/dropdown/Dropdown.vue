<template>
  <div
    class="relative"
    v-click-outside="onClickOutside"
    @click="showCategories"
  >
    <button
      class="flex max-h-52 overflow-auto py-2 pl-3 text-sm font-semibold lg:inline-flex w-32 h-8"
    >
      <div
        class="rounded-full left-3 -top-1.5 absolute h-12 w-12 bg-red-500"
      ></div>
      <svg
        class="absolute"
        :class="
          sharedState
            ? '-rotate-90 transform transition duration-500 ease-in-out'
            : 'rotate-90 transform transition duration-500 ease-in-out'
        "
        style="right: 12px"
        width="22"
        height="22"
        viewBox="0 0 22 22"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            stroke="#000"
            stroke-opacity=".012"
            stroke-width=".5"
            d="M21 1v20.16H.84V1z"
          ></path>
          <path
            fill="#222"
            d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z"
          ></path>
        </g>
      </svg>
    </button>

    <slot />
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
import { ref, provide } from "vue";
export default {
  name: "Dropdown",
  props: ["title"],
  directives: {
    clickOutside: vClickOutside.directive,
  },
  setup() {
    const sharedState = ref(false);

    const showCategories = () => {
      sharedState.value = !sharedState.value;
    };

    const onClickOutside = (event) => {
      sharedState.value = false;
    };

    provide("sharedState", sharedState);

    return {
      sharedState,
      showCategories,
      onClickOutside,
    };
  },
};
</script>

<style></style>
