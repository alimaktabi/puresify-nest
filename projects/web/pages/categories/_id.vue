<template>
  <div>
    <v-card v-if="category.name" class="ma-3 pa-4">
      {{ category.name }}
    </v-card>
    <v-row class="mt-6 pa-6">
      <v-col
        v-for="(blog, i) in category.blogs"
        :key="i"
        cols="4"
      >
        <v-card
          class="pa-4 fill-height d-flex flex-column justify-space-between"
        >
          <h4>{{ blog.title }}</h4>
          <div class="mt-5 blog">
            <img
              :src="
                constants.API_HOST + '/' + blog.media.path
              "
              :alt="blog.media.alt"
            />
            <v-btn class="d-flex ma-2 align-center">
              <v-icon>mdi-clock</v-icon>
              <span class="mr-5">
                {{ blog.priceAsMinutes }}
                دقیقه
              </span>
            </v-btn>
          </div>
          <small
            >انتشار داده شده در
            {{
              new Date(blog.publishAt).toLocaleDateString()
            }}</small
          >
          <div class="text-left mt-4">
            <NuxtLink :to="`/blogs/${blog.id}`">
              <v-btn color="primary"> مشاهده </v-btn>
            </NuxtLink>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'category',
  data: () => ({
    category: {},
    constants: {
      API_HOST: process.env.API_HOST,
    },
  }),
  methods: {
    getData() {
      this.$axios
        .get('/categories/' + this.$route.params.id)
        .then((res) => {
          this.category = res.data
        })
    },
  },
  created() {
    this.getData()
  },
})
</script>

<style scoped>
.blog img {
  width: 100%;
}
.w-100 {
  width: 100%;
}
</style>
