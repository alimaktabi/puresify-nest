<template>
  <div class="d-flex">
    <v-card class="filter pa-4">
      <h4>فیلتر جستجو</h4>
      <div
        class="d-flex flex-column mt-5 align-center justify-center"
      >
        <div
          class="mt-1 w-100"
          v-for="(blog, i) in blogs"
          :key="i"
        >
          <v-btn
            class="w-100"
            text
            @click="selectedIndex = i"
            :color="selectedIndex === i ? 'primary' : ''"
          >
            {{ blog }}
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-row class="pa-3">
      <v-col
        v-for="(blog, i) in data.blogs"
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
            <v-btn color="primary"> مشاهده </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'blogs',
  data: () => ({
    blogs: ['همه', 'مقالات متنی', 'پادکست', 'ویدیو'],
    selectedIndex: 0,
    data: {
      blogs: [],
      total: 0,
    },
    constants: {
      API_HOST: process.env.API_HOST,
    },
  }),
  methods: {
    getData() {
      this.$axios.get('/blogs').then((res) => {
        this.data.blogs = res.data.blogs
        this.data.total = res.data.total
      })
      // TODO: implement this
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
