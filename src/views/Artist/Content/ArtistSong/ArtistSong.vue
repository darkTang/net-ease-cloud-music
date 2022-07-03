<template>
  <div>
    <!-- loading效果 -->
    <div class="u-load s-fc4 f-hide">
      <i class="icn"></i>
      加载中...
    </div>
    <div class="n-top50">
      <div class="m-info">
        <div class="btns f-cb">
          <a
            href="javascript:;"
            class="u-btn2"
            title="播放"
            @click="hotSongsSong"
          >
            <i>
              <em class="ply"></em>
              播放
            </i>
          </a>
          <a
            href="javascript:;"
            class="u-btni-add"
            title="添加到播放列表"
            @click="addhotSongs"
          ></a>
          <a href="javascript:;" class="u-btni-fav u-btni" title="收藏">
            <i>收藏热门{{ hotSongs.length }}</i>
          </a>
          <div class="f-fr">
            <div class="u-btn2 u-btn2-1 sltbtn">
              <i>
                <em class="sltbtn-txt">热门单曲</em>
                <em class="u-icn u-icn-38 u-icn-arr"></em>
              </i>
              <ul class="filter j-slt">
                <li class="choose z-select">热门单曲</li>
                <li class="choose">作词作品</li>
                <li class="choose">作曲作品</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="hotsong-list">
        <table class="m-table">
          <tbody>
            <tr
              :class="{ even: index % 2 === 0 }"
              v-for="(item, index) in hotSongs"
              :key="item.id"
            >
              <td class="left">
                <div class="hd" style="width: 54px">
                  <span
                    class="ply"
                    ref="ply"
                    @click="playSong(item, hotSongs, item.id)"
                    v-show="item.isPlay"
                  ></span>
                  <span
                    class="ply_red"
                    v-show="!item.isPlay"
                    @click="playSong(item, hotSongs, item.id)"
                  ></span>
                  <span class="num">{{ index + 1 }}</span>
                </div>
              </td>
              <td>
                <div class="f-cb">
                  <div class="tt">
                    <div class="ttc">
                      <span class="txt">
                        <router-link
                          :title="`${item.name}${
                            item.tns ? '-' + item.tns[0] : ''
                          }`"
                          :to="`/song?id=${item.id}`"
                          >{{ item.name }}</router-link
                        >
                        <span v-if="item.tns">-{{ item.tns[0] }}</span>
                        <span
                          class="mv"
                          title="播放mv"
                          v-show="item.mv !== 0"
                          @click="goToMv(item.mv)"
                        ></span>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="s-fc3" style="width: 100px">
                <span class="u-dur">{{ item.dt | timeFormatter }}</span>
                <div class="opt hshow">
                  <a
                    href="javascript:;"
                    class="u-icn u-icn-81 icn-add"
                    title="添加到播放列表"
                  ></a>
                  <span class="icn icn-fav" title="收藏"></span>
                  <span class="icn icn-share" title="分享"></span>
                  <span class="icn icn-dl" title="下载"></span>
                </div>
              </td>
              <td>
                <div class="text" style="width: 128px">
                  <router-link
                    href="#"
                    :title="item.al.name"
                    :to="`/album?id=${item.al.id}`"
                    >{{ item.al.name }}</router-link
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      hotSongs: [],
      selectId: '',
      artistInfo: {}
    }
  },
  computed: {
    ...mapState({
      songLists: state => state.song.songLists
    })
  },
  mounted() {
    this.getSongsList()
  },
  methods: {
    async getSongsList() {
      document.querySelector('.u-load').style.display = 'block'
      const result = await this.$API.artist.reqGetArtistSongsById(this.$route.query.id)
      document.querySelector('.u-load').style.display = 'none'
      result.hotSongs.forEach(item => {
        item.isPlay = true
      })
      this.hotSongs = result.hotSongs
      this.artistInfo = result.artist
      console.log(result);
    },
    async hotSongsSong() {
      this.hotSongs.forEach(item => {
        item.isPlay = true
      })
      this.hotSongs[0].isPlay = false
      let ids = ''
      this.hotSongs.forEach(item => {
        ids = ids + item.id + ','
      })
      const id = ids.split(',')[0]
      ids = ids.slice(0, -1)
      this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getSongDetailById', { ids, flag: 'songList' })
      this.$bus.$emit('changeIndex', 0)
      this.$store.dispatch('song/getLyric', id)
      if (this.$parent.$parent.$parent.$children[3].songPlay) {
        this.$parent.$parent.$parent.$children[3].songPlay()
      } else {
        this.$parent.$parent.$parent.$children[2].songPlay()
      }
    },
    async addhotSongs() {
      let list = this.hotSongs
      let ids = ''
      if (this.selectId) {
        list = list.filter(item => item.id !== this.selectId)
      }
      list.forEach(item => {
        ids = ids + item.id + ','
      })
      const id = ids.split(',')[0]
      ids = ids.slice(0, -1)
      this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getSongDetailById', { ids, flag: 'song' })
    },
    async playSong(item, hotSongs, id) {
      this.selectId = id
      hotSongs.forEach(item => {
        item.isPlay = true
      })
      item.isPlay = false

      await this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getLyric', id)
      await this.$store.dispatch('song/getSongDetailById', { ids: id, flag: 'song' })
      let index = this.songLists.findIndex(item => item.id == id)
      this.$bus.$emit('changeIndex', index)
      if (this.$parent.$parent.$parent.$children[3].songPlay) {
        this.$parent.$parent.$parent.$children[3].songPlay()
      } else {
        this.$parent.$parent.$parent.$children[2].songPlay()
      }
    },
    goToMv(id) {
      this.$router.push({ name: 'MV', query: { id } })
    }
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getSongsList()
      }
    }
  }

}
</script>

<style lang="less" scoped>
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
.n-top50 {
  .m-info {
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
      .f-fr {
        float: right;
        margin-right: 18px;
        .u-btn2 {
          box-sizing: content-box;
          padding: 0 39px 0 0;
          white-space: nowrap;
          text-decoration: none;
          height: 31px;
          line-height: 31px;
          overflow: hidden;
          vertical-align: top;
          text-align: center;
          background: url('~@/assets/button2.png') no-repeat;
          &:hover i {
            color: #333;
            background-position: 0 -141px;
          }
          &:hover {
            background-position: right -182px;
          }
          i {
            box-sizing: content-box;
            padding: 0 15px 0 20px;
            pointer-events: none;
            display: inline-block;
            height: 31px;
            line-height: 31px;
            overflow: hidden;
            vertical-align: top;
            text-align: center;
            cursor: pointer;
            background: url('~@/assets/button2.png') no-repeat;
          }
        }
        .sltbtn {
          display: block;
          color: #333;
          font-size: 12px;
          cursor: pointer;
          font-family: simsun, \5b8b\4f53;
          background-position: right -100px;
          i {
            color: #333;
            background-position: 0 -59px;
            .u-icn-arr {
              display: inline-block;
              overflow: hidden;
              vertical-align: middle;
              width: 8px;
              height: 5px;
              margin-left: 6px;
              background: url('~@/assets/icon3.png') no-repeat;
            }
          }
          &:hover .filter {
            display: block;
          }
        }
        .filter {
          position: absolute;
          z-index: 1;
          display: none;
          width: 105px;
          height: 93px;
          margin-top: -2px;
          line-height: 30px;
          border: solid 1px #c3c3c3;
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
          box-shadow: 0 0 4px 0 rgb(0 0 0 / 10%);
          background-color: #fff;
          color: #333;
          font-size: 12px;
          cursor: pointer;
          font-family: simsun, \5b8b\4f53;
          .choose {
            box-sizing: content-box;
            padding-left: 20px;
            text-align: left;
            border-bottom: solid 1px rgba(0, 0, 0, 0.1);
            &:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
          }
          .z-select {
            background-color: rgba(0, 0, 0, 0.1);
          }
          // 表示该艺人没有此类项
          .choose.z-dis {
            color: #999;
          }
        }
      }
    }
    .f-cb::after {
      clear: both;
      content: '.';
      display: block;
      height: 0;
      visibility: hidden;
    }
  }
  .hotsong-list {
    .m-table {
      width: 100%;
      border: 1px solid #d9d9d9;
      tbody {
        .even {
          td {
            background-color: #f7f7f7;
          }
        }
        tr:hover .hshow {
          display: block;
        }
        tr:hover .u-dur {
          display: none;
        }
        .left {
          width: 74px;
          .hd {
            height: 18px;
            .ply {
              float: right;
              width: 17px;
              height: 17px;
              cursor: pointer;
              background: url('~@/assets/table.png') no-repeat;
              background-position: 0 -103px;
              &:hover {
                background-position: 0 -128px;
              }
            }
            .ply_red {
              float: right;
              width: 17px;
              height: 17px;
              cursor: pointer;
              background: url('~@/assets/table.png') no-repeat;
              background-position: -20px -128px;
            }
            .num {
              width: 25px;
              margin-left: 5px;
              color: #999;
            }
          }
        }
        .s-fc3 {
          color: #666;
        }
        td {
          padding: 6px 10px;
          line-height: 18px;
          text-align: left;
          // background: url('~@/assets/table.png') no-repeat;
          .tt {
            position: relative;
            width: 202px;
            .ttc {
              margin-right: 20px;
              height: 18px;
              .txt {
                position: relative;
                display: inline-block;
                padding-right: 25px;
                margin-right: -25px;
                max-width: 99%;
                height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            a {
              color: #333;
              &:hover {
                text-decoration: underline;
              }
            }
            span {
              color: #aeaeae;
            }
            .mv {
              position: absolute;
              top: 0;
              right: 0;
              width: 23px;
              height: 17px;
              margin: 1px 0 0 0;
              background: url('~@/assets/table.png') no-repeat;
              background-position: 0 -151px;
              cursor: pointer;
              &:hover {
                background-position: -30px -151px;
              }
            }
          }
          .hshow {
            display: none;
            .u-icn {
              float: left;
              overflow: hidden;
              vertical-align: middle;
              margin-top: 2px;
              width: 13px;
              height: 13px;
              background: url('~@/assets/icon.png') no-repeat;
              background-position: 0 -700px;
              &:hover {
                background-position: -22px -700px;
              }
            }
            .icn {
              float: left;
              width: 18px;
              height: 16px;
              margin: 2px 0 0 4px;
              overflow: hidden;
              text-indent: -999px;
              cursor: pointer;
              background: url('~@/assets/table.png') no-repeat;
            }
            .icn-fav {
              background-position: 0 -174px;
              &:hover {
                background-position: -20px -174px;
              }
            }
            .icn-share {
              background-position: 0 -195px;
              &:hover {
                background-position: -20px -195px;
              }
            }
            .icn-dl {
              background-position: -81px -174px;
              &:hover {
                background-position: -104px -174px;
              }
            }
          }
          .text {
            position: relative;
            zoom: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            a {
              color: #333;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>