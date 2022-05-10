<template>
  <section class="mt-28 mx-auto mb-10 max-w-4xl text-center">
    <div>
      <h1
        class="text-2xl mt-10 font-bold text-center dark:text-white sm:text-3xl"
      >
        Tailwinder Tools
      </h1>
      <h2 class="mt-5 text-center dark:text-gray-200">
        Here you will find unique tools that will make your life easier.
      </h2>
    </div>

    <div
      class="myCards grid gap-y-10 sm:grid-cols-2 justify-items-center items-center mt-10 mb-20"
    >
      <router-link to="">
        <Card dataImage="./images/bereadableposter.png">
          <template v-slot:header>
            <h2 class="text-white text-xl font-bold">Buttons</h2>
          </template>
          <template v-slot:content>
            <p class="relative text-white">
              Create buttons design set for your website.
            </p>
          </template>
        </Card>
      </router-link>
      <router-link to="">
        <Card dataImage="./images/bereadableposter.png">
          <template v-slot:header>
            <h2 class="text-white text-xl font-bold">Navbars</h2>
          </template>
          <template v-slot:content>
            <p class="relative text-white">
              Create your own nav bar for your website.
            </p>
          </template>
        </Card>
      </router-link>
      <router-link to="">
        <Card dataImage="./images/bereadableposter.png">
          <template v-slot:header>
            <h2 class="text-white text-xl font-bold">Popup Modals</h2>
          </template>
          <template v-slot:content>
            <p class="relative text-white">
              Create popup modals for your website.
            </p>
          </template>
        </Card>
      </router-link>
    </div>
  </section>
</template>

<script>
import Card from "../Card.vue";
export default {
  name: "Tools",
  components: { Card },
};
</script>

<style scoped>
.myCards h2,
p {
  text-shadow: -3px 2px 4px rgba(0, 0, 0, 0.8);
}
</style>
