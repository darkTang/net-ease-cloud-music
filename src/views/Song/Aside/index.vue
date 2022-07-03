<template>
  <div
    class="aside"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
  >
    <h3 class="u-hd3" style="margin-top: 10px" v-if="similarPlayLists.length">
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
    </ul>

    <h3 class="u-hd3" style="margin-top: 10px">相似歌曲</h3>
    <ul class="m-sglist">
      <li class="f-cb" v-for="(item, index) in similarSongList" :key="item.id">
        <div class="txt">
          <div class="f-thide">
            <router-link
              href="#"
              :title="item.name"
              class="s-fc1"
              :to="`/song?id=${item.id}`"
              >{{ item.name }}</router-link
            >
          </div>
          <div class="f-thide">
            <a
              href="#"
              :title="singerName.name"
              class="s-fc4"
              v-for="(singerName, index) in item.artists"
              >{{ singerName.name }}</a
            >
          </div>
        </div>
        <div class="opr">
          <a href="javascript:;" class="play" title="播放"></a>
          <a href="javascript:;" class="add" title="添加到播放列表"></a>
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
    <h3 class="u-hd3">用户wiki</h3>
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
      similarSongList: [],
      similarPlayLists: [],
      loading: true
    }
  },
  created() {
    this.getSimilarSong()
    this.getSimilarPlayList()

  },
  methods: {
    async getSimilarSong() {
      this.loading = true
      const result = await this.$API.song.reqGetSimilarSong(this.$route.query.id)
      this.loading = false
      this.similarSongList = result.songs
      // console.log(result);
    },
    async getSimilarPlayList() {
      this.loading = true
      const result = await this.$API.song.reqGetSimilarPlayList(this.$route.query.id)
      this.loading = false
      this.similarPlayLists = result.playlists
      // console.log(result);
    }
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getSimilarSong()
        this.getSimilarPlayList()
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
  .m-sglist {
    margin-bottom: 25px;
    li {
      margin-top: 12px;
      display: flex;
      .txt {
        width: 156px;
        line-height: 16px;
        .f-thide {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          .s-fc1 {
            color: #333;
            &:hover {
              text-decoration: underline;
            }
          }
          .s-fc4 {
            color: #999;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .opr {
        position: relative;
        top: 4px;
        line-height: 32px;
        a {
          display: inline-block;
          width: 10px;
          height: 11px;
          opacity: 0.9;
          background: url('~@/assets/icon2.png') no-repeat;
        }
        .play {
          margin-right: 16px;
          background-position: -69px -455px;
        }
        .add {
          background-position: -87px -454px;
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
</style>