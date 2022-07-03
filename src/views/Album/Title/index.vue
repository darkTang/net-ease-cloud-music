<template>
  <div>
    <div class="title m-info f-cb">
      <div class="cover u-cover u-cover-dj">
        <img :src="albumInfo.picUrl" alt="" />
        <span class="mask"></span>
      </div>
      <div class="cnt">
        <div class="hd f-cb">
          <i class="f-fl u-icn u-icn-13 f-pr">
            <span class="f-pa f-r-white-icon"></span>
          </i>
          <div class="tit">
            <h2 class="f-ff2 f-brk">{{ albumInfo.name }}</h2>
          </div>
        </div>
        <p class="intr">
          <b>歌手：</b>
          <span title="Drake" v-for="(artist, index) in albumInfo.artists">
            <a href="#" class="s-fc7">{{ artist.name }}</a>
          </span>
        </p>
        <p class="intr">
          <b>发行时间：</b>
          {{ albumInfo.publishTime | timeFormatter }}
        </p>
        <div class="btns f-cb">
          <a
            href="javascript:;"
            class="u-btn2"
            title="播放"
            @click="playListSong"
          >
            <i>
              <em class="ply"></em>
              播放
            </i>
          </a>
          <a
            href="javascript:;"
            class="u-btni-add"
            title="添加到播放列表"
            @click="addPlayList"
          ></a>
          <a href="javascript:;" class="u-btni-fav u-btni" title="收藏">
            <i>(收藏)</i>
          </a>
          <a href="javascript:;" class="u-btni-share u-btni" title="分享">
            <i>({{ shareCount }})</i>
          </a>
          <a href="javascript:;" class="u-btni-dl u-btni">
            <i>下载</i>
          </a>
          <a href="javascript:;" class="u-btni-cmmt u-btni">
            <i>({{ commentCount }})</i>
          </a>
        </div>
      </div>
    </div>

    <div class="n-albdesc">
      <h3 style="fontsize: 100%">专辑介绍：</h3>
      <div class="album-desc-dot f-brk" v-if="notShowMoreDesc">
        <p
          v-for="(value, index) in albumInfo.artistDesc"
          :key="index"
          v-if="index < 7"
        >
          {{ value }}
        </p>
        <p v-if="notShowMoreDesc && list.length > 8">...</p>
      </div>
      <div class="album-desc-more" v-else>
        <p
          class="f-brk"
          v-for="(value, index) in albumInfo.artistDesc"
          :key="index"
        >
          {{ value }}
        </p>
      </div>
      <div class="f-cb">
        <a
          href="javascript:;"
          class="s-fc7 f-fr"
          @click="notShowMoreDesc = !notShowMoreDesc"
        >
          {{ toggleDesc }}
          <i
            class="u-icn u-icn-69"
            :style="{ 'background-position-x': notShowMoreDesc ? '-45px' : '' }"
          ></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
function padZero(n) {
  return n > 9 ? n : '0' + n
}
export default {
  data() {
    return {
      notShowMoreDesc: true
    }
  },
  created() {
    this.$store.dispatch('album/getAlbumDynamicInfo', this.$route.query.id)
  },
  props: ['albumInfo'],
  computed: {
    ...mapState({
      commentCount: state => state.album.commentCount,
      shareCount: state => state.album.shareCount,
      albumSongsList: state => state.album.albumSongsList
    }),
    toggleDesc() {
      return this.notShowMoreDesc ? '展开' : '收起'
    },
    list() {
      return this.albumInfo.artistDesc || {}
    }
  },
  methods: {
    async playListSong() {
      this.albumSongsList.forEach(item => {
        item.isPlay = true
      })
      this.albumSongsList[0].isPlay = false
      let ids = ''
      this.albumSongsList.forEach(item => {
        ids = ids + item.id + ','
      })
      const id = ids.split(',')[0]
      ids = ids.slice(0, -1)
      this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getSongDetailById', { ids, flag: 'songList' })
      this.$bus.$emit('changeIndex', 0)
      this.$store.dispatch('song/getLyric', id)
      if (this.$parent.$parent.$children[3].songPlay) {
        this.$parent.$parent.$children[3].songPlay()
      } else {
        this.$parent.$parent.$children[2].songPlay()
      }
      if (this.$parent.$parent.$children[3].$refs.playList.updateTime) {
        this.$parent.$parent.$children[3].$refs.playList.updateTime()
      } else {
        this.$parent.$parent.$children[2].$refs.playList.updateTime()
      }
    },
    addPlayList() {
      let ids = ''
      this.albumSongsList.forEach(item => {
        ids = ids + item.id + ','
      })
      const id = ids.split(',')[0]
      ids = ids.slice(0, -1)
      this.$store.dispatch('song/getSongDetailById', ids)
      this.$bus.$emit('play', id)
    },
  },
  filters: {
    timeFormatter(time) {
      const date = new Date(time)
      const y = date.getFullYear()
      const m = padZero(date.getMonth() + 1)
      const d = padZero(date.getDate())
      return `${y}-${m}-${d}`
    }
  }
}
</script>

