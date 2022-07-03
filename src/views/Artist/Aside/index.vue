<template>
  <div
    class="aside"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
  >
    <h3 class="u-hd3">热门歌手</h3>
    <ul class="m-hdlist f-cb">
      <li v-for="(artist, index) in hotArtists" :key="artist.id">
        <div class="hd">
          <router-link
            href="#"
            :title="artist.name"
            :to="`/artist?id=${artist.id}`"
          >
            <img :src="artist.picUrl" alt="" />
          </router-link>
        </div>
        <p>
          <router-link
            href="#"
            :title="artist.name"
            class="nm nm-icn f-ib f-thide"
            :to="`/artist?id=${artist.id}`"
            >{{ artist.name }}</router-link
          >
        </p>
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
      loading: true,
      hotArtists: []
    }
  },
  created() {
    this.getHotArtist()
  },
  methods: {
    async getHotArtist() {
      this.loading = true
      const result = await this.$API.artist.reqGetHotArtistById()
      this.loading = false
      this.hotArtists = result.artists
      console.log(result);
    },
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getHotArtist()
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
  .f-cb {
    &::after {
      display: block;
      content: '.';
      height: 0;
      visibility: hidden;
      clear: both;
    }
  }
  .m-hdlist {
    margin-left: -25px;
    li {
      float: left;
      box-sizing: content-box;
      width: 50px;
      height: 92px;
      padding-left: 25px;
    }
    .hd {
      width: 50px;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    p {
      margin-top: 7px;
      text-align: center;
      .nm {
        display: inline-block;
        width: 50px;
        vertical-align: middle;
        color: #333;
        &:hover {
          text-decoration: underline;
        }
      }
      .f-thide {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
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