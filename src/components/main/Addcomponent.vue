<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
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
    <form @submit="createDocument">
      <div class="flex flex-col justify-center items-center gap-5">
        <div class="mx-auto w-full">
          <Imagesupload
            :path="this.path"
            :inputNumberErr="this.inputNumberErr"
          />
        </div>

        <div class="bg-blue-50/20 w-full shadow-lg rounded-xl">
          <div class="relative z-0 w-full mb-6 group">
            <select
              required
              name="component_category"
              id="component_category"
              class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              v-model="collectionId"
            >
              <option selected value="">Click to select category</option>
              <option value="buttons">Buttons</option>
              <option value="cards">Cards</option>
            </select>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="component_name"
              id="component_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Name your component."
              v-model="componentName"
              required
            />
            <label
              for="component_name"
              class="peer-focus:font-medium -top-3 left-0 peer-focus:right-auto peer-focus:top-3 right-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Component Name</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="component_description"
              name="component_description"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Write max 155 letters description for your component."
              v-model="componentDescription"
              required
            />
            <label
              for="component_description"
              class="peer-focus:font-medium -top-3 left-0 peer-focus:right-auto peer-focus:top-3 right-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Component Description</label
            >
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <textarea
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="component_code"
              id="component_code"
              cols="30"
              rows="10"
              placeholder="Paste your component code."
              v-model="componentCode"
              required
            ></textarea>
            <label
              for="component_code"
              class="peer-focus:font-medium -top-3 left-0 peer-focus:right-auto peer-focus:top-3 right-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Component Code</label
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

export default {
  components: { Imagesupload, Primarybtn, Flashmessage },
  name: "Buttontool",
  data() {
    return {
      store,
      inputNumberErr: false,
      response: false,
      path: null,

      collectionId: "",
      componentName: "",
      componentId: null,
      componentDescription: "",
      componentCode: "",
      validated: false,
      errors: "",
      success: "",
    };
  },
  methods: {
    //Immediate selected images display
    //This function is accessed from child component

    async displayFiles() {
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
    },
    async uploadImages() {
      //Create a bucket for this component
      //Make the id and the name matches the component
      const bucket_id = this.componentId;
      const bucket_name = this.componentName;

      const input = document.querySelector("#imagesPath");
      if (input.files.length <= 3) {
        //Once bucket created, proceed with adding images files
        await createBucket(bucket_id, bucket_name).then((response) => {
          //For each selected file, add file to bucket
          let i = 0;
          for (const file of input.files) {
            const promise = appwrite.storage.createFile(
              response.$id,
              this.componentId + ++i,
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
      //Images Validation
      const images = document.querySelector("#imagesPath").files.length;
      if (images <= 0) {
        this.errors.push("Please choose 1 to 3 images");
        return false;
      }
      if (images > 3) {
        this.errors.push("Please select up to 3 images only");
        return false;
      }
      //Collection ID Validation
      if (!this.collectionId) {
        this.errors.push("Please select category");
        return false;
      }
      //ComponentName Validation
      if (!this.componentName) {
        this.errors.push("Please write component name");
        return false;
      }
      if (this.componentName.length >= 36) {
        this.errors.push("Component name maximum chars is 36");
        return false;
      }
      var lettersValidation = /^[0-9a-zA-Z_ -]+$/;
      if (!this.componentName.match(lettersValidation)) {
        this.errors.push(
          "Only numbers, letters, underscore, dashes and spaces are accepted in component name"
        );
        return false;
      }
      //ComponentDescription Validation
      if (this.componentDescription.length > 155) {
        this.errors.push(
          "You can insert up to 155 characters in component description"
        );
        return false;
      }
      if (!this.componentDescription.match(lettersValidation)) {
        this.errors.push(
          "Only numbers, letters, underscore, dashes and spaces are accepted in component description"
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
        let getName = document.querySelector("#component_name").value;
        getName = getName.replace(/\s+/g, "-").toLowerCase();
        this.componentId = getName;

        //Saving images files in a bucket
        this.uploadImages();

        //Creating the component document
        await appwrite.database.createDocument(
          this.collectionId,
          this.componentId,
          {
            collectionName: this.collectionId,
            id: this.componentId,
            name: this.componentName,
            owner: store.userprofile.name,
            ownerId: store.userprofile.$id,
            code: this.componentCode,
            description: this.componentDescription,
          }
        );
        this.success = "Please wait, you will be directed to your component";
        this.routeRedirect();
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
