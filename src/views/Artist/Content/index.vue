<template>
  <div>
    <div class="n-artist f-cb">
      <div class="btm">
        <h2 class="sname f-thide sname-max" :title="`${artistInfo.name} - `">
          {{ artistInfo.name }}
        </h2>
        <h3 class="salias f-thide" :title="`${artistInfo.name} - `"></h3>
      </div>
      <img :src="artistInfo.cover" alt="" />
      <div class="mask f-alpha"></div>
      <a href="#" class="btn-rz f-tid">Ta的个人主页</a>
      <a href="#" class="btnfav f-tid">收藏</a>
    </div>

    <ul class="m-tabs f-cb">
      <li class="fst" @click="toggle(0)">
        <router-link
          href="#"
          :class="{ 'z-st': current === 0 ? true : false }"
          :to="`/artist/?id=${$route.query.id}`"
        >
          <em>热门作品</em>
        </router-link>
      </li>
      <li class="fst" @click="toggle(1)">
        <router-link
          href="#"
          :to="`/artist/album/?id=${$route.query.id}`"
          :class="{ 'z-st': current === 1 ? true : false }"
        >
          <em>所有专辑</em>
        </router-link>
      </li>
      <li class="fst" @click="toggle(2)">
        <router-link
          href="#"
          :to="`/artist/mv/?id=${$route.query.id}`"
          :class="{ 'z-st': current === 2 ? true : false }"
        >
          <em>相似MV</em>
        </router-link>
      </li>
      <li class="fst" @click="toggle(3)">
        <router-link
          href="#"
          :to="`/artist/desc/?id=${$route.query.id}`"
          :class="{ 'z-st': current === 3 ? true : false }"
        >
          <em>艺人介绍</em>
        </router-link>
      </li>
    </ul>

    <!-- tab栏切换 -->
    <!-- 二级路由 -->
    <router-view :artistInfo="artistInfo"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      artistInfo: {},
      current: this.$route.meta.selected
    }
  },
  created() {
    this.getArtistDetail()
  },
  methods: {
    async getArtistDetail() {
      const result = await this.$API.artist.reqGetArtistDetailById(this.$route.query.id)
      this.artistInfo = result.data.artist
    },
    getArtistInfo(info) {
      this.artistInfo = info
    },
    toggle(num) {
      switch (num) {
        case 0: this.current = 0
          break
        case 1: this.current = 1
          break
        case 2: this.current = 2
          break
        case 3: this.current = 3
      }
    }
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getArtistDetail()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.f-cb {
  &::after {
    display: block;
    content: '.';
    height: 0;
    visibility: hidden;
    clear: both;
  }
}
.n-artist {
  position: relative;
  zoom: 1;
  height: 333px;
  margin-top: -20px;
  .btm {
    .sname {
      float: left;
      max-width: 75%;
      height: 34px;
      line-height: 24px;
      font-weight: normal;
      font-size: 24px;
      color: #333;
    }
    .f-thide {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
    .salias {
      box-sizing: content-box;
      float: left;
      max-width: 23%;
      padding-left: 10px;
      font-size: 14px;
      line-height: 32px;
      color: #999;
      font-weight: normal;
    }
  }
  img {
    display: block;
    width: 640px;
    height: 300px;
    border: none;
  }
  .mask {
    display: block;
    width: 640px;
    height: 300px;
    position: absolute;
    top: 34px;
    left: 0;
    background: url(./images/ban_mask.png) no-repeat;
  }
  .btn-rz {
    position: absolute;
    z-index: 2;
    display: block;
    bottom: 18px;
    right: 116px;
    width: 96px;
    height: 32px;
    text-indent: -9999px;
    background: url('~@/assets/iconall.png') no-repeat;
    background-position: 0 -1156px;
    &:hover {
      background-position: 0 -1196px;
    }
  }
  .btnfav {
    display: block;
    position: absolute;
    bottom: 18px;
    right: 20px;
    width: 76px;
    height: 32px;
    text-indent: -9999px;
    background: url('~@/assets/iconall.png') no-repeat;
    background-position: 0 -500px;
    &:hover {
      background-position: 0 -540px;
    }
  }
}
.m-tabs {
  box-sizing: content-box;
  margin-top: 1px;
  width: 638px;
  height: 39px;
  border: 1px solid #ccc;
  border-width: 0 1px;
  background: url(./images/tab.png);
  background-position: 0 0;
  background-repeat: repeat-x;
  li {
    position: relative;
    left: -1px;
    float: left;
    height: 39px;
    font-size: 14px;
    a {
      float: left;
      box-sizing: content-box;
      box-sizing: content-box;
      height: 39px;
      font-size: 14px;
      padding-left: 2px;
      background: url(./images/tab.png) no-repeat;
      &:hover {
        background-position: left -90px;
      }
      &:hover em {
        background-position: right -90px;
      }
      em {
        float: left;
        box-sizing: content-box;
        font-size: 14px;
        height: 37px;
        width: 134px;
        padding: 2px 2px 0 0;
        line-height: 37px;
        cursor: pointer;
        text-align: center;
        background: url(./images/tab.png) no-repeat;
      }
    }
    a.z-st {
      background-position: left -90px;
      em {
        background-position: right -90px;
      }
    }
  }
}
</style>