<template>
  <div>
    <div class="header">
      <div class="h-top">
        <div class="wrap">
          <h1 class="title">
            <router-link to="/">网易云音乐</router-link>
          </h1>
          <ul class="h-nav">
            <li>
              <a href="#" class="z-slt">发现音乐</a><span class="cor"></span>
            </li>
            <li><a href="#">我的音乐</a></li>
            <li><a href="#">关注</a></li>
            <li><a href="#">商城</a></li>
            <li><a href="#">音乐人</a></li>
            <li><a href="#">下载客户端</a><span class="hot"></span></li>
          </ul>
          <div class="h-tophead">
            <div class="h-search">
              <div class="srchbg">
                <input
                  type="text"
                  placeholder="音乐/视频/电台/用户"
                  @blur="showSearch = false"
                  @keyup="keywordsSearch"
                  @focus="
                    search.trim() ? (showSearch = true) : (showSearch = false)
                  "
                />
                <div class="u-lstlay j-flag" v-show="showSearch">
                  <div class="m-schlist">
                    <p class="note s-fc3">
                      <a href="#" class="s-fc3 xtag">搜“{{ search }}”相关用户</a
                      >>
                    </p>
                    <div class="rap">
                      <div class="itm f-cb" v-if="order.includes('songs')">
                        <h3 class="hd">
                          <i class="icn u-icn u-icn-26"></i>
                          <em class="f-fl">单曲</em>
                        </h3>
                        <ul class="f-cb">
                          <li v-for="(song, index) in songs" :key="song.id">
                            <a
                              class="s-fc0 f-thide xtag"
                              @mousedown="goToSong(song.id)"
                            >
                              <span
                                class="f-tdn"
                                :class="{
                                  's-fc7':
                                    search.toLowerCase().includes(value) ||
                                    search.toUpperCase().includes(value),
                                }"
                                v-for="(
                                  value, index
                                ) in song.songNameAndArtistName"
                                :key="index"
                                >{{ value }}</span
                              >
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="itm f-cb" v-if="order.includes('artists')">
                        <h3 class="hd">
                          <i class="icn u-icn u-icn-27"></i>
                          <em class="f-fl">歌手</em>
                        </h3>
                        <ul class="f-cb odd">
                          <li
                            v-for="(artist, index) in artists"
                            :key="artist.id"
                          >
                            <a
                              href=""
                              class="s-fc0 f-thide xtag"
                              @mousedown="goToArtist(artist.id)"
                            >
                              <span
                                v-for="(value, index) in artist.name"
                                :key="index"
                                class="f-tdn"
                                :class="{
                                  's-fc7':
                                    search.toLowerCase().includes(value) ||
                                    search.toUpperCase().includes(value),
                                }"
                                >{{ value }}</span
                              >
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="itm f-cb" v-if="order.includes('albums')">
                        <h3 class="hd">
                          <i class="icn u-icn u-icn-28"></i>
                          <em class="f-fl">专辑</em>
                        </h3>
                        <ul class="f-cb">
                          <li v-for="(album, index) in albums" :key="album.id">
                            <a
                              href=""
                              class="s-fc0 f-thide xtag"
                              @mousedown="goToAlbum(album.id)"
                            >
                              <span
                                class="f-tdn"
                                :class="{
                                  's-fc7':
                                    search.toLowerCase().includes(value) ||
                                    search.toUpperCase().includes(value),
                                }"
                                v-for="(value, index) in album.albumAndArtist"
                                :key="index"
                                >{{ value }}</span
                              >
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="itm f-cb" v-if="order.includes('playlists')">
                        <h3 class="hd">
                          <i class="icn u-icn u-icn-29"></i>
                          <em class="f-fl">歌单</em>
                        </h3>
                        <ul class="f-cb odd">
                          <li
                            v-for="(playlist, index) in playlists"
                            :key="playlist.id"
                          >
                            <a
                              href="#"
                              class="s-fc0 f-thide xtag"
                              @mousedown="goToPlayList(playlist.id)"
                            >
                              <span
                                class="f-tdn"
                                :class="{
                                  's-fc7':
                                    search.toLowerCase().includes(value) ||
                                    search.toUpperCase().includes(value),
                                }"
                                v-for="(value, index) in playlist.name"
                                :key="index"
                                >{{ value }}</span
                              >
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="#" class="creator-center">创作者中心</a>
            <a href="javascript:;" class="nologin" @click="login" v-if="noLogin"
              >登录</a
            >
            <a href="javascript:;" class="login" v-else>
              <img :src="profile.avatarUrl" alt="" />
              <ul class="m-tlist-lged">
                <li>
                  <a href="" class="itm-1">
                    <i class="icn icn-hm"></i>
                    <em>我的主页</em>
                  </a>
                </li>
                <li>
                  <a href="" class="itm-1">
                    <i class="icn icn-msg"></i>
                    <em>我的消息</em>
                  </a>
                </li>
                <li>
                  <a href="" class="itm-1">
                    <i class="icn icn-mbr"></i>
                    <em>VIP会员</em>
                  </a>
                </li>
                <li>
                  <a href="" class="itm-1">
                    <i class="icn icn-st"></i>
                    <em>个人设置</em>
                  </a>
                </li>
                <li>
                  <a href="#" class="itm-1">
                    <i class="icn icn-verify"></i>
                    <em>实名认证</em>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="itm-1" @click="logout">
                    <i class="icn icn-ex"></i>
                    <em>退出</em>
                  </a>
                </li>
              </ul>
            </a>
          </div>
        </div>
      </div>
      <div class="h-bottom">
        <div class="wrap">
          <ul class="nav">
            <li>
              <router-link href="#" to="/discover"
                ><em :class="{ 'z-slt': $route.meta.recommendClassShow }"
                  >推荐</em
                ></router-link
              >
            </li>
            <li>
              <router-link to="/discover/toplist"
                ><em :class="{ 'z-slt': $route.meta.topListClassShow }"
                  >排行榜</em
                ></router-link
              >
            </li>
            <li>
              <router-link to="/discover/playlist"
                ><em :class="{ 'z-slt': $route.meta.playListClassShow }"
                  >歌单</em
                ></router-link
              >
            </li>
            <li>
              <a href="#"><em>主播电台</em></a>
            </li>
            <li>
              <router-link to="/discover/artist"
                ><em :class="{ 'z-slt': $route.meta.artistClassShow }"
                  >歌手</em
                ></router-link
              >
            </li>
            <li>
              <router-link to="/discover/album"
                ><em :class="{ 'z-slt': $route.meta.albumClassShow }"
                  >新碟上架</em
                ></router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Login
      :isShowLogin.sync="isShowLogin"
      ref="login"
      :noLogin.sync="noLogin"
      @getUserInfo="getUserInfo"
    />
  </div>
