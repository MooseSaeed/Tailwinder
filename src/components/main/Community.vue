<template>
  <section class="mt-20 min-h-screen mx-10">
    <div class="lg:grid lg:grid-cols-3 gap-5">
      <div v-for="document in documents" :key="document.$id">
        <Componentcards
          :collectionName="document.$collection"
          :buttonId="document.$id"
          :buttonName="document.buttonName"
          :owner="document.owner"
          :ownerId="document.ownerId"
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
      let response = "";
      promise.then((response) => {
        this.documents = response.documents;
        console.log(this.documents);
      });

      this.owner = response;
    },
  },
};
</script>

<style></style>
