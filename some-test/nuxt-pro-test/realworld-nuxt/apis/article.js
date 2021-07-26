import { fetch } from '../plugins/http'

export const getTags = () => {
  return fetch.get('/api/tags')
}

export const newArticle = article => {
  return fetch.post('api/articles', {
    article
  })
}
