<template>
  <section class="mt-28 mx-auto mb-10 text-center min-h-screen">
    <!-- Images swiper -->
    <div
      class="mx-auto bg-gradient-to-r from-green-500 via-violet-500 to-blue-700 background-animate shadow-md rounded-xl h-max p-1"
    >
      <div class="bg-blue-50 overflow-hidden shadow-md rounded-xl h-full">
        <Swiper
          :slidesPerView="1"
          :spaceBetween="30"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :modules="modules"
          class="mySwiper"
        >
          <Swiper-slide class=""
            ><img
              class="rounded-xl py-2"
              src="../../assets/images/test2.png"
              alt=""
          /></Swiper-slide>
          <Swiper-slide class=""
            ><img
              class="rounded-xl py-2"
              src="../../assets/images/test2.png"
              alt=""
          /></Swiper-slide>
          <Swiper-slide class=""
            ><img
              class="rounded-xl py-2"
              src="../../assets/images/test2.png"
              alt=""
          /></Swiper-slide>
        </Swiper>
      </div>
    </div>

    <div class="mt-6">
      <h4 class="text-left text-lg font-semibold mb-3">
        Component description:
      </h4>
      <p class="text-left leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad
        odio in quidem quia, quas nihil provident voluptatum laudantium quos
        sint unde eos quam molestias tempore molestiae dolores reiciendis
        repudiandae sequi voluptatem illo. Aliquid ut possimus iure pariatur
        incidunt molestias quibusdam facilis repudiandae, beatae molestiae
        corporis culpa nostrum adipisci velit perferendis voluptate inventore
        magnam asperiores error mollitia qui libero tempora temporibus delectus.
        Aliquam necessitatibus consequuntur consectetur vel praesentium magni
        accusantium ex molestias iure molestiae eius totam quam alias fuga
        reprehenderit vitae, sequi assumenda, neque deserunt voluptates
        repudiandae est cumque illo. Dolorum, blanditiis, quia eius perferendis
        nihil culpa nulla non excepturi tenetur qui minima ut officiis nisi
        reprehenderit, tempore numquam ex nostrum aliquid! Sunt quibusdam nam
        omnis quia iure vel odio assumenda, esse, dolores sequi corporis,
        voluptatum perferendis ut praesentium labore nesciunt saepe voluptatibus
        ea mollitia? Quia, cupiditate amet. Obcaecati, dolore? At reprehenderit
        dolore expedita? Atque quaerat officiis nihil. Ipsum, in ullam nesciunt
        atque culpa facilis reiciendis soluta? Assumenda ullam quaerat sit
        praesentium rem, voluptatum nihil itaque eaque, fugiat molestiae, et
        obcaecati voluptas necessitatibus non laboriosam laborum dicta nemo
        alias iste repellendus ipsa? Voluptatibus vero itaque mollitia provident
        veniam facilis! Enim ab ipsum ducimus consequatur iure quia molestiae
        quas voluptates et libero dignissimos, harum consectetur, aliquid
        veritatis error porro nisi vero qui beatae sed! Sunt odit architecto
        commodi, doloribus unde similique. A eos amet molestiae earum. Tempora
        distinctio minima corrupti ea deserunt aperiam sit enim doloremque
        repellendus architecto! Provident praesentium temporibus vitae ut, omnis
        voluptates magni laudantium ex repellendus eveniet quod, unde
        exercitationem est, dolorem non!
      </p>
    </div>

    <div
      class="mx-auto mt-6 flex-col gap-3 w-fit sm:w-full justify-center sm:justify-between items-center sm:items-stretch sm:gap-0 sm:flex-row bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-xl p-2 flex"
    >
      <div class="flex items-center gap-2 group">
        <router-link to="#">
          <img
            src="../../assets/images/test.jpg"
            class="rounded-full h-12 w-12 border-black border-2 transition-transform group-hover:scale-110 z-50"
            alt=""
          />
        </router-link>
        <router-link to="#">
          <h4 class="font-semibold hover:text-blue-500 text-sm sm:text-base">
            Mostafa Said
          </h4>
        </router-link>
      </div>
      <Infobtn class="max-w-fit cursor-pointer">
        <div
          class="flex justify-center items-center gap-1 text-sm sm:text-base"
        >
          <span
            ><img
              src="../../assets/images/github.png"
              alt=""
              class="inline-block sm:w-10 w-6"
          /></span>
          Github
        </div></Infobtn
      >
    </div>
    <Addcomment class="mt-6" />
  </section>
</template>

<script>
import { appwrite } from "../../utils";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import Infobtn from "../buttons/Infobtn.vue";
import Addcomment from "../Addcomment.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    Infobtn,
    Addcomment,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  data() {
    return {
      componentId: false,
      collectionId: false,
      currentComponent: null,
    };
  },
  mounted() {
    this.getComponentDetails();
  },
  methods: {
    // Getting component details from params and passed to appwrite
    getComponentDetails() {
      this.componentId = this.$route.params.id;
      this.collectionId = this.$route.params.colname;

      // Getting the document by Collection ID and Component ID
      let promise = appwrite.database.getDocument(
        this.collectionId,
        this.componentId
      );

      promise.then((response) => {
        this.currentComponent = response;
        console.log(this.currentComponent);
      });
    },
  },
};
</script>

<style scoped>
.background-animate {
  background-size: 400%;
  -webkit-animation: gradColor 3s ease infinite;
  -moz-animation: gradColor 3s ease infinite;
  animation: gradColor 3s ease infinite;
}

@keyframes gradColor {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 70%;
  height: 70%;
  object-fit: cover;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}
</style>
