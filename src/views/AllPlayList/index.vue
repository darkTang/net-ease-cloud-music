<template>
  <div class="m-disc-pl-c">
    <div class="g-wrap p-pl f-pr">
      <div class="u-title f-cb">
        <h3>
          <span class="f-ff2 d-flag">{{
            $route.query.cat ? $route.query.cat : '全部'
          }}</span>
          <a
            href="javascript:;"
            class="u-btn2 u-btn2-1 menu d-flag"
            @click.stop="isShowTypeNav = !isShowTypeNav"
          >
            <i>
              选择分类
              <em class="u-icn u-icn-38"></em>
            </i>
          </a>
        </h3>
        <div class="u-btn f-fr u-btn-hot d-flag">
          <a href="javascript:;" class="al" @click="getHotPlayList">热门</a>
        </div>
      </div>
      <!-- 三级联动组件 -->
      <TypeNav v-show="isShowTypeNav" ref="typeNav" />

      <ul
        class="m-cvrlst f-cb"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
      >
        <li v-for="(item, index) in topPlayList" :key="item.id">
          <div class="u-cover u-cover-1">
            <img v-lazy="item.coverImgUrl" alt="" />
            <router-link
              :title="item.name"
              :to="`/playlist?id=${item.id}`"
              class="msk"
            ></router-link>
            <div class="bottom">
              <a
                title="播放"
                href="javascript:;"
                class="icon-play"
                @click="play(item.id)"
              ></a>
              <span class="icon-headset"></span>
              <span class="nb">{{
                item.playCount > 100000
                  ? Math.floor(item.playCount / 10000) + '万'
                  : item.playCount
              }}</span>
            </div>
          </div>
          <p class="desc">
            <router-link :title="item.name" :to="`/playlist?id=${item.id}`">{{
              item.name
            }}</router-link>
          </p>
          <p>
            <span class="by">by</span>
            <a href="#" :title="item.creator.nickname" class="nm">{{
              item.creator.nickname
            }}</a>
            <img
              src="./images/obj_wo3DlcOGw6DClTvDisK1_4761340149_f4bf_64a1_1ea2_31a08617d7dfddb21fffdb92390ce268.png"
              alt=""
            />
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
import TypeNav from '@/components/TypeNav'
export default {
  data() {
    return {
      pageNo: 1,
      loading: true,
      isShowTypeNav: false
    }
  },
  components: {
    TypeNav
  },
  created() {
    if (this.$route.query.cat && this.$route.query.order) {
      this.getAllPlayList(this.pageNo, this.$route.query.cat, 'hot')
    } else if (this.$route.query.cat) {
      this.getAllPlayList(this.pageNo, this.$route.query.cat)
    } else if (this.$route.query.order) {
      this.getAllPlayList(this.pageNo, undefined, 'hot')
    } else {
      this.getAllPlayList(this.pageNo)
    }
  },
  computed: {
    ...mapState({
      topPlayList: state => state.playlist.topPlayList,
      total: state => state.playlist.total,
      playList: state => state.playlist.playList
    })
  },
  methods: {
    async getAllPlayList(pageNo, cat, order) {
      this.loading = true
      await this.$store.dispatch('playlist/getAllPlayList', { pageNo, cat, order })
      this.loading = false
    },
    getPageNo(page) {
      this.pageNo = page
      this.getAllPlayList(page)
    },
    getHotPlayList() {
      if (this.$route.query.cat) {
        this.$router.push(`/discover/playlist?order=hot&cat=${this.$route.query.cat}`)
        this.getAllPlayList(this.pageNo, this.$route.query.cat, 'hot')
      } else {
        this.$router.push('/discover/playlist?order=hot')
        this.getAllPlayList(this.pageNo, undefined, 'hot')
      }
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
    },
    click_allFunction_side(e) {
      if (!this.$refs.typeNav.$el.contains(e.target)) {
        this.isShowTypeNav = false;
      }
    },
  },
  watch: {
    isShowTypeNav(newVal, oldVal) {
      if (newVal) {
        // 若显示，则监听失去焦点事件。
        document.addEventListener("click", this.click_allFunction_side);
      } else {
        // 不显示，销毁监听事件。
        document.removeEventListener("click", this.click_allFunction_side);
      }
    },
    '$route.query.cat': {
      handler() {
        this.isShowTypeNav = false
        if (this.$route.query.cat) {
          this.getAllPlayList(this.pageNo, this.$route.query.cat)
        } else {
          this.getAllPlayList(this.pageNo)
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
        .menu {
          box-sizing: content-box;
          display: inline-block;
          height: 31px;
          line-height: 31px;
          overflow: hidden;
          vertical-align: top;
          text-align: center;
          cursor: pointer;
          font-size: 12px;
          font-weight: normal;
          margin: 2px 0 0 12px;
          color: #333;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: right -100px;
          text-decoration: none;
          padding: 0 5px 0 0;
          white-space: nowrap;
          &:hover {
            color: #333;
            background-position: right -182px;
            text-decoration: none;
          }
          &:hover i {
            background-position: 0 -141px;
          }
          i {
            display: inline-block;
            height: 31px;
            line-height: 31px;
            overflow: hidden;
            vertical-align: top;
            text-align: center;
            cursor: pointer;
            box-sizing: content-box;
            color: #0c73c2 !important;
            padding: 0 10px 0 15px;
            background: url('~@/assets/button2.png') no-repeat;
            background-position: 0 -59px;
            pointer-events: none;
            .u-icn {
              display: inline-block;
              overflow: hidden;
              vertical-align: middle;
              background: url('~@/assets/icon.png') no-repeat;
              cursor: pointer;
            }
            .u-icn-38 {
              width: 8px;
              height: 5px;
              margin-left: 5px;
              background-position: -70px -543px;
            }
          }
        }
      }
      .u-btn-hot {
        float: right;
        height: 29px;
        background: url('~@/assets/button.png') no-repeat;
        background-position: 0 0;
        border-radius: 3px;
        .al {
          float: left;
          width: 46px;
          height: 29px;
          line-height: 29px;
          text-align: center;
          color: #fff;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .m-cvrlst {
      margin: 30px 0 0 -50px;
      li {
        float: left;
        box-sizing: content-box;
        width: 140px;
        height: 188px;
        overflow: hidden;
        padding: 0 0 30px 50px;
        line-height: 1.4;
        .u-cover {
          position: relative;
          width: 140px;
          height: 140px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .msk {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(./images/coverall.png) no-repeat 0 0;
          }
          .bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 27px;
            background: url(./images/coverall.png) no-repeat 0 -537px;
            color: #ccc;
            .icon-play {
              position: absolute;
              right: 10px;
              bottom: 5px;
              width: 16px;
              height: 17px;
              background: url(./images/iconall.png) no-repeat 0 0;
              &:hover {
                background-position: 0 -60px;
              }
            }
            .icon-headset {
              float: left;
              width: 14px;
              height: 11px;
              background: url(./images/iconall.png) no-repeat 0 -24px;
              margin: 9px 5px 9px 10px;
            }
            .nb {
              float: left;
              margin: 7px 0 0 0;
            }
          }
        }
        .desc {
          margin: 8px 0 3px;
          font-size: 14px;
          a {
            max-width: 100%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            color: #000;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        p {
          .by {
            color: #999;
          }
          .nm {
            margin: 0 2px 0 4px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            &:hover {
              text-decoration: underline;
            }
          }
          img {
            height: 13px;
            width: 13px;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>