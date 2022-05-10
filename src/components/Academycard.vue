<template>
  <div
    class="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden"
  >
    <img
      class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
      :src="thumbnailUrl"
      alt="blog"
    />
    <div class="p-6">
      <h2
        class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
      >
        Added By:
        <router-link
          class="text-blue-500 hover:text-blue-700"
          :to="userAccUrl"
          >{{ owner }}</router-link
        >
      </h2>
      <router-link
        :to="{
          name: 'Videoview',
          params: { videoId: this.id },
        }"
      >
        <h1
          class="title-font text-lg font-medium text-gray-600 mb-3 hover:text-blue-500"
        >
          {{ name }}
        </h1>
      </router-link>
      <p class="leading-relaxed mb-3">
        {{ description }}
      </p>
      <div class="flex items-center flex-wrap">
        <router-link
          :to="{
            name: 'Videoview',
            params: { videoId: this.id },
          }"
        >
          <button
            class="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg"
          >
            Learn more
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "YTvideoId", "description", "name", "owner", "ownerId"],
  data() {
    return {
      thumbnailUrl: "http://img.youtube.com/vi/" + this.YTvideoId + "/0.jpg",
      userAccUrl: "/users/" + this.ownerId,
    };
  },
};
</script>

<style></style>
