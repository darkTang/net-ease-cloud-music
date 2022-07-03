import request from '@/api/request'

// 根据id获取歌手单曲
export function reqGetArtistSongsById(id) {
  return request({
    url: '/artists',
    params: { id }
  })
}

// 根据id获取歌手详情
export function reqGetArtistDetailById(id) {
  return request({
    url: '/artist/detail',
    params: { id }
  })
}

// 根据id获取歌手专辑
export function reqGetArtistAlbumById(id, pageNo = 1, limit = 12) {
  const offset = (pageNo - 1) * 12
  return request({
    url: '/artist/album',
    params: { id, offset, limit }
  })
}

// 根据id获取歌手mv
export function reqGetArtistMvById(id, pageNo = 1, limit = 12) {
  const offset = (pageNo - 1) * 12
  return request({
    url: '/artist/mv',
    params: { id, offset, limit }
  })
}

// 根据id获取歌手描述
export function reqGetArtistDesc(id) {
  return request({
    url: '/artist/desc',
    params: { id }
  })
}

// 获取热门歌手
export function reqGetHotArtistById(limit = 6, pageNo = 1) {
  const offset = (pageNo - 1) * 50
  return request({
    url: '/top/artists',
    params: { limit, offset }
  })
}

// 歌手分类列表
export function reqGetArtistCateList(area, type, initial) {
  return request({
    url: '/artist/list',
    params: { limit: 100, area, type, initial }
  })
}


