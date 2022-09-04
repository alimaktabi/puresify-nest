<template>
<v-footer
      :absolute="!fixed"
      app
      color="#0a5e9e"



    >
      <v-container class="prefooter pa-4">
        <v-row class="forow pa-4 text-center">
          <v-col>
            <v-icon large color="white">mdi-lightbulb-on-outline</v-icon>
            <div>دانستنی های مفید</div>
          </v-col>
          <v-divider
            vertical
            class="grey"
          ></v-divider>
          <v-col>
            <v-icon large color="white">mdi-frequently-asked-questions</v-icon>
            <div>پرسش های رایج</div>
          </v-col>
          <v-divider
            vertical
            class="grey"
          ></v-divider>
          <v-col>
            <v-icon large color="white">mdi-head-question-outline</v-icon>
            <div>پاسخ به سوالات</div>
          </v-col>
        </v-row>
        <v-row class="forow">
          <v-col>
            <v-divider class="dividers"></v-divider>
          </v-col>
        </v-row>
        <v-container>
          <v-row class="forow">
            <v-col>
              <div style="color: white">
                اطلاعات تماس
                <div class="information">
                  <v-icon color="green">mdi-map-marker</v-icon>
                  فارس ، شیراز ، بلوار غدیر ، نبش کوچه یک
                </div>
                <div class="information">
                  <v-icon color="red">mdi-phone</v-icon>
                  4595 25 37(071)
                </div>
                <div class="information">
                  <v-icon color="blue">mdi-at</v-icon>
                  testemail@gmail.com
                </div>
                <div class="information">
                  <v-icon color="yellow">mdi-email-outline</v-icon>
                  7147856259
                </div>
              </div>
              <v-divider class="light-grey"></v-divider>
              <div style="font-weight: lighter; font-size: medium">
                ما را در شبکه های اجتماعی دنبال کنید:
                <div style="margin-top: 5px">
                  <v-icon color="white">mdi-instagram</v-icon>
                  <v-icon color="white">mdi-near-me</v-icon>
                  <v-icon color="white">mdi-twitter</v-icon>
                  <v-icon color="white">mdi-whatsapp</v-icon>
                </div>
              </div>
            </v-col>

          </v-row>
        </v-container>

      </v-container>
      <!--</v-img>-->
    </v-footer>
</template>

<script>
export default {
  name: "footer.vue"
}
</script>

<style scoped>

</style>
