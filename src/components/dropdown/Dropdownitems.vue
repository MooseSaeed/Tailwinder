<template>
  <slot>{{ category }}</slot>
</template>

<script>
export default {
  name: "Dropdownitems",
  props: ["category"],
};
</script>

<style></style>
