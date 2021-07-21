<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center" v-if="!isLogin">Sign up</h1>
          <h1 class="text-xs-center" v-else>Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">已有账号，去登录</nuxt-link>
            <nuxt-link v-else to="/register">没有账号，去注册</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="userForm.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="userForm.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="userForm.password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="handLoginOrRegister"
            >
              {{ isLogin ? 'Sing in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '../../apis/user'
export default {
  name: 'LoginIndex',
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  data() {
    return {
      userForm: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  created() {},
  methods: {
    async handLoginOrRegister() {
      const params = {
        username: this.userForm.username,
        email: this.userForm.email,
        password: this.userForm.password
      }
      if (this.userForm.username) {
        await this.handleRegister(params)
      } else {
        await this.handleLogin(params)
      }
    },

    async handleLogin(params) {
      delete params.username
      const res = await login(params)
      console.log(res)
    },

    async handleRegister(params) {
      try {
        const res = await register(params)
        console.log(res)
      } catch (error) {
        this.errors = error
        console.dir(error)
      }
    }
  }
}
</script>

<style></style>
