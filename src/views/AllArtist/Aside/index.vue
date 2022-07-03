<template>
  <div class="singer-cat-nav">
    <h2 class="tit">推荐</h2>
    <ul class="nav f-cb">
      <li>
        <router-link
          class="cat-flag"
          :class="{ 'z-slt': !$route.query.id }"
          to="/discover/artist"
          >推荐歌手</router-link
        >
      </li>
    </ul>
    <div class="blk">
      <h2 class="tit">华语</h2>
      <ul class="nav f-cb">
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 1001 }"
            :to="`/discover/artist/cat?id=${1001}`"
            >华语男歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 1002 }"
            :to="`/discover/artist/cat?id=${1002}`"
            >华语女歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 1003 }"
            :to="`/discover/artist/cat?id=${1003}`"
            >华语组合/乐队</router-link
          >
        </li>
      </ul>
    </div>
    <div class="blk">
      <h2 class="tit">欧美</h2>
      <ul class="nav f-cb">
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 2001 }"
            :to="`/discover/artist/cat?id=${2001}`"
            >欧美男歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 2002 }"
            :to="`/discover/artist/cat?id=${2002}`"
            >欧美女歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 2003 }"
            :to="`/discover/artist/cat?id=${2003}`"
            >欧美组合/乐队</router-link
          >
        </li>
      </ul>
    </div>
    <div class="blk">
      <h2 class="tit">日本</h2>
      <ul class="nav f-cb">
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 6001 }"
            :to="`/discover/artist/cat?id=${6001}`"
            >日本男歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 6002 }"
            :to="`/discover/artist/cat?id=${6002}`"
            >日本女歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 6003 }"
            :to="`/discover/artist/cat?id=${6003}`"
            >日本组合/乐队</router-link
          >
        </li>
      </ul>
    </div>
    <div class="blk">
      <h2 class="tit">韩国</h2>
      <ul class="nav f-cb">
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 7001 }"
            :to="`/discover/artist/cat?id=${7001}`"
            >韩国男歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 7002 }"
            :to="`/discover/artist/cat?id=${7002}`"
            >韩国女歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 7003 }"
            :to="`/discover/artist/cat?id=${7003}`"
            >韩国组合/乐队</router-link
          >
        </li>
      </ul>
    </div>
    <div class="blk">
      <h2 class="tit">其他</h2>
      <ul class="nav f-cb">
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 4001 }"
            :to="`/discover/artist/cat?id=${4001}`"
            >其他男歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 4002 }"
            :to="`/discover/artist/cat?id=${4002}`"
            >其他女歌手</router-link
          >
        </li>
        <li>
          <router-link
            class="cat-flag"
            :class="{ 'z-slt': $route.query.id == 4003 }"
            :to="`/discover/artist/cat?id=${4003}`"
            >其他组合/乐队</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.f-cb::after {
  display: block;
  content: '.';
  height: 0;
  visibility: hidden;
  clear: both;
}
.singer-cat-nav {
  box-sizing: content-box;
  margin-top: 51px;
  padding: 0 10px 40px;
  .tit {
    box-sizing: content-box;
    height: 25px;
    padding-left: 14px;
    font-size: 16px;
    font-family: 'Microsoft Yahei';
  }
  li {
    float: left;
    width: 160px;
    height: 29px;
    line-height: 29px;
    margin-bottom: 2px;
    .z-slt {
      background-position: 0 0;
      text-decoration: none;
      color: #c20c0c;
    }
    a {
      box-sizing: content-box;
      float: left;
      height: 29px;
      line-height: 29px;
      width: 133px;
      padding-left: 27px;
      background: url(./images/singer.png) no-repeat;
      background-position: 0 -30px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .blk {
    box-sizing: content-box;
    margin: 5px 0 0;
    padding-top: 16px;
    border-top: 1px solid #d3d3d3;
  }
}
</style>