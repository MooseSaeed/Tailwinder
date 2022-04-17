<template>
  <p v-if="error" class="error">{{ error }}</p>
  <form @submit="processRegister">
    <input
      v-model="username"
      type="text"
      id="username"
      required
      placeholder="Username"
    />
    <input
      v-model="email"
      type="email"
      id="email"
      required
      placeholder="Email"
    />
    <input
      v-model="password"
      type="password"
      id="password"
      required
      placeholder="Password"
    />
    <input
      v-model="confirmPassword"
      type="password"
      id="confirmPassword"
      required
      placeholder="Confirm Password"
    />
    <button type="submit">Register</button>
  </form>
</template>

<script>
import { appwrite } from "../utils";
export default {
  name: "HelloWorld",
  data: () => {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: "",
      error: false,
    };
  },
  methods: {
    async processRegister(e) {
      e.preventDefault();
      // Validation
      if (this.loading) {
        return;
      }
      // Password confirmation
      if (this.password !== this.confirmPassword) {
        this.error = "Error: Passwords must be matching.";
        return;
      }
      // Length Validation
      if (!(this.password.length >= 6 && this.password.length <= 32)) {
        this.error = "Error: Password must be between 6 and 32 characters.";
        return;
      }
      if (this.username.length >= 100) {
        this.error = "Error: Username can not exceed 100 characters";
        return;
      }
      this.loading = true;
      if (
        appwrite.account.create(this.username, this.email, this.password) ===
        false
      ) {
        this.error =
          "Something went wrong while registering, Check console for more details.";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
