<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    <div class="flex flex-col justify-center items-center gap-5">
      <div class="mx-auto w-full">
        <Imagesupload :path="this.path" :inputNumberErr="this.inputNumberErr" />
      </div>
      <div class="bg-blue-50/20 w-full shadow-lg rounded-xl">
        <form>
          <div class="relative z-0 w-full mb-6 group">
            <select
              name="category"
              id="category"
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

          <button
            type="submit"
            class="text-white mb-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
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
        this.inputNumberErr = "Please select maximum 3 files";
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
