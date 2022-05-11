<template>
  <main class="min-h-screen flex justify-center items-center">
    <div class="flex flex-col justify-center items-center sm:mt-8 mt-20">
      <div class="max-w-72 order-1 md:-order-none">
        <div
          class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl animate__animated animate__flipInX"
        >
          <Tailwinder />
        </div>
      </div>
      <section class="order-2 md:-order-none p-2">
        <header
          class="py-2 overflow-hidden flex flex-col justify-center items-center"
        >
          <h1
            class="dark:text-white text-center text-black font-bold text-3xl leading-relaxed animate__animated animate__bounceInUp"
          >
            <div class="text-center">
              <p>
                Open source Community for
                <span class="inline">
                  <keep-alive>
                    <Changingname />
                  </keep-alive> </span
                >tailwinders.
              </p>
            </div>
          </h1>
          <p
            class="mt-5 text-lg dark:text-white text-center max-w-lg text-black animate__animated animate__bounceInUp animate__slow"
          >
            This is the right place for you if you love using TailwindCSS to
            create interresting stuff. Feel free to contribute and interact with
            fellow tailwinders.
          </p>
        </header>
        <footer>
          <div
            class="flex flex-col sm:flex-row gap-4 items-center justify-center overflow-hidden py-5 px-2"
          >
            <router-link
              to="/tools"
              class="animate__animated animate__bounceInUp animate__delay-1s"
            >
              <Primarybtn class="text-sm sm:text-base">
                Tailwinder Tools
              </Primarybtn>
            </router-link>
            <router-link
              class="ml-3 animate__animated animate__bounceInUp animate__slow animate__delay-1s"
              to="/components"
            >
              <Secondarybtn class="text-sm sm:text-base">
                Explore Components
              </Secondarybtn>
            </router-link>
          </div>
        </footer>
      </section>
    </div>
  </main>
</template>

<script>
import Primarybtn from "../buttons/Primarybtn.vue";
import Secondarybtn from "../buttons/Secondarybtn.vue";
import Changingname from "../Changingname.vue";
import Tailwinder from "../Tailwinder.vue";
export default {
  name: "Homepage",
  components: {
    Primarybtn,
    Secondarybtn,
    Changingname,
    Tailwinder,
  },
};
</script>

<style></style>
