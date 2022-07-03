<template>
  <div>
    <div class="g-mn">
      <div class="g-mn1">
        <div class="n-daily">
          <div class="bg j-flag">
            <div class="cal u-date u-date-2 f-alpha">
              <div class="head j-item">星期{{ week }}</div>
              <div class="bd j-item">{{ date }}</div>
              <span class="mask"></span>
            </div>
          </div>
          <div class="btnwrap f-cb j-flag">
            <a
              href="javascript:;"
              class="u-btn2"
              title="播放"
              @click="dailySongsSong"
            >
              <i>
                <em class="ply"></em>
                播放全部
              </i>
            </a>
            <a
              href="javascript:;"
              class="u-btni-add"
              title="添加到播放列表"
              @click="addPlayList"
            ></a>
            <a href="javascript:;" class="u-btni-fav u-btni" title="收藏">
              <i>收藏全部</i>
            </a>
          </div>
        </div>

        <div class="songslist">
          <div class="u-title">
            <h3>歌曲列表</h3>
            <span class="sub s-fc3">
              <span>{{ dailySongs.length }}</span
              >首歌
            </span>
          </div>
          <div class="song-list-pre-cache">
            <table
              class="m-table"
              v-loading="loading"
              element-loading-spinner="el-icon-loading"
            >
              <thead>
                <tr>
                  <th class="w1">
                    <div class="wp" style="background: none"></div>
                  </th>
                  <th class="w2">
                    <div class="wp" style="width: 215px">歌曲标题</div>
                  </th>
                  <th class="w3">
                    <div class="wp">时长</div>
                  </th>
                  <th class="w4">
                    <div class="wp">歌手</div>
                  </th>
                  <th class="w5">
                    <div class="wp">专辑</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :class="{ even: index % 2 === 0 }"
                  v-for="(item, index) in dailySongs"
                  :key="item.id"
                >
                  <td class="left">
                    <div class="hd" style="width: 54px">
                      <span
                        class="ply"
                        ref="ply"
                        v-show="item.isPlay"
                        @click="playSong(item, dailySongs, item.id)"
                      ></span>
                      <span
                        class="ply_red"
                        v-show="!item.isPlay"
                        @click="playSong(item, dailySongs, item.id)"
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
                                item.alia[0] ? '-' + item.alia[0] : ''
                              }`"
                              :to="`/song?id=${item.id}`"
                              >{{ item.name }}</router-link
                            >
                            <span
                              v-for="(value, indexes) in item.alia"
                              :key="indexes"
                              >-{{ value }}</span
                            >
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
                  <td class="s-fc3">
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
                    <div class="text" style="width: 69px">
                      <a
                        href="#"
                        v-for="(artist, index) in item.ar"
                        :key="index"
                        :title="artist.name"
                        >{{
                          index == item.ar.length - 1
                            ? artist.name
                            : artist.name + '/'
                        }}</a
                      >
                    </div>
                  </td>
                  <td>
                    <div class="text" style="width: 108px">
                      <a href="#" :title="item.al.name">{{ item.al.name }}</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 右侧侧边栏 -->
      <div class="g-sd1">
        <div class="n-cmdsd">
          <div class="hd f-ff2">
            <span class="icn u-icn2 u-icn2-1"></span>
            个性化推荐如何工作
          </div>
          <p class="s-fc3">
            它聪明、熟悉每个用户的喜好，从海量音乐中挑选出你可能喜欢的音乐。
          </p>
          <p class="s-fc3">它通过你每一次操作来记录你的口味</p>
          <ul class="type s-fc4 j-flag">
            <li>
              <span class="icn u-icn2 u-icn2-2"></span>
              你播放了
              <strong class="s-fc6">{{ listenSongs }}</strong>
              首音乐
            </li>
            <li>
              <span class="icn u-icn2 u-icn2-3"></span>
              你喜欢了
              <strong class="s-fc6">{{ profile.playlistCount }}</strong>
              首歌单
            </li>
            <li class="last">
              <span class="icn u-icn2 u-icn2-4"></span>
              你收藏了
              <strong class="s-fc6">{{ profile.follows }}</strong>
              位歌手
            </li>
          </ul>
          <p class="s-fc3">
            你提供给云音乐的信息越多，它就越了解你的音乐喜好。
          </p>
        </div>
        <div class="aside">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex'
function padZero(n) {
  return n > 9 ? n : '0' + n
}
export default {
  data() {
    return {
      dailySongs: [],
      loading: true,
      selectId: '',
      date: '',
      week: ''
    }
  },
  async created() {
    let arr = ['日', '一', '二', '三', '四', '五', '六']
    let date = new Date()
    this.date = padZero(date.getDate())
    this.week = arr[date.getDay()]
    this.getPersonalSongs()
    await this.$store.dispatch('user/getAccountInfo')
    this.$store.dispatch('user/getUserInfo')
  },
  computed: {
    ...mapState({
      songLists: state => state.song.songLists,
      profile: state => state.user.profile,
      listenSongs: state => state.user.listenSongs
    })
  },
  methods: {
    async getPersonalSongs() {
      this.loading = true
      const result = await this.$API.playlist.reqGetPersonalSongs(encodeURIComponent(getToken()))
      this.loading = false
      result.data.dailySongs.forEach(item => {
        item.isPlay = true
      })
      this.dailySongs = result.data.dailySongs
      // console.log(result);
    },
    async dailySongsSong() {
      this.selectId = id
      this.dailySongs.forEach(item => {
        item.isPlay = true
      })
      this.dailySongs[0].isPlay = false
      let ids = ''
      this.dailySongs.forEach(item => {
        ids = ids + item.id + ','
      })
      const id = ids.split(',')[0]
      ids = ids.slice(0, -1)
      this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getSongDetailById', { ids, flag: 'songList' })
      this.$bus.$emit('changeIndex', 0)
      this.$store.dispatch('song/getLyric', id)
      if (this.$parent.$children[3].songPlay) {
        this.$parent.$children[3].songPlay()
      } else {
        this.$parent.$children[2].songPlay()
      }
    },
    async addPlayList() {
      let list = this.dailySongs
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
    async playSong(item, dailySongs, id) {
      dailySongs.forEach(item => {
        item.isPlay = true
      })
      item.isPlay = false
      await this.$bus.$emit('play', id)
      await this.$store.dispatch('song/getLyric', id)
      await this.$store.dispatch('song/getSongDetailById', { ids: id, flag: 'song' })
      let index = this.songLists.findIndex(item => item.id == id)
      this.$bus.$emit('changeIndex', index)
      if (this.$parent.$children[3].songPlay) {
        this.$parent.$children[3].songPlay()
      } else {
        this.$parent.$children[2].songPlay()
      }
    },
    goToMv(id) {
      this.$router.push({ name: 'MV', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.g-mn {
  * {
    box-sizing: content-box;
  }
  display: flex;
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .g-mn1 {
    padding: 47px 30px 40px 39px;
    border-right: 1px solid #ccc;
    .n-daily {
      .bg {
        width: 640px;
        height: 179px;
        padding-top: 1px;
        background: url(./images/recmd_daily.jpg) no-repeat;
        .cal {
          float: left;
          position: relative;
          zoom: 1;
          display: block;
          margin: 34px 0 0 54px;
          width: 114px;
          height: 114px;
          background: url(./images/date.png) no-repeat;
          background-position: 0 -270px;
          .head {
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            display: block;
            color: #fed9d9;
            text-shadow: 0 -1px #962626;
            text-align: center;
          }
          .bd {
            font-size: 74px;
            line-height: 80px;
            display: block;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            color: #202020;
          }
          .mask {
            position: absolute;
            left: 0;
            width: 142px;
            height: 107px;
            top: 26px;
            background: url(./images/date.png) no-repeat;
            background-position: 0 -400px;
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
      .btnwrap {
        margin-top: 30px;
        .u-btn2 {
          float: left;
          width: 72px;
          height: 31px;
          padding: 0px 16px 0 0;
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
        .u-btni-fav {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          padding: 0 5px 0 0;
          white-space: nowrap;
          cursor: pointer;
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
            cursor: pointer;
            padding: 0 7px 0 36px;
            padding-right: 2px;
            padding-left: 28px;
            background: url('~@/assets/button2.png') no-repeat;
            background-position: 0 -977px;
          }
        }
      }
    }
    .songslist {
      margin-top: 27px;
      .u-title {
        height: 33px;
        border-bottom: 2px solid #c20c0c;
        h3 {
          float: left;
          font-size: 20px;
          line-height: 28px;
          font-weight: normal;
        }
        .s-fc3 {
          color: #666;
        }
        .sub {
          float: left;
          margin: 9px 0 0 20px;
        }
      }

      .song-list-pre-cache {
        //修改loading加载时的颜色
        // .el-loading-spinner .path {
        //   stroke: #c8291c;
        // }
        .m-table {
          width: 100%;
          border: 1px solid #d9d9d9;
          thead {
            th {
              height: 36px;
              background-color: #f7f7f7;
              background: url('~@/assets/table.png');
              background-position: 0 0;
              background-repeat: repeat-x;
              vertical-align: top;
              text-align: left;
              font-weight: normal;
              color: #666;
              .wp {
                height: 18px;
                line-height: 21px;
                padding: 8px 10px;
                background: url('~@/assets/table.png') no-repeat;
                background-position: 0 -56px;
              }
            }
            .w1 {
              width: 74px;
            }
            .w3 {
              width: 111px;
            }
            .w4 {
              width: 14%;
            }
          }
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
  }
  .g-sd1 {
    position: relative;
    width: 270px;
    .n-cmdsd {
      padding: 20px 40px 40px 30px;
      margin-bottom: -35px;
      .hd {
        height: 22px;
        padding: 5px 0 8px;
        border-bottom: 1px solid #ccc;
        line-height: 22px;
        font-size: 18px;
        font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
        .icn {
          float: left;
          margin-right: 6px;
          width: 22px;
          height: 22px;
          background: url('~@/assets/icon2.png') no-repeat;
          background-position: 0 0;
          overflow: hidden;
          vertical-align: middle;
        }
      }
      p {
        margin: 1em 0;
        line-height: 19px;
      }
      .s-fc3 {
        color: #666;
      }
      .type {
        background: #f7f7f7;
        padding: 17px 0 17px 12px;
        color: #999;
        li {
          width: 188px;
          height: 40px;
          line-height: 20px;
          .icn {
            width: 22px;
            height: 22px;
            overflow: hidden;
            vertical-align: middle;
            float: left;
            margin-right: 8px;
            background: url('~@/assets/icon2.png') no-repeat;
          }
          .s-fc6 {
            color: #c20c0c;
          }
          .u-icn2-2 {
            background-position: -25px 0;
          }
          .u-icn2-3 {
            background-position: 0 -25px;
          }
          .u-icn2-4 {
            background-position: -25px -25px;
          }
        }
        .last {
          height: 20px;
        }
      }
    }
    .aside {
      padding: 20px 40px 40px 30px;
      .m-multi {
        padding-bottom: 20px;
        .u-hd3 {
          position: relative;
          height: 23px;
          margin-bottom: 20px;
          border-bottom: 1px solid #ccc;
          color: #333;
          font-size: 12px;
        }
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
    }
  }
}
</style>