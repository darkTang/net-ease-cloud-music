<template>
  <div class="title m-info f-cb">
    <div class="cover u-cover u-cover-dj">
      <img src="./images/109951167477549117.jpg" alt="" />
      <span class="mask"></span>
      <div class="out out-list s-fc3">
        <i class="u-icn"></i>
        <a href="#" class="des">生成外链播放器</a>
      </div>
    </div>

    <div class="cnt">
      <div class="hd f-cb">
        <i class="f-fl u-icn u-icn-13 f-pr">
          <span class="f-pa f-r-white-icon"></span>
        </i>
        <div class="tit">
          <h2 class="f-ff2 f-brk">{{ playListDetail.name }}</h2>
        </div>
      </div>
      <div class="user f-cb">
        <a href="#" class="face">
          <img :src="creator.avatarUrl" alt="" />
        </a>
        <span class="name">
          <a href="#" class="s-fc7">{{ creator.nickname }}</a>
        </span>
        <span class="time s-fc4"
          >{{ playListDetail.createTime | timeFormatter }}&nbsp;创建</span
        >
      </div>

      <div class="tags f-cb">
        <b>标签：</b>
        <a
          href="#"
          class="u-tag"
          v-for="(value, index) in playListDetail.tags"
          :key="index"
          ><i>{{ value }}</i></a
        >
      </div>
      <p class="intr f-brk">
        <b>介绍：</b>
        {{ playListDetail.description }}
      </p>

      <div class="btns f-cb">
        <a href="javascript:;" class="u-btn2" title="播放">
          <i>
            <em class="ply"></em>
            播放
          </i>
        </a>
        <a href="javascript:;" class="u-btni-add" title="添加到播放列表"></a>
        <a href="javascript:;" class="u-btni-fav u-btni" title="收藏">
          <i>收藏</i>
        </a>
        <a href="javascript:;" class="u-btni-share u-btni" title="分享">
          <i>分享</i>
        </a>
        <a href="javascript:;" class="u-btni-dl u-btni">
          <i>下载</i>
        </a>
        <a href="javascript:;" class="u-btni-cmmt u-btni">
          <i>(2387)</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
function padZero(n) {
  return n > 9 ? n : '0' + n
}
export default {
  props: ['playListDetail'],
  computed: {
    creator() {
      return this.playListDetail.creator || {}
    }
  },
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
.f-cb::after {
  display: block;
  height: 0;
  clear: both;
  content: '';
}
.title {
  display: flex;
  .cover {
    position: relative;
    display: inline-block;
    width: 198px;
    height: 198px;
    img {
      display: block;
      border: 0;
      width: 130px;
      height: 130px;
      margin: 34px;
    }
    .mask {
      position: absolute;
      width: 206px;
      height: 205px;
      background: url('~@/assets/coverall.png') no-repeat;
      background-position: -140px -580px;
      top: -4px;
      left: -4px;
    }
    .out {
      margin-top: 5px;
      margin-right: 20px;
      .u-icn {
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
        width: 16px;
        height: 16px;
        background: url('~@/assets/icon.png') no-repeat;
        background-position: -34px -863px;
      }
      .des {
        color: #4996d1;
        text-decoration: underline;
      }
    }
  }

  .cnt {
    margin-left: 33px;
    .hd {
      position: relative;
      margin: 0 0 12px;
      line-height: 24px;
      .u-icn {
        float: left;
        width: 54px;
        height: 24px;
        background: url('~@/assets/icon.png') no-repeat;
        background-position: 0 -243px;
        overflow: hidden;
        vertical-align: middle;
        .f-r-white-icon {
          display: inline-block;
          position: absolute;
          width: 8px;
          height: 8px;
          top: 2px;
          background: url('~@/assets/white-r-icon@3x.png');
          background-size: cover;
          left: 34px;
        }
      }
      .tit {
        margin-left: 64px;
        h2 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
      }
    }
    .user {
      position: relative;
      line-height: 35px;
      .face {
        float: left;
        width: 35px;
        height: 35px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        float: left;
        .s-fc7 {
          color: #0c73c2;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .time {
        margin-left: 15px;
        color: #999;
      }
    }
    .btns {
      margin: 21px -10px 25px 0;
      .u-btn2 {
        float: left;
        width: 66px;
        height: 31px;
        padding: 0 5px 0 0;
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -428px;
        &:hover i {
          background-position: 0 -469px;
        }
        &:hover .ply {
          background-position: -28px -1622px;
        }
        i {
          display: inline-block;
          width: 100%;
          height: 31px;
          line-height: 30px;
          text-align: center;
          padding: 0 7px 0 8px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -387px;
          color: #fff;
          .ply {
            float: left;
            width: 20px;
            height: 18px;
            margin: 6px 2px 2px 0;
            background: url('~@/assets/button2.png') no-repeat;
            background-position: 0 -1622px;
            overflow: hidden;
          }
        }
      }
      .u-btni-add {
        float: left;
        margin-right: 5px;
        width: 31px;
        height: 31px;
        margin-left: -3px;
        padding-right: 0;
        background: url('~@/assets/button2.png') no-repeat;
        background-position: 0 -1588px;
        &:hover {
          background-position: -40px -1588px;
        }
      }
      .u-btni {
        margin-right: 6px;
        font-family: simsun, \5b8b\4f53;
        padding: 0 2px 0 0;
        white-space: nowrap;
        color: #333;
        float: left;
        height: 31px;
        line-height: 30px;
        min-width: 23px;
      }
      .u-btni-fav {
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -1020px;
        &:hover i {
          background-position: 0 -1063px;
        }
        i {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          padding: 0 7px 0 36px;
          padding-right: 7px;
          padding-left: 28px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -977px;
        }
      }
      .u-btni-share {
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -1020px;
        &:hover i {
          background-position: 0 -1268px;
        }
        i {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          cursor: pointer;
          padding-right: 5px;
          padding-left: 28px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -1225px;
        }
      }
      .u-btni-dl {
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -1020px;
        &:hover i {
          background-position: 0 -2805px;
        }
        i {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          cursor: pointer;
          padding-right: 5px;
          padding-left: 28px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -2761px;
        }
      }
      .u-btni-cmmt {
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -1020px;
        &:hover i {
          background-position: 0 -1508px;
        }
        i {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          cursor: pointer;
          padding-right: 5px;
          padding-left: 28px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 -1465px;
        }
      }
    }
    .tags {
      margin: 25px 0 5px;
      line-height: 22px;
      b {
        float: left;
        font-weight: normal;
        color: #666;
      }
      .u-tag {
        float: left;
        height: 22px;
        margin: 0px 10px 3px 0;
        padding: 0 10px 0 0;
        text-shadow: 0 1px #fdfdfd;
        background: url('~@/assets/button2.png') no-repeat;
        background-position: right -27px;
        color: #777;
        &:hover {
          background-position: right -3810px;
        }
        &:hover i {
          background-position: 0 -3780px;
        }
        i {
          position: relative;
          float: left;
          height: 22px;
          line-height: 22px;
          zoom: 1;
          padding: 0 3px 0 13px;
          background: url('~@/assets/button2.png') no-repeat;
          background-position: 0 0;
        }
      }
    }
    .intr {
      margin-top: 4px;
      line-height: 18px;
      color: #666;
    }
  }
}
</style>