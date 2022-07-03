import request from '@/api/request'

// 获取游客的cookie
export function UU_login() {
  return request({
    url: '/register/anonimous'
  })
}

//  二维码key生成接口
export function QRKey() {
  return request({
    url: '/login/qr/key'
  })
}

// 根据key生成二维码
export function getQrCode(key) {
  return request({
    url: '/login/qr/create',
    params: { key }
  })
}

// 二维码扫码状态检测
export function checkQrState(key, timestamp) {
  return request({
    url: '/login/qr/check',
    params: { key, timestamp }
  })
}

// 验证码
export function getCheckCode(phone) {
  return request({
    url: '/captcha/sent',
    params: { phone }
  })
}

// 验证验证码
export function verifyCheckCode(phone, captcha) {
  return request({
    url: '/captcha/verify',
    params: { phone, captcha }
  })
}

// 获取账号信息
export function getAccountInfo(cookie) {
  return request({
    url: '/user/account',
    params: { cookie }
  })
}

// 获取登录状态
export function getLoginStatus() {
  return request({
    url: '/login/status',
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/logout'
  })
}

// 获取用户详情
export function getUserInfo(uid) {
  return request({
    url: '/user/detail',
    params: {uid}
  })
}
