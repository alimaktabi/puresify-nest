<template>
  <div>
    <Blogs />
  </div>
</template>

<script>
import Vue from 'vue'
import Blogs from '~/components/blogs.vue'

export default Vue.extend({
  name: 'blogs',
  components: { Blogs },
})
</script>
