<template>
  <section class="mx-10 mt-20 relative min-h-screen">
    <div class="flex gap-5 mt-5">
      <aside
        class="px-4 py-16 mx-auto sm:px-6 lg:px-8 basis-4/5 space-y-4 rounded-lg shadow-2xl bg-none"
      >
        <div>
          <input
            class="bg-gray-200 w-full border-black border"
            type="text"
            v-model="collectionId"
            name="collectionId"
            id="collectionId"
          />
        </div>
        <div>
          <input
            class="bg-gray-200 w-full border-black border"
            type="text"
            v-model="documentId"
            name="documentId"
            id="documentId"
          />
        </div>
        <div>
          <input
            class="bg-gray-200 w-full border-black border"
            type="text"
            v-model="buttonData"
            name="buttonData"
            id="buttonData"
          />
        </div>
        <button @click="createDocument">save to user</button>
      </aside>
      <main class="bg-blue-500 h-80 basis-full"></main>
    </div>
  </section>
</template>

<script>
import { appwrite } from "../../utils";
export default {
  name: "Buttontool",
  data() {
    return {
      response: false,
      collectionId: null,
      documentId: null,
      buttonData: { data: "hi" },
    };
  },
  methods: {
    createDocument() {
      let promise = appwrite.database.createDocument(
        this.collectionId,
        this.documentId,
        {
          buttonName: "My cool button",
          owner: "this owner",
          ownerId: "this owner Id",
          buttonCode: "<h1 class='text-red-500'>hello world</h1>",
        }
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
