<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    <div
      class="bg-gradient-to-r from-green-500 via-violet-500 to-blue-700 background-animate shadow-md rounded-xl h-96 p-1"
    >
      <div class="bg-blue-50 shadow-md rounded-xl h-full"></div>
    </div>
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

      // Getting the document by Collection ID and Component ID
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

<style scoped>
.background-animate {
  background-size: 400%;
  -webkit-animation: gradColor 3s ease infinite;
  -moz-animation: gradColor 3s ease infinite;
  animation: gradColor 3s ease infinite;
}

@keyframes gradColor {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
