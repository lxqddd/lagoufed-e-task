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
          <button class="btn btn-outline-danger" ng-click="$ctrl.logout()">
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
export default {
  name: 'Settings',
  data() {
    return {
      userEdit: {}
    }
  },
  created() {
    this.userEdit = Object.assign({}, this.user)
    console.log(this.userEdit)
  },
  computed: {
    ...mapState(['user'])
  },

  methods: {
    async handleSettings() {
      try {
        const res = await settingsUser(this.userEdit)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style></style>
