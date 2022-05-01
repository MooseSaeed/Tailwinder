<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    <div class="flex gap-5">
      <Imagesupload :path="this.path" :inputNumberErr="this.inputNumberErr" />
      <div class="basis-full bg-blue-500 h-96"></div>
    </div>
  </section>
</template>

<script>
import { appwrite } from "../../utils";
import Imagesupload from "../Imagesupload.vue";
export default {
  components: { Imagesupload },
  name: "Buttontool",
  data() {
    return {
      inputNumberErr: false,
      response: false,
      collectionId: null,
      documentId: null,
      path: null,
    };
  },
  methods: {
    //Image preview on select
    displayFiles() {
      const input = document.querySelector("#imagesPath");

      if (input.files.length <= 3) {
        this.inputNumberErr = false;
        this.path = [];
        for (const file of input.files) {
          this.path.push(URL.createObjectURL(file));
        }
      } else {
        this.inputNumberErr = "Please select maximum of 3 files";
      }
    },
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
