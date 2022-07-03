<template>
  <div class="comment">
    <div class="u-title">
      <h3>评论</h3>
      <span class="sub">共{{ total }}条评论</span>
    </div>
    <div class="m-cmmt">
      <div class="iptarea">
        <div class="head">
          <img src="./images/default_avatar.jpg" alt="" />
        </div>
        <div class="j-flag">
          <div class="m-cmmtipt">
            <div class="u-txtwrap holder-parent f-pr">
              <textarea class="u-txt area j-flag" placeholder="评论"></textarea>
            </div>
            <div class="btns f-cb f-pr">
              <i class="icn u-icn u-icn-36 j-flag"></i>
              <i class="icn u-icn u-icn-41 j-flag"></i>
              <a href="javascript:;" class="btn">评论</a>
              <span class="zs">140</span>
            </div>
            <div class="corr u-arr"></div>
          </div>
        </div>
      </div>
      <div class="cmmts j-flag">
        <h3 class="u-hd4" v-show="pageNo === 1">精彩评论</h3>
        <div v-for="(item, index) in hotCommentsList" :key="item.commentId">
          <div class="itm">
            <div class="head">
              <a href="#">
                <img :src="item.user.avatarUrl" alt="" />
              </a>
            </div>
            <div class="cntwrap">
              <div class="cnt f-brk">
                <a href="#" class="s-fc7">{{ item.user.nickname }}</a
                >：{{ item.content }}
              </div>
              <div class="rp">
                <div class="time">{{ item.time | timeFormatter }}</div>
                <a href="javascript:;" class="like">
                  <i class="zan"></i> ({{ item.likedCount }})
                  <span class="sep">|</span>
                </a>
                <a
                  href="javascript:;"
                  class="reply"
                  @click="toggleReply(hotCommentsList, item)"
                  >回复</a
                >
              </div>
            </div>
          </div>
          <!-- 点击回复出现的对话框 -->
          <div class="rept m-quk m-quk-1 f-pr" v-if="item.status !== 0">
            <div class="inner">
              <div class="corr u-arr u-arr-1"></div>
              <div class="f-pr">
                <div class="u-txtwrap">
                  <textarea
                    class="u-txt"
                    ref="textarea"
                    maxlength="140"
                    @keyup.enter="breakLine"
                    @keyup.delete="deleteLine"
                  >
回复{{ item.user.nickname }}:</textarea
                  >
                </div>
                <div class="btns f-cb f-pr">
                  <i class="icn u-icn u-icn-36 j-flag"></i>
                  <i class="icn u-icn u-icn-41 j-flag"></i>
                  <a href="javascript:;" class="btn">回复</a>
                  <span class="zs">140</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <h3 class="u-hd4" v-show="pageNo === 1">最新评论({{ total }})</h3>
        <div v-for="(item, index) in commentsList" :key="index">
          <div class="itm">
            <div class="head">
              <a href="#">
                <img :src="item.user.avatarUrl" alt="" />
              </a>
            </div>
            <div class="cntwrap">
              <div class="cnt f-brk">
                <a href="#" class="s-fc7">{{ item.user.nickname }}</a
                >：{{ item.content }}
              </div>
              <div
                class="que f-brk f-pr s-fc3"
                v-show="item.beReplied.length > 0"
              >
                <div class="corr u-arr u-arr-1"></div>
                <a href="#" class="s-fc7">{{
                  item.beReplied.length > 0
                    ? item.beReplied[0].user.nickname
                    : ''
                }}</a>
                ：{{
                  item.beReplied.length > 0 ? item.beReplied[0].content : ''
                }}
              </div>
              <div class="rp">
                <div class="time">{{ item.timeStr }}</div>
                <a href="javascript:;" class="like">
                  <i class="zan"></i>
                  <span v-show="item.likedCount > 0"
                    >({{ item.likedCount }})</span
                  >
                  <span class="sep">|</span>
                </a>
                <a
                  href="javascript:;"
                  class="reply"
                  @click="toggleReply(commentsList, item)"
                  >回复</a
                >
              </div>
            </div>
          </div>
          <!-- 点击回复出现的对话框 -->
          <div class="rept m-quk m-quk-1 f-pr" v-if="item.status !== 0">
            <div class="inner">
              <div class="corr u-arr u-arr-1"></div>
              <div class="f-pr">
                <div class="u-txtwrap">
                  <textarea
                    class="u-txt"
                    maxlength="140"
                    @keyup.enter="breakLine"
                    @keyup.delete="deleteLine"
                    ref="textarea"
                  >
