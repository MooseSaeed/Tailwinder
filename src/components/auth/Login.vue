<template>
  <main class="relative">
    <div class="px-4 py-10 mt-20 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto">
        <h1 class="text-2xl font-bold text-center dark:text-white sm:text-3xl">
          Login
        </h1>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <form
          @submit="processLogin"
          action=""
          class="p-8 mt-6 mb-0 space-y-4 rounded-xl shadow-md dark:bg-gray-700/50 backdrop-blur-md bg-none dark:text-white"
        >
          <p class="text-lg font-medium">Login to your account</p>

          <div>
            <label for="email" class="text-sm font-medium">Email</label>

            <div class="relative mt-1">
              <input
                v-model="email"
                type="email"
                id="email"
                required
                class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm dark:text-black"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label for="password" class="text-sm font-medium">Password</label>

            <div class="relative mt-1">
              <input
                v-model="password"
                type="password"
                id="password"
                required
                class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm dark:text-black"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button class="w-full" type="submit">
            <Primarybtn> Sign in </Primarybtn>
          </button>

          <slot />
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import Primarybtn from "../buttons/Primarybtn.vue";
export default {
  name: "Login",
  components: {
    Primarybtn,
  },
  data: () => {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  methods: {
    async processLogin(e) {
      e.preventDefault();
      this.error = false;
      // Validation
      if (!(this.password.length >= 6 && this.password.length <= 32)) {
        this.error = "Error: Password must be between 6 and 32 characters.";
        return;
      }
      if ((await this.$parent.login()) === false) {
        this.error = "Incorrect Credentials!";
      }
    },
  },
};
</script>

<style></style>
