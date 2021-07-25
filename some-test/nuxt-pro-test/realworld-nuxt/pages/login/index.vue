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
            <fieldset class="form-group" v-if="!isLogin">
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
import { mapMutations, mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'LoginIndex',
  middleware: 'notAuthenticated',
  data() {
    return {
      userForm: {
        username: '',
        email: '',
        password: ''
      },
      errors: []
    }
  },
  computed: {
    ...mapState(['user']),
    isLogin() {
      return this.$route.name === 'login'
    }
  },
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
      try {
        const { user } = await login(params)
        this.$store.commit('setUser', user)
        Cookie.set('auth', user)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.errors = []
        const errors = error['errors']
        this.handleErrors(errors)
      }
    },

    async handleRegister(params) {
      try {
        const { user } = await register(params)
        Cookie.set('auth', user)
        this.$store.commit('setUser', user)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.errors = []
        const errors = error['errors']
        this.handleErrors(errors)
      }
    },

    handleErrors(errors) {
      for (const key in errors) {
        errors[key].forEach(item => {
          this.errors.push(key + ' ' + item)
        })
      }
    },

    ...mapMutations(['setAuth'])
  }
}
</script>

<style></style>
