<template>
  <div class="wrap">
    <div class="u-title f-cb">
      <h3>
        <span class="f-ff2">华语男歌手</span>
      </h3>
    </div>

    <ul class="n-ltlst f-cb">
      <li>
        <router-link
          class="ch f-fs0"
          :class="{
            'z-slt': $route.query.initial == -1 || !$route.query.initial,
          }"
          :to="`/discover/artist/cat?id=${$route.query.id}&initial=-1`"
          >热门</router-link
        >
      </li>
      <li v-for="value in generateBig" :key="value">
        <router-link
          :class="{ 'z-slt': $route.query.initial == value.charCodeAt(0) }"
          :to="`/discover/artist/cat?id=${
            $route.query.id
          }&initial=${value.charCodeAt(0)}`"
          >{{ value }}</router-link
        >
      </li>
      <li>
        <router-link
          class="ch f-fs0"
          :class="{
            'z-slt': $route.query.initial == 0,
          }"
          :to="`/discover/artist/cat?id=${$route.query.id}&initial=0`"
          >其他</router-link
        >
      </li>
    </ul>

    <div class="m-sgerlist">
      <ul class="m-cvrlst m-cvrlst-5 f-cb">
        <li
          v-for="(artist, index) in otherList"
          :key="artist.id"
          :class="{ line: index >= 5 && index <= 9, sml: index > 9 }"
        >
          <div class="u-cover u-cover-5" v-show="index < 10">
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
      otherList: []
    }
  },
  created() {
    this.getArtistCateList(this.$route.query.initial)
  },
  computed: {
    generateBig() {
      let str = []
      for (let i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i))
      }
      return str
    }
  },
  methods: {
    async getArtistCateList(initial) {
      let result = []
      if (this.$route.query.id == 1001) {
        result = await this.$API.artist.reqGetArtistCateList(7, 1, initial)
      } else if (this.$route.query.id == 1002) {
        result = await this.$API.artist.reqGetArtistCateList(7, 2, initial)
      } else if (this.$route.query.id == 1003) {
        result = await this.$API.artist.reqGetArtistCateList(7, 3, initial)
      } else if (this.$route.query.id == 2001) {
        result = await this.$API.artist.reqGetArtistCateList(96, 1, initial)
      } else if (this.$route.query.id == 2002) {
        result = await this.$API.artist.reqGetArtistCateList(96, 2, initial)
      } else if (this.$route.query.id == 2003) {
        result = await this.$API.artist.reqGetArtistCateList(96, 3, initial)
      } else if (this.$route.query.id == 6001) {
        result = await this.$API.artist.reqGetArtistCateList(8, 1, initial)
      } else if (this.$route.query.id == 6002) {
        result = await this.$API.artist.reqGetArtistCateList(8, 2, initial)
      } else if (this.$route.query.id == 6003) {
        result = await this.$API.artist.reqGetArtistCateList(8, 3, initial)
      } else if (this.$route.query.id == 7001) {
        result = await this.$API.artist.reqGetArtistCateList(16, 1, initial)
      } else if (this.$route.query.id == 7002) {
        result = await this.$API.artist.reqGetArtistCateList(16, 2, initial)
      } else if (this.$route.query.id == 7003) {
        result = await this.$API.artist.reqGetArtistCateList(16, 3, initial)
      } else if (this.$route.query.id == 4001) {
        result = await this.$API.artist.reqGetArtistCateList(0, 1, initial)
      } else if (this.$route.query.id == 4002) {
        result = await this.$API.artist.reqGetArtistCateList(0, 2, initial)
      } else if (this.$route.query.id == 4003) {
        result = await this.$API.artist.reqGetArtistCateList(0, 3, initial)
      }
      this.otherList = result.artists
      console.log(result);
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      handler() {
        this.getArtistCateList(this.$route.query.initial)
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
  .n-ltlst {
    margin-top: 20px;
    margin-left: -3px;
    height: 24px;
    li {
      a {
        float: left;
        width: 21px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        text-decoration: none;
        color: #333;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
      .ch {
        width: 45px;
        height: 24px;
        font-size: 12px;
      }
      .z-slt {
        background: #c20c0c;
        border-radius: 2px;
        color: #fff;
      }
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
      .line {
        margin-bottom: 12px;
        border-bottom: 1px dotted #999;
      }
      .sml {
        height: 30px;
        width: 130px;
        padding-bottom: 0;
        line-height: 23px;
        p {
          .u-icn-5 {
            float: left;
            margin: 4px 0 0 2px;
          }
        }
      }
    }
  }
}
</style>