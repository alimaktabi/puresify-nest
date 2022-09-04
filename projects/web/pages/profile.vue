<template>
  <v-container>
    <v-row class="mt-10">
      <v-col cols="6" md="6">
        <v-text-field
          v-model="user.firstName"
          outlined
          label="نام"
        >
        </v-text-field>
      </v-col>
      <v-col cols="6" md="6">
        <v-text-field
          v-model="user.lastName"
          outlined
          label="نام خانوادگی"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="user.phoneNumber"
          outlined
          label="شماره تماس"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-btn class="success"> ذخیره تغییرات </v-btn>

    <v-divider class="mt-10"></v-divider>
    <div
      class="mt-10"
      style="
        color: #1a75ff;
        font-weight: bold;
        font-size: 35px;
      "
    >
      دوره های خریداری شده
    </div>
    <v-card>
      <v-row class="mt-10">
        <v-col cols="12" md="3">
          <v-img
            src="/python.png"
            height="200"
            width="500"
            class="mb-5"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <v-card-text>
            <v-list-item
              v-for="folder in folders"
              :key="folder.title"
            >
              <v-list-item
                style="font-weight: bold"
                v-text="folder.title"
              ></v-list-item>
              <v-list-item-title
                v-text="folder.data"
              ></v-list-item-title>
            </v-list-item>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-row class="mt-10">
        <v-col cols="12" md="3">
          <v-img
            src="/js.png"
            height="200"
            width="500"
            class="mb-5"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <v-card-text>
            <v-list-item
              v-for="folder in folders"
              :key="folder.title"
            >
              <v-list-item
                style="font-weight: bold"
                v-text="folder.title"
              ></v-list-item>
              <v-list-item-title
                v-text="folder.data"
              ></v-list-item-title>
            </v-list-item>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-row class="mt-10">
        <v-col cols="12" md="3">
          <v-img
            src="/iot.jpg"
            height="200"
            width="500"
            class="mb-5"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <v-card-text>
            <v-list-item
              v-for="folder in folders"
              :key="folder.title"
            >
              <v-list-item
                style="font-weight: bold"
                v-text="folder.title"
              ></v-list-item>
              <v-list-item-title
                v-text="folder.data"
              ></v-list-item-title>
            </v-list-item>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'profile',
  data: () => ({
    user: {},
    folders: [
      {
        title: 'عنوان دوره',
        data: 'درآمد زایی با پایتون',
        icon: 'mdi-backburger',
      },
      {
        title: 'مدرس دوره',
        data: 'مهندس میلاد محمدی',
        icon: 'mdi-account-tie',
      },
      {
        title: 'مدت زمان دوره',
        data: '6 ساعت و 30 دقیقه',
        icon: 'mdi-clock-time-nine',
      },
      {
        title: 'قیمت دوره',
        data: '120000 تومان',
        icon: 'mdi-currency-rial',
      },
    ],
  }),
  created() {
    this.user = this.$store.state.auth.userData
  },
}
</script>

<style scoped>
.avatarHover:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
