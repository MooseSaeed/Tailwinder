<template>
  <section>
    <div
      class="relative bg-gradient-to-r max-w-xl dark:bg-none from-green-500 via-violet-500 to-blue-700 background-animate shadow-md rounded-xl h-max p-0.5"
    >
      <div
        class="text-black flex flex-col dark:shadow-md dark:bg-gray-700/50 dark:backdrop-blur-md dark:text-white bg-blue-50 bg-option7 p-6 rounded-xl"
      >
        <header class="items-center flex">
          <img
            :src="profilePic"
            class="rounded-full h-12 w-12 mr-2"
            alt="User Avatar"
          />
          <div>
            <h5
              class="font-semibold hover:text-blue-500 text-left text-sm sm:text-base dark:text-gray-300 dark:hover:text-white"
            >
              <router-link
                :to="{
                  name: 'UserProfile',
                  params: { id: commentOwnerId },
                }"
                >{{ commentOwner }}</router-link
              >
            </h5>
            <p class="block text-gray-500 text-xs">
              {{ dateAndTime }}
            </p>
          </div>
        </header>

        <div
          class="rounded-xl w-full text-sm outline-none border-none text-left mt-3"
        >
          <p>
            {{ commentContext }}
          </p>
        </div>
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
import { appwrite } from "../utils";
import { getFiles } from "../services/bucketsService";

export default {
  data() {
    return {
      profilePic: "",
    };
  },
  props: [
    "commentOwner",
    "commentOwnerId",
    "commentContext",
    "commentId",
    "dateAndTime",
  ],
  mounted() {
    this.getLoggedInProfilePic();
  },
  methods: {
    async getLoggedInProfilePic() {
      await getFiles(this.commentOwnerId).then((response) => {
        let fileId = response.files[0].$id;
        let result = appwrite.storage.getFilePreview(
          this.commentOwnerId,
          fileId
        );
        this.profilePic = result.href;
      });
    },
  },
};
</script>

<style></style>
