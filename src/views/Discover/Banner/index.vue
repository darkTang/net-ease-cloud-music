<template>
  <div class="banner" ref="banner">
    <div class="wrap">
      <Carousel :bannerList="bannerList" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Carousel from '@/components/Carousel/BannerCarousel'
export default {
  components: {
    Carousel
  },
  mounted() {
    this.$store.dispatch('recommend/getBannerList')
  },
  computed: {
    ...mapState({
      bannerList: state => state.recommend.bannerList
    })
  }
}
</script>


<style lang="less" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 285px;
  background-repeat: no-repeat;
  background-size: 8000px;
  .wrap {
    position: relative;
    width: 982px;
    height: 285px;
    margin: 0 auto;
  }
}
</style>