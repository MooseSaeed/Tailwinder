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
    };
  },
  mounted() {
    this.getId();
  },
  methods: {
    getId() {
      this.componentId = this.$route.params.id;
      let promise = appwrite.database.getDocument("buttons", this.componentId);
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
