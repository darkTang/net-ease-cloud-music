import Cookies from "js-cookie"

const TokenKey = 'net-ease-cloud-music-token'
const timeKey = 'music-timestamp-key'

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}

// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}