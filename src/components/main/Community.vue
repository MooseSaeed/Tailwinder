<template>
  <section class="min-h-screen mt-28 mx-10">
    <div class="relative border border-gray-900/40 mb-10">
      <span class="absolute text-2xl font-semibold -top-5 left-5">Buttons</span>
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

<style></style>
