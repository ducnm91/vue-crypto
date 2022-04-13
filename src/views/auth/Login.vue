<template>
  <div class="card card-login">
    <div class="card-header">
      Login
    </div>
    <div class="card-body">
      <div class="form-group">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email">
      </div>

      <div class="form-group">
        <label for="inputPassword2" class="form-label">Password</label>
        <input type="password" class="form-control" id="inputPassword2" placeholder="Password" v-model="password">
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary" @click="login">Submit</button>
    </div>
  </div>
</template>
<script lang="ts">
import Repository from '@/repositories/RepositoryFactory';
import jwt_decode from "jwt-decode";
import moment from "moment";
import keys from '@/keys'
import { useStore } from '@/stores'

const AuthRepository = Repository.get("auth");
export default {
  setup() {
    const store = useStore()

    return {
      // you can return the whole store instance to use it in the template
      store,
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  mounted() {
  },
  methods: {
    login() {
      AuthRepository.login(this.email, this.password).then(res => {
        console.log(res)
        if (res) {
          const token = res.data.token
          localStorage.setItem(keys.LOCAL_STORAGE.access_token, token)
          this.store.auth(true)
          this.$router.push('/about')
          console.log(token)
          console.log(token.exp)
          console.log(moment(token.exp).format('MMMM Do YYYY, h:mm:ss a'))
          // console.log(key)
        }
        
        // console.log(jwt_decode(token))
        
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .card-login {
    max-width: 400px;
    margin: 200px auto 0;
  }
</style>