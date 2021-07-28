import axios from 'axios'

export const fetch = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

fetch.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error.response.data)
  }
)

export default ({ store }) => {
  fetch.interceptors.request.use(function(config) {
    const { user } = store.state
    console.log(user, 'user')
    if (user.token) {
      config.headers.authorization = `Token ${user.token}`
    }

    return config
  }),
    function(error) {
      return Promise.reject(error)
    }
}