回复{{ item.user.nickname }}:</textarea
                  >
                </div>
                <div class="btns f-cb f-pr">
                  <i class="icn u-icn u-icn-36 j-flag"></i>
                  <i class="icn u-icn u-icn-41 j-flag"></i>
                  <a href="javascript:;" class="btn">回复</a>
                  <span class="zs">140</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function padZero(n) {
  return n > 9 ? n : '0' + n
}
export default {
  props: ['commentsList', 'hotCommentsList', 'pageNo', 'total'],
  methods: {
    toggleReply(list, item) {
      if (item.status === 0) {
        list.forEach(obj => {
          obj.status = 0
        })
        item.status = 1
        this.$nextTick(() => {
          let len = this.$refs.textarea[0].value.length
          this.$refs.textarea[0].setSelectionRange(len, len)
          this.$refs.textarea[0].focus()
        })
      } else {
        item.status = 0
      }
    },
    breakLine() {
      let textarea = this.$refs.textarea[0]
      textarea.style.height = parseInt(textarea.scrollTop + textarea.offsetHeight - 10) + 'px'
    },
    deleteLine() {
      let textarea = this.$refs.textarea[0]
      textarea.style.height = ''
      textarea.style.height = parseInt(textarea.scrollHeight) - 16 + 'px'
    }
  },
  filters: {
    timeFormatter(time) {
      const date = new Date(time)
      const y = date.getFullYear()
      const m = padZero(date.getMonth() + 1)
      const d = padZero(date.getDate())
      const hh = padZero(date.getHours())
      const mm = padZero(date.getMinutes())
      const nowTime = Date.now()
      const nowYear = new Date(nowTime).getFullYear()
      if (y < nowYear) return `${y}年${m}月${d}日 ${hh}:${mm}`
      return `${m}月${d}日 ${hh}:${mm}`
    }
  },
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 40px;
  .u-title {
    height: 33px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      font-size: 20px;
      font-weight: normal;
    }
    .sub {
      float: left;
      margin: 9px 0 0 20px;
      color: #666;
    }
  }
  .m-cmmt {
    margin-top: 20px;
    .iptarea {
      margin-bottom: 20px;
      .head {
        float: left;
        width: 50px;
        height: 50px;
        margin-right: -100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .j-flag {
        .m-cmmtipt {
          position: relative;
          margin-left: 62px;
          .u-txtwrap {
            padding-right: 14px;
            .area {
              height: 50px;
              display: block;
              margin: 0;
              padding: 5px 6px 6px;
              border: 1px solid #cdcdcd;
              border-radius: 2px;
              line-height: 19px;
              box-sizing: content-box;
              width: 100%;
              margin-right: -20px;
              resize: none;
              overflow: auto;
              outline: none;
            }
          }
          .btns {
            clear: both;
            padding-top: 10px;
            &::after {
              clear: both;
              content: '.';
              display: block;
              height: 0;
              visibility: hidden;
            }
            .icn {
              float: left;
              margin: 0px 10px 0 0;
              cursor: pointer;
            }
            .u-icn {
              display: inline-block;
              overflow: hidden;
              vertical-align: middle;
              background: url('~@/assets/icon.png') no-repeat;
            }
            .u-icn-36 {
              width: 18px;
              height: 18px;
              background-position: -40px -490px;
            }
            .u-icn-41 {
              width: 18px;
              height: 18px;
              background-position: -60px -490px;
            }
            .btn {
              float: right;
              width: 46px;
              height: 25px;
              background: url('~@/assets/button.png') no-repeat;
              background-position: -84px -64px;
              color: #fff;
              text-align: center;
              line-height: 25px;
            }
            .zs {
              float: right;
              margin-right: 10px;
              line-height: 25px;
              color: #999;
            }
          }
          .corr {
            position: absolute;
            overflow: hidden;
            top: 11px;
            left: -5px;
            width: 9px;
            height: 9px;
            border-top: 1px solid #cdcdcd;
            border-right: 1px solid #cdcdcd;
            background-color: #fff;
            transform: rotate(-135deg);
          }
        }
      }
    }
    .cmmts {
      .u-hd4 {
        position: relative; // 相对自己移动，可以加top
        top: 1px;
        height: 20px;
        border-bottom: 1px solid #cfcfcf;
        font-size: 12px;
      }
      .itm {
        padding: 15px 0;
        border-top: 1px dotted #ccc;
        .head {
          float: left;
          width: 50px;
          height: 50px;
          margin-right: -100px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .cntwrap {
          margin-left: 60px;
          .cnt {
            width: 100%;
            overflow: hidden;
            line-height: 20px;
            .s-fc7 {
              margin-right: 5px;
              color: #0c73c2;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          .que {
            position: relative;
            padding: 8px 19px;
            margin-top: 10px;
            line-height: 20px;
            background: #f4f4f4;
            border: 1px solid #dedede;
            color: #666;
            .corr {
              position: absolute;
              overflow: hidden;
              left: 22px;
              top: -5px;
              width: 9px;
              height: 9px;
              border-top: 1px solid #cdcdcd;
              border-right: 1px solid #cdcdcd;
              background-color: #f8f8f8;
              transform: rotate(-45deg);
            }
            .s-fc7 {
              margin-right: 5px;
              color: #0c73c2;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          .rp {
            margin-top: 15px;
            text-align: right;
            .time {
              float: left;
              margin: 0 !important;
              color: #999;
            }
            .like {
              &:hover {
                text-decoration: underline;
              }
              .zan {
                display: inline-block;
                overflow: hidden;
                margin-right: 5px;
                vertical-align: -2px;
                margin-top: -4px;
                width: 15px;
                height: 14px;
                background: url('~@/assets/icon2.png') no-repeat;
                background-position: -150px 0;
              }
              .sep {
                margin: 0 8px;
                color: #ccc;
              }
            }
            .reply {
              color: #666;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
      .rept {
        // display: none;
        box-sizing: content-box;
        position: relative;
        margin-left: 60px;
        margin-bottom: 18px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        .inner {
          position: relative;
          padding: 15px;
          background: #f8f8f8;
          border: 1px solid #fcfcfc;
          border-radius: 2px;
          .corr {
            position: absolute;
            overflow: hidden;
            right: 9px;
            top: -7px;
            width: 9px;
            height: 9px;
            border-top: 1px solid #cdcdcd;
            border-right: 1px solid #cdcdcd;
            background-color: #f8f8f8;
            transform: rotate(-45deg);
          }
          .f-pr {
            .u-txtwrap {
              padding-right: 14px;
              .u-txt {
                overflow: hidden;
                height: 20px;
                width: 100%;
                margin-right: -20px;
                margin: 0;
                padding: 5px 6px 6px;
                border: 1px solid #cdcdcd;
                border-radius: 2px;
                line-height: 19px;
                box-sizing: content-box;
                resize: none;
                outline: none;
              }
            }
            .btns {
              clear: both;
              padding-top: 10px;
              &::after {
                clear: both;
                content: '.';
                display: block;
                height: 0;
                visibility: hidden;
              }
              .icn {
                float: left;
                margin: 0px 10px 0 0;
                cursor: pointer;
              }
              .u-icn {
                display: inline-block;
                overflow: hidden;
                vertical-align: middle;
                background: url('~@/assets/icon.png') no-repeat;
              }
              .u-icn-36 {
                width: 18px;
                height: 18px;
                background-position: -40px -490px;
              }
              .u-icn-41 {
                width: 18px;
                height: 18px;
                background-position: -60px -490px;
              }
              .btn {
                float: right;
                width: 46px;
                height: 25px;
                background: url('~@/assets/button.png') no-repeat;
                background-position: -84px -64px;
                color: #fff;
                text-align: center;
                line-height: 25px;
              }
              .zs {
                float: right;
                margin-right: 10px;
                line-height: 25px;
                color: #999;
              }
            }
          }
        }
      }
    }
  }
}
</style>