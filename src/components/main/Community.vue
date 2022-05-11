<template>
  <section class="mt-28 min-h-screen dark:text-white">
    <div v-if="isLoading" class="absolute left-2/4 top-2/4">
      <div class="ripple-loader">
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-if="!isLoading">
      <div class="mb-10 flex flex-col">
        <h1 class="text-2xl font-bold text-center dark:text-white sm:text-3xl">
          Tailwinder Community Discussions
        </h1>
        <h2 class="mt-5 text-center dark:text-gray-200">
          Ask a question. Add a tutorial. Show off your knowledge.
        </h2>
        <router-link class="mt-7 self-center text-center" to="/addthread">
          <Primarybtn>Add a Discussion</Primarybtn>
        </router-link>
      </div>

      <section class="text-gray-600 body-font">
        <div class="container px-5 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div
              v-for="document in documents"
              :key="document.$id"
              class="p-4 md:w-1/3"
            >
              <Communitycard
                :collectionName="document.collectionName"
                :threadId="document.id"
                :name="document.name"
                :owner="document.owner"
                :ownerId="document.ownerId"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import Primarybtn from "../buttons/Primarybtn.vue";
import { appwrite } from "../../utils";
import Communitycard from "../Communitycard.vue";
export default {
  components: {
    Primarybtn,
    Communitycard,
  },
  data() {
    return {
      isLoading: false,
      documents: [],
    };
  },
  mounted() {
    this.getAllDocuments();
    this.loadPage();
  },
  methods: {
    // Get me all documents in the community collection
    getAllDocuments() {
      let promise = appwrite.database.listDocuments("discussions");

      promise.then(
        (response) => {
          // Push all documents to this documents array
          for (const document of response.documents) {
            this.documents.push(document);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    loadPage() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style></style>
