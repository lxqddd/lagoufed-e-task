import { fetch } from '../plugins/http'

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

export const settingsUser = user => {
  return fetch.put('/api/user', {
    user
  })
}
