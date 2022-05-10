<template>
  <section class="mt-28 mx-auto text-center min-h-screen">
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
        Add to Tailwinder Academy
      </h1>
      <h2 class="mt-5 text-center dark:text-gray-200">
        Thank you in advance for your contribution ❤️
      </h2>
    </div>

    <form @submit="createDocument">
      <div class="flex flex-col justify-center items-center gap-5">
        <div class="mx-auto w-full">
          <div
            class="relative px-5 py-10 bg-blue-50 dark:bg-gray-700/50 overflow-hidden shadow-md rounded-xl h-full flex flex-col items-center justify-center"
          >
            <input
              placeholder="Video ID"
              v-model="YTvideoId"
              id="youtubeId"
              type="text"
              class="rounded-xl py-2 px-5"
            />
            <Infobtn class="max-w-fit mt-10 cursor-pointer"
              >Check Video</Infobtn
            >
          </div>
        </div>

        <div class="bg-blue-50/20 w-full shadow-lg rounded-xl px-5">
          <div class="relative z-0 w-full mb-6 group mt-5">
            <input
              type="text"
              name="video_name"
              id="video_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Name your component."
              v-model="name"
              required
            />
            <label
              for="component_name"
              class="peer-focus:font-medium -top-3 left-0 peer-focus:right-auto peer-focus:top-3 right-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Video Name</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="video_description"
              name="video_description"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Write max 155 letters description for your component."
              v-model="description"
              required
            />
            <label
              for="component_description"
              class="peer-focus:font-medium -top-3 left-0 peer-focus:right-auto peer-focus:top-3 right-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Video Description</label
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
import Infobtn from "../buttons/Infobtn.vue";
import Imagesupload from "../Imagesupload.vue";
import Flashmessage from "../Flashmessage.vue";

export default {
  components: { Imagesupload, Primarybtn, Infobtn, Flashmessage },
  name: "Buttontool",
  data() {
    return {
      store,
      inputNumberErr: false,
      response: false,
      path: null,
      validated: false,
      errors: "",
      success: "",

      owner: "",
      ownerId: "",
      name: "",
      description: "",
      id: "",
      YTvideoId: "",
    };
  },
  methods: {
    //Immediate selected images display
    //This function is accessed from child component

    /*     async displayFiles() {
      const input = document.querySelector("#imagesPath");

      if (input.files.length <= 3) {
        this.inputNumberErr = false;
        this.path = [];
        for (const file of input.files) {
          this.path.push(URL.createObjectURL(file));
        }
      } else {
        this.inputNumberErr = "Please select maximum 3 files";
      }
    }, */

    formValidation() {
      this.errors = [];
      //Images Validation

      if (!this.YTvideoId) {
        this.errors.push("Please Add Youtube Video ID");
        return false;
      }
      if (!this.name) {
        this.errors.push("Please Write Name for your Video");
        return false;
      }
      if (this.name.length >= 36) {
        this.errors.push("Video name maximum chars is 36");
        return false;
      }
      var lettersValidation = /^[0-9a-zA-Z_ -.]+$/;
      if (!this.name.match(lettersValidation)) {
        this.errors.push(
          "Only numbers, letters, underscore, dashes and spaces are accepted in video name"
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
        //Making ComponentId value equals to component name with some restrictions
        let getName = document.querySelector("#video_name").value;
        getName = getName.replace(/\s+/g, "-").toLowerCase();
        this.id = getName;

        //Creating the component document
        await appwrite.database.createDocument("tailwinderAcademy", this.id, {
          owner: store.userprofile.name,
          ownerId: store.userprofile.$id,
          name: this.name,
          description: this.description,
          id: this.id,
          YTvideoId: this.YTvideoId,
        });
        this.success = "Please wait, you will be directed to your video";
        /* this.routeRedirect(); */
      }
    },
    async routeRedirect() {
      setTimeout(() => {
        this.$router.push({
          name: "Componentview",
          params: { colname: this.collectionId, id: this.componentId },
        });
      }, 3000);
    },
  },
};
</script>

<style></style>
