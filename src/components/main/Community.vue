<template>
  <section class="min-h-screen mt-28">
    <!-- Loop over all categories and spit out category name -->
    <div v-for="category in categories" :key="category.$id">
      <!-- show category only if it has any documents inside -->
      <div
        v-if="documents[categories.indexOf(category)] > 0"
        class="relative bg-gradient-to-r from-gray-900 via-violet-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 h-2 rounded-full mb-8"
      >
        <span
          class="absolute text-2xl font-semibold -top-4 left-5 rounded-full bg-gradient-to-r from-gray-900 via-violet-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 px-3 py-1 text-white"
          >{{ category.name }}</span
        >
      </div>

      <div class="lg:grid lg:grid-cols-3 gap-5">
        <!-- Loop over all documents and get me only the ones related to this specific category -->
        <div
          v-for="document in documents[categories.indexOf(category)]"
          :key="document.$id"
          class="mb-5"
        >
          <div v-if="document.$collection == category.$id">
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
      </div>
    </div>
  </section>
</template>

<script>
import Componentcards from "../Componentcards.vue";
import { appwrite } from "../../utils";
import { getAllCollections } from "../../services/collectionService";
export default {
  components: {
    Componentcards,
  },
  data() {
    return {
      documents: [],
      categories: [],
    };
  },
  mounted() {
    this.getListOfCollections();
  },
  methods: {
    getListOfCollections() {
      // get me all Collections using appwrite node SDK
      getAllCollections().then((response) => {
        // Loop over them and exclude "comments" collection
        for (const category of response.collections) {
          if (category.name !== "Comments") {
            // Add all the categories to this categories array
            this.categories.push(category);
            // Get me all documents related to this category
            this.getAllDocuments(category.$id);
          }
        }
      });
    },
    getAllDocuments(collectionId) {
      let promise = appwrite.database.listDocuments(collectionId);
      promise.then((response) => {
        // Push all documents to this documents array
        this.documents.push(response.documents);
      });
    },
  },
};
</script>

<style scoped></style>
