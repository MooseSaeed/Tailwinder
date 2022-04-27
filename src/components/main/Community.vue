<template>
  <section class="min-h-screen mt-28">
    <div
      class="relative bg-gradient-to-r from-gray-900 via-violet-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 h-2 rounded-full mb-8"
    >
      <span
        class="absolute text-2xl font-semibold -top-4 left-5 rounded-full bg-gradient-to-r from-gray-900 via-violet-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 px-3 py-1 text-white"
        >Buttons</span
      >
    </div>

    <div class="lg:grid lg:grid-cols-3 gap-5">
      <div v-for="document in documents" :key="document.$id">
        <Componentcards
          :collectionName="document.$collection"
          :buttonId="document.$id"
          :buttonName="document.buttonName"
          :owner="document.owner"
          :ownerId="document.ownerId"
          :description="document.description"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Componentcards from "../Componentcards.vue";
import { appwrite } from "../../utils";
export default {
  components: {
    Componentcards,
  },
  data() {
    return {
      documents: null,
    };
  },
  mounted() {
    this.getAllDocuments();
  },
  methods: {
    getAllDocuments() {
      let promise = appwrite.database.listDocuments("Buttons");
      promise.then((response) => {
        this.documents = response.documents;
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
