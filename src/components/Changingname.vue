<template>
  <div class="mask inline-flex justify-center items-start">
    <span class="spanspecial" data-show>Creative</span>
    <span class="spanspecial">innovative</span>
    <span class="spanspecial">inventive</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repeat: true,
      changeInterval: null,
    };
  },
  mounted() {
    this.changeNames();
  },
  unmounted() {
    clearInterval(this.changeInterval);
  },

  methods: {
    changeNames() {
      this.changeInterval = setInterval(function () {
        const show = document.querySelector(".spanspecial[data-show]");
        const next =
          show.nextElementSibling ||
          document.querySelector(".spanspecial:first-child");
        const up = document.querySelector(".spanspecial[data-up]");

        if (up) {
          up.removeAttribute("data-up");
        }

        show.removeAttribute("data-show");
        show.setAttribute("data-up", "");

        next.setAttribute("data-show", "");
      }, 2000);
    },
  },
};
</script>

<style scoped>
.mask {
  height: 39px;
  width: 10rem;
  position: relative;
  overflow: hidden;
}

.mask span {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 100px;

  background-size: 100% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-repeat: no-repeat;
}

.mask span[data-show] {
  transform: translateY(-100%);
  transition: 0.5s transform ease-in-out;
}

.mask span[data-up] {
  transform: translateY(-200%);
  transition: 0.5s transform ease-in-out;
}

.mask span:nth-child(1) {
  background-image: linear-gradient(45deg, #0ecffe 50%, #07a6f1);
}

.mask span:nth-child(2) {
  background-image: linear-gradient(45deg, #18e198 50%, #0ec15d);
}

.mask span:nth-child(3) {
  background-image: linear-gradient(45deg, #6b58ff 50%, #3724ce);
}
</style>
