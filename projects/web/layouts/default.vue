<template>
  <v-app dark>
    <v-app-bar fixed app>
      <NuxtLink to="/" class="text-decoration-none">
        <v-toolbar-title v-text="title" />
      </NuxtLink>
      <v-spacer />
      <v-flex>
        <NuxtLink class="text-decoration-none" to="/blogs">
          <v-btn color="primary" text> دوره ها </v-btn>
        </NuxtLink>
        <NuxtLink
          class="text-decoration-none"
          to="/categories"
        >
          <v-btn color="primary" text> دسته بندی ها</v-btn>
        </NuxtLink>
        <v-btn color="primary" text>درباره ما</v-btn>
        <v-btn color="primary" text> تماس با ما</v-btn>
      </v-flex>
      <div
        class="d-flex align-center"
        v-if="$store.state.auth.loggedIn"
      >
        <NuxtLink to="/blogs/create">
          <v-btn
            class="ml-5 p-3"
            outlined
            v-if="
              $store.state.auth.userData.roles.includes(1)
            "
          >
            ساخت مقاله
          </v-btn>
        </NuxtLink>
        <NuxtLink to="/categories/create">
          <v-btn
            class="ml-5 p-3"
            outlined
            v-if="
              $store.state.auth.userData.roles.includes(1)
            "
          >
            ساخت دسته بندی
          </v-btn>
        </NuxtLink>

        <v-btn class="primary ml-5 p-3">
          <v-icon size="20" class="ml-3"
            >mdi-clock-time-four</v-icon
          >
          {{ $store.state.auth.userData.minutes }}
          دقیقه
        </v-btn>
        <nuxt-link to="/profile">
        <v-btn color="primary" icon>
          <v-icon size="30">mdi-account-circle</v-icon>
        </v-btn>
          </nuxt-link>
        <v-btn @click="logout()" style="background-color: lightcoral">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
      <div v-else class="d-flex">
        <v-btn
          @click="
            $router.push(
              '/auth/login?next=' +
                $route.fullPath
                  .replace('/auth/register?next=', '')
                  .replace('/auth/login?next=', ''),
            )
          "
          color="primary"
          class="ml-4"
        >
          ورود
        </v-btn>
        <v-btn
          @click="
            $router.push(
              '/auth/register?next=' +
                $route.fullPath
                  .replace('/auth/register?next=', '')
                  .replace('/auth/login?next=', ''),
            )
          "
          color="success"
        >
          ثبت نام
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
 <Footer />
  </v-app>

</template>

<script lang="ts">
import Vue from 'vue'
import Footer from '~/components/footer.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  data: () => ({
    title: 'Puresify',
  }),
  created() {
    this.$store.dispatch('auth/fetchAuth')
  },
  methods: {
    logout(){
      localStorage.clear()
      this.$store.commit("auth/logout")
    }
  }
})
</script>
