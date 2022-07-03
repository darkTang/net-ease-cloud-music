import { reqGetSongDetailById, reqGetLyricById } from '@/api/song/song'
const state = {
  // 播放列表
  songLists: JSON.parse(localStorage.getItem('songLists')) || [],
  lyric: '',
  tLyric: ''
}
const mutations = {
  GETSONGDETAILBYID(state, obj) {
    if (Array.isArray(obj)) {
      state.songLists = obj
      localStorage.setItem('songLists', JSON.stringify(state.songLists))
    } else {
      if (!Array.isArray(state.songLists)) {
        state.songLists = []
      }
      if (state.songLists.some(item => item.id === obj.id)) return
      state.songLists.push(obj)
      localStorage.setItem('songLists', JSON.stringify(state.songLists))
    }
  },
  GETLYRIC(state, result) {
    state.lyric = result.lrc.lyric
    if (result.tlyric) {
      state.tLyric = result.tlyric.lyric
    }
  }
}
const actions = {
  async getSongDetailById({ commit }, { ids, flag }) {
    const result = await reqGetSongDetailById(ids)
    console.log(result);
    result.songs.forEach(item => {
      item.isPlayIcon = false
    })
    if (flag === 'song') {
      for (let i = 0; i < result.songs.length; i++) {
        commit('GETSONGDETAILBYID', result.songs[i])
      }
    } else if (flag === 'songList') {
      commit('GETSONGDETAILBYID', result.songs)
    }
  },

  // async getLyric({ commit }, id) {
  //   const result = await reqGetLyricById(id)
  //   commit('GETLYRICS', result)
  //   console.log(result);
  // }
  async getLyric({ commit }, id) {
    const result = await reqGetLyricById(id)
    commit('GETLYRIC', result)
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
