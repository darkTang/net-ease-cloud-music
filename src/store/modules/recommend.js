import { reqGetBannerList, reqGetNewAlbum, reqGetRecommendPlayList, reqGetTopList, reqGetTopListDetail, reqInSinger } from '@/api/recommend/recommend'
const state = {
  // 首页轮播图
  bannerList: [],
  // 首页新碟上架
  newAlbumList: [],
  // 首页热门推荐全部歌单(包括更多里面的)
  allList: [],
  // 飙升榜歌单
  soaringList: [],
  // 新歌榜歌单
  newList: [],
  // 原创榜歌单
  originalList: [],
  // 入驻歌手
  inSingerList: []
}
const mutations = {
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETNEWALBUM(state, newAlbumList) {
    state.newAlbumList = newAlbumList
  },
  GETRECOMMENDPLAYLIST(state, allList) {
    state.allList = allList
  },
  GETSOARINGLISTDETAIL(state, soaringList) {
    state.soaringList = soaringList
  },
  GETNEWLISTDETAIL(state, newList) {
    state.newList = newList
  },
  GETORIGINALLISTDETAIL(state, originalList) {
    state.originalList = originalList
  },
  GETINSINGER(state, inSingerList) {
    state.inSingerList = inSingerList
  }
}
const actions = {
  // 获取首页轮播图数据
  async getBannerList(context) {
    const result = await reqGetBannerList()
    context.commit('GETBANNERLIST', result.banners)
  },
  // 获取首页新碟上架
  async getNewAlbum({ commit }) {
    const result = await reqGetNewAlbum()
    commit('GETNEWALBUM', result.albums)
  },
  // 获取首页热门推荐歌单(包括更多里面的)
  async getRecommendPlayList({ commit }) {
    const result = await reqGetRecommendPlayList()
    commit('GETRECOMMENDPLAYLIST', result.result)
  },
  // 获取全部榜单，返回数据中有全部对应榜单的id
  async getGetTopList({ commit }) {
    const result = await reqGetTopList()  // 这里的数据先待定，等到用到再去接收
  },
  // 榜单中的歌单详情，传入对应的歌单id，获取对应的歌单
  async getTopListDetail({ commit }, id) {
    if (id === 19723756) {
      const result = await reqGetTopListDetail(id)
      commit('GETSOARINGLISTDETAIL', result.playlist)
    } else if (id === 3779629) {
      const result = await reqGetTopListDetail(id)
      commit('GETNEWLISTDETAIL', result.playlist)
    } else if (id === 2884035) {
      const result = await reqGetTopListDetail(id)
      commit('GETORIGINALLISTDETAIL', result.playlist)
    }
  },
  // 入驻歌手
  async getInSinger({ commit }) {
    const result = await reqInSinger()
    commit('GETINSINGER', result.artists)
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
