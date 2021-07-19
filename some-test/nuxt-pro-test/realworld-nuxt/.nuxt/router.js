import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0eb22582 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _9f9125d2 = () => interopDefault(import('..\\pageS\\home' /* webpackChunkName: "" */))
const _53141a11 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _90c6ab5e = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _658e9f0a = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _4cfd4e62 = () => interopDefault(import('..\\pages\\edit' /* webpackChunkName: "" */))
const _c33224c4 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _0eb22582,
    name: "home",
    children: [{
      path: "",
      component: _9f9125d2,
      name: "home"
    }, {
      path: "/login",
      component: _53141a11,
      name: "login"
    }, {
      path: "/register",
      component: _53141a11,
      name: "register"
    }, {
      path: "/profile",
      component: _90c6ab5e,
      name: "profile"
    }, {
      path: "/settings",
      component: _658e9f0a,
      name: "settings"
    }, {
      path: "/edit",
      component: _4cfd4e62,
      name: "edit"
    }, {
      path: "/article/:articleId",
      component: _c33224c4,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
