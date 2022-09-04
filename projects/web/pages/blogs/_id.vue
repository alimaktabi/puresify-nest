<template>
  <v-container v-if="blog.id">
    <v-row class="text-center">
      <v-col cols="12" md="5">
        <v-img
          :src="constants.API_HOST + '/' + blog.media.path"
          class="mb-5"
        ></v-img>
      </v-col>

      <v-col cols="12" md="7">
        <v-card outlined class="pl-3 pr-3">
          <v-subheader inset>جزییات</v-subheader>
          <v-list-item
            v-for="(folder, i) in folders"
            :key="i"
          >
            <v-list-item-avatar>
              <v-icon
                class="grey lighten-1"
                dark
                v-text="folder.icon"
              >
              </v-icon>
            </v-list-item-avatar>

            <v-list-item
              style="font-weight: bold"
              v-text="folder.title"
            ></v-list-item>

            <v-list-item-title
              v-text="folder.name(blog)"
            ></v-list-item-title>
          </v-list-item>
          <nuxt-link to="/blogPurchase"
            ><v-btn
              class="primary"
              style="margin-bottom: 28px; margin-top: 28px"
              >افزودن به سبد خرید</v-btn
            ></nuxt-link
          >
        </v-card>
      </v-col>

      <v-col cols="12" md="12" style="text-align: justify">
        {{ blog.description }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'blog',
  data: () => ({
    blog: {},
    constants: {
      API_HOST: process.env.API_HOST,
    },
    folders: [
      {
        title: 'عنوان دوره',
        name: (target) => target.title,
        icon: 'mdi-backburger',
      },
      {
        title: 'مدرس دوره',
        name: (target) =>
          target.user.firstName +
          ' ' +
          target.user.lastName,
        icon: 'mdi-account-tie',
      },
      {
        title: 'مدت زمان دوره',
        name: (target) => target.priceAsMinutes + ' دقیقه ',
        icon: 'mdi-clock-time-nine',
      },
    ],
  }),
  methods: {
    getBlog() {
      this.$axios
        .get('/blogs/' + this.$route.params.id + '/preview')
        .then((res) => {
          console.log(res.data)
          this.blog = res.data
        })
    },
  },
  mounted() {
    this.getBlog()
  },
})
</script>

<style scoped>
.details {
  font-size: 25px;
  margin-top: 20px;
}
</style>
