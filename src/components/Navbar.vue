<template>
  <nav
    class="bg-white/50 border-gray-200 px-2 sm:px-4 py-4 dark:bg-gray-800 w-full absolute z-50 top-0"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link to="/" class="flex items-center">
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Tailwinder</span
        >
      </router-link>
      <div class="flex items-center md:order-2">
        <div class="font-semibold">
          <router-link class="hover:text-blue-500" to="/auth">
            SIGN UP / LOGIN
          </router-link>
        </div>
        <button
          type="button"
          class="mr-3 text-sm bg-red-500 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <div>
            <Dropdown>
              <Dropdowncontent>
                <router-link to="/auth">
                  <Dropdownitems category="Profile"></Dropdownitems>
                </router-link>
                <p @click="logout">
                  <Dropdownitems category="Logout"></Dropdownitems>
                </p>
              </Dropdowncontent>
            </Dropdown>
          </div>
        </button>
        <!-- Dropdown menu -->
        <div
          class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          id="dropdown"
        >
          <div class="py-3 px-4">
            <span class="block text-sm text-gray-900 dark:text-white"
              >Bonnie Green</span
            >
          </div>
          <ul class="py-1">
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Profile</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Sign out</a
              >
            </li>
          </ul>
        </div>
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-2"
      >
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li>
            <router-link
              :class="{ 'md:text-blue-500': $route.path === '/' }"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              to="/"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link
              :class="{ 'md:text-blue-500': $route.path === '/tools' }"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              to="/tools"
            >
              Tools
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { appwrite } from "../utils";
import Dropdown from "./dropdown/Dropdown.vue";
import Dropdowncontent from "./dropdown/Dropdowncontent.vue";
import Dropdownitems from "./dropdown/Dropdownitems.vue";
export default {
  components: {
    Dropdown,
    Dropdowncontent,
    Dropdownitems,
  },
  data() {
    return {
      userprofile: null,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      try {
        const response = await appwrite.account.get();
        this.userprofile = response;
        console.log(this.userprofile);
      } catch (err) {
        if (err == "Error: Unauthorized") return;
        console.error(err);
      }
    },
    logout() {
      this.userprofile = null;
      appwrite.account.deleteSession("current");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
