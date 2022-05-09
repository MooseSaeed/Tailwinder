<template>
  <nav
    class="bg-slate-900/25 backdrop-blur-md md:px-0 py-4 w-full fixed z-50 top-0"
  >
    <div
      class="max-w-7xl px-5 md:px-10 flex flex-wrap justify-between items-center mx-auto"
    >
      <router-link to="/" class="flex items-center">
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Tailwinder</span
        >
      </router-link>
      <div class="flex items-center md:order-2">
        <div class="font-semibold" v-if="!store.userprofile">
          <router-link
            class="hover:text-blue-500 dark:text-white font-semibold"
            to="/auth"
          >
            SIGN UP / LOGIN
          </router-link>
        </div>

        <div
          v-if="store.userprofile"
          class="text-sm bg-gradient-to-r from-green-400 to-blue-500 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <Dropdown
            :userId="store.userprofile.$id"
            :userName="store.userprofile.name"
          >
            <Dropdowncontent>
              <div class="ml-2 text-sm">
                <router-link
                  :to="{
                    name: 'UserProfile',
                    params: { id: store.userprofile.$id },
                  }"
                >
                  <p class="cursor-pointer hover:text-white transition-colors">
                    <Dropdownitems category="Profile"></Dropdownitems>
                  </p>
                </router-link>

                <p
                  @click="logout"
                  class="cursor-pointer hover:text-white transition-colors"
                >
                  <Dropdownitems category="Logout"></Dropdownitems>
                </p>
              </div>
            </Dropdowncontent>
          </Dropdown>
        </div>

        <button
          @click="navToggle"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            v-if="!toggle"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            v-if="toggle"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        id="mobile-menu"
        class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
      >
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li>
            <router-link
              :class="{ 'md:text-blue-500': $route.path === '/' }"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              to="/"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link
              :class="{ 'md:text-blue-500': $route.path === '/tools' }"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              to="/tools"
            >
              Tools
            </router-link>
          </li>
          <li>
            <router-link
              :class="{ 'md:text-blue-500': $route.path === '/components' }"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              to="/components"
            >
              Components
            </router-link>
          </li>
          <li>
            <router-link
              @mouseover="fireWorks"
              @mouseleave="noFireWorks"
              :class="{ 'md:text-blue-500': $route.path === '/addcomponent' }"
              class="relative block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              to="/addcomponent"
            >
              <p
                class="hover:text-transparent hover:font-bold hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate"
              >
                Add Component
              </p>
              <div id="firstFire" class="">
                <div id="secondFire" class=""></div>
                <div id="thirdFire" class=""></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { appwrite } from "../utils";
import Dropdown from "./dropdown/Dropdown.vue";
import Dropdowncontent from "./dropdown/Dropdowncontent.vue";
import Dropdownitems from "./dropdown/Dropdownitems.vue";
import { store } from "../store.js";

export default {
  components: {
    Dropdown,
    Dropdowncontent,
    Dropdownitems,
  },
  data() {
    return {
      store,
      toggle: false,
    };
  },
  mounted() {
    this.checkLogin();
  },

  methods: {
    fireWorks() {
      const firstFire = document.querySelector("#firstFire");
      const secondFire = document.querySelector("#secondFire");
      const thirdFire = document.querySelector("#thirdFire");

      firstFire.classList.add("pyro");
      secondFire.classList.add("before");
      thirdFire.classList.add("after");
    },
    noFireWorks() {
      const firstFire = document.querySelector("#firstFire");
      const secondFire = document.querySelector("#secondFire");
      const thirdFire = document.querySelector("#thirdFire");

      firstFire.classList.remove("pyro");
      secondFire.classList.remove("before");
      thirdFire.classList.remove("after");
    },
    async checkLogin() {
      try {
        const response = await appwrite.account.get();
        store.userprofile = response;
      } catch (err) {
        if (err == "Error: Unauthorized") return;
      }
    },
    logout() {
      store.userprofile = false;
      appwrite.account.deleteSession("current");
      this.$router.push("/");
    },
    navToggle() {
      this.toggle = !this.toggle;
      if (this.toggle) {
        document.getElementById("mobile-menu").classList.remove("hidden");
      } else {
        document.getElementById("mobile-menu").classList.add("hidden");
      }
    },
  },
};
</script>

