<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'home',
                    params: 'feed'
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link active"
                  :to="{
                    name: 'home',
                    params: 'global'
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"
                ><img src="http://pic1.win4000.com/wallpaper/2019-09-30/5d91c2368fcc6.jpg"
              /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"
                ><img src="http://pic1.win4000.com/wallpaper/2019-09-30/5d91c2368fcc6.jpg"
              /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                to="/"
                class="tag-pill tag-default"
                v-for="(tag, index) in tags"
                :key="index"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTags, getGlobalFeedArticle } from '../../apis/article'

const getTagList = async () => {
  try {
    const { tags } = await getTags()
    return tags
  } catch (error) {
    console.error(error)
  }
}

const getGlobalFeedArticleList = async (offset = 0, limit = 10) => {
  try {
    const { articles, articlesCount } = await getGlobalFeedArticle({
      limit,
      offset
    })
    return {
      articles,
      articlesCount
    }
  } catch (error) {
    console.error(error)
  }
}

export default {
  name: 'HomeIndex',
  async asyncData() {
    // 获取文章标签列表
    const tags = await getTagList()

    // 获取文章列表
    const { articles, articlesCount } = await getGlobalFeedArticleList(0, 10)
    return {
      tags,
      articlesCount,
      articles
    }
  },

  created() {
    console.log(this.articles)
    console.log(this.articlesCount)
  }
}
</script>

<style></style>
