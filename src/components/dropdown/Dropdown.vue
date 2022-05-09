<template>
  <div
    class="relative group"
    v-click-outside="onClickOutside"
    @click="showCategories"
  >
    <button
      class="flex max-h-52 overflow-auto py-2 pl-3 text-sm font-semibold lg:inline-flex w-28 h-8"
    >
      <div
        class="rounded-full flex justify-center items-center overflow-hidden -top-1.5 mx-auto left-3 absolute h-12 w-12 ring-offset-2 ring-offset-black ring-2 ring-white transition-transform group-hover:scale-110"
      >
        <div
          class="relative w-14 h-14 flex-col flex justify-center items-center"
        >
          <img
            class="animate__animated object-cover flex-1 animate__pulse animate__repeat-2"
            :src="profilePic"
            alt=""
          />
        </div>
      </div>

      <svg
        class="absolute"
        :class="
          sharedState
            ? '-rotate-90 transform transition duration-500 ease-in-out'
            : 'rotate-90 transform transition duration-500 ease-in-out'
        "
        style="right: 12px"
        width="22"
        height="22"
        viewBox="0 0 22 22"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            stroke="#000"
            stroke-opacity=".012"
            stroke-width=".5"
            d="M21 1v20.16H.84V1z"
          ></path>
          <path
            fill="#222"
            d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z"
          ></path>
        </g>
      </svg>
    </button>

    <slot />
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
import { appwrite } from "../../utils";
import { getFiles } from "../../services/bucketsService";
import { ref, provide } from "vue";
export default {
  name: "Dropdown",
  props: ["title", "userId", "userName"],
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      profilePic: null,
    };
  },
  mounted() {
    this.checkForProfilePic();
  },
  methods: {
    checkForProfilePic() {
      //Using Node SDK to fetch all files (images) in the desired bucket
      getFiles(this.userId).then(
        (response) => {
          if (response.code == 404) {
            this.profilePic = null;
            this.picExsists = false;
            this.getAvatar();
          } else {
            for (const file of response.files) {
              let result = appwrite.storage.getFilePreview(
                this.userId,
                file.$id
              );
              this.picExsists = true;
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
      let result = appwrite.avatars.getInitials(this.userName);

      this.profilePic = result;
    },
  },
  setup() {
    const sharedState = ref(false);

    const showCategories = () => {
      sharedState.value = !sharedState.value;
    };

    const onClickOutside = (event) => {
      sharedState.value = false;
    };

    provide("sharedState", sharedState);

    return {
      sharedState,
      showCategories,
      onClickOutside,
    };
  },
};
</script>

<style></style>
