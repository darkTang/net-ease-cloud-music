<template>
  <div>
    <ul class="m-cvrlst m-cvrlst-alb4 f-cb">
      <li v-for="(album, index) in hotAlbums" :key="album.id">
        <div class="u-cover u-cover-alb3" :title="album.name">
          <img v-lazy="album.picUrl" alt="" />
          <router-link
            href="#"
            class="mask"
            :to="`/album?id=${album.id}`"
          ></router-link>
          <router-link
            href="#"
            class="icon-play f-alpha"
            title="播放"
            :to="`/album?id=${album.id}`"
          ></router-link>
        </div>
        <p class="dec dec-1 f-thide2 f-pre" :title="album.name">
          <a href="#" class="tit s-fc0">{{ album.name }}</a>
        </p>
        <p>
          <span class="s-fc3">{{ album.publishTime | timeFormatter }}</span>
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
      hotAlbums: [],
      artistInfo: {}
    }
  },
  components: {
    Pagination
  },
  created() {
    this.getArtistAlbumById(this.pageNo)
  },
  methods: {
    async getArtistAlbumById(page) {
      this.loading = true
      const result = await this.$API.artist.reqGetArtistAlbumById(this.$route.query.id, page)
      this.loading = false
      this.hotAlbums = result.hotAlbums
      this.total = result.artist.albumSize
      this.artistInfo = result.artist
    },
    getPageNo(page) {
      this.pageNo = page
      this.getArtistAlbumById(page)
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
.m-cvrlst-alb4 {
  width: 658px;
  margin: 20px 0 0 -18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    box-sizing: content-box;
    overflow: hidden;
    padding: 0 0 30px 50px;
    line-height: 1.4;
    width: 145px;
    height: 175px;
    padding-left: 18px;
    .u-cover-alb3 {
      position: relative;
      display: block;
      width: 120px;
      height: 120px;
      &:hover .icon-play {
        display: block;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 145px;
        height: 120px;
        background: url('~@/assets/coverall.png') no-repeat;
        background-position: -170px -850px;
      }
      .icon-play {
        display: none;
        position: absolute;
        right: 10px;
        bottom: 5px;
        left: 85px;
        width: 28px;
        height: 28px;
        background: url('~@/assets/iconall.png') no-repeat;
        background-position: 0 -140px;
        &:hover {
          background-position: 0 -170px;
        }
      }
    }
    .dec {
      line-height: 19px;
      max-height: 38px;
      width: 100%;
      margin: 8px 0 3px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      .tit {
        display: inline;
        max-width: 100%;
        vertical-align: middle;
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .s-fc3 {
      width: 100%;
      color: #666;
    }
  }
}
</style>