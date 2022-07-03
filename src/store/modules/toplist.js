import { reqGetAllTopList } from '@/api/toplist/toplist'
const state = {
  allTopList: []
}
const mutations = {
  GETALLTOPLIST(state, list) {
    state.allTopList = list
  }
}
const actions = {
  async getAllTopList({ commit }) {
    const result = await reqGetAllTopList()
    result.list.forEach(item => {
      item.selected = false
    })
    result.list[0].selected = true
    commit('GETALLTOPLIST', result.list)
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
