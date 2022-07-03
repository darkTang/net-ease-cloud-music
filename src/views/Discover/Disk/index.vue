<template>
  <div class="disk">
    <div class="nav">
      <a href="#" class="new_disk">新碟上架</a>
      <span class="more">
        <a href="#">更多</a>
        <i></i>
      </span>
    </div>
    <div class="n-disk">
      <Carousel :newAlbumList="newAlbumList" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Carousel from '@/components/Carousel/DiskCarousel'
export default {
  components: {
    Carousel
  },
  async mounted() {
    this.$store.dispatch('recommend/getNewAlbum')
  },
  computed: {
    ...mapState({
      newAlbumList: state => state.recommend.newAlbumList
    })
  }
}
</script>

<style lang="less" scoped>
.nav {
  position: relative;
  display: flex;
  height: 33px;
  padding: 0 10px 0 34px;
  background: url(./images/index.png) no-repeat -225px -156px;
  border-bottom: 2px solid #c10d0c;
  .new_disk {
    font-size: 20px;
    font-weight: 400;
    color: #333;
    line-height: 28px;
  }
  .more {
    position: absolute;
    right: 10px;
    margin-top: 9px;
    a:hover {
      text-decoration: underline;
    }
    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      vertical-align: middle;
      background: url(./images/index.png) no-repeat 0 -240px;
    }
  }
}

.n-disk {
  position: relative;
  zoom: 1;
  height: 186px;
  margin: 20px 0 37px;
  background: #f5f5f5;
  padding: 0 16px;
  border: 1px solid #d3d3d3;
}
</style>