<template>
  <section class="mt-24 mx-auto mb-32 text-center min-h-screen">
    <div v-if="errors.length">
      <Flashmessage v-for="error in errors" :key="error.id" class="bg-red-500">
        <p class="text-left text-sm text-white">
          {{ error }}
        </p>
      </Flashmessage>
    </div>
    <Flashmessage class="bg-blue-500" v-if="success">
      <p class="text-left text-sm text-white">
        {{ success }}
      </p>
    </Flashmessage>

    <div class="mb-10">
      <h1 class="text-2xl font-bold text-center dark:text-white sm:text-3xl">
        Add New Discussion
      </h1>
      <h2 class="mt-5 text-center dark:text-gray-200">
        Thank you in advance for your contribution ❤️
      </h2>
    </div>

    <form @submit="createDocument">
      <div class="flex flex-col justify-center items-center gap-5">
        <div class="mx-auto w-full">
          <div
            class="bg-gradient-to-r dark:bg-none dark:shadow-lg transition-all from-green-500 via-violet-500 to-blue-500 shadow-md rounded-xl p-1"
          >
            <div
              class="relative bg-blue-50 dark:bg-gray-700/50 overflow-hidden shadow-md rounded-xl h-full flex items-center justify-center"
            >
              <div class="relative py-7 px-2">
                <div class="flex-row gap-10 flex justify-center items-center">
                  <div v-for="image in path" :key="image.id">
                    <img
                      class="animate__animated animate__fadeIn max-h-64"
                      :src="image"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl"
                >
                  <div class="md:flex">
                    <div class="w-full p-3">
                      <div
                        class="relative h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 dark:bg-slate-900 flex justify-center items-center"
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
                            <span
                              class="block text-gray-400 dark:text-gray-200 text-xs sm:text-sm"
                              >Click here to attach 1 Image</span
                            >
                            <span
                              class="block text-gray-400 dark:text-gray-200 text-xs sm:text-sm"
                              >Accepted Formats: JPG - PNG - GIF</span
                            >
                          </div>
                        </div>
                        <input
                          @change="displayFiles"
                          type="file"
                          id="threadImagesPath"
                          name="threadImagesPath"
                          class="h-full w-full opacity-0 cursor-pointer"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50/20 w-full shadow-lg rounded-xl p-5">
          <div class="relative z-0 w-full mb-10 group"></div>
          <div class="relative z-0 w-full mb-10 group">
            <input
              type="text"
              name="discussion_name"
              id="discussion_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Name of the discussion."
              v-model="discussionName"
              required
            />
            <label
              for="discussion_name"
              class="peer-focus:font-medium -top-3 left-0 peer-focus:right-auto peer-focus:top-3 right-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Discussion Name</label
            >
          </div>

          <Deepgram class="mx-auto" />

          <div class="relative z-0 w-full mb-10 group">
            <textarea
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="dicussion_content"
              id="dicussion_content"
              cols="30"
              rows="10"
              placeholder="Write your thread here.."
              v-model="discussionContext"
              required
            ></textarea>
            <label
              for="dicussion_content"
              class="peer-focus:font-medium -top-3 left-0 peer-focus:right-auto peer-focus:top-3 right-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Thread</label
            >
          </div>

          <button type="submit">
            <Primarybtn class="w-fit mx-auto mb-4 cursor-pointer"
              >Submit</Primarybtn
            >
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { store } from "../../store.js";
import { appwrite } from "../../utils";
import Primarybtn from "../buttons/Primarybtn.vue";
import Imagesupload from "../Imagesupload.vue";
import Flashmessage from "../Flashmessage.vue";

import { createBucket } from "../../services/bucketsService";

import Deepgram from "../Deepgram.vue";

export default {
  components: { Imagesupload, Primarybtn, Flashmessage, Deepgram },
  name: "Buttontool",
  data() {
    return {
      store,
      response: false,
      path: null,

      collectionId: "discussions",
      discussionName: "",
      threadId: null,
      componentDescription: "",
      discussionContext: "",
      validated: false,
      errors: "",
      success: "",
    };
  },
  methods: {
    //Immediate selected images display
    //This function is accessed from child component (Imagesupload)
    async displayFiles() {
      const input = document.querySelector("#threadImagesPath");

      this.path = [];
      for (const file of input.files) {
        this.path.push(URL.createObjectURL(file));
      }
    },
    async uploadImages() {
      //Create a bucket for this component
      //Make the id and the name matches the component
      const bucket_id = this.threadId;
      const bucket_name = this.discussionName;

      const input = document.querySelector("#threadImagesPath");
      if (input.files.length <= 3) {
        //Once bucket created, proceed with adding images files
        await createBucket(bucket_id, bucket_name).then((response) => {
          //For each selected file, add file to bucket
          let i = 0;
          for (const file of input.files) {
            const promise = appwrite.storage.createFile(
              response.$id,
              this.threadId + ++i,
              file,
              ["role:all"]
            );
            promise.then(
              function (response) {
                console.log(response); // Success
              },
              function (error) {
                console.log(error); // Failure
              }
            );
          }
        });
      }
    },

    formValidation() {
      this.errors = [];
      //discussionName Validation
      if (!this.discussionName) {
        this.errors.push("Please write discussion name");
        return false;
      }
      if (this.discussionName.length >= 36) {
        this.errors.push("discussion name maximum chars is 36");
        return false;
      }
      var lettersValidation = /^[0-9a-zA-Z_ -.]+$/;
      if (!this.discussionName.match(lettersValidation)) {
        this.errors.push(
          "Only numbers, letters, underscore, dashes and spaces are accepted in discussion name"
        );
        return false;
      }
      //ComponentDescription Validation
      if (this.componentDescription.length > 155) {
        this.errors.push(
          "You can insert up to 155 characters in discussion description"
        );
        return false;
      } else {
        return true;
      }
    },

    async createDocument(e) {
      e.preventDefault();

      this.formValidation();

      if (this.formValidation() === true) {
        //Making threadId value equals to component name with some restrictions
        let getName = document.querySelector("#discussion_name").value;
        getName = getName.replace(/\s+/g, "-").toLowerCase();
        this.threadId = getName;

        //Saving images files in a bucket
        this.uploadImages();

        //Creating the component document
        await appwrite.database.createDocument(
          this.collectionId,
          this.threadId,
          {
            collectionName: this.collectionId,
            owner: store.userprofile.name,
            ownerId: store.userprofile.$id,
            id: this.threadId,
            name: this.discussionName,
            context: this.discussionContext,
          }
        );
        this.success = "Please wait, you will be directed to your component";
        this.routeRedirect();
      }
    },
    // Dynamically redirect the page to the new component page
    async routeRedirect() {
      setTimeout(() => {
        this.$router.push({
          name: "Threadview",
          params: { threadId: this.threadId },
        });
      }, 3000);
    },
  },
};
</script>

<style></style>
