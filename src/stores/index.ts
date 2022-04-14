import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      isAuth: false
    }
  },
  actions: {
    auth(val: boolean) {
      this.isAuth = val
    }
  }
})
