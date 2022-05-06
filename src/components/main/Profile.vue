<template>
  <section class="mx-10 mt-20 min-h-screen">
    <div v-if="isLoading" class="absolute left-2/4 top-2/4">
      <div class="ripple-loader">
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-if="!isLoading">
      <header
        class="rounded-full relative h-10 mt-32 text-sm bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <div
          class="rounded-full -top-11 mx-auto left-0 right-0 absolute h-32 w-32 outline outline-white outline-offset-8 border-4 border-white transition-transform group-hover:scale-110 z-30 bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        ></div>
        <img
          class="animate__animated animate__pulse animate__repeat-2 rounded-full -top-9 mx-auto left-0 right-0 absolute h-28 w-28 transition-transform group-hover:scale-110 z-50"
          src="../../assets/images/test.jpg"
          alt=""
        />
      </header>
      <main class="text-center mt-14">
        <div class="px-10">
          <h2 class="font-bold text-3xl relative">
            {{ userprofile.name }}
          </h2>

          <p v-if="!userPrefs.bio" class="mt-2 text-center max-w-2xl mx-auto">
            I didn't update my bio.
          </p>
          <p v-if="userPrefs.bio" class="mt-2 text-center max-w-2xl mx-auto">
            {{ userPrefs.bio }}
          </p>
        </div>
        <div class="flex gap-5 mt-5">
          <aside>
            <div
              class="bg-gray-50 border border-gray-300 rounded-xl text-left px-4"
            >
              <h3 class="py-1 font-semibold text-lg">About</h3>
              <h3 class="py-1 font-semibold text-lg border-gray-400 border-t">
                Contributions
              </h3>
            </div>
            <Secondarybtn
              @click="activateEditing"
              v-if="store.userprofile.$id == userprofile.$id && !activateEdit"
              class="mt-5 cursor-pointer"
              >Edit Profile</Secondarybtn
            >
            <Primarybtn
              v-if="activateEdit"
              @click="updateAccount"
              class="mt-5 cursor-pointer"
              >Save Edits</Primarybtn
            >
          </aside>
          <div
            class="bg-gray-50/25 border border-gray-300 rounded-xl w-full text-left px-5 py-5"
          >
            <div v-if="activateEdit">
              <h3 class="font-semibold mt-3">Name:</h3>
              <input
                class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl"
                v-model="name"
              />
              <h3 class="font-semibold mt-3">Bio:</h3>
              <input
                class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl"
                v-model="bio"
              />
            </div>
            <h3 class="font-semibold mt-3">Email:</h3>
            <p
              v-if="!activateEdit"
              class="mt-2 bg-gray-100 px-2 py-1 rounded-xl"
            >
              {{ userprofile.email }}
            </p>

            <input
              @change="watchEmailChanges"
              v-if="activateEdit"
              class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl"
              v-model="email"
            />
            <div v-if="emailChanged">
              <p
                class="text-sm mt-2 inline-block text-gray-700"
                v-if="activateEdit"
              >
                Please confirm password if any changes in email.
                <input
                  v-if="activateEdit"
                  id="userPassword"
                  type="password"
                  class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl inline-block"
                  v-model="password"
                />
              </p>
            </div>

            <h3 class="font-semibold mt-3">Country:</h3>
            <p
              v-if="!activateEdit"
              class="mt-2 bg-gray-100 px-2 py-1 rounded-xl"
            >
              {{ userPrefs.country }}
            </p>
            <input
              v-if="activateEdit"
              class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl"
              v-model="country"
            />
            <h3 class="font-semibold mt-3">Github:</h3>
            <p
              v-if="!activateEdit"
              class="mt-2 bg-gray-100 px-2 py-1 rounded-xl"
            >
              {{ userPrefs.github }}
            </p>
            <input
              v-if="activateEdit"
              class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl"
              v-model="github"
            />
            <h3 class="font-semibold mt-3">Twitter:</h3>
            <p
              v-if="!activateEdit"
              class="mt-2 bg-gray-100 px-2 py-1 rounded-xl"
            >
              {{ userPrefs.twitter }}
            </p>
            <input
              v-if="activateEdit"
              class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl"
              v-model="twitter"
            />
          </div>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
import { getAllUsers } from "../../services/UserService";
import { getUserPref } from "../../services/UserService";
import { store } from "../../store.js";
import Secondarybtn from "../buttons/Secondarybtn.vue";
import { appwrite } from "../../utils";
import Primarybtn from "../buttons/Primarybtn.vue";
export default {
  components: { Secondarybtn, Primarybtn },
  name: "Profile",
  props: ["id"],
  data() {
    return {
      emailChanged: false,
      userPrefs: false,
      activateEdit: false,
      userprofile: false,
      isLoading: false,
      store,
      name: null,
      bio: null,
      email: null,
      country: null,
      github: null,
      twitter: null,
      password: null,
    };
  },
  mounted() {
    this.getThisUser();
    this.loadPage();
  },
  methods: {
    watchEmailChanges() {
      if (this.userprofile.email !== this.email) {
        this.emailChanged = true;
      }
    },
    activateEditing() {
      this.activateEdit = !this.activateEdit;
      if (this.activateEdit) {
        this.name = this.userprofile.name;
        this.email = this.userprofile.email;
        this.bio = this.userPrefs.bio;
        this.country = this.userPrefs.country;
        this.twitter = this.userPrefs.twitter;
        this.github = this.userPrefs.github;
      }
    },
    updateAccount() {
      this.isLoading = true;
      // Update name
      setTimeout(() => {
        this.updateName();
      }, 100);

      // Update Email if any changes occured in email input
      setTimeout(() => {
        this.updateEmail();
      }, 300);

      // Update bio, country, twitter, github
      setTimeout(() => {
        this.updatePrefs();
        this.isLoading = false;
      }, 600);

      this.activateEdit = false;
    },
    updateName() {
      appwrite.account.updateName(this.name);
      this.userprofile.name = this.name;
    },
    updatePrefs() {
      appwrite.account.updatePrefs({
        bio: this.bio,
        country: this.country,
        github: this.github,
        twitter: this.twitter,
      });

      this.userPrefs.bio = this.bio;
      this.userPrefs.country = this.country;
      this.userPrefs.github = this.github;
      this.userPrefs.twitter = this.twitter;
    },
    updateEmail() {
      if (this.userprofile.email !== this.email) {
        appwrite.account.updateEmail(this.email, this.password);
      }
      this.userprofile.email = this.email;
    },
    loadPage() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    getThisUser() {
      getAllUsers(this.id).then((response) => {
        this.userprofile = response;

        this.getPrefs(this.userprofile.$id);
      });
    },
    getPrefs(userid) {
      getUserPref(userid).then((response) => {
        this.userPrefs = response;
      });
    },
  },
};
</script>
<style scoped></style>
