<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profileUserInfo.image" class="user-img" />
            <h4>{{ profileUserInfo.username }}</h4>
            <p>
              {{ profileUserInfo.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="handleOrCancelFollow(profileUserInfo)"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{
                profileUserInfo.following
                  ? `Unfollow ${profileUserInfo.username}`
                  : `Follow ${profileUserInfo.username}`
              }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-for="item in tabMap" :key="item" @click="changeTab(item)">
                <span class="nav-link" :class="curSelectTab === item && 'active'" v-if="item">{{
                  item
                }}</span>
              </li>

              <!-- <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li> -->
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <nuxt-link to="/profile">
                <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
              /></nuxt-link>
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
        </div>
        <Pagination
          @setPage="setPage"
          @setOffset="setOffset"
          :pageSize="pageSize"
          :total="totalPages"
          :curPage="curPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getProfileUserInfo,
  followProfile,
  cancelFollowProfile,
  getMyArticles,
  getMyFavoArticles
} from '../../apis/profile'
import Pagination from '../../components/Pagination'
export default {
  name: 'UserProfile',
  middleware: 'authenticated',
  components: {
    Pagination
  },
  data() {
    return {
      profileUserInfo: {},
      followLock: true,
      tabMap: {
        my: 'My Articles',
        favo: 'Favorited Articles'
      },
      curSelectTab: 'My Articles',
      articles: [],
      articlesCount: 0,
      curPage: 0,
      pageSize: 10,
      totalPages: 0
    }
  },
  async created() {
    await this.getProfileUserInfo()
    console.log(this.profileUserInfo)
    await this.initArticlesOfTab('My Articles', this.profileUserInfo.username)
    this.totalPages = Math.ceil(this.articles / this.pageSize)
    console.log(this.totalPages)
  },

  methods: {
    async getProfileUserInfo() {
      try {
        const { profile } = await getProfileUserInfo(this.$route.query.username)
        this.profileUserInfo = profile
      } catch (error) {
        console.log(error)
      }
    },

    async handleOrCancelFollow(userInfo) {
      if (!this.followLock) {
        this.followLock = false
        return
      }
      const { following, username } = userInfo
      try {
        if (following) {
          // 取消关注
          await followProfile(username)
          userInfo.following = false
        } else {
          // 添加关注
          await cancelFollowProfile(username)
          userInfo.following = true
        }
      } catch (error) {
        console.error(error)
      }
      this.followLock = true
    },

    async changeTab(tab) {
      this.curSelectTab = tab
      await this.initArticlesOfTab(tab, this.profileUserInfo.username)
    },

    async initArticlesOfTab(tab, authorName, curPage = 0, pageSize = 10) {
      switch (tab) {
        case 'My Articles':
          await this.getMyArticles(authorName, curPage, pageSize)
          break
        case 'Favorited Articles':
          await this.getFavoArticle(authorName, curPage, pageSize)
          break
      }
      this.totalPages = Math.ceil(this.articles / this.pageSize)
    },

    async getMyArticles(authorName, curPage, pageSize) {
      try {
        const { articles, articlesCount } = await getMyArticles({ authorName, curPage, pageSize })
        this.articles = articles
        this.articlesCount = articlesCount
      } catch (error) {
        console.error(error)
      }
    },

    async getFavoArticle(authorName, curPage, pageSize) {
      try {
        const { articles, articlesCount } = await getMyFavoArticles({
          username: authorName,
          curPage,
          pageSize
        })
        this.articles = articles
        this.articlesCount = articlesCount
      } catch (error) {
        console.error(error)
      }
    },

    async setPage(page) {
      this.curPage = page
      console.log(this.curSelectTab)
      await this.initArticlesOfTab(this.curSelectTab, this.curPage - 1)
    },

    async setOffset(offset) {
      this.pageSize = offset
      this.curPage = 1
      await this.initArticlesOfTab(this.curSelectTab, this.curPage - 1, this.pageSize)
    }
  }
}
</script>

<style></style>
