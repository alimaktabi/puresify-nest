<template>
  <div>
    <v-card class="pa-10">
      <h3>ساخت مقاله</h3>

      <v-form
        @submit.prevent="submit"
        ref="form"
        class="mt-10"
      >
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="نام مقاله"
              outlined
              :rules="rules.title"
              v-model="data.title"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              :items="constants.blogType"
              v-model="data.type"
              :rules="rules.type"
              label="نوع بلاگ"
              outlined
              item-value="value"
              item-text="label"
            >
            </v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="number"
              label="زمان (دقیقه)"
              outlined
              v-model.number="data.priceAsMinutes"
              :rules="rules.priceAsMinutes"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              :items="constants.categories"
              v-model="data.categoryId"
              :rules="rules.categoryId"
              label="دسته بندی"
              outlined
              item-value="value"
              item-text="label"
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <MediaUpload
              v-model="data.mediaId"
            ></MediaUpload>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="توضیحات"
              outlined
              v-model="data.description"
              :rules="rules.description"
            >
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <p>بدنه</p>
            <editor
              api-key="ijjwxe7y5vf17cjrqluzqz87mclejtpgilaw6dvuj8cyi5of"
              :init="{
                directionality: 'rtl',
                language: 'fa',
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
              }"
              v-model="data.body"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="data.show"
              :label="`مقاله نشان داده شود`"
            ></v-checkbox>
          </v-col>
          <v-col cols="6">
            <p>انتشار در</p>
            <v-date-picker
              class="elevation-14"
              v-model="data.publishAt"
            ></v-date-picker>
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

<script lang="ts">
import Vue from 'vue'
import { RequiredField } from '../../validations/required'
import Editor from '@tinymce/tinymce-vue'

export default Vue.extend({
  name: 'create-blog',
  components: {
    editor: Editor,
  },
  data: () => ({
    loading: false,
    data: {
      title: '',
      type: null,
      priceAsMinutes: null,
      description: '',
      body: '',
      mediaId: null,
      show: false,
      publishAt: null,
      categoryId: null,
    },
    rules: {
      title: [RequiredField],
      type: [RequiredField],
      priceAsMinutes: [RequiredField],
      description: [RequiredField],
      mediaId: [RequiredField],
      body: [RequiredField],
      show: [],
      categoryId: [RequiredField],
    },
    constants: {
      blogType: [
        { value: 0, label: 'مقاله متنی' },
        { value: 1, label: 'مقاله پادکست' },
        { value: 2, label: 'مقاله ویدیویی' },
      ],
      categories: [],
    },
  }),
  methods: {
    getData() {
      this.$axios.get('/categories').then((res) => {
        this.constants.categories = res.data.map(
          (item: { name: string; id: number }) => ({
            label: item.name,
            value: item.id,
          }),
        )
      })
    },
    submit() {
      this.loading = true

      this.$axios
        .post('/blogs/create', this.data)
        .then(() => this.$router.push('/'))
    },
  },
  created() {
    this.getData()
  },
})
</script>
