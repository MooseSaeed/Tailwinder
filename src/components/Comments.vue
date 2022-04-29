<template>
  <section>
    <div
      class="bg-gradient-to-r max-w-xl from-green-500 via-violet-500 to-blue-700 background-animate shadow-md rounded-xl h-max p-1"
    >
      <div
        class="text-black flex flex-col bg-blue-50 bg-option7 p-6 rounded-xl"
      >
        <header class="items-center flex">
          <img
            src="../assets/images/test.jpg"
            class="rounded-full h-12 w-12 mr-2"
            alt="User Avatar"
          />
          <h5 class="text-black">
            <span class="font-semibold hover:text-blue-500 cursor-pointer">
              <router-link to="#">{{ store.userprofile.name }}</router-link>
            </span>
            Said:
          </h5>
        </header>

        <div
          class="rounded-xl w-full text-sm outline-none border-none text-left mt-2"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            cumque nemo quaerat aperiam obcaecati aliquid, animi provident alias
            nesciunt ullam ad magnam fuga at iure incidunt reprehenderit
            suscipit voluptatem excepturi tempora officiis sint! Sed cumque
            dolorem corrupti voluptatum excepturi quo eveniet id facilis amet
            at! Corrupti veritatis modi quaerat iusto perferendis ab, obcaecati
            sed quasi non, ex temporibus. Voluptates culpa delectus accusantium
            voluptatum nobis molestiae, rem excepturi, vero inventore laboriosam
            cum praesentium hic quam suscipit iure animi fuga ullam officiis
            cumque laborum. Tenetur impedit iste fugit sed illo nemo aspernatur
            repellendus nostrum nobis quo repudiandae modi, dicta tempora cumque
            enim hic. Incidunt molestiae, eaque magnam eos atque expedita rerum
            suscipit voluptas maiores beatae sed quis sunt labore nobis ab quae.
            Dolorem sunt labore harum quia ex voluptates eaque dolor
            accusantium, ipsa voluptate odio illum. Laudantium, eaque sint,
            sapiente culpa quaerat nihil voluptate delectus distinctio ad ut
            maxime porro voluptas a doloremque laborum asperiores vitae neque
            non excepturi odit nemo vero dolorum? Fugit veritatis harum corporis
            repudiandae eius quo commodi, fugiat porro accusantium asperiores,
            saepe nihil dignissimos vero consequuntur! Numquam beatae rem sunt
            libero temporibus nulla similique nam! Distinctio harum enim
            cupiditate maxime voluptate delectus doloremque vitae laudantium
            reprehenderit, laboriosam tempore.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from "../store";

export default {
  components: {},
  data: () => {
    return {
      store,
    };
  },
};
</script>

<style></style>
