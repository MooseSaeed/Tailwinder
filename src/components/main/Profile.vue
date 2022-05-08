<template>
  <section class="mx-10 my-5 mt-20 min-h-screen">
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
          :src="profilePic"
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
              class="bg-gray-50 border border-gray-300 rounded-xl text-left px-4 w-max"
            >
              <h3
                @click="switchToOverview"
                class="py-1 font-semibold text-md cursor-pointer"
                :class="{ 'text-blue-500': accountOverview }"
              >
                Account Overview
              </h3>
              <h3
                @click="switchToConts"
                class="py-1 font-semibold text-md border-gray-400 border-t cursor-pointer"
                :class="{ 'text-blue-500': !accountOverview }"
              >
                Contributions
              </h3>
            </div>
            <Secondarybtn
              @click="activateEditing"
              v-if="
                store.userprofile.$id == userprofile.$id &&
                !activateEdit &&
                accountOverview
              "
              class="mt-5 cursor-pointer"
              >Edit Profile</Secondarybtn
            >
            <Primarybtn
              v-if="activateEdit && accountOverview"
              @click="updateAccount"
              class="mt-5 cursor-pointer"
              >Save Edits</Primarybtn
            >
          </aside>
          <div
            class="bg-gray-50/25 border border-gray-300 rounded-xl w-full text-left px-5 py-5"
            v-if="accountOverview"
          >
            <div v-if="activateEdit">
              <h3 class="font-semibold mt-3">Update Profile Picture:</h3>

              <div class="flex items-center">
                <input
                  @change="displayFiles"
                  type="file"
                  id="profileImgUpdate"
                  name="profileImgUpdate"
                  class="mt-2 bg-white border-black border px-2 py-1 rounded-xl w-fit"
                />

                <div
                  v-if="!picturePath && !profilePic"
                  class="bg-gray-500 h-32 w-32 inline-block rounded-xl ml-5"
                ></div>
                <img
                  v-if="!picturePath"
                  class="animate__animated animate__fadeIn max-h-32 ml-5 rounded-xl"
                  :src="profilePic"
                  alt=""
                />
                <img
                  v-if="picturePath"
                  class="animate__animated animate__fadeIn max-h-32 ml-5 rounded-xl"
                  :src="picturePath"
                  alt=""
                />
              </div>
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
          <Contributions :userId="userprofile.$id" v-if="!accountOverview" />
        </div>
      </main>
    </div>
  </section>
</template>

<script>
import { getAllUsers } from "../../services/UserService";
import { getUserPref } from "../../services/UserService";
import { createBucket } from "../../services/bucketsService";
import { deleteBucket } from "../../services/bucketsService";
import { getFiles } from "../../services/bucketsService";

import { store } from "../../store.js";
import Secondarybtn from "../buttons/Secondarybtn.vue";
import { appwrite } from "../../utils";
import Primarybtn from "../buttons/Primarybtn.vue";
import Contributions from "../Contributions.vue";
import { Query } from "appwrite";
export default {
  components: { Secondarybtn, Primarybtn, Contributions },
  name: "Profile",
  props: ["id"],
  data() {
    return {
      accountOverview: true,
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
      picturePath: null,
      selectedPic: null,
      selectedPicName: "",
      profilePic: null,
      userId: null,
    };
  },
  mounted() {
    this.getThisUser();

    setTimeout(() => {
      this.checkIfProfilePic();
    }, 400);

    this.loadPage();
  },
  methods: {
    deleteCurrentPic() {
      if (this.profilePic) {
        deleteBucket(this.id).then((response) => {
          console.log("deleted pic");
        });
      }
    },
    makeBucket() {
      console.log("making a pic");
      let bucket_id = this.userId;
      let bucket_name = this.userprofile.name;
      this.selectedPicName = this.selectedPic.name;
      let fileName = this.selectedPicName.replace(/[^a-zA-Z0-9]+/g, "");
      console.log(fileName);
      //using appwrite Node SDK to create a bucket for the profile picture
      this.deleteCurrentPic();

      setTimeout(() => {
        createBucket(bucket_id, bucket_name).then((response) => {
          console.log("created pic");
          appwrite.storage.createFile(
            this.userId, //bucket id
            fileName, //file id ( file id = name of the file in input )
            this.selectedPic,
            ["role:all"]
          );
        });
      }, 300);
    },
    checkIfProfilePic() {
      this.userId = this.id;
      //Using Node SDK to fetch all files (images) in the desired bucket
      getFiles(this.userId).then(
        (response) => {
          //If file is 404 then show avatar
          if (response.code == 404) {
            this.profilePic = null;
            this.getAvatar();
          } else {
            for (const file of response.files) {
              let result = appwrite.storage.getFilePreview(
                this.userId,
                file.$id
              );
              this.profilePic = result.href;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getAvatar() {
      let result = appwrite.avatars.getInitials(this.userprofile.name);

      this.profilePic = result;
    },

    switchToOverview() {
      this.accountOverview = true;
    },
    switchToConts() {
      this.accountOverview = false;
    },
    //Watching changes in email input to show password input accordingly
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

      // Update profile img if any changes occured in img input
      setTimeout(() => {
        this.makeBucket();
      }, 500);

      // Update bio, country, twitter, github
      setTimeout(() => {
        this.updatePrefs();
        this.isLoading = false;
      }, 800);

      // The setTimeout is a workaround for issues occures due to multible
      // requests at the same time. Not the best solution but i'll keep it simple.

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
      // Using appwrite Node SDK to fetch this specific user
      getAllUsers(this.id).then((response) => {
        this.userprofile = response;

        // Getting user prefs for this user
        this.getPrefs(this.userprofile.$id);
      });
    },
    getPrefs(userid) {
      // Using appwrite Node SDK to fetch the prefs for the user
      getUserPref(userid).then((response) => {
        this.userPrefs = response;
      });
    },
    displayFiles() {
      const input = document.querySelector("#profileImgUpdate").files[0];
      this.selectedPic = input;

      this.picturePath = URL.createObjectURL(input);
    },
  },
};
</script>
<style scoped></style>
