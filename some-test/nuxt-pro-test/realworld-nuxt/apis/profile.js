import { fetch } from '../plugins/http'

/**
 * 获取用户信息
 * @param { String } username 用户名称
 */
export const getProfileUserInfo = username => {
  return fetch.get(`/api/profiles/${username}`)
}

/**
 * 发布一篇新的文章
 * @typedef { Article } article
 * @property { String } body 内容
 * @property { String } title 标题
 * @property { String } description 描述内容
 * @property { Array } tagList 标签列表
 * @returns
 */
export const newArticle = article => {
  return fetch.post('api/articles', {
    article
  })
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
