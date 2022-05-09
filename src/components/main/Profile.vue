<template>
  <section class="mx-10 my-5 min-h-screen flex flex-col justify-between">
    <div v-if="isLoading" class="absolute left-2/4 top-2/4">
      <div class="ripple-loader">
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-if="!isLoading">
      <header
        class="rounded-full relative h-10 mt-32 text-sm bg-gradient-to-r from-blue-900 via-green-400 to-blue-500 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <div
          class="rounded-full flex justify-center items-center overflow-hidden -top-11 mx-auto left-0 right-0 absolute h-32 w-32 outline outline-white outline-offset-8 border-4 border-white"
        >
          <div
            class="relative w-36 h-36 flex-col flex justify-center items-center bg-blue-500"
          >
            <img
              class="animate__animated object-cover flex-1 animate__pulse animate__repeat-2 transition-transform"
              :src="profilePic"
              alt=""
            />
          </div>
        </div>
      </header>
      <main class="text-center mt-14">
        <div class="px-10">
          <h2 class="font-bold text-3xl dark:text-white relative">
            {{ userprofile.name }}
          </h2>

          <p
            v-if="!userPrefs.bio"
            class="dark:text-white mt-2 text-center max-w-2xl mx-auto"
          >
            I didn't update my bio.
          </p>
          <p
            v-if="userPrefs.bio"
            class="dark:text-white mt-2 text-center max-w-2xl mx-auto"
          >
            {{ userPrefs.bio }}
          </p>
        </div>
        <div class="flex gap-5 mt-5">
          <aside>
            <div
              class="dark:bg-slate-900/25 backdrop-blur-md dark:text-gray-500 border-gray-300 rounded-xl text-left px-4 w-max"
            >
              <h3
                @click="switchToOverview"
                class="py-1 font-semibold text-md cursor-pointer dark:hover:text-white"
                :class="{ 'text-blue-500 dark:text-white': accountOverview }"
              >
                Account Overview
              </h3>
              <h3
                @click="switchToConts"
                class="py-1 font-semibold text-md border-gray-400 border-t cursor-pointer dark:hover:text-white"
                :class="{ 'text-blue-500 dark:text-white': !accountOverview }"
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
            class="bg-gray-500/25 shadow-xl rounded-xl w-full dark:text-white text-left px-5 py-5"
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
                  class="mt-2 bg-white border-black text-black border px-2 py-1 rounded-xl w-fit"
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
                class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl text-black"
                v-model="name"
              />
              <h3 class="font-semibold mt-3">Bio:</h3>
              <input
                class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl text-black"
                v-model="bio"
              />
            </div>
            <h3 class="font-semibold mt-3">Email:</h3>
            <p
              v-if="!activateEdit"
              class="mt-2 bg-gray-100 dark:bg-transparent px-2 py-1 rounded-xl"
            >
              {{ userprofile.email }}
            </p>

            <input
              @change="watchEmailChanges"
              v-if="activateEdit"
              type="email"
              class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl text-black"
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
                  class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl inline-block text-black"
                  v-model="password"
                />
              </p>
            </div>

            <h3 class="font-semibold mt-3">Country:</h3>
            <p
              v-if="!activateEdit"
              class="mt-2 bg-gray-100 px-2 py-1 rounded-xl dark:bg-transparent"
            >
              {{ userPrefs.country }}
            </p>
            <input
              v-if="activateEdit"
              class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl text-black"
              v-model="country"
            />
            <h3 class="font-semibold mt-3">Github:</h3>
            <p
              v-if="!activateEdit"
              class="mt-2 bg-gray-100 px-2 py-1 rounded-xl dark:bg-transparent"
            >
              {{ userPrefs.github }}
            </p>
            <input
              v-if="activateEdit"
              class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl text-black"
              v-model="github"
            />
            <h3 class="font-semibold mt-3">Twitter:</h3>
            <p
              v-if="!activateEdit"
              class="mt-2 bg-gray-100 px-2 py-1 rounded-xl dark:bg-transparent"
            >
              {{ userPrefs.twitter }}
            </p>
            <input
              v-if="activateEdit"
              class="mt-2 bg-white border-black border px-2 py-1 w-full rounded-xl text-black"
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

    this.checkIfProfilePic();

    this.loadPage();
  },
  methods: {
    // If profile pic exsists already in a bucket (delete then update)
    async updateProfilePic() {
      if (this.profilePic) {
        deleteBucket(this.id).then((response) => {
          console.log("deleted pic");
          this.makeBucket();
        });
      }
      // If it doesn't exsist, make a bucket and a profile pic
      this.makeBucket();
    },

    // Finally working
    // Making a bucket with a file for the new profile picture
    async makeBucket() {
      this.isLoading = true;
      let bucket_id = this.userId;
      let bucket_name = this.userprofile.name;
      this.selectedPicName = this.selectedPic.name;
      let fileName = this.selectedPicName.replace(/[^a-zA-Z0-9]+/g, "");
      try {
        await createBucket(bucket_id, bucket_name).then((response) => {
          console.log("created pic");
          appwrite.storage.createFile(
            this.userId, //bucket id
            fileName, //file id ( file id = name of the file in input )
            this.selectedPic,
            ["role:all"]
          );
        });
        this.isLoading = false;
        console.log("finding pic");
        this.checkIfProfilePic();

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    // Check if the user has a profile pic, if not display appwrite initials
    async checkIfProfilePic() {
      this.userId = this.id;
      try {
        //Using Node SDK to fetch all files (images) in the desired bucket
        await getFiles(this.userId).then(
          (response) => {
            //If file is 404 then show avatar
            if (response.code) {
              this.profilePic = null;
              this.getAvatar();
              console.log("pic not found");
            } else {
              let files = response.files;
              for (const file of files) {
                this.extractHref(file);
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
        return true;
      } catch (error) {
        return false;
      }
    },

    async extractHref(file) {
      console.log("found pic");
      let result = await appwrite.storage.getFilePreview(this.userId, file.$id);
      let userProfilePic = result.href;
      this.profilePic = userProfilePic;
      return true;
    },

    async getAvatar() {
      try {
        let result = appwrite.avatars.getInitials(this.userprofile.name);
        this.profilePic = result;
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
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
    async updateAccount() {
      // Update name

      await this.updateName();

      // Update Email if any changes occured in email input
      await this.updateEmail();

      // Update profile img if any changes occured in img input
      if (this.selectedPic) {
        await this.updateProfilePic();
      }

      // Update bio, country, twitter, github
      await this.updatePrefs();

      this.activateEdit = false;
    },
    async updateName() {
      try {
        await appwrite.account.updateName(this.name);
        this.userprofile.name = this.name;
      } catch (error) {
        console.log(error);
      }
    },

    // Update prefs for immediate display on edit
    async updatePrefs() {
      try {
        await appwrite.account.updatePrefs({
          bio: this.bio,
          country: this.country,
          github: this.github,
          twitter: this.twitter,
        });

        this.userPrefs.bio = this.bio;
        this.userPrefs.country = this.country;
        this.userPrefs.github = this.github;
        this.userPrefs.twitter = this.twitter;
      } catch (error) {
        console.log(error);
      }
    },
    async updateEmail() {
      if (this.userprofile.email !== this.email) {
        try {
          await appwrite.account.updateEmail(this.email, this.password);
          this.userprofile.email = this.email;
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
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
