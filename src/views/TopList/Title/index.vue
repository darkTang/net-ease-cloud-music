<template>
  <div class="g-wrap">
    <div class="m-info m-info-rank f-cb">
      <div class="cover u-cover u-cover-rank">
        <img :src="playlist.coverImgUrl" alt="" />
        <span class="msk"></span>
      </div>
      <div class="cnt">
        <div class="cntc m-info">
          <div class="hd f-cb">
            <h2 class="f-ff2">{{ playlist.name }}</h2>
          </div>
          <div class="user f-cb">
            <i class="u-icn u-icn-57"></i>
            <span class="sep s-fc3"
              >最近更新：{{ playlist.updateTime | timeFormatter }}</span
            >
            <span class="s-fc4"
              >（{{
                $route.meta.updateFrequency || topList.updateFrequency
              }}）</span
            >
          </div>
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
              <i>({{ playlist.subscribedCount }})</i>
            </a>
            <a href="javascript:;" class="u-btni-share u-btni" title="分享">
              <i>({{ playlist.shareCount }})</i>
            </a>
            <a href="javascript:;" class="u-btni-dl u-btni">
              <i>下载</i>
            </a>
            <a href="javascript:;" class="u-btni-cmmt u-btni">
              <i>({{ playlist.commentCount }})</i>
            </a>
          </div>
        </div>
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
  props: ['playlist', 'topList'],
  computed: {
    ...mapState({
      playList: state => state.playlist.playList
    })
  },
  methods: {
    async playListSong() {
      this.selectId = id
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
      if (this.$parent.$parent.$children[3].songPlay) {
        this.$parent.$parent.$children[3].songPlay()
      } else {
        this.$parent.$parent.$children[2].songPlay()
      }
    },
    async addPlayList() {
      let list = this.playList
      let ids = ''
      if (this.selectId) {
        list = list.filter(item => item.id !== this.selectId)
      }
      list.forEach(item => {
        ids = ids + item.id + ','
      })
      const id = ids.split(',')[0]
      ids = ids.slice(0, -1)
      this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getSongDetailById', { ids, flag: 'song' })

    }
  },
  filters: {
    timeFormatter(time) {
      const date = new Date(time)
      const m = padZero(date.getMonth() + 1)
      const d = padZero(date.getDate())
      return `${m}月${d}日`
    }
  }
}
</script>
<style lang="less" scoped>
.g-wrap {
  box-sizing: content-box;
  padding: 40px;
  .f-cb::after {
    display: block;
    height: 0;
    content: '.';
    visibility: hidden;
    clear: both;
  }
  .cover {
    box-sizing: content-box;
    float: left;
    position: relative;
    width: 150px;
    height: 150px;
    display: inline;
    margin: 0 -220px 0 0;
    padding: 3px;
    border: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
    }
    .msk {
      position: absolute;
      width: 150px;
      height: 150px;
      background: url('~@/assets/coverall.png') no-repeat;
      background-position: -230px -380px;
      top: 3px;
      left: 3px;
    }
  }
  .cnt {
    float: right;
    width: 100%;
    .cntc {
      margin-left: 187px;
      .hd {
        margin: 16px 0 4px;
        position: relative;
        line-height: 24px;
        h2 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
        .f-ff2 {
          font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
        }
      }
      .user {
        margin: 0 0 20px;
        line-height: 31px;
        .u-icn {
          float: left;
          overflow: hidden;
          vertical-align: middle;
          margin: 9px 0 0 3px;
          background: url('~@/assets/icon.png') no-repeat;
        }
        .u-icn-57 {
          width: 13px;
          height: 13px;
          background-position: -18px -682px;
        }
        .s-fc3 {
          color: #666;
        }
        .s-fc4 {
          color: #999;
        }
        .sep {
          margin-left: 5px;
        }
      }
    }
    .btns {
      margin-bottom: 25px;
      margin-right: -10px;
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
</style>