import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      isAuth: false
    }
  },
  actions: {
    auth(val: boolean) {
      console.log(val)
      this.isAuth = val
    }
  }
})
