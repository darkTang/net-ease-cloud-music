<template>
  <div class="wrap">
    <div class="u-title f-cb">
      <h3>
        <span class="f-ff2">推荐歌手</span>
      </h3>
    </div>

    <!-- 加载效果 -->
    <div class="u-load s-fc4 f-hide">
      <i class="icn"></i>
      加载中...
    </div>

    <div class="m-sgerlist">
      <ul class="m-cvrlst m-cvrlst-5 f-cb">
        <li v-for="(artist, index) in hotArtist" :key="artist.id">
          <div class="u-cover u-cover-5">
            <img v-lazy="artist.picUrl" alt="" />
            <router-link
              class="mask"
              :title="`${artist.name}的音乐`"
              :to="`/artist?id=${artist.id}`"
            >
            </router-link>
          </div>
          <p>
            <router-link
              class="nm nm-icn f-thide s-fc0"
              :title="artist.name"
              :to="`/artist?id=${artist.id}`"
              >{{ artist.name }}</router-link
            >
            <a
              href="#"
              class="icn u-icn u-icn-5"
              :title="`${artist.name}的个人主页`"
            ></a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNo: 1,
      hotArtist: []
    }
  },
  mounted() {
    this.getTopArtist(50, this.pageNo)
    document.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    async getTopArtist(limit, pageNo) {
      document.querySelector('.u-load').style.display = 'block'
      const result = await this.$API.artist.reqGetHotArtistById(limit, pageNo)
      document.querySelector('.u-load').style.display = 'none'
      if (!result.artists.length) {
        document.removeEventListener('scroll', this.scrollHandler)
      }
      this.hotArtist = [...this.hotArtist, ...result.artists]
    },
    scrollHandler() {
      let msgerlist = document.querySelector('.m-sgerlist')
      if (msgerlist.clientHeight - window.pageYOffset <= 300) {
        this.pageNo++
        this.getTopArtist(50, this.pageNo)
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: content-box;
}
.wrap {
  padding: 40px;
  .f-cb::after {
    display: block;
    content: '.';
    height: 0;
    visibility: 0;
    clear: both;
  }
  .u-title {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      font-size: 24px;
      font-weight: normal;
      .f-ff2 {
        font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
      }
    }
  }
  .u-load {
    display: none;
    box-sizing: content-box;
    margin-top: 100px;
    height: 26px;
    padding: 20px 0;
    text-align: center;
    color: #999;
    .icn {
      display: inline-block;
      font-style: normal;
      text-align: left;
      font-size: inherit;
      width: 16px;
      height: 16px;
      margin-right: 2px;
      vertical-align: middle;
      background: url(./images/loading.gif) no-repeat;
    }
  }
  .m-sgerlist {
    .m-cvrlst {
      margin: 20px 0 0 -17px;
      li {
        float: left;
        overflow: hidden;
        padding: 0 0 30px 50px;
        line-height: 1.4;
        padding-left: 17px;
        width: 130px;
        height: 154px;
        .u-cover {
          position: relative;
          display: block;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .u-cover-5 {
          width: 130px;
          height: 130px;
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('~@/assets/coverall.png') no-repeat;
            background-position: 0 -680px;
          }
        }
        p {
          width: 100%;
          margin-top: 8px;
          .f-thide {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          .nm-icn {
            vertical-align: middle;
            float: left;
            max-width: 80%;
            color: #000;
            &:hover {
              text-decoration: underline;
            }
          }
          .u-icn {
            position: relative;
            float: right;
            margin-top: -1px;
            width: 17px;
            height: 18px;
            background: url('~@/assets/icon.png') no-repeat;
            background-position: 0 -740px;
            overflow: hidden;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>