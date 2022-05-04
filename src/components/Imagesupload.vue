<template>
  <div
    class="bg-gradient-to-r transition-all from-green-500 via-violet-500 to-blue-500 shadow-md rounded-xl p-1"
  >
    <div
      class="relative bg-blue-50 overflow-hidden shadow-md rounded-xl h-full flex items-center justify-center"
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
        <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
          <div class="md:flex">
            <div class="w-full p-3">
              <div
                class="relative h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center"
              >
                <div class="absolute">
                  <div class="flex flex-col items-center">
                    <i>
                      <img
                        src="../assets/images/upload-icon.png"
                        alt="upload-icon"
                        class="h-28"
                      />
                    </i>
                    <span class="block text-gray-400 text-xs sm:text-sm"
                      >Click here to attach your files (Max 3)</span
                    >
                    <span class="block text-gray-400 text-xs sm:text-sm"
                      >Accepted Formats: JPG - PNG - GIF</span
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
                  required
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
</template>

<script>
export default {
  props: ["path", "inputNumberErr"],
  methods: {
    displayFiles() {
      this.$parent.displayFiles();
    },
  },
};
</script>

<style></style>
