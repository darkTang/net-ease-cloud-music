<template>
  <div class="mrc-modal mrc-modal-show" v-if="isShowLogin">
    <div class="mrc-modal-mask"></div>
    <div class="mrc-modal-wrapper">
      <div class="mrc-modal-container">
        <!-- 勾选服务 -->
        <div class="select" ref="select">
          <p>请勾选同意《服务条款》、《隐私政策》、<br />《儿童隐私政策》</p>
        </div>
        <div class="sendCheckCode" ref="sendCheckCode">验证码已发送</div>

        <!-- 登录 -->
        <div v-if="showLoginByPhone">
          <div class="_2f_EK7Ln">
            登录
            <i class="_3ENM2xDN" @click="hideLogin">×</i>
          </div>

          <div class="_1a7hecWJ">
            <div class="_2ZvLTzzp">
              <div class="_2t0Z3pyt">
                <!-- 扫码登录方式 -->
                <div class="_16n8NN9l" v-if="showLoginMethod">
                  <div class="U9Fi3aaD" v-if="authorization">
                    <div class="_2Vup8U0F">
                      <img src="./images/login_erweima.png" alt="" />
                    </div>
                    <div class="OAIqFTtr">
                      <h3>扫码登录</h3>
                      <div class="_2SF8rF8D">
                        <!-- 二维码图片 需要用到二维码生成器 -->
                        <canvas class="canvas" ref="myCanvas"></canvas>
                        <!-- 给二维码设置时间戳 -->
                        <div class="aQceH2yV">
                          <p>二维码已失效</p>
                          <a href="javascript:;" class="_8XT01x0I">点击刷新</a>
                        </div>
                      </div>
                      <p class="vsVR_YH-">
                        使用&nbsp;
                        <a href="" target="_blank">网易云音乐APP</a>
                        &nbsp;扫码登录
                      </p>
                    </div>
                  </div>

                  <div class="U9Fi3aaD" v-else>
                    <div class="_1ptZRFVS">
                      <img src="./images/authorization.png" alt="" />
                      <h3>扫描成功</h3>
                      <p>请在手机上确认登录</p>
                    </div>
                  </div>
                  <a
                    href="javascript:;"
                    class="_3xIXD0Q6"
                    @click="showLoginMethod = false"
                    >选择其他登录模式</a
                  >
                </div>

                <!-- 其他登录方式 -->
                <div class="_2unbCaee" v-else>
                  <div class="_2X-_U3Yk">
                    <div class="_3Cb44UQT">
                      <img src="./images/other_login.png" alt="" />
                      <a
                        href="javascript:;"
                        class="_1Gh25bMk"
                        @click="loginByPhone"
                      >
                        <div class="tan2MIhq">手机号登录</div>
                      </a>
                      <a href="javascript:;" class="_3fo6oHZe _1Gh25bMk">
                        <div class="tan2MIhq">注册</div>
                      </a>
                    </div>
                    <div class="_3x8w3YCi">
                      <ul>
                        <li>
                          <a href="javascript:;" target="_blank">
                            <i class="SVpiOcKA _2CK8l4-I"></i>
                            微信登录
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;" target="_blank">
                            <i class="SVpiOcKA _3VwOAmUE"></i>
                            QQ登录
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;" target="_blank">
                            <i class="SVpiOcKA _3rYgX2-P"></i>
                            微博登录
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;" target="_blank">
                            <i class="SVpiOcKA _1iOiDm5h"></i>
                            网易邮箱帐号登录
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="_3-y6k5jE">
                    <input
                      type="checkbox"
                      id="j-official-terms"
                      v-model="isAgree"
                    />
                    <label for="j-official-terms">同意</label>
                    <a href="#" target="_blank">《服务条款》</a>
                    <a href="#" target="_blank">《隐私政策》</a>
                    <a href="#" target="_blank">《儿童隐私政策》</a>
                  </div>
                  <img
                    class="v9Mt6GXn"
                    src="./images/qrCode.png"
                    alt=""
                    @click="toggleLoginByQr"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 手机号登录 -->
        <div v-else>
          <div class="_2f_EK7Ln">
            手机号登录
            <i class="_3ENM2xDN" @click="hideLogin">×</i>
          </div>

          <div class="_1a7hecWJ">
            <section>
              <div class="JA2jtQOh">
                <div class="_1aXkUzRt">
                  <a class="YmsV5FND"> + 86 </a>
                  <input
                    type="text"
                    class="_2OT0mQUQ"
                    placeholder="请输入手机号"
                    autocomplete="off"
                    v-model.trim="phone"
                    @focus="focus"
                  />
                </div>
              </div>
              <div class="_1Za6PFEg">
                <div class="zHE1Zi11 JGLX5OCb">
                  <div class="cWbL7Ab3">
                    <input
                      type="text"
                      class="sR89MU1J"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      v-model.trim="checkCode"
                      @focus="focus"
                    />
                  </div>
                </div>
                <button class="_1XRPS4yQ" @click="getCheckCode">
                  <i>获取验证码</i>
                </button>
              </div>
              <!-- 验证 -->
              <div class="_2ja9-0tH X237LSaf">
                <i></i>
                <span></span>
              </div>
              <div class="_1D0ldyLa">
                <a href="javascript:;">密码登录</a>
                <label>
                  <input type="checkbox" checked />
                  自动登录
                </label>
              </div>
              <a
                href="javascript:;"
                class="_3fo6oHZe _10mxG2UY _19WWNTbu"
                @click="login"
              >
                <div class="tan2MIhq">登录</div>
              </a>
            </section>
            <div class="_1WOC5RVA">
              <a href="javascript:;" class="Z90NHNuv"
                ><&nbsp;&nbsp;其他登录方式</a
              >
              <a href="javascript:;"><&nbsp;&nbsp;没有帐号？免费注册</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QRCode from 'qrcode'
