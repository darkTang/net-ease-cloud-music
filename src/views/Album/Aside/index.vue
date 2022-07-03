<template>
  <div class="aside">
    <h3 class="u-hd3" style="margin-top: 10px">
      <span class="f-fl">Ta的其他热门专辑</span>
      <a href="#" class="more f-ff1 s-fc3">全部></a>
    </h3>
    <ul
      class="m-rctlist"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
    >
      <li v-for="(item, index) in hotAlbums" :key="item.id">
        <router-link
          href="javascript:;"
          :to="`/album?id=${item.id}`"
          class="cver"
          :title="item.name"
        >
          <img :src="item.picUrl" alt="" />
        </router-link>
        <div class="info">
          <router-link
            href="javascript:;"
            class="sname"
            :to="`/album?id=${item.id}`"
            :title="item.name"
            >{{ item.name }}</router-link
          >
          <p>
            <span class="by">{{ item.publishTime | timeFormatter }}</span>
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
function padZero(n) {
  return n > 9 ? n : '0' + n
}
export default {
  props: ['hotAlbums', 'loading'],
  filters: {
    timeFormatter(time) {
      const date = new Date(time)
      const y = date.getFullYear()
      const m = padZero(date.getMonth() + 1)
      const d = padZero(date.getDate())
      return `${y}-${m}-${d}`
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
    .f-fl {
      float: left;
    }
    .more {
      float: right;
      font-weight: normal;
      color: #666;
      font-family: simsun, \5b8b\4f53;
      &:hover {
        text-decoration: underline;
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
</style>