<template>
  <main
    class="flex md:flex-row flex-col justify-between items-center h-screen px-10 md:px-16 pt-16 gap-10"
  >
    <header class="basis-full order-2 md:-order-none">
      <h1 class="text-blue-500 font-bold text-3xl leading-relaxed">
        An open source tool for creative tailwinders.
      </h1>
      <p class="text-white text-lg">
        Create the best button design patterns for your website. Sign up to be
        able to save your favourite patterns in your profile or publish you
        creative patterns to the word.
      </p>
      <div class="flex items-center mt-5 max-w-sm">
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Tailwinder Tool
          </span>
        </button>
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-slate-400 to-blue-900 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Explore Community
          </span>
        </button>
      </div>
    </header>
    <div
      class="bg-blue-500 w-72 h-72 basis-4/5 order-1 md:-order-none mt-16 md:mt-0"
    ></div>
  </main>
</template>

<script>
export default {
  name: "Homepage",
};
</script>

<style>
main {
  background-color: #00575e;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23093258'/%3E%3Cstop offset='1' stop-color='%23093258' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230a1556'/%3E%3Cstop offset='1' stop-color='%230a1556' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2323134f'/%3E%3Cstop offset='1' stop-color='%2323134f' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2300575E'/%3E%3Cstop offset='1' stop-color='%2300575E' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23121952'/%3E%3Cstop offset='1' stop-color='%23121952' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2338144D'/%3E%3Cstop offset='1' stop-color='%2338144D' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
</style>
