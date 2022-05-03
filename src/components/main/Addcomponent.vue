<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    <div class="flex flex-col justify-center items-center gap-5">
      <div class="mx-auto w-full">
        <Imagesupload :path="this.path" :inputNumberErr="this.inputNumberErr" />
        <button @click="bucketTesting">HELLLOOOOOOOOO</button>
      </div>
      <div class="bg-blue-50/20 w-full shadow-lg rounded-xl">
        <form>
          <div class="relative z-0 w-full mb-6 group">
            <select
              name="component_category"
              id="component_category"
              class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
            >
              <option selected>Click to select category</option>
              <option value="buttons">Buttons</option>
            </select>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="component_name"
              id="component_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Name your component."
              required
            />
            <label
              for="component_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              required
            />
            <label
              for="component_description"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              required
            ></textarea>
            <label
              for="component_code"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Component Code</label
            >
          </div>

          <Primarybtn
            @click="createDocument"
            class="w-fit mx-auto mb-4 cursor-pointer"
            >Submit</Primarybtn
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from "../../store.js";
import { appwrite } from "../../utils";
import Primarybtn from "../buttons/Primarybtn.vue";
import Imagesupload from "../Imagesupload.vue";

import { createBucket } from "../../services/bucketsService";

export default {
  components: { Imagesupload, Primarybtn },
  name: "Buttontool",
  data() {
    return {
      store,
      inputNumberErr: false,
      response: false,
      path: null,

      collectionId: false,
      componentName: false,
      componentId: null,
      componentDescription: null,
      componentCode: null,
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
        this.inputNumberErr = "Please select maximum 3 files";
      }
    },

    bucketTesting() {
      const bucket_id = "first_id";
      const bucket_name = "first bucket name";

      createBucket(bucket_id, bucket_name).then((response) => {
        console.log(response);
      });
    },

    uploadImages() {
      const promise = appwrite.storage.createFile(
        "componentimages",
        "unique()",
        document.querySelector("#imagesPath").files[0]
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
    getPreview() {
      let result = appwrite.storage.getFilePreview(
        "componentimages",
        "626f67c98c704bfbbd56"
      );
      console.log(result);
    },
    createDocument() {
      this.collectionId = document.querySelector("#component_category").value;
      this.componentName = document.querySelector("#component_name").value;

      let getName = document.querySelector("#component_name").value;
      getName = getName.replace(/\s+/g, "-").toLowerCase();
      this.componentId = getName;

      this.componentDescription = document.querySelector(
        "#component_description"
      ).value;

      this.componentCode = document.querySelector("#component_code").value;

      let promise = appwrite.database.createDocument(
        this.collectionId,
        this.componentId,
        {
          collectionName: this.collectionId,
          buttonId: this.componentId,
          buttonName: this.componentName,
          owner: store.userprofile.name,
          ownerId: store.userprofile.$id,
          buttonCode: this.componentCode,
          description: this.componentDescription,
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
