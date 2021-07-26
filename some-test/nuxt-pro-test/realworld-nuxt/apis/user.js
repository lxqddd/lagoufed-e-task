import { fetch } from '../plugins/http'

/**
 * 用户登录
 * @typedef { User } user
 * @property { String } email 邮箱
 * @property { String } password 密码
 * @returns
 */
export const login = user => {
  return fetch.post('/api/users/login', {
    user
  })
}

/**
 * 用户注册
 * @typedef { User } user
 * @property { String } username 用户名
 * @property { String } email 邮箱
 * @property { String } password 密码
 * @returns
 */
export const register = user => {
  return fetch.post('/api/users', {
    user
  })
}

/**
 * 设置用户信息
 * @typedef { User } user
 * @property { String } username 用户名
 * @property { String } bio 个人签名
 * @property { String } image 头像Url
 * @property { String } email 邮箱
 * @property { String } password 密码
 * @returns
 */
export const settingsUser = user => {
  return fetch.put('/api/user', {
    user
  })
}
