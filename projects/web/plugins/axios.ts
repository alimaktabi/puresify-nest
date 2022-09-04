import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function ({
  $axios,
  redirect,
}: {
  redirect: any
  $axios: NuxtAxiosInstance
}) {
  $axios.defaults.headers.authorization =
    localStorage.getItem('auth')
}
