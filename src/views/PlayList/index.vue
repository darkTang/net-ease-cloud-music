<template>
  <div>
    <div class="g-mn">
      <div class="g-mn1">
        <Title
          :playListDetail="playListDetail"
          v-loading="loading"
          element-loading-spinner="el-icon-loading"
        />
        <SongsList
          :playCount="playListDetail.playCount"
          :trackCount="playListDetail.trackCount"
        />
        <Comment
          :commentsList="commentsList"
          :hotCommentsList="hotCommentsList"
          :total="total"
          :pageNo="pageNo"
        />
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
      <!-- 右侧侧边栏 -->
      <div class="g-sd1">
        <Aside :subscriberList="subscriberList" />
      </div>
    </div>
  </div>
</template>

<script>
import Title from './Title'
import SongsList from './SongsList'
import Comment from '@/components/Comment'
import Aside from './Aside'
export default {
  data() {
    return {
      playListDetail: {},
      loading: true,
      total: 0,
      pageNo: 1,
      commentsList: [],
      hotCommentsList: [],
      subscriberList: []
    }
  },
  components: {
    Title,
    SongsList,
    Comment,
    Aside
  },
  async created() {
    this.getPlayListDetailById()
    this.getCommentById(this.pageNo)
    const result = await this.$API.playlist.reqGetPlayListDetail(this.$route.query.id)
    console.log(result);
  },
  methods: {
    async getPlayListDetailById() {
      this.loading = true
      const result = await this.$API.recommend.reqGetTopListDetail(this.$route.query.id)
      this.loading = false
      this.playListDetail = result.playlist
      this.subscriberList = result.playlist.subscribers
    },
    async getCommentById(page) {
      this.loading = true
      const result = await this.$API.playlist.reqGetCommentById(this.$route.query.id, page)
      this.loading = false
      this.total = result.total
      this.commentsList = result.comments
      this.hotCommentsList = result.hotComments
      // console.log(result);
    },
    getPageNo(page) {
      this.pageNo = page
      this.getCommentById(page)
    }
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getPlayListDetailById()
        this.getCommentById(this.pageNo)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.g-mn {
  display: flex;
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .g-mn1 {
    flex: 1;
    padding: 47px 30px 40px 39px;
    border-right: 1px solid #ccc;
  }
  .g-sd1 {
    position: relative;
    width: 270px;
  }
}
</style>