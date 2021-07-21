import fetch from '../utils/http'

export const login = params => {
  return fetch.post('/api/users/login', params)
}

export const register = params => {
  return fetch.post('/api/users', params)
}
