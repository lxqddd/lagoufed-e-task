<template>
  <div class="default-layout">
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link
          class="navbar-brand"
          :to="{
            name: 'home'
          }"
          >conduit</nuxt-link
        >
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" exact to="/" href="">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/edit">
              <i class="ion-compose"></i>&nbsp;New Article
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item" v-if="user.id">
            <nuxt-link class="nav-link active" to="/profile">
              <img class="user-pic" :src="user.image" />
              {{ user.username }}
            </nuxt-link>
          </li>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <nuxt-link to="/" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <nuxt-link to="https://thinkster.io">Thinkster</nuxt-link>. Code &amp; design licensed
          under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created() {
    console.log(this.user)
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style></style>
