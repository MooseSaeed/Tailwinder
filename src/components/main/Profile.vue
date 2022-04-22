<template>
  <section class="mx-5 mt-20">
    <header
      class="rounded-full relative h-20 mt-28 text-sm bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <div
        class="rounded-full -top-7 mx-auto left-0 right-0 absolute h-32 w-32 outline outline-white outline-offset-8 border-4 border-white transition-transform group-hover:scale-110 z-30 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      ></div>
      <img
        class="rounded-full -top-5 mx-auto left-0 right-0 absolute h-28 w-28 border-black border-2 transition-transform group-hover:scale-110 z-50"
        src="../../assets/images/test.jpg"
        alt=""
      />
    </header>

    <h2>Logged In!</h2>
    <h1>{{ userprofile.name }}</h1>
    <p>{{ userprofile.email }}</p>
    <p>ID: {{ userprofile.$id }}</p>
    <button @click="logout">Logout</button>
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
