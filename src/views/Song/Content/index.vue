<template>
  <div>
    <div class="title m-info f-cb" v-loading="loading" element-loading-spinner="el-icon-loading">
      <div>
        <div class="cover u-cover u-cover-dj">
          <img :src="songInfo.picUrl" alt="" />
          <span class="mask"></span>
        </div>
        <div class="out out-list s-fc3">
          <i class="u-icn"></i>
          <a href="#" class="des">生成外链播放器</a>
        </div>
      </div>
      <div class="cnt">
        <div class="hd f-cb">
          <i class="f-fl u-icn u-icn-13 f-pr">
            <span class="f-pa f-r-white-icon"></span>
          </i>
          <div class="tit">
            <h2 class="f-ff2 f-brk">{{songObj.name}}</h2>
            <router-link :to="`/mv/?id=${songObj.mv}`" title="播放mv" v-if="songObj.mv">
              <i class="icn u-icn u-icn-2"></i>
            </router-link>
            <div class="subtit" v-if="songObj.tns">{{songObj.tns[0]}}</div>
          </div>
        </div>
        <div class="tags f-cb">
          <b>歌手：</b>
          <span :title="singerName"
            ><a href="#" class="s-fc7" v-for="(item, index) in songObj.ar" :key="item.id">{{item.name}}{{index===songObj.ar.length-1? '': ' / '}}</a>
          </span>
        </div>
        <p class="intr f-brk">
          <b>所属专辑：</b>
          <a href="#" class="s-fc7">{{songInfo.name}}</a>
        </p>
        <div class="btns f-cb">
          <a href="javascript:;" class="u-btn2" title="播放" @click="play($route.query.id)">
            <i>
              <em class="ply"></em>
              播放
            </i>
          </a>
          <a href="javascript:;" class="u-btni-add" title="添加到播放列表"></a>
          <a href="javascript:;" class="u-btni-fav u-btni">
            <i>收藏</i>
          </a>
          <a href="javascript:;" class="u-btni-share u-btni">
            <i>分享</i>
          </a>
          <a href="javascript:;" class="u-btni-dl u-btni">
            <i>下载</i>
          </a>
          <a href="javascript:;" class="u-btni-cmmt u-btni">
            <i>({{total}})</i>
          </a>
        </div>

        <div class="lyric-content">
          <p v-for="(value, key, index) in allMixLyric" :key="index" v-show="tLyric? index<3:index<13">
            <pre style="font-family: Arial, Helvetica, sans-serif; color: #333">{{ value }}</pre>
          </p>
          <div class="flag_more" v-show="showMoreLyric">
            <p v-for="(value, key, index) in allMixLyric" :key="index" v-show="tLyric? index>2:index>12">
              <pre style="font-family: Arial, Helvetica, sans-serif; color: #333">{{ value }}</pre>
            </p>
          </div>
          <div class="crl">
            <a href="javascript:;" class="s-fc7" @click="showMoreLyric=!showMoreLyric"
              >{{showLyricTitle}}<i class="u-icn u-icn-69" :style="{'background-position-x': showMoreLyric?'-45px': '' }"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div class="lrc-user">
      <p>
        <a href="#" class="s-fc4">报错</a>
      </p>
      <p class="s-fc3">
        &nbsp;&nbsp;&nbsp;&nbsp;贡献翻译：<a href="#" class="s-fc7"
          >{{nickname}}</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      lyric: '',
      tLyric: '',
      nickname: '',
      loading: true,
      showMoreLyric: false,
      songList: [],
    }
  },
  props: ['total'],
  created() {
    this.getLyric()
    this.getSongDetailById()
  },
  computed: {
    ...mapState({
      songLists: state => state.song.songLists
    }),
    showLyricTitle() {
      return this.showMoreLyric ? '收起' : '展开'
    },
    // 播放歌曲用这个  原歌词
    allLyricObj() {
      const obj = {}
      const reg = /\[(.*)\] *(.*)/g;
      this.lyric.replace(reg, (a, b, c) => {
        if (obj[b]) {
          obj[b] = obj[b] + '\n' + c.trim()
        } else {
          obj[b] = c
        }
      })
      return obj
    },
    // 翻译歌词
    allTLyric() {
      const map = new Map()
      const reg = /\[(\d+:\d+\.\d+)\](.*)/g;
      this.tLyric.replace(reg, (a, b, c) => {
        map.set(b, c)
      })
      return map
    },
    // 混合歌词
    allMixLyric() {
      if (this.tLyric) {
        Object.keys(this.allLyricObj).forEach(time => {
          if (this.allTLyric.has(time)) {
            this.allLyricObj[time] = this.allLyricObj[time] + "\n" + this.allTLyric.get(time)
          }
        })
      } else {
        return this.allLyricObj
      }
      return this.allLyricObj
    },
    songObj() {
      return this.songList[0] || []
    },
    songInfo() {
      return this.songObj.al || {}
    },
    songal() {
      return this.songObj.ar || []
    },
    singerName() {
      let str = ''
      this.songal.forEach((item, index, arr) => {
        if (index === arr.length - 1) {
          str = str + item.name
        } else {
          str = str + item.name + ' / '
        }
      })
      return str
    }
  },
  methods: {
    async getLyric() {
      this.loading = true
      const result = await this.$API.song.reqGetLyricById(this.$route.query.id)
      if (result.lyricUser) {
        this.nickname = result.lyricUser.nickname
      } else if (result.transUser) {
        this.nickname = result.transUser.nickname
      } else {
        this.nickname = '暂时没有翻译，求翻译'
      }
      this.loading = false
      this.lyric = result.lrc.lyric
      this.tLyric = result.tlyric.lyric
    },
    async getSongDetailById() {
      this.loading = true
      const result = await this.$API.song.reqGetSongDetailById(this.$route.query.id)
      this.loading = false
      this.songList = result.songs
    },
    async play(id) {
      this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getSongDetailById', { ids: id, flag: 'song' })
      await this.$store.dispatch('song/getLyric', id)
      let index = this.songLists.findIndex(item => item.id == id)
      this.$bus.$emit('changeIndex', index)
      if (this.$parent.$parent.$children[3].songPlay) {
        this.$parent.$parent.$children[3].songPlay()
      } else {
        this.$parent.$parent.$children[2].songPlay()
      }
    }
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getLyric()
        this.getSongDetailById()
        this.play()
      }
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
    width: 198px;
    height: 198px;
    img {
      display: block;
      border: 0;
      width: 130px;
      height: 130px;
      margin: 34px;
    }
    .mask {
      position: absolute;
      width: 206px;
      height: 205px;
      background: url('~@/assets/coverall.png') no-repeat;
      background-position: -140px -580px;
      top: -4px;
      left: -4px;
    }
  }
  .out {
    margin-top: 15px;
    margin-left: 40px;
    .u-icn {
      display: inline-block;
      overflow: hidden;
      vertical-align: middle;
      width: 16px;
      height: 16px;
      background: url('~@/assets/icon.png') no-repeat;
      background-position: -34px -863px;
    }
    .des {
      color: #4996d1;
      text-decoration: underline;
    }
  }

  .cnt {
    margin-left: 33px;
    .hd {
      position: relative;
      margin: 0 0 12px;
      line-height: 24px;
      .u-icn {
        float: left;
        width: 54px;
        height: 24px;
        background: url('~@/assets/icon.png') no-repeat;
        background-position: 0 -463px;
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
        position: relative;
        top: -6px;
        margin-left: 64px;
        h2 {
          display: inline-block;
          line-height: 36px;
          font-size: 24px;
          font-weight: normal;
        }
        a {
          display: inline-block;
          margin-left: 14px;
          .icn {
            display: inline-block;
            overflow: hidden;
            width: 21px;
            height: 18px;
            background: url('~@/assets/icon.png') no-repeat;
            background-position: 0 -18px;
          }
        }
        .subtit {
          margin: 1px 0 5px;
          color: #bababa;
          font-size: 14px;
        }
      }
    }
    .tags {
      margin: -13px 0 9px;
      line-height: 22px;
      b {
        float: left;
        font-weight: normal;
        color: #666;
      }
      span {
        .s-fc7 {
          color: #0c73c2;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .u-tag {
        float: left;
        height: 22px;
        margin: 0px 10px 3px 0;
        padding: 0 10px 0 0;
        text-shadow: 0 1px #fdfdfd;
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -27px;
        color: #777;
        &:hover {
          background-position: right -3810px;
        }
        &:hover i {
          background-position: 0 -3780px;
        }
        i {
          position: relative;
          float: left;
          height: 22px;
          line-height: 22px;
          zoom: 1;
          padding: 0 3px 0 13px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 0;
        }
      }
    }
    .intr {
      margin-top: 4px;
      line-height: 18px;
      color: #666;
      .s-fc7 {
        color: #0c73c2;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .btns {
      margin: 11px -10px 25px 0;
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
    .lyric-content {
      height: auto;
      margin-top: 13px;
      line-height: 23px;
      .lyric {
        color: #333;
        font-family: Arial, Helvetica, sans-serif;
      }
      .crl {
        margin-top: 5px;
        .s-fc7 {
          color: #0c73c2;
          &:hover {
            text-decoration: underline;
          }
          .u-icn-69 {
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            width: 11px;
            height: 8px;
            background: url('~@/assets/icon.png') no-repeat;
            background-position: -65px -520px;
          }
        }
      }
    }
  }
}
.lrc-user {
  text-align: right;
  margin-top: 48px;
  line-height: 30px;
  .s-fc4 {
    color: #999;
    text-decoration: underline;
  }
  .s-fc3 {
    color: #666;
    .s-fc7 {
      color: #0c73c2;
      text-decoration: underline;
    }
  }
}
</style>