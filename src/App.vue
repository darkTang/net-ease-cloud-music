<template>
  <div class="main">
    <!-- 头部静态组件 -->
    <Header />
    <!-- 路由组件 -->
    <router-view />
    <!-- 底部静态组件 -->
    <Footer />
    <a
      href="javascript:;"
      title="回到顶部"
      class="m-back"
      ref="goBack"
      @click="goBack"
      >回到顶部</a
    >
    <!-- 底部播放栏 -->
    <BtmBar v-if="$route.meta.btmPlayShow" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BtmBar from '@/components/BtmBar'
export default {
  components: {
    Header,
    Footer,
    BtmBar,
  },
  mounted() {
    document.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        this.$refs.goBack.style.display = 'block'
      } else {
        this.$refs.goBack.style.display = 'none'
      }
    })
  },
  methods: {
    goBack() {
      window.scroll(0, 0)
    }
  }
}
</script> 
<style>
.el-icon-loading {
  color: #a2161b !important;
}
.el-loading-text {
  color: #a2161b !important;
  font-size: 12px !important;
}
</style>
<style lang="less" scoped>
.m-back {
  display: none;
  position: fixed;
  text-indent: -9999px;
  left: 50%;
  margin-left: 500px;
  bottom: 160px;
  width: 49px;
  height: 44px;
  background: url(./assets/sprite.png) no-repeat -265px -47px;
  &:hover {
    background-position: -325px -47px;
  }
}
</style>