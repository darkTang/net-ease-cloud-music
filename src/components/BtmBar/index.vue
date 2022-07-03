<template>
  <div>
    <div class="btmbar">
      <div class="m-playbar m-playbar-unlock">
        <div class="updn">
          <div class="left f-fl">
            <a
              href="javascript:;"
              class="btn unlock"
              v-if="toggleLock"
              @click="toggle"
            ></a>
            <a href="javascript:;" class="btn lock" v-else @click="toggle"></a>
          </div>
        </div>
        <div class="bg"></div>
        <div class="hand" title="展开播放条"></div>
        <div class="wrap">
          <div class="btns">
            <a
              href="javascript:;"
              class="prv"
              title="上一首(ctrl+←)"
              @click="prev"
              >上一首</a
            >
            <a
              v-if="showPlyBtn"
              href="javascript:;"
              class="ply"
              title="播放/暂停(p)"
              @click="play"
              >播放/暂停</a
            >
            <a
              v-else
              href="javascript:;"
              class="pause"
              title="播放/暂停(p)"
              @click="play"
              >播放/暂停</a
            >
            <a
              href="javascript:;"
              class="nxt"
              title="下一首(ctrl+→)"
              @click="next"
              >下一首</a
            >
          </div>
          <div class="head j-flag">
            <img
              v-if="songLists.length"
              :src="songLists[songIndex].al.picUrl"
              alt=""
            />
            <img v-else :src="defaultImg" alt="" />
            <a href="#" class="mask"></a>
          </div>
          <div class="play">
            <div class="j-flag words" v-if="songLists.length">
              <router-link
                class="name"
                :title="songLists[songIndex].name"
                :to="`/song?id=${songLists[songIndex].id}`"
                >{{ songLists[songIndex].name }}</router-link
              >
              <router-link
                class="mv f-fl"
                :to="`/mv/?id=${songLists[songIndex].mv}`"
                title="mv"
                v-if="songLists[songIndex].mv"
              ></router-link>
              <span
                class="by f-thide f-fl"
                :style="{ marginLeft: songLists[songIndex].mv ? '43px' : '' }"
              >
                <router-link
                  v-for="(item, index) in songLists[songIndex].ar"
                  :key="item.id"
                  :to="`/artist?id=${item.id}`"
                  >{{ item.name
                  }}{{
                    index === songLists[songIndex].ar.length - 1 ? '' : '/'
                  }}</router-link
                >
              </span>
              <a href="#" class="src" title="来自歌单"></a>
            </div>
            <div
              class="m-pbar"
              :style="{ 'margin-top': songLists.length ? '-5px' : '23px' }"
            >
              <div class="barbg j-flag barbgg" @click="progress">
                <div class="rdy"></div>
                <div class="cur" ref="cur">
                  <span ref="btn" class="btnn f-tdn f-alpha">
                    <i class="loading"></i>
                  </span>
                </div>
              </div>
              <span class="j-flag time" v-if="songLists.length">
                <em v-show="!currentTime">0:00</em>
                <em v-show="currentTime">{{ currentTime | timeFormatter }}</em>
                /
                {{ songLists[songIndex].dt | timeFormatter }}
              </span>
            </div>
          </div>
          <div class="oper f-fl">
            <a href="javascript:;" class="icn icn-pip" title="画中画歌词"
              >画中画歌词</a
            >
            <a href="javascript:;" class="icn icn-add j-flag" title="收藏"
              >收藏</a
            >
            <a href="javascript:;" class="icn icn-share" title="分享">分享</a>
          </div>
          <div class="ctrl">
            <div class="m-vol" v-show="showVol">
              <div class="barbg"></div>
              <div class="slide" @click="volumeClick"></div>
              <div class="vbg" ref="vbg">
                <div class="curr j-t" ref="curr">
                  <span class="btn f-alpha j-t" ref="volBtn"></span>
                </div>
              </div>
            </div>
            <a
              href="javascript:;"
              class="icn icn-vol"
              @click="showVolEvent"
            ></a>
            <a
              href="javascript:;"
              class="icn icn-loop"
              title="循环"
              v-show="togglePlyMode === 1"
              @click="plyMode(1)"
            ></a>
            <a
              href="javascript:;"
              class="icn icn-shuffle"
              title="随机"
              v-show="togglePlyMode === 2"
              @click="plyMode(2)"
            ></a>
            <a
              href="javascript:;"
              class="icn icn-one"
              title="单曲循环"
              v-show="togglePlyMode === 3"
              @click="plyMode(3)"
            ></a>
            <span class="add f-pr">
              <span class="tip">已添加到播放列表</span>
              <a
                href="javascript:;"
                title="播放列表"
                class="icn icn-list s-fc3"
                @click="displayPlayBox"
                >{{ songLists.length }}</a
              >
            </span>
            <div class="tip tip-1">循环</div>
          </div>
        </div>
      </div>
      <audio
        v-if="songIds"
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${songIds[songIndex]}.mp3`"
      ></audio>
    </div>
    <!-- 播放列表弹框 -->
    <PlayList ref="playList" v-show="showPlayBox" @close="close" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlayList from './PlayList/PlayList.vue'
export default {
  data() {
    return {
      showPlyBtn: true,
      // 播放列表播放音乐对应的索引
      songId: '',
      songIndex: 0,
      currentTime: 0,
      defaultImg: require('@/assets/default_album.jpg'),
      movePlay: true,
      showVol: false,
      volHeight: localStorage.getItem('volHeight'),
      showPlayBox: false,
      timer: null,
      toggleLock: true,
      togglePlyMode: 1
    }
  },
  components: {
    PlayList
  },
  created() {
    this.$bus.$on('play', (id) => {
      this.songId = id
    })
  },

  mounted() {
    document.querySelector('.loading').style.display = 'none'
    // 控制音乐进度条
    let rdy = document.querySelector('.rdy')
    let audio = document.querySelector('audio')
    let cur = document.querySelector('.cur')
    this.$refs.btn.addEventListener('mousedown', (e) => {
      let widths = document.querySelector('.cur').offsetWidth
      let x = e.pageX
      const move = (e) => {
        document.querySelector('.barbgg').style.pointerEvents = 'none'
        let newWidth = widths + e.pageX - x
        if (newWidth > rdy.offsetWidth) {
          newWidth = rdy.offsetWidth
          return
        }
        document.querySelector('.cur').style.width = `${(newWidth) * 100 / rdy.offsetWidth}%`
        audio.currentTime = (cur.style.width.slice(0, -1) / 100) * audio.duration
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
        document.querySelector('.barbgg').style.pointerEvents = null
      })
    })

    this.$refs.curr.style.height = this.volHeight
  },
  beforeDestroy() {
    this.timer = null
  },
  computed: {
    ...mapState({
      songLists: state => state.song.songLists
    }),
    songIds() {
      if (this.songLists && this.songLists.length) return this.songLists.map(item => item.id)
    }
  },
  methods: {
    // 播放栏的播放
    async play() {
      if (!this.songLists || !this.songLists.length) return
      this.showPlyBtn = this.showPlyBtn ? false : true
      if (this.$refs.audio.paused) {
        try {
          await this.$refs.audio.play()
          this.$store.dispatch('song/getLyric', this.songIds[this.songIndex])
          this.$bus.$emit('changeIndex', this.songIndex)
          this.$refs.playList.updateTime()
        } catch (error) {

        }
        this.updateTime()
      } else {
        await this.$refs.audio.pause()
      }
    },
    // 歌曲的播放
    async songPlay() {
      let playbar = document.querySelector('.m-playbar')
      document.querySelector('.loading').style.display = 'block'
      document.querySelector('audio').addEventListener('canplay', function () {
        document.querySelector('.loading').style.display = 'none'
      })
      document.querySelector('audio').addEventListener('waiting', function () {
        document.querySelector('.loading').style.display = 'block'
      })
      if (this.songIds && this.songIds.length) {
        this.songIndex = this.songIds.findIndex(id => id == this.songId)
      }
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if (playbar.className === 'm-playbar m-playbar-unlock') {
        playbar.className = 'm-playbar'
        setTimeout(() => {
          playbar.className = 'm-playbar m-playbar-unlock'
        }, 3000)
      }
      this.showPlyBtn = false
      this.$bus.$emit('changeIndex', this.songIndex)
      this.updateTime()
      this.$refs.playList.updateTime()


    },
    updateTime() {
      this.timer = setInterval(() => {
        if (this.$refs.audio) {
          this.currentTime = this.$refs.audio.currentTime * 1000
          if (this.$refs.audio.currentTime === this.$refs.audio.duration) this.next()
          this.$refs.cur.style.width = `${this.$refs.audio.currentTime / this.$refs.audio.duration * 100}%`
        }
      }, 10)
      this.timer = null
    },
    showVolEvent() {
      this.showVol = !this.showVol
      // 控制音量进度条
      let vbg = document.querySelector('.vbg')
      this.$refs.volBtn.addEventListener('mousedown', (e) => {
        e.stopPropagation()
        // 音量进度条起始高度
        let heights = document.querySelector('.curr').offsetHeight
        // console.log(Heights);
        let y = e.pageY
        const move = (e) => {
          let newHeight = y - e.pageY + heights
          if (newHeight > vbg.offsetHeight) {
            newWidth = vbg.offsetHeight
            return
          }
          document.querySelector('.curr').style.height = newHeight + 'px'
          this.$refs.audio.volume = document.querySelector('.curr').offsetHeight / document.querySelector('.vbg').offsetHeight
          localStorage.setItem('volHeight', document.querySelector('.curr').style.height)
          e.stopPropagation()
        }
        document.querySelector('.m-vol').addEventListener('mousemove', move)
        document.addEventListener('mouseup', () => {
          document.querySelector('.m-vol').removeEventListener('mousemove', move)
        })
      })
    },
    volumeClick(e) {
      document.querySelector('.curr').style.height = document.querySelector('.vbg').offsetHeight - e.offsetY + 'px'
      localStorage.setItem('volHeight', document.querySelector('.curr').style.height)
      this.$refs.audio.volume = document.querySelector('.curr').offsetHeight / document.querySelector('.vbg').offsetHeight
    },
    next() {
      if (this.togglePlyMode === 1) {
        if (this.songIndex == this.songIds.length - 1) {
          this.songIndex = 0
        } else {
          this.songIndex++
        }
      } else if (this.togglePlyMode === 2) {
        let randomIndex = Math.floor(Math.random() * (this.songIds.length - 1))
        this.songIndex = randomIndex
      } else if (this.togglePlyMode === 3) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }
      this.$store.dispatch('song/getLyric', this.songIds[this.songIndex])
      this.$bus.$emit('changeIndex', this.songIndex)

    },
    prev() {
      if (this.togglePlyMode === 1) {
        if (this.songIndex == 0) {
          this.songIndex = this.songIds.length - 1
        } else {
          this.songIndex--
        }
      } else if (this.togglePlyMode === 2) {
        let randomIndex = Math.floor(Math.random() * (this.songIds.length - 1))
        this.songIndex = randomIndex
      } else if (this.togglePlyMode === 3) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }
      this.$store.dispatch('song/getLyric', this.songIds[this.songIndex])
      this.$bus.$emit('changeIndex', this.songIndex)
    },
    prevs() {
      if (this.songIndex == 0) {
        this.songIndex = this.songIds.length - 1
      } else {
        this.songIndex--
      }
      this.$store.dispatch('song/getLyric', this.songIds[this.songIndex])
    },
    progress(e) {
      this.$refs.cur.style.width = `${e.offsetX * 100 / document.querySelector('.barbgg').offsetWidth}%`
      this.$refs.audio.currentTime = (this.$refs.cur.style.width.slice(0, -1) / 100) * this.$refs.audio.duration
    },
    click_allFunction_side(e) {
      if (!this.$el.contains(e.target)) {
        this.showVol = false;
      }
    },
    click_allFunction(e) {
      if (!this.$el.contains(e.target)) {
        this.showPlayBox = false;
      }
    },
    displayPlayBox() {
      let playbar = document.querySelector('.m-playbar')
      this.showPlayBox = !this.showPlayBox
      if (this.showPlayBox) {
        playbar.className = 'm-playbar'
      } else {
        playbar.className = 'm-playbar m-playbar-unlock'
      }
    },
    close(flag) {
      let playbar = document.querySelector('.m-playbar')
      this.showPlayBox = flag
      if (this.toggleLock) {
        playbar.className = 'm-playbar m-playbar-unlock'
      }
    },
    // 切换播放器显示隐藏
    toggle() {
      let playbar = document.querySelector('.m-playbar')
      this.toggleLock = !this.toggleLock
      if (!this.showPlayBox) {
        if (!this.toggleLock) {
          playbar.className = 'm-playbar'
        } else {
          playbar.className = 'm-playbar m-playbar-unlock'
        }
      }
    },
    plyMode(mode) {
      if (mode === 1) {
        this.togglePlyMode = 2
      } else if (mode === 2) {
        this.togglePlyMode = 3
      } else if (mode === 3) {
        this.togglePlyMode = 1
      }

    }
  },
  watch: {
    songIndex: {
      handler() {
        this.$refs.audio.autoplay = true
        this.updateTime()
        if (this.$refs.audio.paused) {
          this.showPlyBtn = false
        }
      }
    },
    showVol(newVal, oldVal) {
      if (newVal) {
        // 若显示，则监听失去焦点事件。
        document.addEventListener("click", this.click_allFunction_side, true);
      } else {
        // 不显示，销毁监听事件。
        document.removeEventListener("click", this.click_allFunction_side, true);
      }
    },
    showPlayBox(newVal, oldVal) {
      if (newVal) {
        // 若显示，则监听失去焦点事件。
        document.addEventListener("click", this.click_allFunction, true);
      } else {
        // 不显示，销毁监听事件。
        document.removeEventListener("click", this.click_allFunction, true);
      }
    },
  },
}
</script>

<style lang="less" scoped>
.btmbar {
  position: fixed;
  zoom: 1;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  width: 100%;
  z-index: 9999;
  .m-playbar {
    visibility: visible;
    position: absolute;
    zoom: 1;
    top: -53px;
    left: 0;
    width: 100%;
    height: 53px;
    margin: 0 auto;
    transition: all 1s;
    .updn {
      position: relative;
      z-index: 11;
      .left {
        position: absolute;
        top: -14px;
        right: 15px;
        width: 52px;
        height: 67px;
        background: url('~@/assets/playbar.png') no-repeat 0 -380px;
        .btn {
          display: block;
          width: 18px;
          height: 18px;
          margin: 6px 0 0 17px;
          background: url('~@/assets/playbar.png') no-repeat;
        }
        .lock {
          background-position: -100px -380px;
          &:hover {
            background-position: -100px -400px;
          }
        }
        .unlock {
          background-position: -80px -380px;
          &:hover {
            background-position: -80px -400px;
          }
        }
      }
    }
    .bg {
      width: 100%;
      height: 53px;
      zoom: 1;
      margin-right: 67px;
      background: url('~@/assets/playbar.png') repeat-x;
      background-position: 0 0;
    }
    .hand {
      position: absolute;
      top: -13px;
      width: 100%;
      height: 20px;
      cursor: pointer;
    }
    .wrap {
      position: absolute;
      left: 50%;
      top: 10px;
      z-index: 15;
      width: 980px;
      height: 47px;
      margin: 0 auto;
      margin-left: -490px;
      // background-color: limegreen;
      .btns {
        width: 137px;
        padding: 3px 0 0 0;
        a {
          display: block;
          float: left;
          width: 28px;
          height: 28px;
          margin-right: 8px;
          margin-top: 5px;
          text-indent: -9999px;
          background: url('~@/assets/playbar.png') no-repeat;
        }
        .prv {
          background-position: 0 -130px;
          &:hover {
            background-position: -30px -130px;
          }
        }
        .ply {
          width: 36px;
          height: 36px;
          margin-top: 0;
          background-position: 0 -204px;
          &:hover {
            background-position: -40px -204px;
          }
        }
        .pause {
          width: 36px;
          height: 36px;
          margin-top: 0;
          background-position: 0 -165px;
          &:hover {
            background-position: -40px -165px;
          }
        }
        .nxt {
          background-position: -80px -130px;
          &:hover {
            background-position: -110px -130px;
          }
        }
      }
      .head {
        position: relative;
        float: left;
        width: 34px;
        height: 34px;
        margin: 1px 15px 0 18px;
        img {
          width: 34px;
          height: 34px;
          // border: none;
        }
        .mask {
          position: absolute;
          top: 0px;
          left: 0px;
          display: block;
          width: 34px;
          height: 35px;
          background: url('~@/assets/playbar.png') no-repeat;
          background-position: 0 -80px;
        }
      }
      .play {
        position: relative;
        float: left;
        width: 581px;
        .j-flag {
          position: relative;
          height: 28px;
          color: #e8e8e8;
          text-shadow: 0 1px 0 #171717;
          line-height: 17px;
          .name {
            float: left;
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            color: #e8e8e8;
            &:hover {
              text-decoration: underline;
            }
          }
          .mv {
            float: left;
            width: 19px;
            height: 17px;
            margin: 0px -22px 0 4px;
            background: url('~@/assets/playbar.png') no-repeat;
            background-position: 0 -57px;
            &:hover {
              background-position: -20px -57px;
            }
          }
          .by {
            float: left;
            max-width: 220px;
            margin-left: 15px;
            color: #9b9b9b;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            a {
              color: #9b9b9b;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          .src {
            float: right;
            width: 14px;
            height: 15px;
            margin: 0 220px 0 13px;
            background: url('~@/assets/playbar.png') no-repeat;
            background-position: -110px -103px;
            &:hover {
              background-position: -130px -103px;
            }
          }
        }
        .m-pbar {
          position: relative;
          width: 466px;
          margin-top: -5px;
          .barbg {
            height: 9px;
            background: url('~@/assets/statbar.png') no-repeat;
            background-position: right 0;
            .rdy {
              width: 100%;
              height: 9px;
              background: url('~@/assets/statbar.png') no-repeat;
              background-position: right -30px;
            }
            .cur {
              position: absolute;
              top: 0;
              left: 0;
              width: 0%;
              height: 9px;
              background: url('~@/assets/statbar.png') no-repeat;
              background-position: left -66px;
              .btnn {
                position: absolute;
                top: -7px;
                right: -13px;
                width: 22px;
                height: 24px;
                margin-left: -11px;
                background: url('~@/assets/iconall.png') no-repeat;
                background-position: 0 -250px;
                i {
                  display: block;
                  position: absolute;
                  left: 5px;
                  top: 5px;
                  width: 12px;
                  height: 12px;
                  background: url(./images/loading.gif);
                }
                &:hover {
                  background-position: 0 -280px;
                }
              }
            }
          }
          .time {
            position: absolute;
            top: -5px;
            right: -84px;
            color: #797979;
            text-shadow: 0 1px 0 #121212;
            em {
              color: #a1a1a1;
            }
          }
        }
      }
      .oper {
        float: left;
        width: 87px;
        .icn {
          float: left;
          width: 25px;
          height: 25px;
          margin: 6px 2px 0 0;
          text-indent: -9999px;
        }
        .icn-pip {
          position: relative;
          background: url('~@/assets/DLVi_1eymwAX8gDunfd2bg==_109951165524394991.png')
            no-repeat 0 0;
          &:hover {
            background-position: 0 -25px;
          }
        }
        .icn-add {
          background: url('~@/assets/playbar.png') no-repeat;
          background-position: -88px -163px;
          &:hover {
            background-position: -88px -189px;
          }
        }
        .icn-share {
          background: url('~@/assets/playbar.png') no-repeat;
          background-position: -114px -163px;
          &:hover {
            background-position: -114px -189px;
          }
        }
      }
      .ctrl {
        float: left;
        position: relative;
        z-index: 10;
        width: 113px;
        height: 36px;
        padding-left: 13px;
        background: url('~@/assets/playbar.png') no-repeat;
        background-position: -147px -238px;
        .m-vol {
          position: absolute;
          z-index: 10000;
          top: -119px;
          left: 9px;
          clear: both;
          width: 32px;
          height: 113px;
          .barbg {
            position: absolute;
            top: 0;
            left: 0;
            width: 32px;
            height: 113px;
            background: url('~@/assets/playbar.png') no-repeat;
            background-position: 0 -503px;
          }
          .slide {
            position: absolute;
            z-index: 5;
            padding: 4px 0;
            top: 7px;
            left: 14px;
            width: 4px;
            height: 93px;
          }
          .vbg {
            position: absolute;
            padding: 4px 0;
            top: 7px;
            left: 14px;
            width: 4px;
            height: 93px;
            .curr {
              position: absolute;
              width: 4px;
              top: auto;
              bottom: -4px;
              left: 0;
              background: url('~@/assets/playbar.png') no-repeat;
              background-position: -40px bottom;
              .btn {
                position: absolute;
                z-index: 6;
                top: -7px;
                left: -7px;
                display: block;
                width: 18px;
                height: 20px;
                background: url('~@/assets/vol_btn.png') no-repeat;
                cursor: pointer;
                &:hover {
                  background: url('~@/assets/vol_btn_hvr.png') no-repeat;
                }
              }
            }
          }
        }
        .icn {
          float: left;
          width: 25px;
          height: 25px;
          margin: 7px 2px 0 0;
          text-indent: -9999px;
        }
        .icn-vol {
          background: url('~@/assets/playbar.png') no-repeat;
          background-position: -2px -248px;
          &:hover {
            background-position: -31px -248px;
          }
        }
        .icn-loop {
          background: url('~@/assets/playbar.png') no-repeat;
          background-position: -3px -344px;
          &:hover {
            background-position: -33px -344px;
          }
        }
        .icn-shuffle {
          background: url('~@/assets/playbar.png') no-repeat;
          background-position: -66px -248px;
          &:hover {
            background-position: -93px -248px;
          }
        }
        .icn-one {
          background: url('~@/assets/playbar.png') no-repeat;
          background-position: -66px -344px;
          &:hover {
            background-position: -93px -344px;
          }
        }
        .add {
          position: absolute;
          top: -5px;
          right: -13px;
          width: 59px;
          height: 36px;
          .tip {
            display: none;
            position: absolute;
            top: -51px;
            left: -65px;
            clear: both;
            width: 152px;
            height: 49px;
            background: url('~@/assets/playbar.png') no-repeat;
            background-position: 0 -287px;
            text-align: center;
            color: #fff;
            line-height: 37px;
          }
          .icn-list {
            display: block;
            float: none;
            width: 57px;
            padding-left: 21px;
            background: url('~@/assets/playbar.png') no-repeat;
            background-position: -42px -68px;
            line-height: 27px;
            text-align: center;
            color: #666;
            text-shadow: 0 1px 0 #080707;
            text-indent: 0;
            text-decoration: none;
            height: 25px;
            margin: 11px 2px 0 0;
            &:hover {
              background-position: -42px -98px;
            }
          }
        }
        .tip-1 {
          display: none;
          position: absolute;
          clear: both;
          text-align: center;
          color: #fff;
          top: -35px;
          left: 12px;
          width: 81px;
          height: 39px;
          line-height: 34px;
          background: url('~@/assets/playbar.png') no-repeat;
          background-position: 0 -457px;
        }
      }
    }
  }
  .m-playbar-unlock {
    top: -7px;
    &:hover {
      top: -53px;
    }
  }
}
</style>