import request from '@/api/request'

// 获取专辑评论
export function reqGetAlbumCommentById(id, pageNo = 1) {
  const offset = (pageNo - 1) * 20
  return request({
    url: '/comment/album',
    params: { id, offset }
  })
}

// 获取专辑内容
export function reqGetAlbumSongById(id) {
  return request({
    url: '/album',
    params: { id }
  })
}

// 获取专辑动态信息
export function reqGetAlbumDynamicInfo(id) {
  return request({
    url: '/album/detail/dynamic',
    params: { id }
  })
}

// 根据id获取数字专辑详情
export function reqGetAlbumDetailById(id) {
  return request({
    url: '/album/detail',
    params: { id }
  })
}

// 根据id获取歌手其他专辑
export function reqGetArtistAlbumById(id, limit = 5) {
  return request({
    url: '/artist/album',
    params: { id, limit }
  })
}