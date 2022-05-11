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
          Tailwinder Academy
        </h1>
        <h2 class="mt-5 text-center dark:text-gray-200">
          Add new knowledge to your awesome skill set and become an expert.
        </h2>
        <router-link class="mt-7 self-center text-center" to="/addvideo">
          <Primarybtn>Add Video to The Academy</Primarybtn>
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
              <Academycard
                :id="document.id"
                :YTvideoId="document.YTvideoId"
                :description="document.description"
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
import Academycard from "../Academycard.vue";
import Primarybtn from "../buttons/Primarybtn.vue";
import { appwrite } from "../../utils";
export default {
  components: {
    Academycard,
    Primarybtn,
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
    getAllDocuments() {
      let promise = appwrite.database.listDocuments("tailwinderAcademy");

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
