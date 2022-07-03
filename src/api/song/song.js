import request from '@/api/request'

// 通过歌曲id获取歌词
export function reqGetLyricById(id) {
  return request({
    url: '/lyric',
    params: { id }
  })
}

// 获取歌单评论
export function reqGetCommentById(id, pageNo = 1) {
  const offset = (pageNo - 1) * 20
  return request({
    url: '/comment/music',
    params: { id, offset }
  })
}

// 根据id获取歌曲详情
export function reqGetSongDetailById(ids) {
  return request({
    url: '/song/detail',
    params: { ids }
  })
}

// 根据id获得相似音乐
export function reqGetSimilarSong(id) {
  return request({
    url: '/simi/song',
    params: { id }
  })
}

// 根据id获取相似歌单
export function reqGetSimilarPlayList(id) {
  return request({
    url: '/simi/playlist',
    params: { id }
  })
}

