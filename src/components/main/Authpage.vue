<template>
  <div class="min-h-screen">
    <div class="loginPage" v-if="!userprofile">
      <Login v-if="!pageSwitch">
        <div>
          <p>
            {{ pageSwitch ? "Got an account?" : "Haven't got an account?" }}
            <span
              class="cursor-pointer"
              @click="() => (this.pageSwitch = !this.pageSwitch)"
              >{{ pageSwitch ? "Login" : "Sign Up" }}</span
            >
          </p>
        </div>
      </Login>
      <Signup v-if="pageSwitch">
        <div>
          <p>
            {{ pageSwitch ? "Got an account?" : "Haven't got an account?" }}
            <span
              class="cursor-pointer"
              @click="() => (this.pageSwitch = !this.pageSwitch)"
              >{{ pageSwitch ? "Login" : "Sign Up" }}</span
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
      pageSwitch: false,
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
    async login() {
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
