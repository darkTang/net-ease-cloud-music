<template>
  <div class="n-rcmd">
    <div class="v-hd2">
      <span class="tit f-ff2 f-tdn">个性化推荐</span>
    </div>
    <ul class="m-cvrlst m-cvrlst-idv f-cb">
      <li>
        <router-link
          to="/discover/recommend/taste"
          class="date u-date f-alpha"
          title="每日歌曲推荐"
        >
          <span class="head">星期{{ week }}</span>
          <span class="bd">{{ date }}</span>
          <span class="mask" title="每日歌曲推荐"></span>
        </router-link>
        <p class="dec">
          <router-link
            to="/discover/recommend/taste"
            class="tit s-fc0"
            title="每日歌曲推荐"
            >每日歌曲推荐</router-link
          >
        </p>
        <p class="idv s-fc4" title="根据你的口味生成，每天6:00更新">
          根据你的口味生成，
          <br />
          每天6:00更新
        </p>
      </li>
      <li v-for="(item, index) in filterPersonalList" :key="item.id">
        <div class="u-cover u-cover-1">
          <img v-lazy="item.picUrl" alt="" />
          <router-link
            :title="item.name"
            :to="`/playlist?id=${item.id}`"
            class="msk"
          ></router-link>
          <div class="bottom">
            <a
              title="播放"
              href="javascript:;"
              class="icon-play"
              @click="play(item.id)"
            ></a>
            <span class="icon-headset"></span>
            <span class="nb">{{
              item.playCount > 100000
                ? Math.floor(item.playCount / 10000) + '万'
                : item.playCount
            }}</span>
          </div>
        </div>
        <p class="desc">
          <router-link :title="item.name" :to="`/playlist?id=${item.id}`">{{
            item.name
          }}</router-link>
        </p>
        <p class="idv f-brk s-fc4" :title="toggleTitle(index)">
          <em>{{ toggleTitle(index) }}</em>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
function padZero(n) {
  return n > 9 ? n : '0' + n
}
export default {
  data() {
    return {
      personalPlayList: [],
      date: '',
      week: ''
    }
  },
  computed: {
    filterPersonalList() {
      return this.personalPlayList.filter((item, index) => index < 3)
    },
  },
  created() {
    let arr = ['日', '一', '二', '三', '四', '五', '六']
    this.getPersonalPlayList()
    let date = new Date()
    this.date = padZero(date.getDate())
    this.week = arr[date.getDay()]
  },
  methods: {
    async getPersonalPlayList() {
      const result = await this.$API.recommend.reqPersonalPlayList(encodeURIComponent(getToken()))
      this.personalPlayList = result.recommend
      console.log(result);
    },
    toggleTitle(index) {
      if (index === 0) return '猜你喜欢'
      if (index === 1) return '你可能感兴趣'
      if (index === 2) return '根据常听推荐'
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: content-box;
}
.n-rcmd {
  .v-hd2 {
    height: 33px;
    padding: 0 10px 0 34px;
    background-position: -225px -156px;
    border-bottom: 2px solid #c10d0c;
    background: url(./images/index.png) no-repeat -225px -156px;
    .tit {
      float: left;
      font-size: 20px;
      font-weight: normal;
      line-height: 28px;
      font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
    }
  }
  .f-cb::after {
    display: block;
    height: 0;
    content: '.';
    visibility: hidden;
    clear: both;
  }
  .m-cvrlst-idv {
    display: table;
    margin-bottom: 4px;
    line-height: 0;
    margin: 20px 0 0 -42px;
    li {
      display: table-cell;
      height: auto;
      width: 140px;
      padding-left: 42px;
      float: left;
      overflow: hidden;
      padding: 0 0 30px 42px;
      line-height: 1.4;
      .u-date {
        position: relative;
        zoom: 1;
        display: block;
        width: 140px;
        height: 140px;
        background: url(./images/date.png) no-repeat;
        background-position: 0 0;
        .head {
          display: block;
          height: 33px;
          line-height: 33px;
          color: #fed9d9;
          font-size: 14px;
          text-shadow: 0 -1px #962626;
          text-align: center;
        }
        .bd {
          display: block;
          line-height: 102px;
          text-align: center;
          font-size: 94px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bold;
          color: #202020;
        }
        .mask {
          position: absolute;
          top: 33px;
          left: 0;
          width: 142px;
          height: 107px;
          background: url(./images/date.png) no-repeat;
          background-position: 0 -150px;
        }
      }
      .dec {
        width: 100%;
        margin: 8px 0 3px;
        font-size: 14px;
        .tit {
          display: inline-block;
          max-width: 100%;
          vertical-align: middle;
          height: auto;
          max-height: 36px;
          overflow: hidden;
          color: #000;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .idv {
        width: 100%;
        margin-top: 3px;
        position: relative;
        z-index: 2;
        color: #999;
        em {
          min-height: 30px;
          display: inline-block;
          font-style: normal;
          text-align: left;
          font-size: inherit;
        }
      }
      .u-cover {
        position: relative;
        width: 140px;
        height: 140px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
        .msk {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url(./images/coverall.png) no-repeat 0 0;
        }
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 27px;
          background: url(./images/coverall.png) no-repeat 0 -537px;
          color: #ccc;
          .icon-play {
            position: absolute;
            right: 10px;
            bottom: 5px;
            width: 16px;
            height: 17px;
            background: url(./images/iconall.png) no-repeat 0 0;
            &:hover {
              background-position: 0 -60px;
            }
          }
          .icon-headset {
            float: left;
            width: 14px;
            height: 11px;
            background: url(./images/iconall.png) no-repeat 0 -24px;
            margin: 9px 5px 9px 10px;
          }
          .nb {
            float: left;
            margin: 7px 0 0 0;
          }
        }
      }
      .desc {
        margin: 8px 0 3px;
        font-size: 14px;
        a {
          display: inline-block;
          max-width: 100%;
          height: auto;
          max-height: 36px;
          // overflow: hidden;
          color: #000;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>