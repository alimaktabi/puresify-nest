<template>
  <div class="d-flex justify-center mt-16">
    <v-card class="container">
      <h3 class="mr-5">ورود</h3>

      <v-form ref="form" @submit.prevent="login">
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="data.phoneNumber"
              :rules="rules.phoneNumber"
              label="شماره تلفن"
              required
              outlined
            ></v-text-field>
            <v-text-field
              outlined
              type="password"
              v-model="data.password"
              :rules="rules.password"
              label="رمز عبور"
              required
            ></v-text-field>
          </v-container>
        </v-card-text>

        <div
          class="d-flex justify-space-between align-center"
        >
          <div>
            اکانت ندارید؟
            <NuxtLink to="/auth/register">
              ثبت نام کنید
            </NuxtLink>
          </div>
          <v-btn
            type="submit"
            :loading="loading"
            color="primary"
          >
            ورود
          </v-btn>
        </div>
      </v-form>
    </v-card>

    <v-snackbar color="red accent-2" v-model="incorrect">
      نام کاربری یا رمز عبور اشتباه می باشد

      <template v-slot:action="{ attrs }">
        <v-btn
          color="yellow"
          text
          v-bind="attrs"
          @click="incorrect = false"
        >
          بستن
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios'
import { AxiosError } from 'axios'
import Vue from 'vue'
import { PhoneNumberField } from '../../validations/phoneNumber'
import { RequiredField } from '../../validations/required'

export default Vue.extend({
  name: 'login',
  data: () => ({
    data: {
      phoneNumber: '',
      password: '',
    },
    incorrect: false,
    loading: false,
    rules: {
      phoneNumber: [RequiredField, PhoneNumberField],
      password: [RequiredField],
    },
  }),
  methods: {
    login() {
      if (!(this.$refs.form as any).validate()) return
      this.loading = true
      this.$axios
        .post('/auth/login', this.data)
        .then((res: AxiosResponse) => {
          this.$store.commit('auth/login', {
            token: res.headers.authorization,
            data: res.data,
          })
          this.$router.push('/')
        })
        .catch((e: AxiosError) => {
          if (e.response?.status === 403) {
            this.incorrect = true
          }
          this.loading = false
        })
    },
  },
})
</script>
