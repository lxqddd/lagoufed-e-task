<template>
  <div>
    <div class="article-meta">
      <span @click="jumpToProfile(article.author.username)">
        <img :src="article.author.image" />
      </span>
      <div class="info">
        <span class="author" @click="jumpToProfile(article.author.username)">{{
          article.author.username
        }}</span>
        <span class="date">{{ article.createdAt | date('MMM DD,YYYY') }}</span>
      </div>
      <button
        class="btn btn-sm btn-outline-primary pull-xs-right"
        :class="article.favorited ? 'active' : ''"
        @click="handleOrCancelFavorite(article)"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <div class="preview-link" @click="handlePreviewArticle(article)">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </div>
  </div>
</template>

<script>
import { favoriteArticle, cancelFavoriteArticle } from '../../apis/article'
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    jumpToProfile(username) {
      this.$router.push({
        path: '/profile',
        query: {
          username
        }
      })
    },
    async handleOrCancelFavorite(article) {
      // 防止连续点击多次
      if (!this.favoriteLock) {
        this.favoriteLock = false
        return
      }
      if (article.favorited) {
        this.cancelFavoriteArticle(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await this.favoriteArticle(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      this.favoriteLock = true
    },

    async favoriteArticle(articleSlug) {
      try {
        favoriteArticle(articleSlug)
      } catch (error) {
        console.error(error)
      }
    },

    async cancelFavoriteArticle(articleSlug) {
      try {
        await cancelFavoriteArticle(articleSlug)
      } catch (error) {
        console.error(error)
      }
    },
    // TODO 预览文章
    handlePreviewArticle(article) {
      console.log(article)
    }
  }
}
</script>

<style></style>
