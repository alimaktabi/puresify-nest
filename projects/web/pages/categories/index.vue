<template>
  <v-row class="pa-3">
    <v-col
      v-for="(item, key) in categories"
      :key="key"
      cols="3"
    >
      <NuxtLink
        class="text-decoration-none"
        :to="`/categories/${item.slug}`"
      >
        <v-card class="ma-3 pa-4">
          {{ item.name }}
        </v-card>
      </NuxtLink>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'categories',
  data: () => ({
    categories: [],
  }),
  methods: {
    getData() {
      this.$axios.get('/categories').then((res) => {
        this.categories = res.data
      })
    },
  },
  created() {
    this.getData()
  },
})
</script>
