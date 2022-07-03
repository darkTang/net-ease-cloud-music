<template>
  <div>
    <ul class="m-cvrlst m-cvrlst-7 f-cb">
      <li v-for="(mv, index) in mvs" :key="mv.id">
        <div class="u-cover u-cover-7">
          <img v-lazy="mv.imgurl" alt="" />
          <router-link
            href="#"
            class="mask"
            :to="`/mv?id=${mv.id}`"
          ></router-link>
          <router-link
            href="#"
            class="icon-play f-alpha"
            :to="`/mv?id=${mv.id}`"
          ></router-link>
        </div>
        <p class="dec dec-1 f-thide2 f-pre">
          <router-link href="#" class="tit s-fc0" :to="`/mv?id=${mv.id}`">{{
            mv.name
          }}</router-link>
        </p>
      </li>
    </ul>

    <Pagination
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中"
      :pageNo="pageNo"
      :pageSize="12"
      :total="total"
      :continues="7"
      @getPageNo="getPageNo"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
function padZero(n) {
  return n > 9 ? n : '0' + n
}
export default {
  data() {
    return {
      loading: true,
      pageNo: 1,
      total: 0,
      mvs: [],
      id: this.total
    }
  },
  components: {
    Pagination
  },
  async created() {
    await this.getArtistDetailById()
    this.getArtistMvById(this.pageNo)
  },
  methods: {
    async getArtistMvById(page) {
      this.loading = true
      const result = await this.$API.artist.reqGetArtistMvById(this.$route.query.id, page)
      this.loading = false
      console.log(result);
      this.mvs = result.mvs
    },
    async getArtistDetailById() {
      const result = await this.$API.artist.reqGetArtistDetailById(this.$route.query.id)
      this.total = result.data.videoCount
      result.data.artist.picUrl = result.data.artist.cover
      console.log(result);
    },
    getPageNo(page) {
      this.pageNo = page
      this.getArtistMvById(page)
    }
  },
  filters: {
    timeFormatter(time) {
      const date = new Date(time)
      const y = date.getFullYear()
      const m = padZero(date.getMonth() + 1)
      const d = padZero(date.getDate())
      return `${y}.${m}.${d}`
    }
  }
}
</script>

<style lang="less" scoped>
.m-cvrlst-7 {
  width: 669px;
  margin: 20px 0 0 -29px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  li {
    box-sizing: content-box;
    overflow: hidden;
    padding: 0 0 30px 50px;
    line-height: 1.4;
    width: 137px;
    height: 140px;
    padding-left: 29px;
    .u-cover-7 {
      position: relative;
      display: block;
      width: 137px;
      height: 103px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('~@/assets/coverall.png') no-repeat;
        background-position: 0 -1170px;
      }
      .icon-play {
        position: absolute;
        right: 10px;
        bottom: 5px;
        width: 44px;
        height: 44px;
        top: 50%;
        left: 50%;
        margin: -22px 0 0 -22px;
        background: url('~@/assets/iconall.png') no-repeat;
        background-position: -30px -135px;
        &:hover {
          background-position: -30px -85px;
        }
      }
    }
    .dec {
      width: 100%;
      margin: 8px 0 3px;
      font-size: 14px;
      .tit {
        display: inline-block;
        max-width: 100%;
        vertical-align: middle;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>