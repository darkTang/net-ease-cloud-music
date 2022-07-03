<template>
  <div class="swiper-father2">
    <div class="swiper-container" ref="diskSwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in albumList"
          :key="item.id"
        >
          <div class="u-cover u-cover-alb1">
            <img :src="item.picUrl" alt="" />
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
          <p class="f-thide">
            <router-link
              :title="item.name"
              href="#"
              :to="`/album/?id=${item.id}`"
              >{{ item.name }}</router-link
            >
          </p>
          <p class="tit f-thide">
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
          </p>
        </div>
      </div>
    </div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev my-button-prev"></div>
    <div class="swiper-button-next my-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import { mapState } from 'vuex'
export default {
  props: ['newAlbumList'],
  computed: {
    ...mapState({
      albumSongsList: state => state.album.albumSongsList
    }),
    albumList() {
      return this.newAlbumList.filter((item, index) => index < 10)
    }
  },
  methods: {
    async play(pId) {
      await this.$store.dispatch('album/getAlbumSongsList', pId)
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
      if (this.$parent.$parent.$parent.$children[3].songPlay) {
        this.$parent.$parent.$parent.$children[3].songPlay()
      } else {
        this.$parent.$parent.$parent.$children[2].songPlay()
      }
    }
  },
  watch: {
    newAlbumList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.diskSwiper, {
            loop: true, // 循环模式选项
            speed: 1500,
            slidesPerView: 5,
            slidesPerGroup: 5,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.my-button-next',
              prevEl: '.my-button-prev',
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-button-prev {
  position: absolute;
  left: -13px;
  width: 17px;
  height: 17px;
  &::after {
    content: '';
    width: 17px;
    height: 17px;
    background: url(./images/index.png) no-repeat -260px -75px;
  }
}
.swiper-button-next {
  position: absolute;
  right: -10px;
  width: 17px;
  height: 17px;
  &::after {
    content: '';
    width: 17px;
    height: 17px;
    background: url(./images/index.png) no-repeat -300px -75px;
  }
}
</style>
<style lang="less" scoped>
.swiper-father2 {
  position: relative;
  width: 100%;
  height: 100%;
  .swiper-container {
    width: 660px;
    height: 100%;
    .swiper-wrapper {
      height: 100%;
      margin: 28px 0 0 10px;
      .swiper-slide {
        width: 118px;
        height: 150px;
        .u-cover {
          position: relative;
          display: block;
          width: 100px;
          height: 100px;
          margin-bottom: 7px;
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
            width: 118px;
            height: 100px;
            background: url(./images/coverall.png) no-repeat 0 -570px;
          }
          .icon-play {
            display: none;
            position: absolute;
            left: 72px;
            right: 10px;
            bottom: 5px;
            width: 22px;
            height: 22px;
            background: url(./images/iconall.png) no-repeat 0 -85px;
            &:hover {
              background-position: 0 -110px;
            }
          }
        }
        .f-thide {
          width: 90%;
          line-height: 18px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          a {
            color: #000;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .tit a {
          color: #666;
        }
      }
    }
  }
}
</style>