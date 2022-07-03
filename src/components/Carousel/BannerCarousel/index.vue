<template>
  <div class="swiper-father">
    <div class="swiper-container" ref="bannerSwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in bannerList"
          :key="index"
        >
          <a href="#"><img :src="item.imageUrl" alt="" /></a>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" style="left: -120px"></div>
    </div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev" @click="prevBtn"></div>
    <div class="swiper-button-next" @click="nextBtn"></div>

    <div class="download">
      <a href="#" class="side-download">下载客户端</a>
      <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  data() {
    return {
      swiperIndex: 0
    }
  },
  props: ['bannerList'],
  watch: {
    bannerList: {
      handler() {
        this.$parent.$refs.banner.style.backgroundImage = `url(${this.bannerList[this.swiperIndex].imageUrl})`
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.bannerSwiper, {
            loop: true, // 循环模式选项
            autoplay: true,
            on: {
              autoplay: () => {
                this.nextBtn()
              }
            },
            effect: 'fade',
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              bulletActiveClass: 'my-bullet-active',
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          })
        })
      }
    }
  },
  methods: {
    nextBtn() {
      if (this.swiperIndex === this.bannerList.length - 1) this.swiperIndex = -1
      this.swiperIndex++
      this.$parent.$refs.banner.style.backgroundImage = `url(${this.bannerList[this.swiperIndex].imageUrl})`
    },
    prevBtn() {
      if (this.swiperIndex === 0) this.swiperIndex = this.bannerList.length
      this.swiperIndex--
      this.$parent.$refs.banner.style.backgroundImage = `url(${this.bannerList[this.swiperIndex].imageUrl})`
    }
  }
}
</script>
<style>
.my-bullet-active {
  background: #c70c0c;
  opacity: 1;
}
</style>
<style lang="less" scoped>
.swiper-father {
  position: relative;
  width: 100%;
  height: 100%;
  .download {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
    width: 246px;
    height: 100%;
    background: url(./images/download.png) no-repeat;
    .side-download {
      display: block;
      width: 215px;
      height: 56px;
      text-indent: -9999px;
      margin: 186px 0 0 19px;
      &:hover {
        background: url(./images/download.png) no-repeat 0 -290px;
      }
    }
    p {
      margin: 10px auto;
      text-align: center;
      color: #8d8d8d;
    }
  }
  .swiper-button-prev {
    width: 37px;
    height: 63px;
    color: #fff;
    left: -70px !important;
    &:hover {
      background-color: #333;
      opacity: 0.3;
    }
  }
  .swiper-button-next {
    width: 37px;
    height: 63px;
    color: #fff;
    right: -60px !important;
    &:hover {
      background-color: #333;
      opacity: 0.3;
    }
  }
}
.swiper-container {
  width: 100%;
  height: 100%;
  .swiper-wrapper {
    height: 100%;
    .swiper-slide {
      height: 100%;
      a {
        display: block;
        width: 100%;
        height: 100%;
        img {
          width: 75%;
          height: 100%;
        }
      }
    }
  }
}
</style>