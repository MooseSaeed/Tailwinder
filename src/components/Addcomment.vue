<template>
  <section>
    <div
      class="bg-gradient-to-r max-w-xl from-green-500 via-violet-500 to-blue-700 background-animate shadow-md rounded-xl h-max p-1"
    >
      <form action="#" class="text-black bg-blue-50 bg-option7 p-6 rounded-xl">
        <header class="flex items-center text-white">
          <img
            src="../assets/images/test.jpg"
            class="rounded-xl h-12 w-12"
            alt="User Avatar"
          />
          <h2 class="ml-4 text-black">Want to say something?</h2>
        </header>

        <div class="mt-4">
          <textarea
            name="body"
            class="rounded-xl w-full text-sm outline-none border-none p-2"
            rows="3"
            placeholder="Say what you think?"
            required
          ></textarea>
        </div>

        <div class="flex justify-end mt-6 border-t border-gray-200 pt-6">
          <Infobtn class="w-fit cursor-pointer">Post Comment</Infobtn>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import Infobtn from "./buttons/Infobtn.vue";

export default {
  components: {
    Infobtn,
  },
};
</script>

<style></style>
