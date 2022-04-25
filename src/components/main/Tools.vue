<template>
  <section
    class="grid gap-y-10 sm:grid-cols-2 justify-items-center items-center mt-28 mx-auto mb-10 max-w-4xl text-center"
  >
    <router-link to="/">
      <Card dataImage="./images/bereadableposter.png">
        <template v-slot:header>
          <h2 class="text-white text-xl font-bold">Wordleit Text Editor</h2>
        </template>
        <template v-slot:content>
          <p class="relative text-white">
            A markdown text editor supported with AI Speech
          </p>
        </template>
      </Card>
    </router-link>
    <router-link to="/">
      <Card dataImage="./images/bereadableposter.png">
        <template v-slot:header>
          <h2 class="text-white text-xl font-bold">Wordleit Streamer</h2>
        </template>
        <template v-slot:content>
          <p class="relative text-white">
            A video streamer and audio transcriptor.
          </p>
        </template>
      </Card>
    </router-link>
    <router-link to="/">
      <Card dataImage="./images/bereadableposter.png">
        <template v-slot:header>
          <h2 class="text-white text-xl font-bold">Wordleit Grammy</h2>
        </template>
        <template v-slot:content>
          <p class="relative text-white">
            AI speaking Pot created just to entertain you.
          </p>
        </template>
      </Card>
    </router-link>
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
h2,
p {
  text-shadow: -3px 2px 4px rgba(0, 0, 0, 0.8);
}
</style>