<style scoped>
.pyro > .before,
.pyro > .after {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff;
  -moz-animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -webkit-animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -o-animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -ms-animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
}

.pyro > .after {
  -moz-animation-delay: 1.25s, 1.25s, 1.25s;
  -webkit-animation-delay: 1.25s, 1.25s, 1.25s;
  -o-animation-delay: 1.25s, 1.25s, 1.25s;
  -ms-animation-delay: 1.25s, 1.25s, 1.25s;
  animation-delay: 1.25s, 1.25s, 1.25s;
  -moz-animation-duration: 1.25s, 1.25s, 6.25s;
  -webkit-animation-duration: 1.25s, 1.25s, 6.25s;
  -o-animation-duration: 1.25s, 1.25s, 6.25s;
  -ms-animation-duration: 1.25s, 1.25s, 6.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
}

@-webkit-keyframes bang {
  to {
    box-shadow: 22px -44.6666666667px #ee00ff, 188px -64.6666666667px #ff0091,
      -118px -58.6666666667px #002bff, 250px -221.6666666667px #aaff00,
      231px 26.3333333333px #ff5100, 70px 42.3333333333px #00fff7,
      27px -223.6666666667px #00f2ff, 21px 16.3333333333px #9d00ff,
      187px -228.6666666667px #0055ff, 74px -59.6666666667px #ff6200,
      -127px -363.6666666667px #aeff00, -101px -234.6666666667px #ff00bb,
      28px -325.6666666667px #00b3ff, 76px -216.6666666667px #aaff00,
      -11px -94.6666666667px #aeff00, 37px 64.3333333333px #5500ff,
      63px -209.6666666667px #0004ff, 66px -83.6666666667px #aaff00,
      -27px -270.6666666667px #00ffb3, -186px 5.3333333333px #ff00ee,
      238px -33.6666666667px #00ff6a, 16px -69.6666666667px #fff200,
      249px 15.3333333333px #ff8800, 43px -122.6666666667px #bb00ff,
      203px -244.6666666667px #00ffa2, 10px -294.6666666667px #d000ff,
      -209px -222.6666666667px #ff00a2, -120px -358.6666666667px #dd00ff,
      71px -234.6666666667px #ffd900, -73px -210.6666666667px #ffd000,
      242px -308.6666666667px #ff009d, 96px -400.6666666667px #51ff00,
      125px -383.6666666667px lime, -84px -275.6666666667px aqua,
      42px -345.6666666667px #00ff8c, 139px -59.6666666667px #00a6ff,
      -155px -232.6666666667px #c4ff00, -56px 42.3333333333px #a600ff,
      27px 15.3333333333px #0055ff, -104px -378.6666666667px #fb00ff,
      177px -357.6666666667px #ff5900, -90px -54.6666666667px #ff2f00,
      128px 34.3333333333px #00ff9d, -235px 38.3333333333px #003cff,
      214px -216.6666666667px #9500ff, -39px -323.6666666667px #00fffb,
      122px -296.6666666667px #00c8ff, 105px -193.6666666667px #00e1ff,
      140px -262.6666666667px red, -106px -22.6666666667px darkorange,
      -249px -212.6666666667px #00e6ff;
  }
}
@-moz-keyframes bang {
  to {
    box-shadow: 22px -44.6666666667px #ee00ff, 188px -64.6666666667px #ff0091,
      -118px -58.6666666667px #002bff, 250px -221.6666666667px #aaff00,
      231px 26.3333333333px #ff5100, 70px 42.3333333333px #00fff7,
      27px -223.6666666667px #00f2ff, 21px 16.3333333333px #9d00ff,
      187px -228.6666666667px #0055ff, 74px -59.6666666667px #ff6200,
      -127px -363.6666666667px #aeff00, -101px -234.6666666667px #ff00bb,
      28px -325.6666666667px #00b3ff, 76px -216.6666666667px #aaff00,
      -11px -94.6666666667px #aeff00, 37px 64.3333333333px #5500ff,
      63px -209.6666666667px #0004ff, 66px -83.6666666667px #aaff00,
      -27px -270.6666666667px #00ffb3, -186px 5.3333333333px #ff00ee,
      238px -33.6666666667px #00ff6a, 16px -69.6666666667px #fff200,
      249px 15.3333333333px #ff8800, 43px -122.6666666667px #bb00ff,
      203px -244.6666666667px #00ffa2, 10px -294.6666666667px #d000ff,
      -209px -222.6666666667px #ff00a2, -120px -358.6666666667px #dd00ff,
      71px -234.6666666667px #ffd900, -73px -210.6666666667px #ffd000,
      242px -308.6666666667px #ff009d, 96px -400.6666666667px #51ff00,
      125px -383.6666666667px lime, -84px -275.6666666667px aqua,
      42px -345.6666666667px #00ff8c, 139px -59.6666666667px #00a6ff,
      -155px -232.6666666667px #c4ff00, -56px 42.3333333333px #a600ff,
      27px 15.3333333333px #0055ff, -104px -378.6666666667px #fb00ff,
      177px -357.6666666667px #ff5900, -90px -54.6666666667px #ff2f00,
      128px 34.3333333333px #00ff9d, -235px 38.3333333333px #003cff,
      214px -216.6666666667px #9500ff, -39px -323.6666666667px #00fffb,
      122px -296.6666666667px #00c8ff, 105px -193.6666666667px #00e1ff,
      140px -262.6666666667px red, -106px -22.6666666667px darkorange,
      -249px -212.6666666667px #00e6ff;
  }
}
@-o-keyframes bang {
  to {
    box-shadow: 22px -44.6666666667px #ee00ff, 188px -64.6666666667px #ff0091,
      -118px -58.6666666667px #002bff, 250px -221.6666666667px #aaff00,
      231px 26.3333333333px #ff5100, 70px 42.3333333333px #00fff7,
      27px -223.6666666667px #00f2ff, 21px 16.3333333333px #9d00ff,
      187px -228.6666666667px #0055ff, 74px -59.6666666667px #ff6200,
      -127px -363.6666666667px #aeff00, -101px -234.6666666667px #ff00bb,
      28px -325.6666666667px #00b3ff, 76px -216.6666666667px #aaff00,
      -11px -94.6666666667px #aeff00, 37px 64.3333333333px #5500ff,
      63px -209.6666666667px #0004ff, 66px -83.6666666667px #aaff00,
      -27px -270.6666666667px #00ffb3, -186px 5.3333333333px #ff00ee,
      238px -33.6666666667px #00ff6a, 16px -69.6666666667px #fff200,
      249px 15.3333333333px #ff8800, 43px -122.6666666667px #bb00ff,
      203px -244.6666666667px #00ffa2, 10px -294.6666666667px #d000ff,
      -209px -222.6666666667px #ff00a2, -120px -358.6666666667px #dd00ff,
      71px -234.6666666667px #ffd900, -73px -210.6666666667px #ffd000,
      242px -308.6666666667px #ff009d, 96px -400.6666666667px #51ff00,
      125px -383.6666666667px lime, -84px -275.6666666667px aqua,
      42px -345.6666666667px #00ff8c, 139px -59.6666666667px #00a6ff,
      -155px -232.6666666667px #c4ff00, -56px 42.3333333333px #a600ff,
      27px 15.3333333333px #0055ff, -104px -378.6666666667px #fb00ff,
      177px -357.6666666667px #ff5900, -90px -54.6666666667px #ff2f00,
      128px 34.3333333333px #00ff9d, -235px 38.3333333333px #003cff,
      214px -216.6666666667px #9500ff, -39px -323.6666666667px #00fffb,
      122px -296.6666666667px #00c8ff, 105px -193.6666666667px #00e1ff,
      140px -262.6666666667px red, -106px -22.6666666667px darkorange,
      -249px -212.6666666667px #00e6ff;
  }
}
@-ms-keyframes bang {
  to {
    box-shadow: 22px -44.6666666667px #ee00ff, 188px -64.6666666667px #ff0091,
      -118px -58.6666666667px #002bff, 250px -221.6666666667px #aaff00,
      231px 26.3333333333px #ff5100, 70px 42.3333333333px #00fff7,
      27px -223.6666666667px #00f2ff, 21px 16.3333333333px #9d00ff,
      187px -228.6666666667px #0055ff, 74px -59.6666666667px #ff6200,
      -127px -363.6666666667px #aeff00, -101px -234.6666666667px #ff00bb,
      28px -325.6666666667px #00b3ff, 76px -216.6666666667px #aaff00,
      -11px -94.6666666667px #aeff00, 37px 64.3333333333px #5500ff,
      63px -209.6666666667px #0004ff, 66px -83.6666666667px #aaff00,
      -27px -270.6666666667px #00ffb3, -186px 5.3333333333px #ff00ee,
      238px -33.6666666667px #00ff6a, 16px -69.6666666667px #fff200,
      249px 15.3333333333px #ff8800, 43px -122.6666666667px #bb00ff,
      203px -244.6666666667px #00ffa2, 10px -294.6666666667px #d000ff,
      -209px -222.6666666667px #ff00a2, -120px -358.6666666667px #dd00ff,
      71px -234.6666666667px #ffd900, -73px -210.6666666667px #ffd000,
      242px -308.6666666667px #ff009d, 96px -400.6666666667px #51ff00,
      125px -383.6666666667px lime, -84px -275.6666666667px aqua,
      42px -345.6666666667px #00ff8c, 139px -59.6666666667px #00a6ff,
      -155px -232.6666666667px #c4ff00, -56px 42.3333333333px #a600ff,
      27px 15.3333333333px #0055ff, -104px -378.6666666667px #fb00ff,
      177px -357.6666666667px #ff5900, -90px -54.6666666667px #ff2f00,
      128px 34.3333333333px #00ff9d, -235px 38.3333333333px #003cff,
      214px -216.6666666667px #9500ff, -39px -323.6666666667px #00fffb,
      122px -296.6666666667px #00c8ff, 105px -193.6666666667px #00e1ff,
      140px -262.6666666667px red, -106px -22.6666666667px darkorange,
      -249px -212.6666666667px #00e6ff;
  }
}
@keyframes bang {
  to {
    box-shadow: 22px -44.6666666667px #ee00ff, 188px -64.6666666667px #ff0091,
      -118px -58.6666666667px #002bff, 250px -221.6666666667px #aaff00,
      231px 26.3333333333px #ff5100, 70px 42.3333333333px #00fff7,
      27px -223.6666666667px #00f2ff, 21px 16.3333333333px #9d00ff,
      187px -228.6666666667px #0055ff, 74px -59.6666666667px #ff6200,
      -127px -363.6666666667px #aeff00, -101px -234.6666666667px #ff00bb,
      28px -325.6666666667px #00b3ff, 76px -216.6666666667px #aaff00,
      -11px -94.6666666667px #aeff00, 37px 64.3333333333px #5500ff,
      63px -209.6666666667px #0004ff, 66px -83.6666666667px #aaff00,
      -27px -270.6666666667px #00ffb3, -186px 5.3333333333px #ff00ee,
      238px -33.6666666667px #00ff6a, 16px -69.6666666667px #fff200,
      249px 15.3333333333px #ff8800, 43px -122.6666666667px #bb00ff,
      203px -244.6666666667px #00ffa2, 10px -294.6666666667px #d000ff,
      -209px -222.6666666667px #ff00a2, -120px -358.6666666667px #dd00ff,
      71px -234.6666666667px #ffd900, -73px -210.6666666667px #ffd000,
      242px -308.6666666667px #ff009d, 96px -400.6666666667px #51ff00,
      125px -383.6666666667px lime, -84px -275.6666666667px aqua,
      42px -345.6666666667px #00ff8c, 139px -59.6666666667px #00a6ff,
      -155px -232.6666666667px #c4ff00, -56px 42.3333333333px #a600ff,
      27px 15.3333333333px #0055ff, -104px -378.6666666667px #fb00ff,
      177px -357.6666666667px #ff5900, -90px -54.6666666667px #ff2f00,
      128px 34.3333333333px #00ff9d, -235px 38.3333333333px #003cff,
      214px -216.6666666667px #9500ff, -39px -323.6666666667px #00fffb,
      122px -296.6666666667px #00c8ff, 105px -193.6666666667px #00e1ff,
      140px -262.6666666667px red, -106px -22.6666666667px darkorange,
      -249px -212.6666666667px #00e6ff;
  }
}
@-webkit-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-moz-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-o-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-ms-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-webkit-keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-moz-keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-o-keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-ms-keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
</style>
