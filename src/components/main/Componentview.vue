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
    };
  },
  mounted() {
    this.getId();
  },
  methods: {
    getId() {
      this.componentId = this.$route.params.id;
      this.collectionId = this.$route.params.colname;
      let promise = appwrite.database.getDocument(
        this.collectionId,
        this.componentId
      );
      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
    },
  },
};
</script>

<style></style>
