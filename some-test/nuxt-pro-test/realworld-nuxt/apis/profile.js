import { fetch } from '../plugins/http'

/**
 * 获取用户信息
 * @param { String } username 用户名称
 */
export const getProfileUserInfo = username => {
  return fetch.get(`/api/profiles/${username}`)
}

/**
 * 关注该用户
 * @param { String } username 用户名称
 */
export const followProfile = username => {
  return fetch.post(`api/profiles/${username}/follow`)
}

/**
 * 取消关注该用户
 * @param { String } username 用户名称
 */
export const cancelFollowProfile = username => {
  return fetch.delete(`api/profiles/${username}/follow`)
}

/**
 * 获取我的文章列表
 * @typedef { ParamsType } params
 * @property { String } authorName 作者名称
 * @property { Number } pageSize 步长
 * @property { Number } offset 偏移量
 * @returns
 */
export const getMyArticles = params => {
  return fetch.get(
    `api/articles?author=${params.authorName}&limit=${params.pageSize}&offset=${params.offset}`
  )
}

/**
 * 获取我喜欢的文章列表
 * @typedef { ParamsType } params
 * @property { String } username 作者名称
 * @property { Number } pageSize 步长
 * @property { Number } offset 偏移量
 * @returns
 */
export const getMyFavoArticles = params => {
  return fetch.get(
    `api/articles?favorited=${params.username}&limit=${params.pageSize}&offset=${params.offset}`
  )
}
