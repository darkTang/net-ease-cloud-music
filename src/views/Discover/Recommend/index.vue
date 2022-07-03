<template>
  <div class="recommend">
    <div class="nav">
      <router-link class="recommend_title" to="/discover/playlist">热门推荐</router-link>
      <div class="tab">
        <router-link to="/discover/playlist?cat=华语">华语</router-link>
        <span> | </span>
        <router-link to="/discover/playlist?cat=流行">流行</router-link>
        <span> | </span>
        <router-link to="/discover/playlist?cat=摇滚">摇滚</router-link>
        <span> | </span>
        <router-link to="/discover/playlist?cat=民谣">民谣</router-link>
        <span> | </span>
        <router-link to="/discover/playlist?cat=电子">电子</router-link>
      </div>
      <span class="more">
        <router-link to="/discover/playlist">更多</router-link>
        <i></i>
      </span>
    </div>

    <ul class="m-cvrlst">
      <li v-for="(item, index) in homeList" :key="item.id">
        <div class="u-cover u-cover-1">
          <img v-lazy="item.picUrl" alt="" />
          <router-link
            :title="item.name"
            :to="`/playlist?id=${item.id}`"
            class="msk"
          ></router-link>
          <div class="bottom">
            <a
              title="播放"
              href="javascript:;"
              class="icon-play"
              @click="play(item.id)"
            ></a>
            <span class="icon-headset"></span>
            <span class="nb">{{
              item.playCount > 100000
                ? Math.floor(item.playCount / 10000) + '万'
                : item.playCount
            }}</span>
          </div>
        </div>
        <p class="desc">
          <router-link :title="item.name" :to="`/playlist?id=${item.id}`">{{
            item.name
          }}</router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      allList: state => state.recommend.allList,
      playList: state => state.playlist.playList
    }),
    homeList() {
      return this.allList.filter((item, index) => index < 8)
    }
  },
  async mounted() {
    this.$store.dispatch('recommend/getRecommendPlayList')
  },
  methods: {
    async play(pId) {
      await this.$store.dispatch('playlist/getPlayList', { id: pId })
      this.playList.forEach(item => {
        item.isPlay = true
      })
      this.playList[0].isPlay = false
      let ids = ''
      this.playList.forEach(item => {
        ids = ids + item.id + ','
      })
      const id = ids.split(',')[0]
      ids = ids.slice(0, -1)
      this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getSongDetailById', { ids, flag: 'songList' })
      this.$bus.$emit('changeIndex', 0)
      this.$store.dispatch('song/getLyric', id)
      if (this.$parent.$parent.$children[3].songPlay) {
        this.$parent.$parent.$children[3].songPlay()
      } else {
        this.$parent.$parent.$children[2].songPlay()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  position: relative;
  display: flex;
  height: 33px;
  padding: 0 10px 0 34px;
  background: url(./images/index.png) no-repeat -225px -156px;
  border-bottom: 2px solid #c10d0c;
  .recommend_title {
    font-size: 20px;
    font-weight: 400;
    color: #333;
    line-height: 28px;
  }
  .tab {
    margin: 7px 0 0 20px;
    a {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      margin: 0 10px;
      color: #ccc;
    }
  }
  .more {
    position: absolute;
    right: 10px;
    margin-top: 9px;
    a:hover {
      text-decoration: underline;
    }
    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      vertical-align: middle;
      background: url(./images/index.png) no-repeat 0 -240px;
    }
  }
}
.m-cvrlst {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  li {
    width: 140px;
    height: 204px;
    margin-bottom: 20px;
    .u-cover {
      position: relative;
      width: 140px;
      height: 140px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .msk {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(./images/coverall.png) no-repeat 0 0;
      }
      .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 27px;
        background: url(./images/coverall.png) no-repeat 0 -537px;
        color: #ccc;
        .icon-play {
          position: absolute;
          right: 10px;
          bottom: 5px;
          width: 16px;
          height: 17px;
          background: url(./images/iconall.png) no-repeat 0 0;
          &:hover {
            background-position: 0 -60px;
          }
        }
        .icon-headset {
          float: left;
          width: 14px;
          height: 11px;
          background: url(./images/iconall.png) no-repeat 0 -24px;
          margin: 9px 5px 9px 10px;
        }
        .nb {
          float: left;
          margin: 7px 0 0 0;
        }
      }
    }
    .desc {
      margin: 8px 0 3px;
      font-size: 14px;
      a {
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>