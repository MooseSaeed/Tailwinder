<template>
  <article
    class="hover:bg-blue-100 dark:hover:bg-gray-900 h-full relative text-black dark:text-white w-full transition-colors py-6 px-5 flex flex-col justify-between duration-300 border dark:border-0 border-gray-200 shadow-md dark:shadow-gray-900 rounded-xl flex-1"
  >
    <div class="z-10 h-72">
      <img :src="thumbnail" alt="thumbnail" class="cardThumbnail rounded-xl" />
    </div>
    <header class="mt-4 z-10">
      <span
        class="text-white text-xs font-semibold bg-gradient-to-r from-gray-900 via-violet-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 px-3 py-1 rounded-xl"
        >{{ collectionName }}</span
      >
      <div class="mt-4">
        <router-link :to="buttonUrl">
          <h1 class="text-xl font-bold">{{ name }}</h1>
        </router-link>
      </div>
    </header>
    <footer
      class="z-10 flex flex-col sm:flex-row gap-4 justify-between items-center mt-8"
    >
      <div class="flex justify-center items-center gap-2 group">
        <router-link :to="userAccUrl">
          <img
            :src="profilePic"
            class="rounded-full h-12 w-12 border-black border-2 transition-transform group-hover:scale-110 z-50"
            alt=""
          />
        </router-link>
        <router-link :to="userAccUrl">
          <h4 class="font-semibold">{{ owner }}</h4>
        </router-link>
      </div>
      <router-link
        :to="{
          name: 'Componentview',
          params: { colname: collectionName, id: buttonId },
        }"
      >
        <Infobtn> Discover </Infobtn>
      </router-link>
    </footer>
  </article>
</template>

<script>
import Infobtn from "./buttons/Infobtn.vue";
import { getFiles } from "../services/bucketsService";
import { appwrite } from "../utils";

export default {
  props: ["collectionName", "buttonId", "name", "owner", "ownerId"],
  data() {
    return {
      userAccUrl: "/users/" + this.ownerId,
      buttonUrl: "/components/" + this.collectionName + "/" + this.buttonId,
      thumbnails: [],
      thumbnail: "",
      profilePic: "",
    };
  },
  components: {
    Infobtn,
  },
  mounted() {
    this.getThumbnail();
    this.getProfilePic();
  },
  methods: {
    getThumbnail() {
      //Using Node SDK to fetch all files (images) in the desired bucket
      getFiles(this.buttonId).then((response) => {
        //loop over files
        for (const file of response.files) {
          // Get file preview for each file using web sdk
          let result = appwrite.storage.getFilePreview(this.buttonId, file.$id);
          this.thumbnails.push(result);
        }
        this.thumbnail = this.thumbnails[0].href;
      });
    },
    getProfilePic() {
      //Using Node SDK to fetch all files (images) in the desired bucket
      getFiles(this.ownerId).then(
        (response) => {
          if (response.code == 404) {
            this.profilePic = null;
            this.getAvatar();
          } else {
            for (const file of response.files) {
              let result = appwrite.storage.getFilePreview(
                this.ownerId,
                file.$id
              );
              this.profilePic = result.href;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getAvatar() {
      let result = appwrite.avatars.getInitials(this.owner);

      this.profilePic = result.href;
    },
  },
};
</script>
Secondarybtn

<style scoped>
.cardThumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
