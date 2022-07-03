<template>
  <div class="m-disc-pl-c">
    <div class="g-wrap p-pl f-pr">
      <div class="u-title f-cb">
        <h3>
          <span class="f-ff2 d-flag">热门新碟</span>
        </h3>
      </div>
      <ul class="m-cvrlst f-cb">
        <li v-for="(item, index) in albumList" :key="item.id">
          <div class="u-cover u-cover-alb2">
            <img v-lazy="item.picUrl" alt="" />
            <router-link
              title="Twelve Carat Toothache"
              href="#"
              class="msk"
              :to="`/album/?id=${item.id}`"
            ></router-link>
            <a
              title="播放"
              href="javascript:;"
              class="icon-play"
              @click="play(item.id)"
            ></a>
          </div>
          <p class="dec">
            <router-link
              class="tit f-thide"
              :title="item.name"
              href="#"
              :to="`/album/?id=${item.id}`"
              >{{ item.name }}</router-link
            >
          </p>
          <p class="f-thide">
            <span class="nm f-thide">
              <a
                href="#"
                v-for="(item2, index) in item.artists"
                :key="item2.id"
                :title="
                  index == item.artists.length - 1
                    ? item2.name
                    : item2.name + ' / '
                "
                >{{
                  index == item.artists.length - 1
                    ? item2.name
                    : item2.name + ' / '
                }}</a
              >
            </span>
          </p>
        </li>
      </ul>

      <div class="u-title f-cb">
        <h3>
          <span class="f-ff2">全部新碟</span>
        </h3>
        <div class="tab">
          <router-link class="s-fc6" to="/discover/album/m/?area=ALL"
            >全部</router-link
          >
          <span class="line">|</span>
          <router-link class="s-fc6" to="/discover/album/m/?area=ZH"
            >华语</router-link
          >
          <span class="line">|</span>
          <router-link class="s-fc6" to="/discover/album/m/?area=EA"
            >欧美</router-link
          >
          <span class="line">|</span>
          <router-link class="s-fc6" to="/discover/album/m/?area=KR"
            >韩国</router-link
          >
          <span class="line">|</span>
          <router-link class="s-fc6" to="/discover/album/m/?area=JP"
            >日本</router-link
          >
        </div>
      </div>
      <ul
        class="m-cvrlst f-cb"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
      >
        <li v-for="(item2, index) in albumsList" :key="item2.id">
          <div class="u-cover u-cover-alb2">
            <img v-lazy="item2.picUrl" alt="" />
            <router-link
              title="Twelve Carat Toothache"
              href="#"
              class="msk"
              :to="`/album/?id=${item2.id}`"
            ></router-link>
            <a
              title="播放"
              href="javascript:;"
              class="icon-play"
              @click="play(item2.id)"
            ></a>
          </div>
          <p class="dec">
            <router-link
              class="tit f-thide"
              :title="item2.name"
              href="#"
              :to="`/album/?id=${item2.id}`"
              >{{ item2.name }}</router-link
            >
          </p>
          <p class="f-thide">
            <span class="nm f-thide">
              <a
                href="#"
                v-for="(item3, index) in item2.artists"
                :key="item3.id"
                :title="
                  index == item2.artists.length - 1
                    ? item3.name
                    : item3.name + ' / '
                "
                >{{
                  index == item2.artists.length - 1
                    ? item3.name
                    : item3.name + ' / '
                }}</a
              >
            </span>
          </p>
        </li>
      </ul>

      <Pagination
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pageNo: 1,
      loading: true,
      total: 0,
      albumsList: []
    }
  },
  created() {
    this.getNewDisk()
    if (this.$route.query.area) {
      this.getAllNewDisk(this.pageNo, this.$route.query.area)
    } else {
      this.getAllNewDisk(this.pageNo)
    }
  },
  computed: {
    ...mapState({
      newAlbumList: state => state.recommend.newAlbumList,
      playList: state => state.playlist.playList
    }),
    albumList() {
      return this.newAlbumList.filter((item, index) => index < 10)
    }
  },
  methods: {
    getNewDisk() {
      this.$store.dispatch('recommend/getNewAlbum')
    },
    async getAllNewDisk(pageNo, area) {
      this.loading = true
      const result = await this.$API.recommend.reqGetAllNewDisk(pageNo, area)
      this.loading = false
      this.albumsList = result.albums
      this.total = result.total
    },
    getPageNo(page) {
      this.pageNo = page
      this.getAllNewDisk(page)
    },
    async play(pId) {
      await this.$store.dispatch('playlist/getPlayList', { id: pId })
      this.playList.forEach(item => {
        item.isPlay = true
      })
      this.playList[0].isPlay = false
      let ids = ''
      this.playList.forEach(item => {
        ids = ids + item.id + ','
      })
      const id = ids.split(',')[0]
      ids = ids.slice(0, -1)
      this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getSongDetailById', { ids, flag: 'songList' })
      this.$bus.$emit('changeIndex', 0)
      this.$store.dispatch('song/getLyric', id)
      if (this.$parent.$children[3].songPlay) {
        this.$parent.$children[3].songPlay()
      } else {
        this.$parent.$children[2].songPlay()
      }
    }
  },
  watch: {
    '$route.query': {
      handler() {
        if (this.$route.query) {
          this.getAllNewDisk(this.pageNo, this.$route.query.area)
        } else {
          this.getAllNewDisk(this.pageNo)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-disc-pl-c {
  box-sizing: content-box;
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .g-wrap {
    position: relative;
    box-sizing: content-box;
    padding: 40px;
    .f-cb {
      &::after {
        clear: both;
        content: '.';
        display: block;
        height: 0;
        visibility: hidden;
      }
    }
    .u-title {
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        float: left;
        font-size: 24px;
        font-weight: normal;
        .f-ff2 {
          font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
        }
      }
      .tab {
        float: left;
        margin: 12px 0 0 20px;
        a {
          color: #666;
          &:hover {
            text-decoration: underline;
          }
        }
        .line {
          margin: 0 10px;
          color: #c7c7c7;
        }
      }
    }
    .m-cvrlst {
      margin: 20px 0 0 -33px;
      li {
        box-sizing: content-box;
        width: 153px;
        height: 178px;
        float: left;
        overflow: hidden;
        padding: 0 0 30px 50px;
        padding-left: 33px;
        line-height: 1.4;
        .u-cover {
          position: relative;
          display: block;
          width: 130px;
          height: 130px;
          &:hover .icon-play {
            display: block;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .msk {
            position: absolute;
            top: 0;
            left: 0;
            width: 153px;
            height: 130px;
            background: url('~@/assets/coverall.png') no-repeat 0 -845px;
          }
          .icon-play {
            display: none;
            position: absolute;
            right: 10px;
            bottom: 5px;
            left: 94px;
            width: 28px;
            height: 28px;
            background: url('~@/assets/iconall.png') no-repeat 0 -140px;
            &:hover {
              background-position: 0 -170px;
            }
          }
        }
        .dec {
          margin: 8px 0 3px;
          font-size: 14px;
        }
        p {
          width: 100%;
          .tit {
            display: inline-block;
            max-width: 100%;
            vertical-align: middle;
            color: #000;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .f-thide {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          .nm {
            display: inline-block;
            max-width: 85%;
            vertical-align: middle;
            a {
              color: #666;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>