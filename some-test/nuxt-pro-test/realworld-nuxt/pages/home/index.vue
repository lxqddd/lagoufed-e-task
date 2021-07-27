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
              <li
                class="nav-item"
                v-for="item in tabMap"
                :key="item ? item : 'hello'"
                @click="changeTab(item)"
              >
                <span class="nav-link" :class="curSelectTab === item && 'active'" v-if="item">{{
                  item
                }}</span>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <a href="profile.html"><img :src="article.author.image"/></a>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{ article.createdAt | date('MMM dd,YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>
        <div
          total-pages="$ctrl.listConfig.totalPages"
          current-page="$ctrl.listConfig.currentPage"
          ng-hide="$ctrl.listConfig.totalPages <= 1"
          class="ng-isolate-scope"
        >
          <nav>
            <ul class="pagination">
              <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
              <li class="page-item active">
                <a class="page-link ng-binding" href="">1</a>
              </li>
              <!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
            </ul>
          </nav>
        </div>
        <Pagination
          @setPage="setPage"
          @setOffset="setOffset"
          :pageSize="pageSize"
          :total="totalPages"
          :curPage="curPage"
        />

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                to="/"
                class="tag-pill tag-default"
                v-for="(tag, index) in tags"
                :key="index"
              >
                <span @click="handleSelectTag(tag)">{{ tag }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTags, getGlobalFeedArticle } from '../../apis/article'
import Pagination from '../../components/Pagination'

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
  components: {
    Pagination
  },
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

  data() {
    return {
      tabMap: {
        your: 'Your Feed',
        global: 'Global Feed',
        dynamic: ''
      },
      curSelectTab: 'Global Feed',
      curPage: 1,
      pageSize: 10,
      totalPages: 0
    }
  },

  created() {
    this.totalPages = this.articlesCount / this.pageSize
  },

  methods: {
    changeTab(tab) {
      this.curSelectTab = tab
    },
    handleSelectTag(tag) {
      this.tabMap.dynamic = tag
      this.curSelectTab = tag
    },
    setPage(page) {
      this.curPage = page
    },
    async setOffset(offset) {
      this.pageSize = offset
      await getGlobalFeedArticleList(1, this.pageSize)
    }
  }
}
</script>

<style></style>
