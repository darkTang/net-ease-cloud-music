import request from '@/api/request'

// 获取首页轮播图
export function reqGetBannerList() {
  return request({
    url: '/banner',
    params: { type: 0 }
  })
}

// 首页新碟上架
export function reqGetNewAlbum() {
  return request({
    url: '/album/newest'
  })
}

// 全部新碟
export function reqGetAllNewDisk(pageNo = 1, area = 'ALL') {
  const offset = (pageNo - 1) * 35
  return request({
    url: '/album/new',
    params: { limit: 35, offset, area }
  })
}

// 首页热门推荐歌单(包括更多里面的)
export function reqGetRecommendPlayList() {
  return request({
    url: '/personalized',
  })
}

// 全部榜单
export function reqGetTopList() {
  return request({
    url: '/toplist/detail'
  })
}

// 榜单中的歌单详情，传入对应的歌单id，获取对应的歌单
export function reqGetTopListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: { id }
  })
}

// 首页入驻歌手
export function reqInSinger() {
  return request({
    url: '/artist/list',
  })
}

// 主播
export function reqPopularAnchor() {
  return request({
    url: '/dj/toplist/popular',
    params: { limit: 5 }
  })
}

// 私人推荐歌单
export function reqPersonalPlayList(cookie) {
  return request({
    url: '/recommend/resource',
    params: {cookie}
  })
}