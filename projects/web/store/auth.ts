import { ExtendedVue } from 'vue/types/vue'

export type State = {
  loggedIn: boolean
  fetchedData: boolean
  userData: any
}

export const state: () => State = () => ({
  loggedIn: false,
  fetchedData: false,
  userData: {},
})

export const getters = {
  isLoggedIn(state: State) {
    return state.loggedIn
  },
  isFetched(state: State) {
    return state.fetchedData
  },
}

export const mutations = {
  update(state: State, data?: any) {
    state.fetchedData = true
    state.loggedIn = !!data
    state.userData = data
  },
  logout(state: State) {
    state.fetchedData = true
    state.loggedIn = false
    state.userData = {}
  },
  login(state: State, data: { token: string; data: any }) {
    state.fetchedData = true
    state.loggedIn = true
    state.userData = data.data
    localStorage.setItem('auth', data.token)
  },
}

export const actions = {
  async fetchAuth(this: any, props: any) {
    try {
      const res = await this.$axios.get('/auth/me')
      props.commit('update', res.data)
    } catch (e) {
      props.commit('logout')
    }
  },
}
