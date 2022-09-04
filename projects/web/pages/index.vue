<template>
  <div>
    <v-carousel hide-delimiters class="rounded v-carousel">
      <v-carousel-item
        reverse-transition="fade-transition"
        v-for="(image, i) in images"
        :key="i"
        :src="image"
      >
        <!-- <v-sheet height="100%" tile>
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h2"></div>
          </v-row>
        </v-sheet> -->
      </v-carousel-item>
    </v-carousel>

    <section class="blogs mt-10">
      <Blogs />
    </section>
  </div>
</template>

<style scoped>
.v-carousel {
  max-width: 1500px;
  margin: auto;
}
</style>

<script>
import Blogs from '~/components/blogs.vue'
export default {
  name: 'IndexPage',
  data: () => ({
    images: ['/web-bg.webp', '/web-dvp.png'],
  }),
  components: { Blogs },
}
</script>
