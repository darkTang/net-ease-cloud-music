<template>
  <div class="g-bd3 g-bd3-1 f-cb">
    <div class="g-sd3 g-sd3-1">
      <Aside :allTopList="allTopList" />
    </div>
    <div class="g-mn3">
      <Title
        :playlist="playlist"
        :topList="topList"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
      />
      <SongsList :playCount="playCount" />
      <div class="comment">
        <Comment
          :commentsList="commentsList"
          :hotCommentsList="hotCommentsList"
          :total="total"
          :pageNo="pageNo"
        />
      </div>
      <Pagination
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
        :pageNo="pageNo"
        :pageSize="20"
        :total="total"
        :continues="7"
        @getPageNo="getPageNo"
      />
    </div>
  </div>
</template>

<script>
import Aside from './Aside'
import Title from './Title'
import SongsList from './SongsList'
import Comment from '@/components/Comment'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      playlist: [],
      playCount: '',
      loading: true,
      total: 0,
      pageNo: 1,
      commentsList: [],
      hotCommentsList: [],
      defaultId: 19723756
    }
  },
  components: {
    Aside,
    Title,
    SongsList,
    Comment
  },
  async created() {
    await this.$store.dispatch('toplist/getAllTopList')
    await this.getPlayListDetail()
    await this.getCommentById()
  },
  computed: {
    ...mapState({
      allTopList: state => state.toplist.allTopList
    }),
    topList() {
      return this.allTopList[0] || {}
    }
  },
  methods: {
    async getPlayListDetail(id = 19723756) {
      this.loading = true
      const result = await this.$API.playlist.reqGetPlayListDetail(id)
      this.loading = false
      this.playlist = result.playlist
      this.playCount = result.playlist.playCount
    },
    async getCommentById(id = 19723756, page = 1) {
      this.loading = true
      const result = await this.$API.playlist.reqGetCommentById(id, page)
      this.loading = false
      this.total = result.total
      this.commentsList = result.comments
      this.hotCommentsList = result.hotComments
    },
    getPageNo(page) {
      this.pageNo = page
      this.getCommentById(this.defaultId, page)
    }
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getPlayListDetail(this.$route.query.id)
        this.getCommentById(this.$route.query.id, this.pageNo)
        this.defaultId = this.$route.query.id
      }
    }
  }
}
</script>

<style lang="less" scoped>
.f-cb::after {
  display: block;
  content: '.';
  height: 0;
  visibility: hidden;
  clear: both;
}
.g-bd3 {
  box-sizing: content-box;
  min-height: 700px;
  width: 980px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  background: url(./images/wrap3.png) repeat-y center 0;
  .g-sd3 {
    position: static;
    float: left;
    width: 240px;
  }
  .g-mn3 {
    box-sizing: content-box;
    height: 100%;
    float: right;
    width: 740px;
    padding-bottom: 50px;
  }
}
.comment {
  box-sizing: content-box;
  padding: 0 30px 40px 40px;
}
</style>