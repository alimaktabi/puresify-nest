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
          <v-btn
            @click="purchaseBlog"
            class="primary"
            v-if="!blog.owned"
            :loading="loading"
            :disabled="loading"
            style="margin-bottom: 28px; margin-top: 28px"
            >افزودن به سبد خرید</v-btn
          >
          <v-btn
            v-else
            style="margin-bottom: 28px; margin-top: 28px"
            class="primary"
            disabled
          >
            خریداری شده
          </v-btn>
          <v-btn
            @click="Delete()"
            style="background-color: lightcoral"
            v-if="$store.state.auth.userData?.roles.includes(1)"
          >
            حذف کردن
          </v-btn>
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
    loading: false,
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
    purchaseBlog() {
      this.loading = true
      this.$axios
        .post(
          '/blogs/' + this.$route.params.id + '/purchase',
        )
        .then((res) => {
          this.$toast.success('مقاله خریده شد')
          this.$store.dispatch('auth/fetchAuth')
        })
        .catch(() => {
          this.loading = false
        })
    },
    Delete(){
      this.$axios.delete("/blogs/" + this.$route.params.id)
      .then((res) => {
        this.$router.push("/")
      })
    }
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
