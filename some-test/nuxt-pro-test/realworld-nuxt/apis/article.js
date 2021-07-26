import { fetch } from '../plugins/http'

/**
 * 获取所有文章标签
 * @returns
 */
export const getTags = () => {
  return fetch.get('/api/tags')
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
 * 获取所有的文章列表
 * @typedef { ArticleList } params
 * @property { Number } limit 步长
 * @property { Number } offset 每页多少条
 * @returns
 */
export const getGlobalFeedArticle = params => {
  return fetch.get(`api/articles?limit=${params.limit}&offset=${params.offset}`)
}
