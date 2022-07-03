<template>
  <div
    class="aside"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
  >
    <h3 class="u-hd3">MV简介</h3>
    <div class="m-mvintr">
      <p class="s-fc4">发布时间：{{ publishTime }}</p>
      <p class="s-fc4" v-if="playCount < 10000">播放次数：{{ playCount }}次</p>
      <p class="s-fc4" v-else>
        播放次数：{{ Math.floor(playCount / 10000) }}万次
      </p>
    </div>

    <h3 class="u-hd3">相关推荐</h3>
    <ul class="n-mvlist f-cb">
      <li v-for="(item, index) in simiMvs" :key="item.id">
        <div class="u-cover u-cover-8 f-fl">
          <img :src="item.cover" alt="" />
          <p class="ci u-msk u-msk-1">
            <span class="u-icn2 u-icn2-mv"></span>
            {{
              item.playCount > 10000
                ? Math.floor(item.playCount / 10000) + '万'
                : item.playCount
            }}
          </p>
          <router-link
            href="#"
            class="f-link link"
            :title="item.name"
            :to="`/mv/?id=${item.id}`"
          ></router-link>
        </div>
        <div class="cnt">
          <p class="tit f-thide">
            <router-link
              href="#"
              :title="item.name"
              :to="`/mv/?id=${item.id}`"
              >{{ item.name }}</router-link
            >
          </p>
          <p class="s-fc4">{{ item.duration | timeFormatter }}</p>
          <p class="s-fc4 f-thide">
            by <a class="s-fc4 name" href="#">{{ item.artistName }}</a>
          </p>
        </div>
      </li>
    </ul>

    <!-- <h3 class="u-hd3" style="margin-top: 10px" v-if="similarPlayLists.length">
      包含这首歌的歌单
    </h3>
    <ul class="m-rctlist" v-if="similarPlayLists.length">
      <li v-for="(item, index) in similarPlayLists" :key="item.id">
        <router-link
          href="javascript:;"
          :to="`/playlist?id=${item.id}`"
          class="cver"
        >
          <img :src="item.coverImgUrl" alt="" />
        </router-link>
        <div class="info">
          <router-link
            href="javascript:;"
            class="sname"
            :to="`/playlist?id=${item.id}`"
            :title="item.name"
            >{{ item.name }}</router-link
          >
          <p>
            <span class="by">by</span>
            <a href="#" :title="item.creator.nickname" class="nm">{{
              item.creator.nickname
            }}</a>
            <img
              src="./images/obj_wo3DlcOGw6DClTvDisK1_4761340149_f4bf_64a1_1ea2_31a08617d7dfddb21fffdb92390ce268.png"
              alt=""
            />
          </p>
        </div>
      </li>
    </ul> -->

    <div class="m-multi">
      <h3 class="u-hd3">网易云音乐多端下载</h3>
      <ul class="bg">
        <li>
          <a href="#" class="ios">iPhone</a>
        </li>
        <li>
          <a href="#" class="pc">PC</a>
        </li>
        <li>
          <a href="#" class="android">Android</a>
        </li>
      </ul>
      <p class="s-fc4">同步歌单，随时畅听320k好音乐</p>
    </div>

    <div class="m-pubcode">
      <h3 class="u-hd3">网易云音乐公众号</h3>
      <div class="f-cb">
        <span class="code f-fl"></span>
        <p class="tip f-fl s-fc4">
          关注我，我们才能
          <br />
          真正拥有彼此啊~
        </p>
      </div>
    </div>

    <h3 class="u-hd3" style="margintop: 20px">用户wiki</h3>
    <a href="#" class="wiki-edit">
      <img src="@/assets/obj_wo3DlcOGw6DClTvDisK1.png" alt="" />
      <span>补充或修改歌曲资料</span>
    </a>
    <a href="#" class="wiki-edit f-mgt5">
      <img src="@/assets/obj_wo3DlcOGw6DClTvDisK1.png" alt="" />
      <span>用户wiki任务中心</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      simiMvs: []
    }
  },
  created() {
    this.getSimiMv()

  },
  props: ['playCount', 'publishTime'],
  methods: {
    async getSimiMv() {
      this.loading = true
      const result = await this.$API.mv.reqGetSimiMv(this.$route.query.id)
      this.simiMvs = result.mvs
      this.loading = false
      console.log(result);
    },
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getSimiMv()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.aside {
  padding: 20px 40px 40px 30px;
  .u-hd3 {
    position: relative;
    height: 23px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
    font-size: 12px;
  }

  .m-mvintr {
    box-sizing: content-box;
    margin-top: -4px;
    padding-bottom: 34px;
    p {
      line-height: 18px;
      color: #999;
    }
  }

  .n-mvlist {
    margin-bottom: 20px;
    &::after {
      display: table;
      content: '';
      clear: both;
    }
    li {
      float: left;
      width: 200px;
      margin-bottom: 15px;
      .u-cover {
        float: left;
        width: 96px;
        height: 54px;
        position: relative;
        display: block;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .ci {
          position: absolute;
          top: 0;
          right: 0;
          padding-right: 5px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          text-align: right;
          text-shadow: -2px 1px rgb(0 0 0 / 40%);
          .u-icn2-mv {
            margin: -2px 2px 0 0;
            width: 15px;
            height: 10px;
            background: url('~@/assets/icon2.png');
            background-position: -60px -310px;
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
          }
        }
        .link {
          position: absolute;
          top: 0;
          left: 0;
          background: url(./images/mv.gif);
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .cnt {
        margin-left: 105px;
        p {
          line-height: 16px;
          .name:hover {
            text-decoration: underline;
          }
        }
        .f-thide {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        .tit {
          line-height: 21px;
          a {
            color: #333;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .s-fc4 {
          color: #999;
        }
      }
    }
  }
  .m-rctlist {
    margin-bottom: 25px;
    li {
      height: 50px;
      margin-bottom: 15px;
      line-height: 24px;
      // background-color: pink;
      display: flex;
      .cver {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        width: 140px;
        margin-left: 9px;
        line-height: 24px;
        .sname {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          color: #000;
          font-size: 14px;
          &:hover {
            text-decoration: underline;
          }
        }
        p {
          .by {
            color: #999;
          }
          .nm {
            margin: 0 2px 0 4px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            &:hover {
              text-decoration: underline;
            }
          }
          img {
            height: 13px;
            width: 13px;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .m-multi {
    margin: 45px 0;
    padding-bottom: 20px;
    .bg {
      height: 65px;
      margin-bottom: 10px;
      background: url('~@/assets/sprite.png') no-repeat;
      background-position: 0 -392px;
      li {
        float: left;
        a {
          display: block;
          width: 42px;
          height: 48px;
          text-indent: -9999px;
        }
        .ios:hover {
          background: url('~@/assets/sprite.png') no-repeat 0 -472px;
        }
        .pc {
          width: 60px;
          margin: 0 26px 0 30px;
          &:hover {
            background: url('~@/assets/sprite.png') no-repeat -72px -472px;
          }
        }
        .android:hover {
          background: url('~@/assets/sprite.png') no-repeat -158px -472px;
        }
      }
      &::after {
        clear: both;
        content: '.';
        display: block;
        height: 0;
        visibility: hidden;
      }
    }
    .s-fc4 {
      color: #999;
    }
  }

  .m-pubcode {
    margin-top: 35px;
    .f-cb {
      &::after {
        display: table;
        content: '';
        clear: both;
      }
      .code {
        float: left;
        width: 72px;
        height: 72px;
        background: url('~@/assets/sprite.png') no-repeat;
        background-position: 0 -300px;
      }
      .tip {
        float: left;
        width: 100px;
        margin: 34px 0 0 15px;
        line-height: 19px;
        white-space: nowrap;
        color: #999;
      }
    }
  }
  .wiki-edit {
    display: block;
    margin-left: -4px;
    margin-top: -6px;
    line-height: 12px;
    &:hover {
      text-decoration: underline;
    }
    img {
      vertical-align: middle;
    }
  }
  .f-mgt5 {
    margin-top: 5px;
  }
}
.ccc {
  width: 100px;
  height: 100px;
}
</style>s