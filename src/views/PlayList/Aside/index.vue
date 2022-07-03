<template>
  <div
    class="aside"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
  >
    <h3 class="u-hd3">喜欢这个歌单的人</h3>
    <ul class="m-piclist">
      <li v-for="(item, index) in subscriberList" :key="item.userId">
        <a href="#" :title="item.nickname">
          <img :src="item.avatarUrl" alt="" />
        </a>
      </li>
    </ul>
    <h3 class="u-hd3" style="margin-top: 10px">热门歌单</h3>
    <ul
      class="m-rctlist"
    >
      <li v-for="(item, index) in relatedPlayList" :key="item.id">
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
    </ul>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      relatedPlayList: [],
      loading: true,
    }
  },
  created() {
    this.getHotPlayList()
  },
  props: ['subscriberList'],
  methods: {
    async getHotPlayList() {
      this.loading = true
      const result = await this.$API.playlist.reqGetRelatedPlayList(this.$route.query.id)
      this.loading = false
      this.relatedPlayList = result.playlists
      // console.log(result.playlists);
    }
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getHotPlayList()
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
  .m-piclist {
    display: flex;
    height: 118px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    padding: 0 1px 27px 0;
    li {
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
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
}
</style>