<template>
  <section class="mt-28">
    <article class="max-w-4xl mx-auto lg:grid lg:grid-cols-12 gap-x-10">
      <div class="col-span-4 lg:text-center lg:pt-14 mb-10">
        <div v-for="file of availableFiles" :key="file">
          <img :src="file" alt="" class="rounded-xl" />
        </div>

        <div class="flex items-center lg:justify-center text-sm">
          <div class="ml-3 text-left">
            <div
              class="mx-auto mt-6 flex-col w-fit sm:w-full justify-center sm:justify-between items-center sm:items-stretch sm:gap-0 sm:flex-row bg-gradient-to-r from-green-400/20 to-blue-500/20 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 background-animate shadow-md rounded-xl p-2 flex"
            >
              <div class="flex items-center gap-2 group">
                <router-link
                  :to="{
                    name: 'UserProfile',
                    params: { id: this.ownerId },
                  }"
                >
                  <img
                    :src="profilePic"
                    class="rounded-full h-12 w-12 border-black dark:border-white border-2 transition-transform group-hover:scale-110 z-50"
                    alt=""
                  />
                </router-link>
                <router-link
                  :to="{
                    name: 'UserProfile',
                    params: { id: this.ownerId },
                  }"
                >
                  <h4
                    class="font-semibold hover:text-blue-500 text-sm sm:text-base dark:text-gray-300 dark:hover:text-white"
                  >
                    {{ owner }}
                  </h4>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-8">
        <div class="hidden lg:flex justify-between mb-6">
          <router-link
            class="transition-colors duration-300 dark:text-gray-400 dark:hover:text-white font-semibold relative inline-flex items-center text-lg hover:text-blue-500"
            to="/community"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" class="mr-2">
              <g fill="none" fill-rule="evenodd">
                <path
                  stroke="#000"
                  stroke-opacity=".012"
                  stroke-width=".5"
                  d="M21 1v20.16H.84V1z"
                ></path>
                <path
                  class="fill-current"
                  d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z"
                ></path>
              </g>
            </svg>

            Back to community
          </router-link>

          <div class="space-x-2"></div>
        </div>

        <h1 class="font-bold text-3xl lg:text-4xl mb-10 dark:text-white">
          {{ name }}
        </h1>

        <div class="space-y-4 lg:text-lg leading-loose dark:text-white">
          <p>
            {{ context }}
          </p>
        </div>
      </div>
      <div class="relative col-span-8 col-start-1">
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

      <div
        class="col-span-8 col-start-1"
        v-for="document in availableComments"
        :key="document.$id"
      >
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
    </article>
  </section>
</template>

<script>
import { store } from "../../store";
import { appwrite } from "../../utils";
import Infobtn from "../buttons/Infobtn.vue";
import Secondarybtn from "../buttons/Secondarybtn.vue";
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
    Secondarybtn,
  },
  setup() {
    return {
      store,
    };
  },
  data() {
    return {
      name: null,
      owner: false,
      ownerId: false,
      context: false,

      gitHubAcc: "",
      successMsg: false,
      isLoading: false,
      threadId: false,
      collectionId: false,
      availableComments: [],
      commentContext: null,
      deletedCommentId: false,
      dateAndTime: false,
      availableFiles: [],
      profilePic: "",
      commentProfilePic: "",
    };
  },
  mounted() {
    this.getThredDetails();
    this.getAllFiles();
    this.checkForComments();
  },

  methods: {
    // Getting Thread details from params and passed to appwrite
    async getThredDetails() {
      // Fetch thread ID and colleciton ID from the params in route
      this.threadId = this.$route.params.threadId;
      this.collectionId = "discussions";

      // Getting the document by Collection ID and Thread ID
      let promise = appwrite.database.getDocument(
        this.collectionId,
        this.threadId
      );

      await promise.then((response) => {
        // Getting current thread details
        this.name = response.name;
        this.owner = response.owner;
        this.ownerId = response.ownerId;
        this.context = response.context;
      });

      this.getProfilePic();
      this.getGithub();
    },
    async getGithub() {
      await getUserPref(this.ownerId).then((response) => {
        this.gitHubAcc = response.github;
      });
    },
    // Fetch the code from the document and copy to clip board

    async checkForComments() {
      this.availableComments = [];
      // Getting list of documents(ALL) inside comments collection
      let promise = appwrite.database.listDocuments("comments");

      await promise.then((response) => {
        // Filtering each document to check if it relates to the current thread
        // Don't show comments with ID equal to deleted comment ID (For immediate view purposes)
        for (const document of response.documents) {
          if (
            document.componentId == this.threadId &&
            document.$id !== this.deletedCommentId
          ) {
            this.availableComments.push(document);
          }
        }
      });
    },
    async getAllFiles() {
      //Using Node SDK to fetch all files (images) in the desired bucket
      await getFiles(this.threadId).then((response) => {
        //loop over files
        for (const file of response.files) {
          // Get file preview for each file using web sdk
          let result = appwrite.storage.getFilePreview(this.threadId, file.$id);
          this.availableFiles.push(result.href);
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
        componentId: this.threadId,
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
    // Delete the comment (Passed comment ID value from the loop in template)
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

<style scoped>
#githubIcon {
  max-width: 1.5rem !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
