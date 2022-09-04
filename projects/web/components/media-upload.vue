<template>
  <div>
    <input
      type="file"
      accept="image/*"
      class="d-none"
      ref="file"
      @change="onChange"
    />
    <v-card
      elevation="10"
      class="rounded pointer pa-13 media-upload"
    >
      <div @click="$refs.file.click()" v-if="!image">
        <v-icon class="text-blue" size="30"
          >mdi-image</v-icon
        >
        <div class="mt-4">
          برای آپلود تصویر کلیک کنید یا بر روی تصویر بکشید
        </div>
      </div>
      <div @click="$refs.file.click()" v-else>
        <img height="300" :src="image" :alt="alt" />
      </div>
      <v-text-field
        class="alt-field"
        label="جایگذین مدیا"
        v-model="alt"
      >
      </v-text-field>
      <v-btn
        @click.capture="submit"
        :disabled="!filename"
        class="submit-image"
        color="success"
        :loading="loading"
      >
        آپلود
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'media-upload',
  data: () => ({
    image: null,
    alt: '',
    loading: false,
    filename: '',
  }),
  props: ['id'],
  model: {
    prop: 'id',
    event: 'idchange',
  },
  watch: {
    id(newValue, oldValue) {
      this.$axios.get('/upload/' + newValue).then((res) => {
        this.image =
          'http://localhost:3001/' + res.data.path
        this.alt = res.data.alt
      })
    },
  },
  methods: {
    onChange(e) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        this.filename = e.target.files[0].name
        this.image = reader.result
      }
    },
    async submit(e) {
      e.stopPropagation()
      this.loading = true

      const file = await (await fetch(this.image)).blob()

      const formData = new FormData()

      formData.append(
        'file',
        new File([file], this.filename),
      )

      formData.append('alt', this.alt)

      const res = await this.$axios.post(
        '/upload',
        formData,
      )

      this.$emit('idchange', res.data.id)

      this.filename = null

      this.loading = false
    },
  },
})
</script>

<style scoped>
.media-upload {
  border: 2px dashed rgb(52, 56, 60);
  background: #fafafa;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

.text-blue {
  color: black;
}

.pointer {
  cursor: pointer;
}

.alt-field {
  position: absolute;
  bottom: 0;
  right: 10px;
  z-index: 1;
}
.submit-image {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1;
}
</style>