import { validatePhone } from '@/utils/validate'
import { getTimeStamp, setTimeStamp, getToken, setToken, removeToken } from '@/utils/auth'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      timer: null,
      showLoginMethod: true,
      isAgree: false,
      showLoginByPhone: true,
      phone: '',
      checkCode: '',
      verifyCode: false,
      authorization: true,
      userInfo: {}
    }
  },
  props: ['isShowLogin', 'noLogin'],
  computed: {
    ...mapState({
      unikey: state => state.user.unikey,
      qrurl: state => state.user.qrurl
    })
  },
  methods: {
    hideLogin() {
      this.$emit('update:isShowLogin', false)
      document.body.removeAttribute('style')
      clearInterval(this.timer)

    },
    async loginByQr() {
      await this.$store.dispatch('user/getQrKey')
      await this.$store.dispatch('user/getQrCodeInfo', this.unikey)
      QRCode.toCanvas(this.$refs.myCanvas, this.qrurl)
      this.timer = setInterval(async () => {
        const result = await this.$API.user.checkQrState(this.unikey, Date.now())
        console.log(result);
        if (result.code === 802) {
          this.userInfo.avatarUrl = result.avatarUrl
          this.userInfo.nickname = result.nickname
          this.authorization = false
        } else if (result.code === 803) {
          this.hideLogin()
          setToken(result.cookie)
          setTimeStamp()
          this.$emit('update:noLogin', false)
          Cookie.set('UserInfoFlag', false)
          location.reload()
          this.$router.push('/discover')
          clearInterval(this.timer)
        }
      }, 1000)
    },
    loginByPhone() {
      if (this.isAgree) {
        this.showLoginByPhone = false
      } else {
        this.$refs.select.style.display = 'block'
        setTimeout(() => {
          this.$refs.select.style.display = 'none'
        }, 3000)
      }
    },
    toggleLoginByQr() {
      if (this.isAgree) {
        this.showLoginMethod = true
        this.loginByQr()
      } else {
        this.$refs.select.style.display = 'block'
        setTimeout(() => {
          this.$refs.select.style.display = 'none'
        }, 3000)
      }
    },
    async getCheckCode() {
      let verify = document.querySelector('._2ja9-0tH')
      let span = verify.querySelector('span')
      let time = document.querySelector('._1XRPS4yQ i')
      let btn = document.querySelector('._1XRPS4yQ')
      if (!this.phone) {
        verify.style.display = 'block'
        span.innerText = '请输入手机号'
      } else if (!validatePhone(this.phone)) {
        verify.style.display = 'block'
        span.innerText = '请输入正确的手机号'
      } else {
        let t = 5
        let timer = null
        btn.disabled = true
        btn.style.cursor = 'not-allowed'
        this.$refs.sendCheckCode.style.display = 'block'
        // const { data } = await this.$API.user.getCheckCode(this.phone)
        timer = setInterval(() => {
          console.log(t);
          t--
          time.innerText = `${t}s`
          if (t === 2) {
            this.$refs.sendCheckCode.style.display = 'none'
          } else if (t === 0) {
            clearInterval(timer)
            time.innerText = '获取验证码'
            btn.disabled = false
            btn.style.cursor = 'pointer'
          }
        }, 1000)
        // console.log(data);   // true
      }
    },
    focus() {
      let verify = document.querySelector('._2ja9-0tH')
      let span = verify.querySelector('span')
      verify.style.display = 'none'
      span.innerText = ''
    },
    async login() {
      let verify = document.querySelector('._2ja9-0tH')
      let span = verify.querySelector('span')
      if (validatePhone(this.phone) && this.checkCode) {
        try {
          const result = await this.$API.user.verifyCheckCode(this.phone, this.checkCode)
          if (result.code === 200) {
            this.verifyCode = result.data
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (!this.phone) {
        verify.style.display = 'block'
        span.innerText = '请输入手机号'
      } else if (!validatePhone(this.phone)) {
        verify.style.display = 'block'
        span.innerText = '手机号格式错误'
      } else if (!this.checkCode) {
        verify.style.display = 'block'
        span.innerText = '请输入验证码'
      } else if (!this.verifyCode) {
        verify.style.display = 'block'
        span.innerText = '验证码错误'
      } else {
        const result = await this.$API.user.verifyCheckCode(this.phone, this.checkCode)
        console.log(result);
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: content-box;
}
.mrc-modal {
  position: absolute;
  z-index: 1000;
  font-size: 12px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-text-size-adjust: none;
  .mrc-modal-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
  }
  .mrc-modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    .mrc-modal-container {
      width: 540px;
      background: #fff;
      pointer-events: auto;
      z-index: 9998;
      border-radius: 4px;
      box-shadow: 0 5px 16px rgb(0 0 0 / 80%);
      border: none;
      ._2f_EK7Ln {
        position: relative;
        margin: 0;
        padding: 0 45px 0 18px;
        height: 38px;
        line-height: 38px;
        z-index: 10;
        border-bottom: 1px solid #191919;
        border-radius: 4px 4px 0 0;
        background: #2d2d2d;
        font-weight: bold;
        font-size: 14px;
        color: #fff;
        ._3ENM2xDN {
          position: absolute;
          z-index: 20;
          top: 16px;
          right: 20px;
          width: 10px;
          height: 10px;
          overflow: hidden;
          text-indent: -9999px;
          cursor: pointer;
          background: url(./images/Dialog_top.png) no-repeat;
          background-position: 0 -95px;
        }
      }
      ._1a7hecWJ {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: auto;
        padding: 0;
        border: 1px solid #d8d8d8;
        border-width: 0 1px 1px;
        border-radius: 0 0 4px 4px;
        background: #fff;
        ._2ZvLTzzp {
          display: flex;
          justify-content: center;
          align-items: center;
          ._2t0Z3pyt {
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 538px;
            height: 326px;
            background-color: #fff;
            ._16n8NN9l {
              .U9Fi3aaD {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 220px;
                ._2Vup8U0F {
                  img {
                    width: 125px;
                    height: 220px;
                  }
                }
                .OAIqFTtr {
                  margin-left: 25px;
                  width: 200px;
                  text-align: center;
                  h3 {
                    font-size: 18px;
                    font-weight: 500;
                  }
                  ._2SF8rF8D {
                    position: relative;
                    width: 130px;
                    height: 130px;
                    padding: 4px;
                    margin: 13px auto;
                    .canvas {
                      width: 128px !important;
                      height: 128px !important;
                    }
                    .aQceH2yV {
                      display: none;
                      position: absolute;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                      background: rgba(255, 255, 255, 0.9);
                      p {
                        margin: 45px auto 6px;
                        font-size: 12px;
                        color: rgba(0, 0, 0, 0.8);
                        font-weight: 500;
                      }
                      ._8XT01x0I {
                        display: block;
                        margin: 0 auto;
                        padding-right: 0;
                        width: 64px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                        border-radius: 4px;
                        background: linear-gradient(
                          180deg,
                          #81dd81 0%,
                          #55a055 100%
                        );
                        border: 1px solid #5baf5b;
                        color: #fff;
                        font-size: 12px;
                      }
                    }
                  }
                  .vsVR_YH- {
                    font-size: 12px;
                    top: 181px;
                    width: 200px;
                    right: -15px;
                    left: auto;
                    line-height: 17px;
                    color: rgba(0, 0, 0, 0.4);
                    a {
                      color: #0c73c2;
                    }
                  }
                }
                ._1ptZRFVS {
                  img {
                    width: 140px;
                    height: 140px;
                  }
                  h3 {
                    margin-top: 12px;
                    font-size: 18px;
                    font-weight: 450;
                    line-height: 24px;
                    color: rgba(0, 0, 0, 0.8);
                  }
                  p {
                    margin-top: 4px;
                    font-size: 14px;
                    color: #333;
                  }
                }
              }
              ._3xIXD0Q6 {
                display: block;
                width: 118px;
                height: 28px;
                margin: 20px auto 0;
                padding-right: 0;
                font-size: 12px;
                border: 1px solid #979797;
                border-radius: 15px;
                line-height: 28px;
                text-align: center;
                color: rgba(0, 0, 0, 0.8);
              }
            }
            ._2unbCaee {
              ._2X-_U3Yk {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 220px;
                ._3Cb44UQT {
                  width: 224px;
                  padding: 0 35px 3px 40px;
                  border-right: 1px dotted #ccc;
                  img {
                    width: 224px;
                    height: 120px;
                  }
                  ._1Gh25bMk {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    white-space: nowrap;
                    margin: 0 auto;
                    padding: 0 5px 0 0;
                    height: 31px;
                    font-size: 12px;
                    width: 219px;
                    color: #fff;
                    background: url(./images/other_login2.png) no-repeat;
                    background-position: right -428px;
                    margin-top: 10px;
                    &:hover {
                      background-position: right -510px;
                    }
                    &:hover .tan2MIhq {
                      background-position: 0 -469px;
                    }
                    .tan2MIhq {
                      width: 184px;
                      background: url(./images/other_login2.png) no-repeat;
                      padding: 0 15px 0 20px;
                      height: 100%;
                      line-height: 31px;
                      text-align: center;
                      background-position: 0 -387px;
                    }
                  }
                  ._3fo6oHZe {
                    color: #333;
                    background-position: right -100px;
                    &:hover {
                      background-position: right -182px;
                    }
                    &:hover .tan2MIhq {
                      background-position: 0 -141px;
                    }
                    .tan2MIhq {
                      background-position: 0 -59px;
                    }
                  }
                }
                ._3x8w3YCi {
                  padding: 3px 0 3px 39px;
                  margin-top: -15px;
                  li {
                    margin-top: 15px;
                    a {
                      font-size: 12px;
                      color: #333;
                      line-height: 38px;
                      &:hover {
                        text-decoration: underline;
                      }
                      .SVpiOcKA {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 14px;
                        width: 38px;
                        height: 38px;
                        background: url(./images/brand_logo.png) no-repeat 0
                          9999px;
                      }
                      ._2CK8l4-I {
                        background-position: -150px -670px;
                      }
                      ._3VwOAmUE {
                        background-position: -190px -670px;
                      }
                      ._3rYgX2-P {
                        background-position: -231px -670px;
                      }
                      ._1iOiDm5h {
                        background-position: -271px -670px;
                      }
                    }
                  }
                }
              }
              ._3-y6k5jE {
                margin-left: 40px;
                margin-top: 30px;
                font-family: NotoSansHans-Regular;
                font-size: 10px;
                color: rgba(0, 0, 0, 0.4);
                line-height: 15px;
                #j-official-terms {
                  font-size: 12px;
                  color: #333;
                  font-family: Arial, Helvetica, sans-serif;
                  -webkit-text-size-adjust: none;
                  vertical-align: middle;
                }
                label {
                  margin-left: 2px;
                  vertical-align: middle;
                }
                a {
                  color: #507daf;
                  vertical-align: middle;
                }
              }
              .v9Mt6GXn {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 52px;
                height: 52px;
              }
            }
          }
        }
        section {
          margin: 0 auto;
          padding: 30px 0 43px;
          width: 220px;
          .JA2jtQOh {
            position: relative;
            margin: 0;
            height: 30px;
            line-height: 30px;
            border: 1px solid #cdcdcd;
            border-radius: 2px;
            z-index: 11;
            ._1aXkUzRt {
              height: 100%;
              .YmsV5FND {
                position: relative;
                float: left;
                display: block;
                height: 30px;
                line-height: 30px;
                padding: 0 18px 0 5px;
                border-right: 1px solid #cdcdcd;
                color: #333;
                cursor: pointer;
                &::after {
                  content: '';
                  position: absolute;
                  top: 14px;
                  right: 7px;
                  width: 7px;
                  height: 4px;
                  background: url(./images/login_validate.png) no-repeat;
                  background-position: -260px -450px;
                }
              }
              ._2OT0mQUQ {
                display: block;
                padding: 0 8px;
                width: 68%;
                height: 100%;
                outline: none;
                border: none;
                color: #333;
                background: none;
              }
            }
          }
          ._1Za6PFEg {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .zHE1Zi11 {
              position: relative;
              width: 136px;
              margin: 0;
              height: 30px;
              line-height: 30px;
              border: 1px solid #cdcdcd;
              border-radius: 2px;
              z-index: 10;
              .cWbL7Ab3 {
                height: 100%;
                .sR89MU1J {
                  display: block;
                  padding: 0 8px;
                  width: 100%;
                  height: 100%;
                  outline: none;
                  border: none;
                  color: #333;
                  background: none;
                  box-sizing: border-box;
                }
              }
            }
            ._1XRPS4yQ {
              display: inline-block;
              padding: 0 5px 0 0;
              width: 70px;
              height: 31px;
              line-height: 31px;
              color: #333;
              border: none;
              overflow: hidden;
              vertical-align: top;
              text-align: center;
              white-space: nowrap;
              cursor: pointer;
              background: url(./images/other_login2.png) right -100px no-repeat;
              &:hover {
                background-position: right -182px;
              }
              &:hover i {
                background-position: 0 -141px;
              }
              i {
                display: inline-block;
                width: 61px;
                padding: 0 2px 0 7px;
                background: url(./images/other_login2.png) 0 -59px no-repeat;
                text-align: center;
              }
            }
          }
          ._2ja9-0tH {
            display: none;
            margin-top: 5px;
            color: #e33232;
            i {
              display: inline-block;
              overflow: hidden;
              vertical-align: middle;
              margin-top: -2px;
              margin-right: 8px;
              width: 14px;
              height: 14px;
              background: url(./images/validate.png) -50px -270px no-repeat;
              text-decoration: none;
            }
          }
          ._1D0ldyLa {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            color: #666;
            a {
              color: #666;
            }
            input {
              margin: 0 6px 0 0;
              vertical-align: middle;
            }
          }
          ._3fo6oHZe {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            margin: 0 auto;
            padding: 0 5px 0 0;
            height: 31px;
            font-size: 12px;
            background: url(./images/other_login2.png) no-repeat;
            width: 215px;
            color: #fff;
            margin-top: 20px;
            background-position: right -428px;
            .tan2MIhq {
              background: url(./images/other_login2.png) no-repeat;
              padding: 0 15px 0 20px;
              height: 100%;
              line-height: 31px;
              text-align: center;
              width: 180px;
              background-position: 0 -387px;
            }
          }
        }
        ._1WOC5RVA {
          display: flex;
          justify-content: space-between;
          padding: 0 19px;
          height: 48px;
          border-top: 1px solid #c6c6c6;
          border-radius: 0 0 4px 4px;
          line-height: 48px;
          background-color: #f7f7f7;
          a {
            font-size: 12px;
            color: #999;
            text-decoration: none;
          }
          .Z90NHNuv {
            color: #0c72c3;
          }
        }
      }
    }
  }
  .select {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 80px;
    line-height: 25px;
    text-align: center;
    background-color: #000;
    opacity: 0.7;
    z-index: 9999;
    transition: all 0.4s;
    p {
      margin-top: 16px;
      height: 100%;
      color: #fff;
    }
  }
  .sendCheckCode {
    display: none;
    position: absolute;
    top: 45%;
    left: 46%;
    transform: translate(-50%, -50%);
    width: 122px;
    height: 39px;
    line-height: 39px;
    text-align: center;
    background-color: #000;
    opacity: 0.7;
    z-index: 9999;
    transition: all 0.4s;
    color: #fff;
  }
}
</style>