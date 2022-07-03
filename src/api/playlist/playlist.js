import request from '@/api/request'

// 获取相应首页歌单对应的歌曲 （输入对应的id）
export function reqGetPlayList(id, limit = 10) {
  return request({
    url: '/playlist/track/all',
    params: { id, limit }
  })
}

// 获取歌单详情动态
export function reqGetPlayDynamic(id) {
  return request({
    url: '/playlist/detail/dynamic',
    params: { id }
  })
}
// 获取歌单详情
export function reqGetPlayListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: { id }
  })
}

// 热门歌单
export function reqGetRelatedPlayList(id) {
  return request({
    url: '/related/playlist',
    params: { id }
  })
}

// 获取歌单评论
export function reqGetCommentById(id, pageNo = 1) {
  const offset = (pageNo - 1) * 20
  return request({
    url: '/comment/playlist',
    params: { id, offset }
  })
}

// 获取最新最热歌单
export function reqGetAllPlayList(pageNo = 1, cat, order) {
  const offset = (pageNo - 1) * 35
  return request({
    url: '/top/playlist',
    params: { limit: 35, offset, order, cat }
  })
}

// 歌单分类
export function reqGetPlayListCatList() {
  return request({
    url: '/playlist/catlist'
  })
}

// 私人推荐歌曲
export function reqGetPersonalSongs(cookie) {
  return request({
    url: '/recommend/songs',
    params: {cookie}
  })
}
