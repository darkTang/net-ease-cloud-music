<template>
  <div class="list">
    <div class="nav">
      <router-link class="n-list" to="/discover/toplist">榜单</router-link>
      <span class="more">
        <router-link to="/discover/toplist">更多</router-link>
        <i></i>
      </span>
    </div>
    <div class="n-bilst">
      <dl class="blk">
        <dt class="top">
          <div class="cver u-cover u-cover-4">
            <img :src="this.soaringList.coverImgUrl" alt="" />
            <router-link
              title="飙升榜"
              class="msk"
              to="/discover/toplist?id=19723756"
            ></router-link>
          </div>
          <div class="tit">
            <router-link title="飙升榜" to="/discover/toplist?id=19723756">
              <h3 f-fs1 f-thide>飙升榜</h3>
            </router-link>
            <div class="btn">
              <a
                href="javascript:;"
                title="播放"
                class="s-bg s-bg-9 f-tdn"
                @click="play(19723756)"
                >播放</a
              >
              <a
                href="javascript:;"
                title="收藏"
                class="s-bg s-bg-10 f-tdn subscribe-flag"
                >收藏</a
              >
            </div>
          </div>
        </dt>
        <dd>
          <ol>
            <li
              class="z-hvr"
              v-for="(item, index) in homeSoaringList"
              :key="item.id"
            >
              <span
                class="no no-top"
                :style="{ color: index < 3 ? '#c10d0c' : '' }"
                >{{ index + 1 }}</span
              >
              <router-link
                class="nm"
                href="#"
                :title="item.name"
                :to="`/song?id=${item.id}`"
                >{{ item.name }}</router-link
              >
              <div class="oper">
                <a
                  href="javascript:;"
                  title="播放"
                  class="s-bg s-bg-11"
                  @click="playSong(item, homeSoaringList, item.id)"
                ></a>
                <a
                  href="javascript:;"
                  title="添加到播放列表"
                  class="u-icn u-icn-81"
                ></a>
                <a href="javascript:;" title="收藏" class="s-bg s-bg-12"></a>
              </div>
            </li>
          </ol>
          <div class="more">
            <router-link to="/discover/toplist?id=19723756"
              >查看全部></router-link
            >
          </div>
        </dd>
      </dl>
      <dl class="blk">
        <dt class="top">
          <div class="cver u-cover u-cover-4">
            <img :src="this.newList.coverImgUrl" alt="" />
            <router-link
              title="新歌榜"
              class="msk"
              to="/discover/toplist?id=3779629"
            ></router-link>
          </div>
          <div class="tit">
            <router-link title="新歌榜" to="/discover/toplist?id=3779629">
              <h3 f-fs1 f-thide>新歌榜</h3>
            </router-link>
            <div class="btn">
              <a
                href="javascript:;"
                title="播放"
                class="s-bg s-bg-9 f-tdn"
                @click="play(3779629)"
                >播放</a
              >
              <a
                href="javascript:;"
                title="收藏"
                class="s-bg s-bg-10 f-tdn subscribe-flag"
                >收藏</a
              >
            </div>
          </div>
        </dt>
        <dd>
          <ol>
            <li
              class="z-hvr"
              v-for="(item, index) in homeNewList"
              :key="item.id"
            >
              <span
                class="no no-top"
                :style="{ color: index < 3 ? '#c10d0c' : '' }"
                >{{ index + 1 }}</span
              >
              <router-link
                class="nm"
                href="#"
                :title="item.name"
                :to="`/song?id=${item.id}`"
                >{{ item.name }}</router-link
              >
              <div class="oper">
                <a
                  href="javascript:;"
                  title="播放"
                  class="s-bg s-bg-11"
                  @click="playSong(item, homeNewList, item.id)"
                ></a>
                <a
                  href="javascript:;"
                  title="添加到播放列表"
                  class="u-icn u-icn-81"
                ></a>
                <a href="javascript:;" title="收藏" class="s-bg s-bg-12"></a>
              </div>
            </li>
          </ol>
          <div class="more">
            <router-link to="/discover/toplist?id=3779629"
              >查看全部></router-link
            >
          </div>
        </dd>
      </dl>
      <dl class="blk">
        <dt class="top">
          <div class="cver u-cover u-cover-4">
            <img :src="this.originalList.coverImgUrl" alt="" />
            <router-link
              title="原创榜"
              class="msk"
              to="/discover/toplist?id=2884035"
            ></router-link>
          </div>
          <div class="tit">
            <router-link title="原创榜" to="/discover/toplist?id=2884035">
              <h3 f-fs1 f-thide>原创榜</h3>
            </router-link>
            <div class="btn">
              <a
                href="javascript:;"
                title="播放"
                class="s-bg s-bg-9 f-tdn"
                @click="play(2884035)"
                >播放</a
              >
              <a
                href="javascript:;"
                title="收藏"
                class="s-bg s-bg-10 f-tdn subscribe-flag"
                >收藏</a
              >
            </div>
          </div>
        </dt>
        <dd>
          <ol>
            <li
              class="z-hvr"
              v-for="(item, index) in homeOriginalList"
              :key="item.id"
            >
              <span
                class="no no-top"
                :style="{ color: index < 3 ? '#c10d0c' : '' }"
                >{{ index + 1 }}</span
              >
              <router-link
                class="nm"
                href="#"
                :title="item.name"
                :to="`/song?id=${item.id}`"
                >{{ item.name }}</router-link
              >
              <div class="oper">
                <a
                  href="javascript:;"
                  title="播放"
                  class="s-bg s-bg-11"
                  @click="playSong(item, homeOriginalList, item.id)"
                ></a>
                <a
                  href="javascript:;"
                  title="添加到播放列表"
                  class="u-icn u-icn-81"
                ></a>
                <a href="javascript:;" title="收藏" class="s-bg s-bg-12"></a>
              </div>
            </li>
          </ol>
          <div class="more">
            <router-link to="/discover/toplist?id=2884035"
              >查看全部></router-link
            >
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      soaringList: state => state.recommend.soaringList,
      newList: state => state.recommend.newList,
      originalList: state => state.recommend.originalList,
      playList: state => state.playlist.playList,
      songLists: state => state.song.songLists
    }),
    tracksSoarList() {
      return this.soaringList.tracks || []
    },
    tracksNewList() {
      return this.newList.tracks || []
    },
    tracksOriginalList() {
      return this.originalList.tracks || []
    },
    homeSoaringList() {
      return this.tracksSoarList.filter((item, index) => index < 10)
    },
    homeNewList() {
      return this.tracksNewList.filter((item, index) => index < 10)
    },
    homeOriginalList() {
      return this.tracksOriginalList.filter((item, index) => index < 10)
    },
  },
  async mounted() {
    // 榜单详情
    this.$store.dispatch('recommend/getTopListDetail', 19723756)
    this.$store.dispatch('recommend/getTopListDetail', 3779629)
    this.$store.dispatch('recommend/getTopListDetail', 2884035)
  },
  methods: {
    async play(pId) {
      await this.$store.dispatch('playlist/getPlayList', { id: pId, limit: 100 })
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
    },
    async playSong(item, playList, id) {
      playList.forEach(item => {
        item.isPlay = true
      })
      item.isPlay = false

      await this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getLyric', id)
      await this.$store.dispatch('song/getSongDetailById', { ids: id, flag: 'song' })
      let index = this.songLists.findIndex(item => item.id == id)
      this.$bus.$emit('changeIndex', index)
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
  .n-list {
    font-size: 20px;
    font-weight: 400;
    color: #333;
    line-height: 28px;
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
.n-bilst {
  display: flex;
  height: 472px;
  margin-top: 20px;
  padding-left: 1px;
  background: url(./images/index_bill.png) no-repeat;
  .blk {
    width: 230px;
    // background-color: pink;
    .top {
      height: 120px;
      padding: 20px 0 0 19px;
      .cver {
        position: relative;
        float: left;
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
        }
        a {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .tit {
        display: block;
        float: left;
        width: 116px;
        margin: 6px 0 0 10px;
        a {
          display: block;
          color: #333;
          &:hover {
            text-decoration: underline;
          }
        }
        .btn {
          margin-top: 10px;
          a {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 10px;
            text-indent: -9999px;
            background: url(./images/index.png) no-repeat -267px -205px;
            &:hover {
              background-position: -267px -235px;
            }
          }
          .s-bg-10 {
            background-position: -300px -205px;
            &:hover {
              background-position: -300px -235px;
            }
          }
        }
      }
    }
    ol {
      height: 319px;
      margin-left: 50px;
      line-height: 32px;
      li {
        height: 32px;
        .nm {
          float: left;
          width: 170px;
          height: 32px;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          &:hover {
            text-decoration: underline;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        &:hover .nm {
          width: 96px;
        }
        &:hover .oper {
          display: block;
        }
        .no-top {
          float: left;
          position: relative;
          width: 35px;
          height: 32px;
          margin-left: -35px;
          text-align: center;
          font-size: 16px;
        }
        .oper {
          display: none;
          float: right;
          width: 82px;
          margin-top: 7px;
          a {
            float: left;
            width: 17px;
            height: 17px;
            margin-right: 10px;
            background: url(./images/index.png) no-repeat -267px -268px;
            vertical-align: middle;
            &:hover {
              background-position: -267px -288px;
            }
          }
          .u-icn {
            background: url(./images/icon.png) no-repeat 0 -700px;
            margin: 2px 6px 0 0;
            &:hover {
              background-position: -22px -700px;
            }
          }
          .s-bg-12 {
            background-position: -297px -268px;
            &:hover {
              background-position: -297px -288px;
            }
          }
        }
      }
    }
    .more {
      clear: both;
      height: 32px;
      margin-right: 32px;
      text-align: right;
      line-height: 32px;
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