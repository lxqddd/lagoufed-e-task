<template>
  <div class="pager">
    <button class="btn btn-primary" v-show="showFirstPage" v-on:click="firstPage">
      首页
    </button>
    <button class="btn btn-primary" v-show="showPrevPage" v-on:click="prevPage">
      上一页
    </button>
    <button class="btn btn-primary" v-show="showNextPage" v-on:click="nextPage">
      下一页
    </button>
    <button class="btn btn-primary" v-show="showLastPage" v-on:click="lastPage">
      尾页
    </button>
    <div>
      <select v-model="offset">
        <option selected="selected" value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <span>{{ total && curPage }}/{{ total }}</span>
    <div class="goto">
      <input type="text" v-model="gotoPage" />
      <button class="btn btn-primary" style="margin-right: 4px;" v-on:click="gotoNextPage">
        跳转
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageSize', 'curPage', 'total'],
  data() {
    return {
      gotoPage: '',
      offset: this.pageSize
    }
  },

  computed: {
    showFirstPage() {
      return this.curPage > 1
    },
    showPrevPage() {
      return this.curPage > 1
    },
    showLastPage() {
      return this.curPage < this.total
    },
    showNextPage() {
      return this.curPage < this.total
    }
  },

  watch: {
    offset: 'offsetChanged' //监控offset
  },
  mounted() {
    this.$nextTick(() => {
      this.initPager()
    })
  },
  methods: {
    initPager() {
      this.gotoPage = ''
    },
    nextPage() {
      //下一页
      this.$emit('setPage', this.curPage + 1) //调用父组件方法
    },
    prevPage() {
      //上一页
      this.$emit('setPage', this.curPage - 1) //调用父组件方法
    },
    gotoNextPage() {
      //跳转页面
      if (this.gotoPage && /[1-9][0-9]*/.test(this.gotoPage)) {
        var pg = parseInt(this.gotoPage)
        if (pg > 0 && pg <= this.pageSize) {
          this.$emit('setPage', pg) //调用父组件方法
        } else {
          this.gotoPage = ''
        }
      } else {
        this.gotoPage = ''
      }
    },
    firstPage() {
      this.$emit('setPage', 1) //调用父组件方法
    },
    lastPage() {
      this.$emit('setPage', this.total) //调用父组件方法
    },
    offsetChanged() {
      this.$emit('setOffset', this.offset)
    }
  }
}
</script>

<style scoped>
.pager > span,
.pager > a,
.pager > select,
.pager > div {
  float: left;
  margin-left: 10px;
}

.pager {
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  height: 48px;
  line-height: 48px;
  margin-bottom: 40px;
}

.pager input,
.pager select {
  height: 38px;
  line-height: 38px;
  outline: none;
  border: 1px solid #888;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
.pager input {
  width: 50px;
}
.pager .goto {
  margin-left: 16px;
}
.pager a {
  color: black;
  font-weight: bold;
  text-decoration: none;
}
</style>
