<template>
  <div class="songslist">
    <div class="u-title">
      <h3>歌曲列表</h3>
      <span class="sub s-fc3">
        <span>{{ albumSongsList.length }}</span
        >首歌</span
      >
      <div class="out out-list s-fc3">
        <i class="u-icn"></i>
        <a href="#" class="des">生成外链播放器</a>
      </div>
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
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{ even: index % 2 === 0 }"
            v-for="(item, index) in albumSongsList"
            :key="item.id"
          >
            <td class="left">
              <div class="hd" style="width: 54px">
                <span
                  class="ply"
                  ref="ply"
                  @click="playSong(item, albumSongsList, item.id)"
                  v-show="item.isPlay"
                ></span>
                <span
                  class="ply_red"
                  v-show="!item.isPlay"
                  @click="playSong(item, albumSongsList, item.id)"
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
              <div class="text" style="width: 110px">
                <a
                  href="#"
                  v-for="(artist, indexes) in item.ar"
                  :key="artist.id"
                  :title="artist.name"
                  >{{ artist.name }}
                  <span
                    class="s-fc8"
                    title="德雷克"
                    v-for="(tranName, index) in artist.tns"
                    :key="index"
                  >
                    - ({{ tranName }})</span
                  ><span>{{
                    indexes == item.ar.length - 1 ? '' : '/'
                  }}</span></a
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loading: true,
    }
  },
  created() {
    this.getAlbumList()
  },
  computed: {
    ...mapState({
      albumSongsList: state => state.album.albumSongsList,
      songLists: state => state.song.songLists
    }),
  },
  methods: {
    async getAlbumList() {
      this.loading = true
      await this.$store.dispatch('album/getAlbumSongsList', this.$route.query.id)
      this.loading = false
    },
    async playSong(item, albumSongsList, id) {
      albumSongsList.forEach(item => {
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


    },
    goToMv(id) {
      this.$router.push({ name: 'MV', query: { id } })
    }
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.getplayList()
        this.songPlay()
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
    .out {
      float: right;
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
            height: 34px;
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
            .s-fc8 {
              color: #aeaeae;
            }
          }
        }
      }
    }
  }
}
</style>