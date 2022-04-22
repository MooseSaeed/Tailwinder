<template>
  <section class="mx-10 mt-20">
    <header
      class="rounded-full relative h-20 mt-28 text-sm bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <div
        class="rounded-full -top-7 mx-auto left-0 right-0 absolute h-32 w-32 outline outline-white outline-offset-8 border-4 border-white transition-transform group-hover:scale-110 z-30 bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      ></div>
      <img
        class="animate__animated animate__pulse animate__repeat-2 rounded-full -top-5 mx-auto left-0 right-0 absolute h-28 w-28 transition-transform group-hover:scale-110 z-50"
        src="../../assets/images/test.jpg"
        alt=""
      />
    </header>

    <main class="text-center mt-8">
      <h2 class="font-semibold text-3xl relative">
        {{ userprofile.name }}
      </h2>

      <h2 class="">{{ userprofile.email }}</h2>

      <div class="flex gap-5 mt-5">
        <aside>
          <div class="bg-blue-500 w-80 h-80"></div>
        </aside>
        <div class="bg-blue-500 w-full h-80"></div>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: "Profile",
  props: ["userprofile"],
  methods: {
    logout() {
      this.$parent.logout();
    },
  },
};
</script>
<style scoped>
.background-animate {
  background-size: 400%;
  -webkit-animation: gradColor 3s ease infinite;
  -moz-animation: gradColor 3s ease infinite;
  animation: gradColor 3s ease infinite;
}

@keyframes gradColor {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
