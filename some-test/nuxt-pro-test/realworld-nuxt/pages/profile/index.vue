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

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg"/></a>
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
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
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
export default {
  name: 'UserProfile',
  middleware: 'authenticated',
  data() {
    return {
      profileUserInfo: {},
      followLock: true,
      tabOptions: {
        my: 'My Articles',
        favo: 'Favorited Articles'
      }
    }
  },
  created() {
    this.getProfileUserInfo()
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
      await this.initArticlesOfTab(tab)
    },

    async initArticlesOfTab(tab, curPage = 0, pageSize = 10) {
      switch (tab) {
        case 'My Articles':
          await this.getMyArticles(curPage, pageSize)
          break
        case 'Favorited Articles':
          await this.getFavoArticle(curPage, pageSize)
          break
      }
    },

    async getMyArticles() {
      try {
        const res = await getMyArticles()
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    },

    async getFavoArticle() {
      try {
        const res = await getMyFavoArticles()
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style></style>
