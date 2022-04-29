<template>
  <section>
    <div
      class="bg-gradient-to-r max-w-xl from-green-500 via-violet-500 to-blue-700 background-animate shadow-md rounded-xl h-max p-1"
    >
      <div
        class="text-black flex flex-col bg-blue-50 bg-option7 p-6 rounded-xl"
      >
        <header class="items-center flex">
          <img
            src="../assets/images/test.jpg"
            class="rounded-full h-12 w-12 mr-2"
            alt="User Avatar"
          />
          <h5 class="text-black">
            <span class="font-semibold hover:text-blue-500 cursor-pointer">
              <router-link
                :to="{
                  name: 'UserProfile',
                  params: { id: commentOwnerId },
                }"
                >{{ commentOwner }}</router-link
              >
            </span>
            Said:
          </h5>
        </header>

        <div
          class="rounded-xl w-full text-sm outline-none border-none text-left mt-2"
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
export default {
  props: [
    "commentOwner",
    "commentOwnerId",
    "commentContext",
    "commentId",
    "document",
  ],
};
</script>

<style></style>
