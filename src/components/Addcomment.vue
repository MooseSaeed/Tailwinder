<template>
  <section>
    <div
      class="bg-gradient-to-r max-w-xl dark:bg-none from-green-500 via-violet-500 to-blue-700 background-animate shadow-md rounded-xl h-max p-1"
    >
      <div
        class="text-black bg-blue-50 bg-option7 p-6 rounded-xl dark:shadow-md dark:bg-gray-700/50 dark:backdrop-blur-md"
      >
        <header class="flex items-center text-white">
          <img
            src="../assets/images/test.jpg"
            class="rounded-xl h-12 w-12"
            alt="User Avatar"
          />
          <h2 class="ml-4 text-black dark:text-white">
            Have something to say??
          </h2>
        </header>

        <div class="mt-4">
          <p v-if="!store.userprofile">
            Please
            <span class="hover:text-blue-500 underline cursor-pointer">
              <router-link to="/auth">Sign Up/Login</router-link>
            </span>
            to add comment.
          </p>
          <textarea
            v-if="store.userprofile"
            id="commentContext"
            name="body"
            class="rounded-xl w-full text-sm outline-none border-none p-2"
            rows="3"
            placeholder="Say what's on your mind.."
            required
          ></textarea>
        </div>

        <div
          v-if="store.userprofile"
          class="flex justify-end mt-6 border-t border-gray-200 pt-6"
        >
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<style></style>
