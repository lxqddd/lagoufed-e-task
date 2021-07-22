import fetch from '../utils/http'

export const login = user => {
  return fetch.post('/api/users/login', {
    user
  })
}

export const register = user => {
  return fetch.post('/api/users', {
    user
  })
}
