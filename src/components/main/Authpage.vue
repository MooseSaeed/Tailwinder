<template>
  <div class="min-h-screen">
    <div v-if="!store.userprofile">
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
  </div>
</template>

<script>
import { appwrite } from "../../utils";
import { store } from "../../store.js";
import Login from "../auth/Login.vue";
import Signup from "../auth/Signup.vue";
import Profile from "./Profile.vue";
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
      store,
    };
  },
  mounted: function () {
    this.checkLogin();
  },
  methods: {
    async logout() {
      store.userprofile = false;
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
    async signup(username, nameOfUser, password, email) {
      try {
        await appwrite.account.create(username, email, password, nameOfUser);
        await appwrite.account.createSession(email, password);
        this.checkLogin();
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async updateUsername(username) {
      try {
        await appwrite.account.updatePrefs({
          username: username,
        });
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async checkLogin() {
      try {
        const response = await appwrite.account.get();
        store.userprofile = response;
        this.$router.go(-1);
      } catch (err) {
        if (err == "Error: Unauthorized") return;
        console.error(err);
      }
    },
  },
};
</script>
