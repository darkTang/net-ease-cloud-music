<template>
  <div>
    <div class="g-mn">
      <div class="g-mn1">
        <Content :total="total" />
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
        <Aside />
      </div>
    </div>
  </div>
</template>

<script>
import Content from './Content'
import Comment from '@/components/Comment'
import Aside from './Aside'
export default {
  data() {
    return {
      loading: true,
      total: 0,
      pageNo: 1,
      commentsList: [],
      hotCommentsList: [],
    }
  },
  components: {
    Content,
    Comment,
    Aside
  },
  created() {
    this.getCommentById()
  },
  methods: {
    async getCommentById(page) {
      this.loading = true
      const result = await this.$API.song.reqGetCommentById(this.$route.query.id, page)
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
    padding: 47px 20px 40px 39px;
    border-right: 1px solid #ccc;
  }
  .g-sd1 {
    position: relative;
    width: 270px;
  }
}
</style>