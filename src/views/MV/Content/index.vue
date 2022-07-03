<template>
  <div class="n-mv">
    <div class="title f-cb">
      <h2 class="f-ff2 f-thide" :title="mvDetailById.name">
        <i class="f-fl tag u-icn2 u-icn2-mvtag"></i>{{ mvDetailById.name }}
      </h2>
      <span class="name">
        <a href="#" :title="mvDetailById.artistName" class="s-fc7">{{
          mvDetailById.artistName
        }}</a>
      </span>
    </div>
    <div class="mv">
      <!-- z-play -->
      <div class="m-ctvideo z-active z-pause">
        <div
          class="player"
          @mouseenter="showControls"
          @mouseleave="hideControls"
        >
          <video
            class="media"
            :poster="mvDetailById.cover"
            :src="mvURL"
            ref="video"
          ></video>
          <div class="play ffull" v-show="middleShowPlay">
            <a href="javascript:;" class="icn" @click.stop="playMv"></a>
          </div>
          <div class="topMask" @click="playMv" v-show="topMaskShow"></div>
          <span class="loading"></span>

          <!-- 满屏顶部出现 -->
          <div class="opbar">
            <ul class="j-ops ops ffr">
              <li class="itm">
                <a href="javascript:;" class="j-like icn icn-like"></a>
              </li>
              <li class="itm">
                <a href="javascript:;" class="j-sub icn icn-sub"></a>
              </li>
              <li class="itm">
                <a href="javascript:;" class="icn icn-share"></a>
              </li>
            </ul>
            <h2 class="j-tt tt fthide">
              {{ mvDetailById.name }} - {{ mvDetailById.artistName }}
            </h2>
          </div>
          <div class="layer-end layer-end-nonext ffull">
            <div class="fvhc">
              <div class="btn btn-1">
                <a href="javascript:;" class="icn top" @click.stop="replay"></a>
                <span class="bottom">重播</span>
              </div>
            </div>
          </div>
          <div class="layer layer-end layer-end-next ffull">
            <div class="fvhc fvhc-1">
              <p class="tip fthide">
                即将自动为您播放：<span class="j-title"
                  >男明星的求生欲有多强，王俊凯一秒改口、肖战狂吹彩虹屁</span
                >
              </p>
              <div class="btns">
                <div class="btn btn-1">
                  <a
                    href="javascript:;"
                    class="icn top"
                    @click.stop="replay"
                  ></a>
                  <span class="bottom">重播</span>
                </div>
                <div class="btn btn-2">
                  <a href="javascript:;" class="icn top">
                    <canvas
                      width="62"
                      height="62"
                      class="j-next next"
                      id="canvas"
                    ></canvas>
                  </a>
                  <a href="javascript:;" class="bottom ftdn" @click="toggleMask"
                    >取消</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="controls">
          <div class="wrap">
            <div class="j-right right">
              <div class="duration ffl">
                {{ mvDetailById.duration | timeFormatter }}
              </div>
              <div class="volume ffl">
                <a
                  href="javascript:;"
                  class="j-mute mute"
                  v-if="showMute"
                  @click="mute"
                ></a>
                <a
                  v-else
                  href="javascript:;"
                  class="j-mute mute s-mute"
                  @click="mute"
                ></a>
                <div class="sliderbg">
                  <div class="j-slider slider volumeSliderContainer">
                    <!-- 通过高度控制红色音量变化 -->
                    <div class="j-out out volumeSlider">
                      <div class="in">
                        <span class="dot volumeDot"></span>
                      </div>
                    </div>
                    <div class="volumeMask" @click.stop="volumesClick"></div>
                  </div>
                  <i class="arrow"></i>
                </div>
              </div>
              <div class="brs ffl">
                <div class="current">
                  <div class="j-label label">
                    {{ r }}
                  </div>
                </div>
                <div class="optionsMask">
                  <ul class="j-options options">
                    <li
                      class="itm"
                      :class="{
                        'z-sel': r == item.type,
                      }"
                      v-for="(item, index) in mvBrs"
                      :key="index"
                      @click="toggleBr(item.br)"
                    >
                      <span class="label">{{ item.type }}</span>
                      <a href="javascript:;" class="ffull"></a>
                    </li>
                    <li class="arrow"></li>
                  </ul>
                </div>
              </div>
              <a
                href="javascript:;"
                class="full ffr"
                @click="fullScreenPlay"
              ></a>
            </div>
            <div class="foh">
              <div class="j-left left">
                <span class="time">{{ currentTime | timeFormatter }}</span>
                <a
                  href="javascript:;"
                  class="stop ffl"
                  @click.stop="playMv"
                  v-if="showPlay"
                ></a>
                <a
                  href="javascript:;"
                  class="play ffl"
                  @click.stop="playMv"
                  v-else
                ></a>
              </div>
              <div class="j-progress progresswrap">
                <div class="progress progress-2" @click.stop="progressClick">
                  <!-- 控制鼠标进入调整歌曲进度 -->
                  <div class="j-ht">
                    <span class="hovertime">00:51</span>
                    <span class="arrow"></span>
                  </div>
                  <div class="j-out1 out out-1">
                    <div class="in">
                      <span class="dot progressDot"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_bottom f-cb">
      <a href="javascript:;" class="u-btn like">
        <i><em class="icn icn-praise"></em>({{ mvInfo.likedCount }})</i>
      </a>
      <a href="javascript:;" class="u-btn fav">
        <i><em class="icn icn-fav"></em>({{ mvDetailById.subCount }})</i>
      </a>
      <a href="javascript:;" class="u-btn share">
        <i><em class="icn icn-share"></em>({{ mvDetailById.shareCount }})</i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mvInfo: {},
      mvURL: '',
      showPlay: true,
      middleShowPlay: true,
      topMaskShow: true,
      currentTime: 0,
      volMvHeight: localStorage.getItem('volMvHeight'),
      showFullTop: true,
      showMute: true,
      timer: null,
      r: ''
    }
  },
  created() {

  },
  async mounted() {
    const result = await this.$API.mv.reqGetMvInfoById(this.$route.query.id)
    this.mvInfo = result
    this.mvUrl()

    document.querySelector('video').addEventListener('canplay', function () {
      this.showPlay = true
      this.middleShowPlay = this.showPlay
      document.querySelector('.loading').style.display = 'none'
    })
    document.querySelector('video').addEventListener('waiting', function () {
      document.querySelector('.loading').style.display = 'block'
    })
    document.querySelector('.volumeSlider').style.height = this.volMvHeight

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement !== null) {
        document.querySelector('.opbar').style.display = 'block'
      } else {
        document.querySelector('.opbar').style.display = 'none'
        this.showFullTop = true
      }
    })

    this.volumes()
    this.progress()


  },

  beforeDestroy() {
    window.removeEventListener('click', () => { }, true)
  },
  props: ['mvDetailById', 'mvBrs'],
  methods: {
    async mvUrl(br) {
      const result = await this.$API.mv.reqMvUrlById(this.$route.query.id, br)
      this.mvURL = result.data.url
      if (result.data.r === 1080) {
        this.r = '1080P'
      } else if (result.data.r === 720) {
        this.r = '超 清'
      } else if (result.data.r === 480) {
        this.r = '高 清'
      } else if (result.data.r === 240) {
        this.r = '标 清'
      }
      // console.log(result);
    },
    // 自动播放下一条mv
    nextMV() {
      let canvas = document.querySelector('#canvas')
      let ctx = canvas.getContext('2d')
      let steps = 0
      animate()
      function animate() {
        window.requestAnimationFrame(function () {
          if (steps < 100) {
            ctx.clearRect(0, 0, 62, 62);
            steps += 0.3;
            drawShape(ctx, steps);
            animate();
          }
        })
      }
      function drawShape(ctx, steps) {
        let progress = (Math.PI * 2) / 100
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.strokeStyle = '#fff'
        ctx.arc(31, 31, 29, -Math.PI / 2, -Math.PI / 2 + steps * progress, false)
        ctx.stroke()
        ctx.closePath()
      }
    },
    playMv() {
      let layer = document.querySelector('.layer')
      layer.style.display = 'none'
      this.topMaskShow = true
      this.showPlay = this.showPlay ? false : true
      this.middleShowPlay = this.showPlay
      if (this.$refs.video.paused) {
        this.$refs.video.play()
        this.updateTime()
      } else {
        this.$refs.video.pause()
      }

    },
    updateTime() {
      let timer = null
      let progress = document.querySelector('.out-1')
      let layer = document.querySelector('.layer')
      timer = setInterval(() => {
        if (this.$refs.video) {
          this.currentTime = this.$refs.video.currentTime * 1000
          if (this.$refs.video.currentTime >= this.$refs.video.duration) {
            this.topMaskShow = false
            this.showPlay = true
            this.middleShowPlay = false
            layer.style.display = 'block'
            this.$refs.video.currentTime = 0
            this.$refs.video.pause()
            this.nextMV()
            clearInterval(timer)
          }
          progress.style.width = `${this.$refs.video.currentTime / this.$refs.video.duration * 100}%`
        }
      }, 16)
    },
    // 鼠标进度条滑动和点击
    progress() {
      let sliderContainer = document.querySelector('.progress-2')
      let slide = document.querySelector('.j-out1')
      let sliderDot = document.querySelector('.progressDot')
      let video = document.querySelector('video')
      sliderDot.addEventListener('mousedown', (e) => {
        let startPageX = e.pageX
        let startWidth = slide.offsetWidth
        const move = (e) => {
          // 所有的鼠标事件失效
          sliderContainer.style.pointerEvents = 'none'
          let endWidth = startWidth + e.pageX - startPageX
          if (endWidth > sliderContainer.offsetWidth) {
            endWidth = sliderContainer.offsetWidth
            return
          }
          slide.style.width = `${(endWidth) * 100 / sliderContainer.offsetWidth}%`
          video.currentTime = (slide.style.width.slice(0, -1) / 100) * video.duration
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', (e) => {
          document.removeEventListener('mousemove',
            move)
          sliderContainer.style.pointerEvents = null
        })
        e.stopPropagation()
      })
    },
    progressClick(e) {
      let sliderContainer = document.querySelector('.progress-2')
      let slide = document.querySelector('.j-out1')
      let video = document.querySelector('video')
      slide.style.width = `${e.offsetX * 100 / sliderContainer.offsetWidth}%`
      video.currentTime = (slide.style.width.slice(0, -1) / 100) * video.duration
    },
    // 鼠标声音滑动和点击
    volumes() {
      let volumeDot = document.querySelector('.volumeDot')
      let volumeSliderContainer = document.querySelector('.volumeSliderContainer')
      let volumeSlider = document.querySelector('.volumeSlider')
      let video = document.querySelector('video')
      volumeDot.addEventListener('mousedown', (e) => {
        let startHeight = volumeSlider.offsetHeight
        let startPageY = e.pageY
        const moves = (e) => {
          let endHeight = startHeight + startPageY - e.pageY
          if (endHeight > volumeSliderContainer.offsetHeight) {
            endHeight = volumeSliderContainer.offsetHeight
            return
          }
          volumeSlider.style.height = `${(endHeight) * 100 / volumeSliderContainer.offsetHeight}%`
          video.volume = volumeSlider.offsetHeight / volumeSliderContainer.offsetHeight
          localStorage.setItem('volMvHeight', volumeSlider.style.height)
        }
        volumeDot.addEventListener('mousemove', moves)
        document.addEventListener('mouseup', () => {
          volumeDot.removeEventListener('mousemove', moves)
        })
        e.stopPropagation()
      })


    },
    volumesClick(e) {
      let volumeSliderContainer = document.querySelector('.volumeSliderContainer')
      let volumeSlider = document.querySelector('.volumeSlider')
      let video = document.querySelector('video')
      volumeSlider.style.height = `${(volumeSliderContainer.offsetHeight - e.offsetY) * 100 / volumeSliderContainer.offsetHeight}%`
      localStorage.setItem('volMvHeight', volumeSlider.style.height)
      video.volume = volumeSlider.offsetHeight / volumeSliderContainer.offsetHeight
    },

    replay() {
      let layer = document.querySelector('.layer')
      this.playMv()
      layer.style.display = 'none'
      document.querySelector('.layer-end-nonext').style.display = 'none'
    },
    toggleMask() {
      document.querySelector('.layer').style.display = 'none'
      document.querySelector('.layer-end-nonext').style.display = 'block'
    },
    fullScreenPlay() {
      if (this.showFullTop) {
        document.querySelector('.m-ctvideo').requestFullscreen()
        document.querySelector('.opbar').style.display = 'block'
        this.showFullTop = false
      } else {
        document.exitFullscreen()
        document.querySelector('.opbar').style.display = 'none'
        this.showFullTop = true
      }

    },
    showMvProgress(e) {
      let sliderContainer = document.querySelector('.progress-2')
      let jht = document.querySelector('.j-ht')
      sliderContainer.addEventListener('mousemove', (e) => {
        jht.style.display = 'block'

        jht.style.left = e.offsetX - 19 + 'px'
        // console.log(e.offsetX);
        // console.log(jht.style.left);
      })
    },
    hideMvProgress() {
      let jht = document.querySelector('.j-ht')
      jht.style.display = 'none'
    },
    mute() {
      let volumeSliderContainer = document.querySelector('.volumeSliderContainer')
      let volumeSlider = document.querySelector('.volumeSlider')
      let video = document.querySelector('video')
      this.showMute = !this.showMute
      if (!this.showMute) {
        volumeSlider.style.height = 0
        video.volume = volumeSlider.offsetHeight / volumeSliderContainer.offsetHeight
      } else {
        volumeSlider.style.height = localStorage.getItem('volMvHeight')
        video.volume = volumeSlider.offsetHeight / volumeSliderContainer.offsetHeight
      }
    },
    showControls() {
      document.querySelector('.controls').style.transform = ' translateY(0)';
    },
    hideControls() {
      // 防抖
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        document.querySelector('.controls').style.transform = ' translateY(100%)';
      }, 5000)
    },
    async toggleBr(br) {
      this.$refs.video.pause()
      await this.mvUrl(br)
      this.showPlay = true
      this.middleShowPlay = this.showPlay
    }
  },
  watch: {
    '$route.query.id': {
      async handler() {
        document.querySelector('video').poster = './images/19030347253914123.jpg'
        this.$refs.video.pause()
        this.showPlay = true
        this.middleShowPlay = this.showPlay
        document.querySelector('.loading').style.display = 'block'
        await this.$parent.getCommentById()
        await this.$parent.getMvDetailById()
        document.querySelector('video').load()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.n-mv {
  margin-top: -23px;
  .f-cb::after {
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
  }
  .title {
    box-sizing: content-box;
    padding-top: 10px;
    margin-bottom: 8px;
    h2 {
      float: left;
      max-width: 100%;
      margin-top: -10px;
      margin-right: 8px;
      font-size: 24px;
      line-height: 32px;
      font-weight: normal;
      .tag {
        margin: 7px 5px auto auto;
      }
      .u-icn2 {
        display: inline-block;
        overflow: hidden;
        background: url('~@/assets/icon2.png') no-repeat;
      }
      .u-icn2-mvtag {
        width: 29px;
        height: 18px;
        background-position: -230px -480px;
      }
    }
    .f-thide {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
    .name {
      float: left;
      margin: 4px 0 0 0;
      line-height: 17px;
      .s-fc7 {
        color: #0c73c2;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .mv {
    width: 640px;
    height: 360px;
    background-color: #2e2e2e;
    font-size: 0;
    line-height: 0;
    .m-ctvideo {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      font-size: 12px;
      line-height: 1.42857;
      color: #fff;
      overflow: hidden;
      .player {
        position: relative;
        width: 100%;
        height: 100%;
        .topMask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 90%;
        }
        .media {
          display: block;
          width: 100%;
          height: 100%;
          background: #000;
        }
        .ffull {
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0);
        }
        .play {
          .icn {
            display: block;
            position: absolute;
            z-index: 5;
            top: 50%;
            left: 50%;
            width: 74px;
            height: 74px;
            margin-left: -37px;
            margin-top: -37px;
            background-position: center center;
            background-repeat: no-repeat;
            background-image: url(./images/下载.png);
            &:hover {
              background-image: url(./images/下载2.png);
            }
          }
        }
        .loading {
          // 控制加载效果显示与隐藏
          display: block;
          position: absolute;
          z-index: 10;
          top: 50%;
          left: 50%;
          width: 25px;
          height: 25px;
          margin-top: -12px;
          margin-left: -12px;
          background: url(./images/loading.png) no-repeat;
          animation: rotate 2s linear infinite;
        }
        @keyframes rotate {
          100% {
            transform: rotate(-360deg);
          }
        }
        .opbar {
          display: none; // 满屏顶部出现
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          &::before {
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            display: block;
            width: 100%;
            height: 139px;
            background: url(./images/下载3.png) repeat-x;
          }
          .ffr {
            float: right;
          }
          .ops {
            height: 50px;
            .itm {
              box-sizing: content-box;
              float: left;
              position: relative;
              width: 61px;
              height: 16px;
              margin-top: 17px;
              padding: 0px;
              border-top: none;
              border-right: none;
              border-bottom: none;
              border-image: initial;
              border-left: 1px solid rgba(255, 255, 255, 0.2);
              text-align: center;
              &:nth-child(1) {
                border-left: none;
              }
              .icn-like {
                background: url(./images/zan.png);
                &:hover {
                  background: url(./images/zan2.png);
                  background-repeat: no-repeat;
                  background-position: center center;
                }
              }
              .icn-sub {
                background: url(./images/sub.png);
                &:hover {
                  background: url(./images/sub2.png);
                  background-repeat: no-repeat;
                  background-position: center center;
                }
              }
              .icn-share {
                background: url(./images/share.png);
                &:hover {
                  background: url(./images/share2.png);
                  background-repeat: no-repeat;
                  background-position: center center;
                }
              }
              .icn {
                position: relative;
                top: -11px;
                display: inline-block;
                width: 36px;
                height: 36px;
                background-repeat: no-repeat;
                background-position: center center;
              }
            }
          }
          .f-thide {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          .tt {
            box-sizing: content-box;
            position: relative;
            width: auto;
            height: 50px;
            padding-left: 20px;
            margin-right: 200px;
            line-height: 50px;
            font-size: 18px;
            color: #fff;
            font-weight: normal;
          }
        }
        .layer {
          display: none;
          height: auto;
          background: rgba(0, 0, 0, 0.7);
          .fvhc {
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            text-align: center;
            .fvhc-1 {
              width: 100%;
            }
          }
        }
        .layer-end-nonext {
          display: none;
          height: auto;
          background: rgba(0, 0, 0, 0.7);
          .fvhc {
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            text-align: center;
            .fvhc-1 {
              width: 100%;
            }
          }
          .btn {
            display: inline-block;
            margin-right: 10px;
            .icn {
              position: relative;
              display: block;
              background: url(./images/replay.png);
              background-repeat: no-repeat;
              background-position: center center;
              width: 74px;
              height: 74px;
              &:hover {
                background: url(./images/replay2.png);
              }
            }
            .bottom {
              position: static;
              display: inline-block;
              width: auto;
              height: 26px;
              padding: 0 10px;
              margin-top: 8px;
              line-height: 26px;
              font-size: 14px;
              color: #a5a7a8;
            }
          }
        }
        .layer-end-next {
          .tip {
            width: 80%;
            margin: 0 auto;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            .f-thide {
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
            }
          }
          .btns {
            margin-top: 43px;
            .btn {
              display: inline-block;
              margin-right: 10px;
              .icn {
                position: relative;
                display: block;
                background: url(./images/replay.png);
                background-repeat: no-repeat;
                background-position: center center;
                width: 74px;
                height: 74px;
                &:hover {
                  background: url(./images/replay2.png);
                }
              }
              .bottom {
                position: static;
                display: inline-block;
                width: auto;
                height: 26px;
                padding: 0 10px;
                margin-top: 8px;
                line-height: 26px;
                font-size: 14px;
                color: #a5a7a8;
              }
            }
            .btn-2 {
              margin-left: 68px;
              .top {
                position: relative;
                display: block;
                width: 73px;
                height: 73px;
                background: url(./images/下载.png);
                background-repeat: no-repeat;
                background-position: center center;
                .next {
                  position: relative;
                  top: 5px;
                  left: -1px;
                }
                &:hover {
                  background: url(./images/下载2.png);
                }
              }
              .bottom {
                position: static;
                display: inline-block;
                box-sizing: content-box;
                width: auto;
                height: 26px;
                padding: 0 10px;
                line-height: 26px;
                font-size: 14px;
                color: #a5a7a8;
                margin-top: 7px;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 9999px;
                &:hover {
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .controls {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 42px;
        // -ms-transform: translateY(100%);
        transform: translateY(100%);
        // transform: translateY(0);
        transition: all 0.2s ease-in;
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 79px;
          background: url(./images/下载4.png) repeat-x;
        }
        .wrap {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          .right {
            float: right;
            .ffl {
              float: left;
            }
            .duration {
              height: 34px;
              margin: 0;
              line-height: 34px;
              color: rgba(255, 255, 255, 0.5);
              position: static;
            }
            .volume {
              position: relative;
              box-sizing: content-box;
              margin-left: 10px;
              margin-right: 1px;
              padding: 11px 10px;
              .mute {
                display: block;
                width: 16px;
                height: 12px;
                background: url(./images/loudspeaker.png) no-repeat center
                  center;
                &:hover {
                  background: url(./images/loudspeaker2.png);
                }
              }
              .s-mute {
                background: url(./images/mute.png) no-repeat center center;
                &:hover {
                  background: url(./images/mute2.png) no-repeat center center;
                }
              }
              &:hover .sliderbg {
                display: block;
              }
              .sliderbg {
                display: none;
                box-sizing: content-box;
                position: absolute;
                top: -2px;
                left: 6px;
                width: 22px;
                height: 86px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-bottom: none;
                background: rgba(0, 0, 0, 0.7);
                -ms-transform: translateY(-100%);
                transform: translateY(-100%);
                .slider {
                  position: relative;
                  width: 4px;
                  height: 70px;
                  margin: 6px 9px;
                  border-radius: 2px;
                  background-color: rgba(255, 255, 255, 0.2);
                  .volumeMask {
                    position: absolute;
                    z-index: 10;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 70px;
                    border-radius: 2px;
                  }
                  .out {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 30%;
                    background: #b2072a;
                    border-radius: 2px;
                    .in {
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      height: 100%;
                      .dot {
                        cursor: pointer;
                        position: absolute;
                        z-index: 15;
                        top: -8px;
                        left: -8px;
                        display: block;
                        width: 20px;
                        height: 20px;
                        background: url(./images/dot.png) no-repeat center;
                        &:hover {
                          background-image: url(./images/dot2.png);
                        }
                      }
                    }
                  }
                }
                .arrow {
                  display: block;
                  position: absolute;
                  top: auto;
                  bottom: -7px;
                  left: 0;
                  right: auto;
                  width: 100%;
                  height: 7px;
                  background: url(./images/arrow.png) no-repeat;
                  background-position: center top;
                  cursor: default;
                  &::before {
                    content: '';
                    width: 6px;
                    position: absolute;
                    left: -1px;
                    top: 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(0, 0, 0, 0.7);
                  }
                  &::after {
                    content: '';
                    width: 6px;
                    position: absolute;
                    top: 0;
                    right: -1px;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(0, 0, 0, 0.7);
                  }
                }
              }
            }
            .brs {
              position: relative;
              width: 50px;
              height: 17px;
              margin-top: 9px;
              z-index: 3;
              &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                width: 1px;
                height: 100%;
                background: rgba(255, 255, 255, 0.2);
              }
              &::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                display: block;
                width: 1px;
                height: 100%;
                background: rgba(255, 255, 255, 0.2);
              }
              .current {
                line-height: 17px;
                text-align: center;
                color: rgba(255, 255, 255, 0.5);
                cursor: default;
                &:hover .j-label {
                  color: #fff;
                }
              }
              &:hover .options {
                display: block;
              }
              .optionsMask {
                position: relative;
                width: 66px;
              }
              .options {
                display: none;
                margin-top: -33px;
                margin-left: -10px;
                width: 66px;
                box-sizing: border-box;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-bottom: none;
                background: rgba(0, 0, 0, 0.7);
                transform: translateY(-100%);
                .itm {
                  position: relative;
                  height: 26px;
                  padding: 0;
                  line-height: 26px;
                  border: none;
                  border-top: 1px solid rgba(255, 255, 255, 0.2);
                  .label {
                    position: relative;
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 0 10px 0 18px;
                    box-sizing: border-box;
                    text-align: justify;
                    overflow: hidden;
                    &::after {
                      content: '';
                      display: inline-block;
                      width: 100%;
                      height: 0;
                    }
                  }
                  .ffull {
                    position: absolute;
                    display: block;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0);
                  }
                  &:hover {
                    border-top-color: transparent;
                    background: rgba(255, 255, 255, 0.2);
                  }
                }
                .arrow {
                  display: block;
                  position: absolute;
                  top: auto;
                  bottom: -7px;
                  left: 0;
                  right: auto;
                  width: 100%;
                  height: 7px;
                  background: url(./images/arrow.png) no-repeat;
                  background-position: center top;
                  cursor: default;
                  &::before {
                    content: '';
                    width: 2px;
                    position: absolute;
                    left: -1px;
                    top: 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(0, 0, 0, 0.7);
                  }
                  &::after {
                    content: '';
                    width: 2px;
                    position: absolute;
                    right: -1px;
                    top: 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(0, 0, 0, 0.7);
                  }
                }
                .z-sel {
                  border-top-color: transparent;
                  background: rgba(255, 255, 255, 0.2);
                  .label {
                    &::before {
                      content: '';
                      position: absolute;
                      top: 9px;
                      left: 4px;
                      display: block;
                      width: 10px;
                      height: 8px;
                      background: url(./images/check.png) no-repeat center;
                    }
                  }
                }
              }
            }
            .full {
              float: right;
              display: block;
              width: 34px;
              height: 34px;
              background: url(./images/full.png) no-repeat center;
              &:hover {
                background-image: url(./images/full2.png);
              }
            }
          }
          .foh {
            position: relative;
            top: -20px;
            overflow: hidden;
            .left {
              float: left;
              position: relative;
              top: 20px;
              .time {
                height: 34px;
                margin: 0;
                line-height: 34px;
                color: rgba(255, 255, 255, 0.5);
                position: static;
              }
              .stop {
                float: left;
                width: 34px;
                height: 32px;
                margin: 0 6px;
                background: url(./images/stop.png) no-repeat center;
                &:hover {
                  background: url(./images/stop2.png) no-repeat center;
                }
              }
              .play {
                float: left;
                width: 34px;
                height: 32px;
                margin: 0 6px;
                background: url(./images/play.png) no-repeat center;
                &:hover {
                  background: url(./images/play2.png) no-repeat center;
                }
              }
            }
            .progresswrap {
              box-sizing: content-box;
              position: relative;
              height: 34px;
              padding: 15px 10px 0;
              overflow: hidden;
              .progress {
                position: absolute;
                height: 4px;
                border-radius: 2px;
                background-color: rgba(255, 255, 255, 0.2);
                cursor: pointer;
                user-select: none;
                .out-1 {
                  width: 0;
                  background-color: #b2072a;
                  z-index: 2;
                }
                .out {
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 100%;
                  border-radius: 2px;
                  .in {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 100%;
                    .dot {
                      position: absolute;
                      top: -10px;
                      right: -12px;
                      display: block;
                      width: 24px;
                      height: 24px;
                      background: url(./images/dot_big.png) no-repeat center;
                      &:hover {
                        background-image: url(./images/dot_big2.png);
                      }
                    }
                  }
                }
              }
              .progress-2 {
                top: 35px;
                left: 10px;
                right: 10px;
                width: auto;
                .j-ht {
                  display: none;
                  position: absolute;
                  left: 130px;
                  top: -27px;
                  min-width: 44px;
                  .hovertime {
                    box-sizing: content-box;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 5px;
                    background: rgba(0, 0, 0, 0.7);
                  }
                  .arrow {
                    display: block;
                    position: absolute;
                    top: auto;
                    bottom: -10px;
                    left: 0;
                    right: auto;
                    width: 100%;
                    height: 7px;
                    background: url(./images/arrow.png) no-repeat;
                    background-position: center top;
                    cursor: default;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .btn_bottom {
    margin: 12px 0 45px;
    .u-btn {
      box-sizing: content-box;
      margin-right: 10px;
      color: #333;
      background: url('~@/assets/button2.png') no-repeat;
      background-position: right -100px;
      padding: 0 5px 0 0;
      white-space: nowrap;
      display: inline-block;
      height: 31px;
      line-height: 31px;
      overflow: hidden;
      vertical-align: top;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-position: right -182px;
      }
      &:hover i {
        background-position: 0 -141px;
      }
      i {
        padding: 0 5px 0 10px;
        color: #333;
        background: url('~@/assets/button2.png') no-repeat;
        background-position: 0 -59px;
        display: inline-block;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        vertical-align: top;
        text-align: center;
        cursor: pointer;
      }
      .icn {
        float: left;
        background: url('~@/assets/button2.png') no-repeat;
      }
    }
    .like {
      .icn-praise {
        width: 17px;
        height: 15px;
        margin: 8px 6px 0 0;
        background-position: 0 -95px;
      }
    }
    .fav {
      .icn-fav {
        width: 17px;
        height: 15px;
        margin: 8px 6px 0 0;
        background-position: -9px -984px;
      }
    }
    .share {
      .icn-share {
        width: 17px;
        height: 15px;
        margin: 8px 6px 0 0;
        background-position: -7px -1233px;
      }
    }
  }
}
</style>