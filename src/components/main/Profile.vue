<template>
  <section class="mx-10 mt-20 min-h-screen">
    <div v-if="isLoading" class="absolute left-2/4 top-2/4">
      <div class="ripple-loader">
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-if="!isLoading">
      <header
        class="rounded-full relative h-10 mt-32 text-sm bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <div
          class="rounded-full -top-10 mx-auto left-0 right-0 absolute h-32 w-32 outline outline-white outline-offset-8 border-4 border-white transition-transform group-hover:scale-110 z-30 bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        ></div>
        <img
          class="animate__animated animate__pulse animate__repeat-2 rounded-full -top-8 mx-auto left-0 right-0 absolute h-28 w-28 transition-transform group-hover:scale-110 z-50"
          src="../../assets/images/test.jpg"
          alt=""
        />
      </header>
      <main class="text-center mt-16">
        <h2 class="font-semibold text-3xl relative">{{ userprofile.name }}</h2>
        <h2 class="">{{ userprofile.email }}</h2>
        <div class="flex gap-5 mt-5">
          <aside>
            <div class="bg-blue-500 w-80 h-80"></div>
          </aside>
          <div class="bg-blue-500 w-full h-80"></div>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
import { getAllUsers } from "../../services/UserService";

export default {
  name: "Profile",
  props: ["id"],
  data() {
    return {
      userprofile: false,
      isLoading: false,
    };
  },
  mounted() {
    this.getThisUser();
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.checkForComments();
      }, 1500);
    },
    getThisUser() {
      getAllUsers(this.id).then((response) => {
        this.userprofile = response;
      });
    },
  },
};
</script>
<style scoped></style>
