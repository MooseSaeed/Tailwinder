<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    <Flashmessage class="bg-blue-500" v-if="successMsg">
      {{ successMsg }}
    </Flashmessage>
    <!-- Images swiper -->
    <div
      class="flex justify-center items-center dark:bg-gray-700/50 backdrop-blur-md dark:bg-none mx-auto bg-gradient-to-r from-green-500 via-violet-500 to-blue-500 shadow-md rounded-xl p-1"
    >
      <div
        class="overflow-hidden rounded-xl flex justify-center items-center w-fit"
      >
        <iframe
          width="560"
          height="315"
          :src="'https://www.youtube.com/embed/' + YTvideoId"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <div class="dark:text-white">
      <div class="mt-6">
        <h4 class="text-left text-lg font-semibold mb-3">Video Name:</h4>
        <p class="text-left dark:text-gray-200 leading-relaxed">{{ name }}</p>
      </div>
      <div class="mt-6">
        <h4 class="text-left text-lg font-semibold mb-3">Video Description:</h4>
        <p class="text-left dark:text-gray-200 leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>

    <div
      class="mx-auto mt-6 flex-col gap-3 w-fit sm:w-full justify-center sm:justify-between items-center sm:items-stretch sm:gap-0 sm:flex-row bg-gradient-to-r from-green-400/20 to-blue-500/20 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 background-animate shadow-md rounded-xl p-2 flex"
    >
      <div class="flex items-center gap-2 group">
        <router-link to="">
          <img
            :src="profilePic"
            class="rounded-full h-12 w-12 border-black dark:border-white border-2 transition-transform group-hover:scale-110 z-50"
            alt=""
          />
        </router-link>
        <router-link to="">
          <h4
            class="font-semibold hover:text-blue-500 text-sm sm:text-base dark:text-gray-300 dark:hover:text-white"
          >
            {{ owner }}
          </h4>
        </router-link>
      </div>
      <a :href="'//' + gitHubAcc" target="_blank">
        <Infobtn class="max-w-fit cursor-pointer">
          <div
            class="flex justify-center items-center gap-1 text-sm sm:text-base"
          >
            <span
              ><img
                src="../../assets/images/github.png"
                id="githubIcon"
                alt=""
                class="inline-block sm:w-10 w-6"
            /></span>
            Github
          </div></Infobtn
        >
      </a>
    </div>
    <div class="relative">
      <Addcomment class="mt-6">
        <Infobtn @click="postComment" class="w-fit cursor-pointer"
          >Post Comment</Infobtn
        >
        <div v-if="isLoading" class="absolute bottom-3 left-3">
          <div class="ripple-loader">
            <div></div>
            <div></div>
          </div>
        </div>
      </Addcomment>
    </div>

    <div v-for="document in availableComments" :key="document.$id">
      <Transition appear name="slide-fade">
        <Comments
          :commentOwner="document.commentOwner"
          :commentOwnerId="document.commentOwnerId"
          :commentContext="document.commentContext"
          :commentId="document.$id"
          :dateAndTime="document.dateAndTime"
          :commentProfilePic="this.commentProfilePic"
          class="my-6"
        >
          <!-- show edit button only if the logged in user is the comment owner -->
          <div
            @click="deleteComment(document.$id)"
            v-if="document.commentOwnerId == store.userprofile.$id"
            class="w-fit absolute bottom-3 right-6 font-semibold text-sm text-red-500 cursor-pointer hover:text-red-700"
          >
            DELETE
          </div>
        </Comments>
      </Transition>
    </div>
  </section>
</template>

<script>
import { store } from "../../store";
import { appwrite } from "../../utils";
import Infobtn from "../buttons/Infobtn.vue";
import Addcomment from "../Addcomment.vue";
import Comments from "../Comments.vue";
import Flashmessage from "../Flashmessage.vue";

import { getFiles } from "../../services/bucketsService";
import { getUserPref } from "../../services/UserService";

export default {
  components: {
    Infobtn,
    Addcomment,
    Comments,
    Flashmessage,
  },
  setup() {
    return {
      store,
    };
  },
  data() {
    return {
      documentId: "",
      owner: "",
      ownerId: "",
      name: "",
      description: "",
      id: "",
      YTvideoId: "",
      profilePic: "",
      gitHubAcc: "",

      successMsg: false,
      isLoading: false,
      availableComments: [],
      commentContext: null,
      deletedCommentId: false,
      dateAndTime: false,
      commentProfilePic: "",
    };
  },
  mounted() {
    this.getVideoDetails();
    this.checkForComments();
  },

  methods: {
    // Getting component details from params and passed to appwrite
    async getVideoDetails() {
      // Fetch component ID and colleciton ID from the params in route
      this.documentId = this.$route.params.videoId;

      // Getting the document by Collection ID and Component ID
      let promise = appwrite.database.getDocument(
        "tailwinderAcademy",
        this.documentId
      );

      await promise.then((response) => {
        // Getting current component details
        (this.documentId = response.documentId),
          (this.owner = response.owner),
          (this.ownerId = response.ownerId),
          (this.name = response.name),
          (this.description = response.description),
          (this.id = response.id),
          (this.YTvideoId = response.YTvideoId);
      });
      this.getProfilePic();
      this.getGithub();
    },
    async getProfilePic() {
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
    async getGithub() {
      await getUserPref(this.ownerId).then((response) => {
        this.gitHubAcc = response.github;
      });
    },
    async checkForComments() {
      this.availableComments = [];
      // Getting list of documents(ALL) inside comments collection
      let promise = appwrite.database.listDocuments("comments");

      await promise.then((response) => {
        // Filtering each document to check if it relates to the current component
        // Don't show comments with ID equal to deleted comment ID (For immediate view purposes)
        for (const document of response.documents) {
          if (
            document.componentId == this.id &&
            document.$id !== this.deletedCommentId
          ) {
            this.availableComments.push(document);
          }
        }
      });
    },
    // get time in EDT
    currentDateTime() {
      const date = new Date();
      const currentDT = date.toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
      this.dateAndTime = currentDT;
    },
    async postComment() {
      this.currentDateTime();
      //creating appwrite document for the comment while passing comment context
      this.commentContext = document.querySelector("#commentContext").value;
      let promise = appwrite.database.createDocument("comments", "unique()", {
        commentOwner: store.userprofile.name,
        commentOwnerId: store.userprofile.$id,
        componentId: this.id,
        commentContext: this.commentContext,
        dateAndTime: this.dateAndTime,
      });

      // Clear comment text area after adding new comment.
      document.querySelector("#commentContext").value = "";
      // Give some time for appwrite to load and then check for updated comments
      this.isLoading = true;
      this.successMsg = "Your comment has been added 🥳";
      setTimeout(() => {
        this.isLoading = false;
        this.checkForComments();
      }, 1000);
    },
    async deleteComment(commentId) {
      this.deletedCommentId = commentId;
      await appwrite.database.deleteDocument("comments", commentId);
      // Give some time for appwrite to load and then check for updated comments
      this.isLoading = true;
      this.successMsg = "Your comment has been deleted ☹️";
      setTimeout(() => {
        this.isLoading = false;
        this.checkForComments();
      }, 1000);
    },
  },
};
</script>

<style scoped>
#githubIcon {
  max-width: 1.5rem !important;
}
</style>
