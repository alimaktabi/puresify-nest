<template>
  <div class="d-flex justify-center mt-16">
    <v-card class="container">
      <h3 class="mr-5">ثبت نام</h3>

      <v-form
        autocomplete="off"
        ref="form"
        @submit.prevent="register"
      >
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="data.firstName"
                  :rules="rules.firstName"
                  label="نام"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="data.lastName"
                  :rules="rules.lastName"
                  label="نام خانوادگی"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="data.phoneNumber"
                  :rules="rules.phoneNumber"
                  label="شماره تلفن"
                  placeholder="تاییدیه شماره تلفن ارسال می شود"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  type="password"
                  v-model="data.password"
                  :rules="rules.password"
                  label="رمز عبور"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="password"
                  v-model="data.passwordConfirmation"
                  :rules="rules.passwordConfirmation"
                  label="تکرار رمز عبور"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <div
          class="d-flex justify-space-between align-center"
        >
          <div>
            اکانت دارید؟
            <NuxtLink to="/auth/login">
              وارد شوید
            </NuxtLink>
          </div>
          <v-btn
            type="submit"
            :loading="loading"
            color="primary"
          >
            ثبت نام
          </v-btn>
        </div>
      </v-form>
    </v-card>

    <v-snackbar color="red accent-2" v-model="incorrect">
      این شماره تلفن قبلا در سیستم ثبت شده است

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
      firstName: '',
      lastName: '',
      passwordConfirmation: '',
    },
    incorrect: false,
    loading: false,
    rules: {
      phoneNumber: [RequiredField, PhoneNumberField],
      password: [RequiredField],
      firstName: [RequiredField],
      lastName: [RequiredField],
      passwordConfirmation: [RequiredField],
    },
  }),
  methods: {
    register() {
      if (!(this.$refs.form as any).validate()) return
      this.loading = true
      this.$axios
        .post('/auth/register', this.data)
        .then((res: AxiosResponse) => {
          this.$store.commit('auth/login', {
            token: res.headers.authorization,
            data: res.data,
          })
          this.$router.push('/')
        })
        .catch((e: AxiosError) => {
          if (
            e.response?.status === 400 &&
            e.response.data.message.startsWith(
              'this phoneNumber',
            )
          ) {
            this.incorrect = true
          }
          this.loading = false
        })
    },
  },
})
</script>
