<template>
  <v-card v-if="category.name" class="ma-3 pa-4">
    {{ category.name }}
  </v-card>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'category',
  data: () => ({
    category: {},
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
