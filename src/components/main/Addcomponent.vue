<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    <div class="flex gap-5">
      <div
        class="mx-auto basis-full h-96 bg-gradient-to-r from-green-500 via-violet-500 to-blue-500 shadow-md rounded-xl p-1"
      >
        <div
          class="relative bg-blue-50 overflow-hidden shadow-md rounded-xl h-full flex items-center justify-center"
        >
          <div class="relative py-7 px-2">
            <div class="flex-row gap-10 flex justify-center items-center">
              <div v-for="image in path" :key="image.id">
                <img class="max-w-32 max-h-32" :src="image" alt="" />
              </div>
            </div>
            <div
              class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl"
            >
              <div class="md:flex">
                <div class="w-full p-3">
                  <div
                    class="relative h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center"
                  >
                    <div class="absolute">
                      <div class="flex flex-col items-center">
                        <i>
                          <img
                            src="../../assets/images/upload-icon.png"
                            alt="upload-icon"
                            class="h-28"
                          />
                        </i>
                        <span class="block text-gray-400 text-sm"
                          >Click here to attach your files (Max 3)</span
                        >
                        <span class="block text-gray-400 text-sm"
                          >Accepted Formats: JPG, PNG, GIF, MP4</span
                        >
                      </div>
                    </div>
                    <input
                      @change="displayFiles"
                      type="file"
                      id="imagesPath"
                      name="imagesPath"
                      class="h-full w-full opacity-0 cursor-pointer"
                      multiple
                    />
                  </div>
                  <p
                    v-if="inputNumberErr"
                    class="text-red-500 font-xs font-semibold"
                  >
                    {{ inputNumberErr }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="basis-full bg-blue-500 h-96"></div>
    </div>
  </section>
</template>

<script>
import { appwrite } from "../../utils";
export default {
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
    displayFiles() {
      const input = document.querySelector("#imagesPath");

      if (input.files.length <= 3) {
        this.inputNumberErr = false;
        this.path = [];
        for (const file of input.files) {
          this.path.push(URL.createObjectURL(file));
        }
        console.log(this.path);
      } else {
        this.inputNumberErr = "Please select maximum of 3 files";
        console.log(this.inputNumberErr);
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
