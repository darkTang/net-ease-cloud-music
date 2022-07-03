import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import recommend from './modules/recommend'
import playlist from './modules/playlist'
import song from './modules/song'
import album from './modules/album'
import toplist from './modules/toplist'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    recommend,
    playlist,
    song,
    album,
    toplist,
    user
  },
  getters
})

export default store
