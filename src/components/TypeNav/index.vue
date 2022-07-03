<template>
  <div class="n-sltlyr d-flag n-sltlyr-show">
    <div class="hd">
      <i class="icn"></i>
    </div>
    <div class="bd">
      <h3>
        <router-link class="j-flag u-btn u-btn-g s-fc1" to="/discover/playlist"
          ><em>全部风格</em></router-link
        >
      </h3>
      <div @click="goTagPlayList">
        <dl class="f-cb" v-for="(category, index) in categories" :key="index">
          <dt>
            <i class="u-icn" :class="toggleClass(index)"></i>
            {{ category }}
          </dt>
          <dd :class="{ last: index == 4 }">
            <label
              v-for="(tag, indexes) in tagsList"
              :key="indexes"
              v-if="toggleCategory(index, tag)"
            >
              <a href="javascript:;" :class="{'z-slt': tag.name === $route.query.cat}">{{ tag.name }}</a>
              <span class="line">|</span>
            </label>
          </dd>
        </dl>
      </div>
    </div>
    <div class="ft"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      tagsList: []
    }
  },
  async created() {
    const result = await this.$API.playlist.reqGetPlayListCatList()
    this.categories = result.categories
    this.tagsList = result.sub
    console.log(result);
  },
  methods: {
    toggleClass(index) {
      switch (index) {
        case '0': return 'u-icn-5'
        case '1': return 'u-icn-6'
        case '2': return 'u-icn-7'
        case '3': return 'u-icn-8'
        case '4': return 'u-icn-9'
      }
    },
    toggleCategory(index, tag) {
      if (index === '0') {
        return tag.category === 0
      } else if (index === '1') {
        return tag.category === 1
      } else if (index === '2') {
        return tag.category === 2
      } else if (index === '3') {
        return tag.category === 3
      } else if (index === '4') {
        return tag.category === 4
      }
    },
    goTagPlayList(e) {
      if (e.target.nodeName === 'A') {
        this.$router.push(`/discover/playlist/?cat=${e.target.innerText}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.n-sltlyr {
  display: block;
  position: absolute;
  top: 72px;
  left: 0;
  z-index: 5;
  width: 720px;
  .hd {
    height: 32px;
    background: url(./images/sltlyr.png) no-repeat;
    .icn {
      position: absolute;
      top: 2px;
      left: 132px;
      display: inline-block;
      width: 24px;
      height: 11px;
      background: url('~@/assets/iconall.png') no-repeat;
      background-position: -48px 0;
      vertical-align: middle;
    }
  }
  .bd {
    .f-cb::after {
      clear: both;
      content: '.';
      display: block;
      height: 0;
      visibility: hidden;
    }
    box-sizing: content-box;
    width: 700px;
    padding: 0 10px;
    background: url(./images/sltlyr.png);
    background-position: -720px 0;
    background-repeat: repeat-y;
    h3 {
      box-sizing: content-box;
      height: 37px;
      padding-left: 26px;
      border-bottom: 1px solid #e6e6e6;
      font-weight: normal;
      .u-btn-g {
        display: inline-block;
        width: 75px;
        height: 26px;
        background: url('~@/assets/button.png') no-repeat;
        background-position: 0 -64px;
        text-align: center;
        line-height: 26px;
        color: #333;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    dt {
      float: left;
      display: inline;
      width: 70px;
      margin: 0 -100px 0 26px;
      padding-top: 15px;
      border-right: 1px solid #e6e6e6;
      font-weight: bold;
      .u-icn {
        display: inline-block;
        overflow: hidden;
        margin-right: 8px;
        margin-bottom: 4px;
        vertical-align: middle;
        width: 23px;
        height: 23px;
        background: url('~@/assets/icon.png') no-repeat;
      }
      .u-icn-5 {
        background-position: -20px -735px;
      }
      .u-icn-6 {
        background-position: 0 -60px;
      }
      .u-icn-7 {
        background-position: 0 -88px;
      }
      .u-icn-8 {
        background-position: 0 -117px;
      }
      .u-icn-9 {
        background-position: 0 -141px;
      }
    }
    dd {
      box-sizing: content-box;
      margin-left: 96px;
      padding: 16px 15px 0 15px;
      border-left: 1px solid #e6e6e6;
      line-height: 24px;
      a {
        white-space: nowrap;
        color: #333;
        &:hover {
          text-decoration: underline;
        }
      }
      .z-slt {
        box-sizing: content-box;
        background: #a7a7a7;
        color: #fff;
        padding: 2px 6px;
      }
      .line {
        margin: 0 8px 0 10px;
        color: #d8d8d8;
      }
    }
    .last {
      box-sizing: content-box;
      padding-bottom: 25px;
    }
  }
  .ft {
    height: 20px;
    background: url(./images/sltlyr.png) no-repeat;
    background-position: -1440px -12px;
  }
}
</style>