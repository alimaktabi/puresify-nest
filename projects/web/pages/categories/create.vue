<template>
  <div>
    <v-card class="pa-10">
      <h3>ساخت دسته بندی</h3>

      <v-form
        @submit.prevent="submit"
        ref="form"
        class="mt-10"
      >
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="نام دسته بندی"
              v-model="data.name"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="اسلاگ"
              v-model="data.slug"
              :rules="rules.slug"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="text-left mt-5">
          <v-btn
            type="submit"
            color="success"
            :loading="loading"
          >
            ثبت
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { RequiredField } from '../../validations/required'

export default Vue.extend({
  name: 'create-category',
  data: () => ({
    data: {
      name: '',
      slug: '',
    },
    rules: {
      name: [RequiredField],
      slug: [RequiredField],
    },
    loading: false,
  }),
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return

      this.loading = true

      this.$axios
        .post('/categories', this.data)
        .then((res) => this.$router.push('/'))
    },
  },
})
</script>
