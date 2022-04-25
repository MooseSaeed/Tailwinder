<template>
  <div
    class="card-wrap"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="card"
  >
    <div
      class="card relative flex justify-center items-center rounded-xl w-64 h-72"
      :style="cardStyle"
    >
      <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
      <div class="card-info self-end lg:self-auto">
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ["dataImage"],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null,
    screenSize: "",
  }),

  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 40;
      const rY = this.mousePY * -40;
      this.screenSize = window.innerHeight = window.innerWidth;
      if (this.screenSize >= 1024) {
        return {
          transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
        };
      }
      if (this.screenSize >= 1024) {
        ("");
      }
    },
    cardBgTransform() {
      this.screenSize = window.innerHeight = window.innerWidth;
      const tX = this.mousePX * -30;
      const tY = this.mousePY * -30;
      if (this.screenSize >= 1024) {
        return {
          transform: `translateX(${tX}px) translateY(${tY}px)`,
        };
      }
      if (this.screenSize >= 1024) {
        ("");
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`,
      };
    },
  },

  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0;
        this.mouseY = 0;
      }, 100);
    },
  },
};
</script>

<style></style>
