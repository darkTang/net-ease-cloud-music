import { reqGetPlayList, reqGetAllPlayList } from '@/api/playlist/playlist'
const state = {
  // 相应歌单对应的歌曲 （输入对应的id）
  playList: [],
  topPlayList: [],
  total: 0
}
const mutations = {
  GETPLAYLIST(state, playList) {
    state.playList = playList
  },
  GETALLPLAYLIST(state, result) {
    state.topPlayList = result.playlists
    state.total = result.total
  }
}
const actions = {
  async getPlayList({ commit }, { id, limit }) {
    const result = await reqGetPlayList(id, limit)
    result.songs.forEach(item => {
      item.isPlay = true
    })
    commit('GETPLAYLIST', result.songs)
  },
  async getAllPlayList({ commit }, { pageNo, cat, order }) {
    const result = await reqGetAllPlayList(pageNo, cat, order)
    commit('GETALLPLAYLIST', result)
    console.log(result);
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
