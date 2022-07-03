import { QRKey, getQrCode, getAccountInfo, getUserInfo } from '@/api/user/user'
import { getToken } from '@/utils/auth'
const state = {
  unikey: '',
  qrurl: '',
  userId: '',
  profile: {},
  level: '',
  listenSongs: ''
}
const mutations = {
  GETQRKEY(state, unikey) {
    state.unikey = unikey
  },
  GETQRCODEINFO(state, data) {
    state.qrurl = data.qrurl
  },
  GETACCOUNTINFO(state, userId) {
    state.userId = userId
  },
  GETUSERINFO(state, result) {
    state.profile = result.profile
    state.level = result.level
    state.listenSongs = result.listenSongs
  }
}
const actions = {
  async getQrKey({ commit }) {
    const result = await QRKey()
    commit('GETQRKEY', result.data.unikey)
  },
  async getQrCodeInfo({ commit }, key) {
    const result = await getQrCode(key)
    commit('GETQRCODEINFO', result.data)
  },
  async getAccountInfo({ commit }) {
    if (getToken()) {
      const result = await getAccountInfo(getToken())
      commit('GETACCOUNTINFO', result.profile.userId)
    }
  },
  async getUserInfo({ commit }) {
    if (getToken()) {
      const result = await getUserInfo(state.userId)
      commit('GETUSERINFO', result)
    }
  }
}
const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
