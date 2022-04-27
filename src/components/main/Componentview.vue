<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    this is component: {{ componentId }}
  </section>
</template>

<script>
import { appwrite } from "../../utils";
export default {
  data() {
    return {
      componentId: false,
      collectionId: false,
      currentComponent: null,
    };
  },
  mounted() {
    this.getComponentDetails();
  },
  methods: {
    // Getting component details from params and passed to appwrite
    getComponentDetails() {
      this.componentId = this.$route.params.id;
      this.collectionId = this.$route.params.colname;
      let promise = appwrite.database.getDocument(
        this.collectionId,
        this.componentId
      );

      promise.then((response) => {
        this.currentComponent = response;
        console.log(this.currentComponent);
      });
    },
  },
};
</script>

<style></style>
