<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="userEdit.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="userEdit.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userEdit.bio"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userEdit.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="userEdit.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="handleSettings">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click.prevent="handleLogout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { settingsUser } from '../../apis/user.js'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'Settings',
  data() {
    return {
      userEdit: {}
    }
  },
  created() {
    this.userEdit = Object.assign({}, this.user)
  },
  computed: {
    ...mapState(['user'])
  },

  methods: {
    async handleSettings() {
      try {
        const { user } = await settingsUser(this.userEdit)
        this.$store.commit('setUser', user)
        Cookie.set('auth', user)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    },

    handleLogout() {
      this.$store.commit('setUser', {})
      Cookie.remove('auth')
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
