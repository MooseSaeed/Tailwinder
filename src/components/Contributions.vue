<template>
  <div
    class="dark:bg-slate-900/25 backdrop-blur-md dark:text-gray-300 border-gray-300 rounded-xl w-full text-left px-5 py-5"
  >
    <p v-if="!documents">I don't have contributions, yet!</p>

    <div v-if="documents">
      <div v-for="document in documents" :key="document.$id" class="py-2">
        <router-link
          :to="'/components/' + document.$collection + '/' + document.$id"
        >
          <h4
            class="font-semibold inline-block hover:text-blue-500 dark:hover:text-white cursor-pointer"
          >
            {{ document.name }}
          </h4>
        </router-link>
        <p
          class="ml-2 text-white font-semibold inline-block py-1 px-3 text-xs bg-gradient-to-r from-green-400 to-blue-500 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          {{ document.$collection }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllCollections } from "../services/collectionService.js";
import { appwrite } from "../utils";
export default {
  props: ["userId"],
  data() {
    return {
      categories: [],
      documents: [],
    };
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    getCollections() {
      getAllCollections().then((response) => {
        for (const category of response.collections) {
          if (category.name !== "Comments") {
            // Add all the categories to this categories array
            this.categories.push(category);
            // Get me all documents related to this category
          }
        }
        // Now loop over the categories and get their documents
        for (const category of this.categories) {
          this.getAllDocuments(category.$id);
        }
      });
    },
    getAllDocuments(collectionId) {
      let promise = appwrite.database.listDocuments(collectionId);
      promise.then((response) => {
        // Loop over the documents and get me only the ones related to this specific user
        for (const document of response.documents) {
          if (document.ownerId == this.userId) {
            // Push all documents to this documents array
            this.documents.push(document);
          }
        }
      });
    },
  },
};
</script>

<style scoped></style>
