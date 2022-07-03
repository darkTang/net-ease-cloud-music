<template>
  <div class="playlist" @scroll.prevent="">
    <div class="listhd">
      <div class="listhdc">
        <h4>
          播放列表(<span class="j-flag">{{ songLists.length }}</span
          >)
        </h4>
        <a href="javascript:;" class="addall">
          <span class="ico ico-add"></span>
          收藏全部
        </a>
        <span class="line"></span>
        <a href="javascript:;" class="clear" @click="clear">
          <span class="ico icn-del"></span>
          清除
        </a>
        <p class="lytit f-ff0 f-thide j-flag">
          {{ songLists[changeIndex].name }}
        </p>
        <span class="close" @click="$emit('close', false)">关闭</span>
      </div>
    </div>
    <div class="listbd">
      <!-- 模糊照片背景，动态添加 -->
      <img class="imgbg j-flag" src="./images/109951167535827955.jpg" alt="" />
      <div class="mask"></div>
      <div class="listbdc j-flag">
        <ul class="f-cb">
          <!-- 谁播放谁添加z-sel -->
          <!-- 谁播放谁添加color -->
          <li class="z-sel" v-for="(item, index) in songList" :key="index">
            <div class="col col-1">
              <div class="playicn" v-if="item.isPlayIcon"></div>
            </div>
            <div
              class="col col-2"
              @click.stop="player(item, songLists)"
              :style="{ color: item.isPlayIcon ? '#fff' : '' }"
            >
              {{ item.name }}
            </div>
            <div class="col col-3">
              <div class="icns">
                <i class="ico icn-del" title="删除" @click="deleteSong(item.id)"
                  >删除</i
                >
                <i class="ico icn-dl" title="下载">下载</i>
                <i class="ico icn-share" title="分享">分享</i>
                <i class="ico icn-add" title="收藏">收藏</i>
              </div>
            </div>
            <div class="col col-4">
              <span
                :title="songName.name"
                v-for="(songName, index) in item.ar"
                :key="index"
              >
                <a
                  href="#"
                  class="name"
                  :style="{ color: item.isPlayIcon ? '#fff' : '' }"
                  >{{ songName.name }}</a
                >
              </span>
            </div>
            <div
              class="col col-5"
              :style="{ color: item.isPlayIcon ? '#fff' : '' }"
            >
              {{ item.dt | timeFormatter }}
            </div>
            <div class="col col-6">
              <a href="#" class="ico ico-src" title="来自歌单">来源</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="bline j-flag"></div>
      <div class="ask j-flag">
        <a class="ico ico-ask"></a>
      </div>
      <!-- 点击显示隐藏 -->
      <div class="upload j-flag">
        <a href="#">报错</a>
      </div>
      <div mask2></div>
      <div class="listlyric j-flag" ref="lyricPre">
        <div class="container" ref="container">
          <pre
            class="j-flag lyric"
            :class="{
              currentLyric:
                parseInt(currentTime) >= keyArr[index] &&
                parseInt(currentTime) < keyArr[index + 1],
            }"
            v-for="(value, key, index) in allMixLyric"
            >{{ value }}{{ scrollLyric(key, index) }}</pre
          >
        </div>
      </div>
      <div class="bline bline-1 j-flag"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      songList: [],
      currentTime: 0,
      changeIndex: 0,
      timer: null,
      count: 1
    }
  },
  created() {
    this.songList = this.songLists
    this.$bus.$on('changeIndex', (index) => {
      this.changeIndex = index
      this.songList.forEach(item => {
        this.$set(item, 'isPlayIcon', false)
      })
      let obj = this.songList.find((obj, i) => i === index)
      obj.isPlayIcon = true
      localStorage.setItem('songLists', JSON.stringify(this.songList))
    })
  },
  beforeDestroy() {
    this.$bus.$off('changeIndex')
    clearInterval(this.timer)
  },
  computed: {
    ...mapState({
      songLists: state => state.song.songLists,
      playList: state => state.playlist.playList,
      lyric: state => state.song.lyric,
      tLyric: state => state.song.tLyric
    }),
    // 播放歌曲用这个  原歌词
    allLyricObj() {
      const obj = {}
      const reg = /\[(.*)\] *(.*)/g;
      this.lyric.replace(reg, (a, b, c) => {
        if (obj[b]) {
          obj[b] = obj[b] + '\n' + c.trim()
        } else if (c) {
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
    keyArr() {
      let arr = []
      for (let key in this.allMixLyric) {
        let time = parseInt(key.slice(0, 2) * 60) + parseInt(key.slice(3, 5))
        arr.push(time)
      }
      arr.push(10000)
      return arr
    },
    keyTime() {
      let arr = []
      for (let key in this.allMixLyric) {
        arr.push(key)
      }
      return arr
    }
  },
  methods: {
    player(item, songLists) {
      songLists.forEach(obj => {
        obj.isPlayIcon = false
      })
      localStorage.setItem('songLists', JSON.stringify(this.songList))
      this.$store.dispatch('song/getLyric', item.id)
      item.isPlayIcon = true
      this.$bus.$emit('play', item.id)
      this.$parent.songPlay()
      this.updateTime()
    },
    deleteSong(id) {
      let index = this.songList.findIndex(item => item.id === id)
      localStorage.setItem('songLists', JSON.stringify(this.songList))
      console.log(index);
      console.log(this.changeIndex);
      if (index === this.changeIndex) {
        let obj = this.songList.find((obj, i) => i === index + 1)
        obj.isPlayIcon = true
      } else if (index < this.changeIndex) {
        this.$parent.songIndex = this.changeIndex - this.count
        this.changeIndex--
        this.count++
        this.$parent.$refs.audio.play()
      }
      this.songList.splice(index, 1)
    },
    updateTime() {
      this.timer = setInterval(() => {
        this.currentTime = this.$parent.$refs.audio.currentTime
      }, 1000)
      this.time = null
    },
    scrollLyric(key, index) {
      const container = document.querySelector('.container')
      let time = parseInt(key.slice(0, 2) * 60) + parseInt(key.slice(3, 5))
      if (time < this.currentTime && time > this.currentTime - (this.keyArr[index + 1] - this.keyArr[index])) {
        if (this.tLyric) {
          container.style.top = -((index - 1) * 64) + 'px'
        } else {
          container.style.top = -((index - 1) * 32) + 'px'
        }
      }
    },
    async clear() {
      this.songList = []
      localStorage.setItem('songLists', JSON.stringify(this.songList))
    }
  },
  watch: {
    songLists() {
      this.songList = this.songLists
    }
  }
}
</script>

<style lang="less" scoped>
.playlist {
  position: fixed;
  z-index: 99;
  width: 986px;
  height: 301px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 47px;
  // background-color: pink;
  .listhd {
    box-sizing: content-box;
    background: url('~@/assets/playlist_bg.png') no-repeat;
    background-position: 0 0;
    height: 41px;
    padding: 0 5px;
    .listhdc {
      position: relative;
      height: 40px;
      h4 {
        position: absolute;
        left: 25px;
        top: 0;
        height: 39px;
        line-height: 39px;
        font-size: 14px;
        color: #e2e2e2;
      }
      a {
        color: #ccc;
      }
      .addall {
        position: absolute;
        left: 398px;
        top: 12px;
        height: 15px;
        line-height: 15px;
        cursor: pointer;
        &:hover .ico-add {
          background-position: -24px -20px;
        }
        &:hover {
          text-decoration: underline;
        }
        .ico-add {
          width: 16px;
          background-position: -24px 0;
        }
      }
      .line {
        position: absolute;
        top: 13px;
        left: 477px;
        height: 15px;
        border-left: 1px solid #000;
        border-right: 1px solid #2c2c2c;
      }
      .clear {
        position: absolute;
        left: 490px;
        top: 12px;
        height: 15px;
        line-height: 15px;
        cursor: pointer;
        &:hover .icn-del {
          background-position: -51px -20px;
        }
        &:hover {
          text-decoration: underline;
        }
        .icn-del {
          width: 13px;
          background-position: -51px 0;
        }
      }
      .ico {
        float: left;
        background: url('~@/assets/playlist.png') no-repeat;
        height: 16px;
        margin: 1px 6px 0 0;
      }
      .lytit {
        position: absolute;
        left: 595px;
        top: 0;
        width: 346px;
        text-align: center;
        height: 39px;
        line-height: 39px;
        color: #fff;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
      .close {
        position: absolute;
        top: 6px;
        right: 8px;
        width: 30px;
        height: 30px;
        overflow: hidden;
        text-indent: -999px;
        cursor: pointer;
        background: url('~@/assets/playlist.png') no-repeat;
        background-position: -195px 9px;
        &:hover {
          background-position: -195px -21px;
        }
      }
    }
  }
  .listbd {
    box-sizing: content-box;
    position: absolute;
    left: 0;
    top: 41px;
    width: 976px;
    height: 260px;
    overflow: hidden;
    background: url('~@/assets/playlist_bg.png');
    background-position: -1014px 0;
    background-repeat: repeat-y;
    padding: 0 5px;
    .imgbg {
      position: absolute;
      left: 2px;
      top: -360px;
      z-index: 1;
      width: 980px;
      height: auto;
      opacity: 0.2;
    }
    .mask {
      position: absolute;
      left: 2px;
      top: 0;
      z-index: 2;
      width: 558px;
      height: 260px;
      background: #121212;
      opacity: 0.5;
    }
    .listbdc {
      position: absolute;
      left: 2px;
      top: 0;
      z-index: 4;
      height: 260px;
      width: 558px;
      overflow-x: hidden;
      overflow-y: auto;
      // 防止内部盒子滚动条在滚动时会影响外部盒子滚动条
      overscroll-behavior: contain;
      -ms-scroll-chaining: contain;
      &::-webkit-scrollbar {
        position: absolute;
        right: 0;
        width: 6px;
        height: 260px;
        background: #000;
        opacity: 0.5;
      }
      &::-webkit-scrollbar-thumb {
        width: 4px;
        border-radius: 5px;
        cursor: pointer;
        background: #868686;
        border: 1px solid #a6a6a6;
        opacity: 0.8;
      }
      .f-cb {
        &::after {
          clear: both;
          content: '.';
          display: block;
          height: 0;
          visibility: hidden;
        }
        overflow: hidden;
        color: #ccc;
        .color {
          color: #fff;
        }
        .icns {
          display: none;
          position: absolute;
          right: 0;
          top: 0;
          width: 100px;
          height: 23px;
          .ico {
            float: right;
            height: 16px;
            overflow: hidden;
            margin: 7px 0 0 10px;
            text-indent: -9999px;
            background: url('~@/assets/playlist.png') no-repeat;
          }
          .icn-del {
            width: 13px;
            background-position: -51px 0;
            &:hover {
              background-position: -51px -20px;
            }
          }
          .icn-dl {
            width: 14px;
            background-position: -57px -50px;
            &:hover {
              background-position: -80px -50px;
            }
          }
          .icn-share {
            width: 14px;
            background-position: 0 0;
            &:hover {
              background-position: 0 -20px;
            }
          }
          .icn-add {
            width: 16px;
            background-position: -24px 0;
            &:hover {
              background-position: -24px -20px;
            }
          }
        }
        li {
          float: left;
          width: 100%;
          &:hover .icns {
            display: block;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
          }
          &:hover .name {
            color: #fff;
          }
          &:hover .col-5 {
            color: #fff;
          }
          .col {
            box-sizing: content-box;
            float: left;
            padding-left: 10px;
            height: 28px;
            line-height: 28px;
            overflow: hidden;
            cursor: pointer;
            .playicn {
              display: block;
              margin-top: 8px;
              width: 10px;
              height: 13px;
              background: url('~@/assets/playlist.png') no-repeat;
              background-position: -182px 0;
            }
            a {
              color: #9b9b9b;
              &:hover {
                text-decoration: underline;
              }
            }
            .ico-src {
              width: 14px;
              height: 16px;
              margin-left: 0;
              background: url('~@/assets/playlist.png') no-repeat;
              background-position: -80px 0px;
              float: right;
              overflow: hidden;
              margin: 7px 0 0 10px;
              text-indent: -9999px;
              &:hover {
                background-position: -80px -20px;
              }
            }
          }
          .col-1 {
            width: 10px;
          }
          .col-2 {
            width: 256px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .col-3 {
            width: 78px;
            position: relative;
          }
          .col-4 {
            width: 70px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .col-5 {
            width: 35px;
            color: #666;
          }
          .col-6 {
            box-sizing: content-box;
            width: 37px;
            padding-left: 6px;
          }
        }
        .z-sel {
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }
    .bline {
      position: absolute;
      left: 555px;
      top: -1px;
      z-index: 2;
      width: 6px;
      height: 260px;
      background: #000;
      opacity: 0.5;
    }
    .ask {
      position: absolute;
      right: 25px;
      top: 12px;
      cursor: pointer;
      z-index: 5;
      .ico-ask {
        display: inline-block;
        width: 21px;
        height: 21px;
        background: url('~@/assets/playlist.png') no-repeat;
        background-position: 0 -50px;
        text-indent: 0;
        &:hover {
          background-position: -24px -50px;
        }
      }
    }
    .upload {
      position: absolute;
      right: 12px;
      top: 40px;
      box-shadow: 0 2px 3px rgb(0 0 0 / 75%);
      width: 81px;
      z-index: 5;
      a {
        display: none;
        text-align: center;
        padding: 8px 0;
        color: #666;
        background: #ebebeb;
        text-shadow: 0 1px 0 #fff;
      }
    }
    .mask2 {
      position: absolute;
      left: 560px;
      top: 0;
      z-index: 3;
      width: 420px;
      height: 250px;
      background: #121212;
      opacity: 0.01;
    }
    .listlyric {
      position: absolute;
      right: 40px;
      top: 0px;
      z-index: 4;
      margin: 21px -38px 20px 0;
      height: 219px;
      width: 386px;
      // overflow: hidden;
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior: contain;
      -ms-scroll-chaining: contain;
      &::-webkit-scrollbar {
        position: absolute;
        right: 0;
        width: 6px;
        height: 260px;
        background: #000;
        opacity: 0.5;
      }
      &::-webkit-scrollbar-thumb {
        width: 4px;
        border-radius: 5px;
        cursor: pointer;
        background: #868686;
        border: 1px solid #a6a6a6;
        opacity: 0.8;
      }
      .container {
        position: absolute;
        top: 64px;
        transform: translateY(0);
        z-index: 4;
        margin: 21px 0 20px 0;
        height: auto;
        width: 354px;
        transition: all 0.5s;
      }
      .lyric {
        color: #989898;
        font-family: Arial, Helvetica, sans-serif;
        word-wrap: break-word;
        text-align: center;
        line-height: 32px;
        height: auto !important;
        height: 32px;
        min-height: 32px;
      }
      .currentLyric {
        color: #fff;
        font-size: 14px;
      }
    }
    .bline-1 {
      left: auto;
      right: 2px;
    }
  }
}
</style>