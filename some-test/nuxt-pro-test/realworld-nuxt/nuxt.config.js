module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push({
        name: 'home',
        path: '/',
        component: resolve(__dirname, 'pages/layout'),
        children: [
          {
            name: 'home',
            path: '',
            component: resolve(__dirname, 'pageS/home')
          }
        ]
      })
    }
  }
}
