<template>
  <div class="aside">
    <div class="n-user-profile" v-if="!token">
      <div class="n-myinfo-1">
        <p class="note s-fc3">
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
        </p>
        <a href="javascript:;" class="btn_login" @click="login">用户登录</a>
      </div>
    </div>
    <div class="n-user-profile" v-else>
      <div class="n-myinfo s-bg s-bg-5">
        <div class="f-cb">
          <a href="" class="head f-pr">
            <img :src="profile.avatarUrl" alt="" />
          </a>
          <div class="info">
            <h4>
              <a href="" class="nm nm-icn f-fs1 f-ib f-thide vip-60">{{
                profile.nickname
              }}</a>
              <span class="vip-level vip-1"></span>
            </h4>
            <p>
              <a href="" class="u-lv u-icn2 u-icn2-lv">
                {{ level }}
                <i class="right u-icn2 u-icn2-lvright"></i>
              </a>
            </p>
            <div class="btnwrap f-pr">
              <a href="javascript:;" class="sign u-btn2 u-btn2-2">
                <i>签到</i>
              </a>
            </div>
          </div>
        </div>
        <ul class="dny s-fc3">
          <li>
            <a href="">
              <strong>{{ profile.eventCount }}</strong>
              <span>动态</span>
            </a>
          </li>
          <li class="vertical-split"></li>
          <li>
            <a href="">
              <strong>{{ profile.follows }}</strong>
              <span>关注</span>
            </a>
          </li>
          <li class="vertical-split"></li>
          <li>
            <a href="">
              <strong>{{ profile.followeds }}</strong>
              <span>粉丝</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="n-singer">
      <h3 class="v-hd3">
        <span>热门歌手</span>
        <a href="#">查看全部 ></a>
      </h3>
      <ul class="n-enter f-cb">
        <li v-for="(item, index) in homeInSingerList" :key="item.id">
          <a href="#">
            <div class="head">
              <img :src="item.picUrl" alt="" />
            </div>
            <div class="ifo">
              <h4>
                <span>{{ item.name }}</span>
              </h4>
              <p>专辑数：{{ item.albumSize }}</p>
            </div>
          </a>
        </li>
      </ul>
      <div>
        <a href="#" class="u-btn2 u-btn2-1">
          <i>申请成为网易音乐人</i>
        </a>
      </div>
    </div>
    <div class="n-dj n-dj-1">
      <h3 class="v-hd3">热门主播</h3>
      <ul class="n-hotdj f-cb">
        <li v-for="(item, index) in hotAuthorList" :key="item.id">
          <a href="#" class="cver">
            <img :src="item.avatarUrl" alt="" />
          </a>
          <div class="info">
            <p>
              <a href="#">{{ item.nickName }}</a>
            </p>
            <p class="f-thide s-fc3">得分：{{ item.score }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      hotAuthorList: []
    }
  },
  async mounted() {
    this.$store.dispatch('recommend/getInSinger')
    // 首页热门主播
    const result = await this.$API.recommend.reqPopularAnchor()
    this.hotAuthorList = result.data.list
    await this.$store.dispatch('user/getAccountInfo')
    this.$store.dispatch('user/getUserInfo')
  },
  computed: {
    ...mapState({
      inSingerList: state => state.recommend.inSingerList,
      profile: state => state.user.profile,
      level: state => state.user.level
    }),
    homeInSingerList() {
      return this.inSingerList.filter((item, index) => index < 5)
    },
    token() {
      return getToken()
    }
  },
  methods: {
    login() {
      this.$parent.$parent.$children[0].login()
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: content-box;
}
.n-user-profile {
  background: url(./images/index.png) no-repeat 0 0;
  .note {
    width: 205px;
    margin: 0 auto;
    padding: 16px 0;
    line-height: 22px;
    color: #666;
  }
  .btn_login {
    display: block;
    margin: 0 auto;
    width: 100px;
    height: 31px;
    background: url(./images/index.png) no-repeat 0 -195px;
    line-height: 31px;
    text-align: center;
    color: #fff;
    text-shadow: 0 1px 0 #8a060b;
    &:hover {
      background-position: -110px -195px;
    }
  }
  .n-myinfo {
    height: 165px;
    padding-top: 20px;
    background: url(./images/index.png) no-repeat;
    background-position: 0 -270px;
    .f-cb::after {
      clear: both;
      content: '.';
      display: block;
      height: 0;
      visibility: hidden;
    }
    .head {
      float: left;
      width: 80px;
      height: 80px;
      margin-left: 20px;
      padding: 2px;
      background: #fff;
      border: 1px solid #dadada;
      img {
        display: block;
        width: 80px;
        height: 80px;
      }
    }
    .info {
      float: left;
      width: 115px;
      margin-left: 18px;
      padding-top: 3px;
      h4 {
        overflow: hidden;
        .nm-icn {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          width: auto;
          max-width: 60px !important;
          float: left;
          vertical-align: middle;
          font-size: 14px;
          color: #333;
        }
        .vip-1 {
          width: 43px;
          height: 16px;
          background: url(./images/vip1.png);
          background-size: 100% 15px;
          background-repeat: no-repeat;
          background-position: center;
          float: left;
          margin-left: 5px;
        }
      }
      p {
        width: 100%;
        margin-top: 5px;
        .u-lv {
          display: inline-block;
          height: 17px;
          overflow: hidden;
          padding-left: 25px;
          line-height: 18px;
          color: #999;
          font-weight: bold;
          font-style: italic;
          background: url('~@/assets/icon2.png') no-repeat;
          background-position: -130px -64px;
          i {
            float: right;
            overflow: hidden;
            vertical-align: middle;
            width: 8px;
            height: 17px;
            background: url('~@/assets/icon2.png') no-repeat;
            background-position: -192px -64px;
          }
        }
      }
      .btnwrap {
        position: relative;
        zoom: 1;
        margin-top: 15px;
        .sign {
          color: #fff;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: right -428px;
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
            color: #fff;
            background-position: right -510px;
          }
          &:hover i {
            color: #fff;
            background-position: 0 -469px;
          }
          i {
            width: 60px;
            color: #fff;
            background: url('~@/assets/button2.png') no-repeat;
            background-position: 0 -387px;
            padding: 0 15px 0 20px;
            pointer-events: none;
            display: inline-block;
            height: 31px;
            line-height: 31px;
            overflow: hidden;
            vertical-align: top;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
    .dny {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-top: 22px;
      padding: 0 25px;
      color: #666;
      li {
        height: 40px;
        a {
          display: block;
          color: #666;
          strong {
            display: block;
            font-size: 20px;
            font-weight: normal;
            white-space: nowrap;
            span {
              margin-left: 2px;
            }
          }
        }
      }
      .vertical-split {
        height: 40px;
        background-color: #e4e4e4;
        width: 1px;
      }
    }
  }
  .n-myinfo-1 {
    height: 126px;
  }
}
.n-singer {
  margin-top: 15px;
  .v-hd3 {
    position: relative;
    height: 23px;
    margin: 0 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
    font-size: 12px;
    span {
      float: left;
      color: #333;
    }
    a {
      float: right;
      color: #666;
      font-weight: 400;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .n-enter {
    margin: 6px 0 14px 20px;
    li {
      margin-top: 14px;
      width: 210px;
      height: 62px;
      background: #fafafa;
      a {
        display: block;
        width: 210px;
        height: 62px;
        &:hover {
          background: #f4f4f4;
        }
        .head {
          float: left;
          width: 62px;
          height: 62px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .ifo {
          float: left;
          width: 133px;
          height: 60px;
          padding-left: 14px;
          border: 1px solid #e9e9e9;
          border-left: none;
          h4 {
            margin-top: 8px;
            color: #000;
            span {
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          p {
            margin-top: 8px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .u-btn2-1 {
    display: inline-block;
    overflow: hidden;
    width: 210px;
    height: 31px;
    text-align: center;
    vertical-align: top;
    line-height: 31px;
    margin-left: 20px;
    border-radius: 4px;
    color: #333;
    padding: 0 5px 0 0;
    white-space: nowrap;
    background: url(./images/button2.png) no-repeat right -100px;
    i {
      display: inline-block;
      background: url(./images/button2.png) no-repeat 0 -59px;
      width: 208px;
      height: 31px;
      line-height: 31px;
      text-align: center;
      padding: 0 15px 0 20px;
      font-weight: bold;
      color: #333;
    }
    &:hover i {
      background-position: 0 -141px;
    }
  }
}
.n-dj {
  margin-top: 30px;
  .v-hd3 {
    position: relative;
    height: 23px;
    margin: 0 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
  }
  .n-hotdj {
    margin: 20px 0 0 20px;
    li {
      width: 210px;
      height: 50px;
      .cver {
        float: left;
        width: 40px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        float: left;
        width: 160px;
        line-height: 21px;
        p {
          width: 100%;
          height: 21px;
          a {
            color: #000;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .s-fc3 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          color: #666;
        }
      }
    }
  }
}
</style>