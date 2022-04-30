<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    <!-- Images swiper -->
    <div
      class="mx-auto bg-gradient-to-r from-green-500 via-violet-500 to-blue-500 shadow-md rounded-xl h-max p-1"
    >
      <div class="bg-blue-50 overflow-hidden shadow-md rounded-xl h-full">
        <Swiper
          :slidesPerView="1"
          :spaceBetween="30"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :modules="modules"
          class="mySwiper"
        >
          <Swiper-slide class=""
            ><img
              class="rounded-xl py-2"
              src="../../assets/images/test2.png"
              alt=""
          /></Swiper-slide>
          <Swiper-slide class=""
            ><img
              class="rounded-xl py-2"
              src="../../assets/images/test2.png"
              alt=""
          /></Swiper-slide>
          <Swiper-slide class=""
            ><img
              class="rounded-xl py-2"
              src="../../assets/images/test2.png"
              alt=""
          /></Swiper-slide>
        </Swiper>
      </div>
    </div>

    <div class="mt-6">
      <h4 class="text-left text-lg font-semibold mb-3">
        Component description:
      </h4>
      <p class="text-left leading-relaxed">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
        voluptates illum iure, similique eos sit error laboriosam itaque
        excepturi veniam deleniti nesciunt pariatur reprehenderit provident
        soluta aperiam accusantium assumenda alias. Amet deleniti eum natus
        praesentium suscipit ipsum id impedit, voluptatibus nemo officia quaerat
        velit, iure, iusto cum consectetur? Voluptatibus sequi sint aspernatur
        maxime, tempora sit, nihil natus ipsum fugit saepe, eos a. Dolore est.
      </p>
    </div>

    <div
      class="mx-auto mt-6 flex-col gap-3 w-fit sm:w-full justify-center sm:justify-between items-center sm:items-stretch sm:gap-0 sm:flex-row bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-xl p-2 flex"
    >
      <div class="flex items-center gap-2 group">
        <router-link to="#">
          <img
            src="../../assets/images/test.jpg"
            class="rounded-full h-12 w-12 border-black border-2 transition-transform group-hover:scale-110 z-50"
            alt=""
          />
        </router-link>
        <router-link to="#">
          <h4 class="font-semibold hover:text-blue-500 text-sm sm:text-base">
            Mostafa Said
          </h4>
        </router-link>
      </div>
      <Infobtn class="max-w-fit cursor-pointer">
        <div
          class="flex justify-center items-center gap-1 text-sm sm:text-base"
        >
          <span
            ><img
              src="../../assets/images/github.png"
              alt=""
              class="inline-block sm:w-10 w-6"
          /></span>
          Github
        </div></Infobtn
      >
    </div>
    <Addcomment class="mt-6">
      <Infobtn @click="postComment" class="w-fit cursor-pointer"
        >Post Comment</Infobtn
      >
    </Addcomment>

    <div v-for="document in availableComments" :key="document.$id">
      <Comments
        :document="document"
        :commentOwner="document.commentOwner"
        :commentOwnerId="document.commentOwnerId"
        :commentContext="document.commentContext"
        :commentId="document.$id"
        class="my-6"
      >
        <div
          @click="deleteComment(document.$id)"
          v-if="document.commentOwnerId == store.userprofile.$id"
          class="w-fit self-end font-semibold text-sm text-red-500 cursor-pointer hover:text-red-700"
        >
          DELETE
        </div>
      </Comments>
    </div>
  </section>
</template>

<script>
import { store } from "../../store";
import { appwrite } from "../../utils";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import Infobtn from "../buttons/Infobtn.vue";
import Addcomment from "../Addcomment.vue";
import Comments from "../Comments.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    Infobtn,
    Addcomment,
    Comments,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  data() {
    return {
      componentId: false,
      collectionId: false,
      currentComponent: null,
      availableComments: [],
      commentContext: null,
      deletedCommentId: false,
      store,
    };
  },
  mounted() {
    this.getComponentDetails();
    this.checkForComments();
  },

  methods: {
    // Getting component details from params and passed to appwrite
    getComponentDetails() {
      // Fetch component ID and colleciton ID from the params in route
      this.componentId = this.$route.params.id;
      this.collectionId = this.$route.params.colname;

      // Getting the document by Collection ID and Component ID
      let promise = appwrite.database.getDocument(
        this.collectionId,
        this.componentId
      );

      promise.then((response) => {
        // Getting current component details
        this.currentComponent = response;
      });
    },
    checkForComments() {
      this.availableComments = [];
      // Getting list of documents(ALL) inside comments collection
      let promise = appwrite.database.listDocuments("comments");

      promise.then((response) => {
        // Filtering each document to check if it relates to the current component
        // Don't show comments with ID equal to deleted comment ID
        for (const document of response.documents) {
          if (
            document.componentId == this.componentId &&
            document.$id !== this.deletedCommentId
          ) {
            this.availableComments.push(document);
          }
        }
      });
    },
    postComment() {
      //creating appwrite document for the comment while passing comment context
      this.commentContext = document.querySelector("#commentContext").value;
      let promise = appwrite.database.createDocument("comments", "unique()", {
        commentOwner: store.userprofile.name,
        commentOwnerId: store.userprofile.$id,
        componentId: this.componentId,
        commentContext: this.commentContext,
      });

      // Clear comment text area after adding new comment.
      document.querySelector("#commentContext").value = "";
      // Give some time for appwrite to load and then check for updated comments
      setTimeout(() => {
        this.checkForComments();
      }, 1000);
    },
    // Delete the comment (Passed comment ID value from the loop in template)
    deleteComment(commentId) {
      this.deletedCommentId = commentId;
      appwrite.database.deleteDocument("comments", commentId);
      // Give some time for appwrite to load and then check for updated comments
      setTimeout(() => {
        this.checkForComments();
      }, 1000);
    },
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 70%;
  height: 70%;
  object-fit: cover;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}
</style>