<style lang="less" scoped>
.f-cb::after {
  display: block;
  height: 0;
  clear: both;
  content: '';
}
.title {
  display: flex;
  .cover {
    position: relative;
    display: inline-block;
    width: 177px;
    height: 177px;
    img {
      display: block;
      height: 100%;
    }
    .mask {
      position: absolute;
      width: 209px;
      height: 177px;
      background: url('~@/assets/coverall.png') no-repeat;
      background-position: 0 -986px;
      top: 0;
      left: 0;
    }
  }
  .cnt {
    margin-left: 50px;
    .hd {
      position: relative;
      margin: 0 0 12px;
      line-height: 24px;
      .u-icn {
        float: left;
        width: 54px;
        height: 24px;
        background: url('~@/assets/icon.png') no-repeat;
        background-position: 0 -186px;
        overflow: hidden;
        vertical-align: middle;
        .f-r-white-icon {
          display: inline-block;
          position: absolute;
          width: 8px;
          height: 8px;
          top: 2px;
          background: url('~@/assets/white-r-icon@3x.png');
          background-size: cover;
          left: 34px;
        }
      }
      .tit {
        margin-left: 64px;
        h2 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
      }
    }
    .intr {
      margin-top: 4px;
      line-height: 18px;
      color: #666;
      b {
        display: inline-block;
        font-weight: normal;
        color: #666;
      }
      .s-fc7 {
        color: #0c73c2;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .btns {
      margin: 21px -10px 25px 0;
      .u-btn2 {
        float: left;
        width: 66px;
        height: 31px;
        padding: 0 5px 0 0;
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -428px;
        &:hover i {
          background-position: 0 -469px;
        }
        &:hover .ply {
          background-position: -28px -1622px;
        }
        i {
          display: inline-block;
          width: 100%;
          height: 31px;
          line-height: 30px;
          text-align: center;
          padding: 0 7px 0 8px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -387px;
          color: #fff;
          .ply {
            float: left;
            width: 20px;
            height: 18px;
            margin: 6px 2px 2px 0;
            background: url('~@/assets/button2.png') no-repeat;
            background-position: 0 -1622px;
            overflow: hidden;
          }
        }
      }
      .u-btni-add {
        float: left;
        margin-right: 5px;
        width: 31px;
        height: 31px;
        margin-left: -3px;
        padding-right: 0;
        background: url('~@/assets/button2.png') no-repeat;
        background-position: 0 -1588px;
        &:hover {
          background-position: -40px -1588px;
        }
      }
      .u-btni {
        margin-right: 6px;
        font-family: simsun, \5b8b\4f53;
        padding: 0 2px 0 0;
        white-space: nowrap;
        color: #333;
        float: left;
        height: 31px;
        line-height: 30px;
        min-width: 23px;
      }
      .u-btni-fav {
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -1020px;
        &:hover i {
          background-position: 0 -1063px;
        }
        i {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          padding: 0 7px 0 36px;
          padding-right: 7px;
          padding-left: 28px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -977px;
        }
      }
      .u-btni-share {
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -1020px;
        &:hover i {
          background-position: 0 -1268px;
        }
        i {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          cursor: pointer;
          padding-right: 5px;
          padding-left: 28px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -1225px;
        }
      }
      .u-btni-dl {
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -1020px;
        &:hover i {
          background-position: 0 -2805px;
        }
        i {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          cursor: pointer;
          padding-right: 5px;
          padding-left: 28px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -2761px;
        }
      }
      .u-btni-cmmt {
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -1020px;
        &:hover i {
          background-position: 0 -1508px;
        }
        i {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          cursor: pointer;
          padding-right: 5px;
          padding-left: 28px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -1465px;
        }
      }
    }
  }
}
.n-albdesc {
  margin-top: 20px;
  .f-brk {
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }
  p {
    color: #666;
    text-indent: 2em;
    line-height: 24px;
    margin-top: 4px;
  }
  .f-cb {
    margin-top: 14px;
    &::after {
      display: block;
      content: '.';
      height: 0;
      visibility: hidden;
      clear: both;
    }
    .s-fc7 {
      color: #0c73c2;
    }
    .f-fr {
      float: right;
      .u-icn-69 {
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
        width: 11px;
        height: 8px;
        background: url('~@/assets/icon.png') no-repeat;
        background-position: -65px -520px;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>