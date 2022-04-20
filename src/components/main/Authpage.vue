<template>
  <div class="loginCore">
    <div class="loginPage" v-if="!userprofile">
      <Login v-if="!currentPage">
        <div>
          <p>
            {{ currentPage ? "Got an account?" : "Haven't got an account?" }}
            <span
              class="cursor-pointer"
              @click="() => (this.currentPage = !this.currentPage)"
              >{{ currentPage ? "Login" : "Sign Up" }}</span
            >
          </p>
        </div>
      </Login>
      <Signup v-if="currentPage">
        <div>
          <p>
            {{ currentPage ? "Got an account?" : "Haven't got an account?" }}
            <span
              class="cursor-pointer"
              @click="() => (this.currentPage = !this.currentPage)"
              >{{ currentPage ? "Login" : "Sign Up" }}</span
            >
          </p>
        </div>
      </Signup>
    </div>
    <div class="loginPage" v-if="userprofile">
      <Profile v-bind:userprofile="userprofile" />
    </div>
  </div>
</template>

<script>
import { appwrite } from "../../utils";

import Login from "../auth/Login.vue";
import Signup from "../auth/Signup.vue";
import Profile from "../auth/Profile.vue";
export default {
  name: "Authpage",
  components: {
    Login,
    Signup,
    Profile,
  },
  data: () => {
    return {
      currentPage: false,
      userprofile: false,
    };
  },
  mounted: function () {
    this.checkLogin();
  },
  methods: {
    async logout() {
      this.userprofile = false;
      appwrite.account.deleteSession("current");
    },
    async login(username, password) {
      console.log({ username, password });
      try {
        await appwrite.account.createSession(
          event.target.email.value,
          event.target.password.value
        );
        this.checkLogin();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async signup(username, password, email) {
      try {
        await appwrite.account.create("unique()", email, password, username);
        await appwrite.account.createSession(email, password);
        this.checkLogin();
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async checkLogin() {
      try {
        const response = await appwrite.account.get();
        this.userprofile = response;
      } catch (err) {
        if (err == "Error: Unauthorized") return;
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.loginCore {
  background: radial-gradient(
    at right center,
    rgb(56, 189, 248),
    rgb(49, 46, 129)
  );
}
</style>
