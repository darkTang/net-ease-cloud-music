import { reqGetAlbumSongById, reqGetAlbumDynamicInfo } from '@/api/album/album'
const state = {
  // 相应歌单对应的歌曲 （输入对应的id）
  albumSongsList: [],
  commentCount: '',
  shareCount: ''
}
const mutations = {
  GETALBUMSONGSLIST(state, albumSongsList) {
    state.albumSongsList = albumSongsList
  },
  GETALBUMDYNAMICINFO(state, result) {
    state.commentCount = result.commentCount
    state.shareCount = result.shareCount
  }
}
const actions = {
  async getAlbumSongsList({ commit }, id) {
    const result = await reqGetAlbumSongById(id)
    result.songs.forEach(item => {
      item.isPlay = true
    })
    commit('GETALBUMSONGSLIST', result.songs)
  },
  async getAlbumDynamicInfo({commit}, id) {
    const result = await reqGetAlbumDynamicInfo(id)
    commit('GETALBUMDYNAMICINFO', result)
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