</template>

<script>
import Login from './Login'
import Cookies from "js-cookie"
import { removeToken } from '@/utils/auth'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      albums: [],
      songs: [],
      artists: [],
      order: [],
      playlists: [],
      showSearch: false,
      isShowLogin: false,
      noLogin: true,
      userInfo: {}
    }
  },
  components: {
    Login
  },
  created() {
    if (Cookies.get('UserInfoFlag')) {
      this.noLogin = JSON.parse(Cookies.get('UserInfoFlag'))
    }
  },
  computed: {
    ...mapState({
      profile: state => state.user.profile
    })
  },
  methods: {
    async keywordsSearch(e) {
      this.search = e.target.value
      if (e.target.value.trim()) {
        this.showSearch = true
        const { result } = await this.$API.search.reqSearch(e.target.value)
        result.albums.forEach(item => {
          let str = item.name + item.artist.name
          item.albumAndArtist = str
        })
        this.albums = result.albums

        result.songs.forEach(item => {
          let str = item.name
          const strr = item.artists.reduce((pre, value, index, arr) => {
            if (arr.length === 1) {
              return value.name
            } else {
              return (pre + ' ' + value.name).trim()
            }
          }, '')
          str = str + '-' + strr
          item.songNameAndArtistName = str
        })
        this.songs = result.songs
        this.artists = result.artists
        this.order = result.order
        this.playlists = result.playlists
      } else {
        this.showSearch = false
      }
    },
    goToSong(id) {
      this.$router.push(`/song?id=${id}`)
    },
    goToAlbum(id) {
      this.$router.push(`/album?id=${id}`)
    },
    goToPlayList(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    goToArtist(id) {
      this.$router.push(`/artist?id=${id}`)
    },
    login() {
      document.body.setAttribute('style', 'position: fixed; width: 100%')
      this.isShowLogin = true
      this.$refs.login.loginByQr()
    },
    getUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    logout() {
      this.noLogin = true
      this.userInfo = {}
      Cookies.remove('UserInfoFlag')
      removeToken()
      location.reload()
      this.$router.push('/discover')
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  font-size: 14px;
  .h-top {
    height: 70px;
    background-color: #242424;
    border-bottom: 1px solid #000;
    .wrap {
      display: flex;
      align-items: center;
      width: 1100px;
      height: 100%;
      margin: 0 auto;
      // background-color: pink;
      .title {
        width: 176px;
        height: 69px;
        background-color: aqua;
        background: url('~@/assets/topbar.png') no-repeat 0 0;
        a {
          display: inline-block;
          width: 177px;
          height: 69px;
          text-indent: -9999px; // 只能给块级元素设置
        }
      }
      .h-nav {
        display: flex;
        width: 508px;
        justify-content: space-between;
        // margin-left: 5px;
        li {
          position: relative;
          height: 70px;
          .cor {
            display: block;
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 12px;
            height: 7px;
            background: url('~@/assets/topbar2.png') no-repeat -226px 0;
          }
          // a的遮罩层
          .z-slt {
            background-color: #000;
          }
          .hot {
            display: block;
            top: 21px;
            left: 100px;
            position: absolute;
            width: 28px;
            height: 19px;
            background: url('~@/assets/topbar2.png') no-repeat -190px 0;
          }
        }
        li a {
          display: block;
          height: 100%;
          line-height: 70px;
          padding: 0 19px;
          color: #ccc;
          &:hover {
            background-color: #000;
            color: #fff;
          }
        }
      }
      .h-tophead {
        margin-left: 100px;
        width: 300px;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .h-search {
          width: 158px;
          height: 32px;
          background-color: #fff;
          border-radius: 32px;
          .srchbg {
            position: relative;
            height: 32px;
            background: url('~@/assets/topbar2.png') no-repeat 0 -99px;
            input {
              top: 50%;
              transform: translateY(-50%);
              left: 28px;
              position: absolute;
              width: 121px;
              height: 16px;
              border: none;
              outline: none;
              font-size: 12px;
              color: #9b9b9b;
            }
          }
          .u-lstlay {
            position: absolute;
            z-index: 120;
            top: 40px;
            width: 240px;
            left: 0;
            box-sizing: border-box;
            border: 1px solid #bebebe;
            border-radius: 4px;
            background: #fff;
            box-shadow: 0 4px 7px #555;
            text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
            .m-schlist {
              font-size: 12px;
              .s-fc3 {
                color: #666;
              }
              .note {
                box-sizing: content-box;
                height: 17px;
                padding: 11px 10px;
                border-bottom: 1px solid #e2e2e2;
                .xtag {
                  &:hover {
                    background-color: #e3e5e7;
                    cursor: pointer;
                    text-decoration: none;
                  }
                }
              }
              .rap {
                .f-cb {
                  &::after {
                    clear: both;
                    content: '.';
                    display: block;
                    height: 0;
                    visibility: hidden;
                  }
                }
                .itm {
                  .hd {
                    font-size: 100%;
                    box-sizing: content-box;
                    float: left;
                    width: 52px;
                    margin-right: -100px;
                    padding: 10px 0 0 10px;
                    border-right: 1px solid #e2e2e2;
                    line-height: 17px;
                    font-weight: normal;
                    .icn {
                      display: inline-block;
                      margin: 2px 4px 0 0;
                      width: 14px;
                      height: 15px;
                      background: url('~@/assets/icon.png') no-repeat;
                      background-position: -35px -300px;
                      overflow: hidden;
                      vertical-align: middle;
                    }
                    .u-icn-27 {
                      background-position: -50px -300px;
                    }
                    .u-icn-28 {
                      background-position: -35px -320px;
                    }
                    .u-icn-29 {
                      background-position: -50px -320px;
                    }
                  }
                  ul {
                    box-sizing: content-box;
                    margin-left: 62px;
                    margin-top: -1px;
                    padding: 6px 0 5px;
                    border-top: 1px solid #e2e2e2;
                    border-left: 1px solid #e2e2e2;
                    li {
                      width: 100%;
                      float: left;
                      a {
                        display: block;
                        width: 100%;
                        text-indent: 12px;
                        line-height: 24px;
                        .s-fc7 {
                          color: #0c73c2;
                        }
                        &:hover {
                          &:hover {
                            background-color: #e3e5e7;
                            cursor: pointer;
                            text-decoration: none;
                          }
                        }
                      }
                      .s-fc0 {
                        color: #000;
                      }
                      .f-thide {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-wrap: normal;
                      }
                    }
                  }
                  .odd {
                    background: #f9f8f8;
                  }
                }
              }
            }
          }
        }
        .creator-center {
          width: 90px;
          height: 32px;
          border: 1px solid #4f4f4f;
          border-radius: 32px;
          line-height: 32px;
          text-align: center;
          color: #ccc;
          &:hover {
            border: 1px solid #fff;
          }
          .nologin:hover {
            color: #ccc;
          }
        }
        .login {
          display: inline-block;
          width: 30px;
          height: 50px;
          margin-top: 21px;
          padding-bottom: 20px;
          &:hover .m-tlist-lged {
            display: block;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .m-tlist-lged {
            display: none;
            position: absolute;
            z-index: 9999;
            top: 56px;
            right: 19px;
            width: 158px;
            background: #2b2b2b;
            border: 1px solid #202020;
            box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
            border-radius: 4px;
            li {
              width: 100%;
              a {
                position: relative;
                float: left;
                width: 100%;
                height: 34px;
                line-height: 34px;
                overflow: hidden;
                padding-left: 24px;
                color: #ccc;
                &:hover {
                  background-color: #353535;
                  color: #fff;
                }
              }
              .icn {
                float: left;
                width: 18px;
                height: 18px;
                float: left;
                margin: 7px 10px 0 0;
                background: url('~@/assets/toplist.png') no-repeat;
              }
              .icn-hm {
                background-position: 0 -80px;
              }
              .icn-msg {
                background-position: -20px -120px;
              }
              .icn-lv {
                background-position: 0 -100px;
              }
              .icn-mbr {
                background-position: 0 -221px;
              }
              .icn-st {
                background-position: 0 -140px;
              }
              .icn-verify {
                background-position: -20px -142px;
              }
              .icn-ex {
                background-position: 0 -200px;
              }
              em {
                float: left;
                width: 100px;
              }
            }
          }
        }
      }
    }
  }
  .h-bottom {
    height: 35px;
    background-color: #c20c0c;
    border-bottom: 1px solid #a40011;
    .wrap {
      width: 1100px;
      height: 100%;
      margin: 0 auto;
      .nav {
        padding-left: 180px;
        display: flex;
        a {
          display: block;
          width: 84px;
          height: 34px;
          line-height: 22px;
          text-align: center;
          color: #fff;
          &:hover em {
            background: #9b0909;
          }
          em {
            box-sizing: content-box;
            display: inline-block;
            height: 20px;
            border-radius: 20px;
            padding: 0 13px;
            margin-top: 5px;
            font-size: 12px;
          }
          .z-slt {
            background: #9b0909;
          }
        }
      }
    }
  }
}
</style>