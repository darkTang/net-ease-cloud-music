import request from '@/api/request'

// 根据id获取mv的详情信息
export function reqGetMvDetailById(mvid) {
  return request({
    url: '/mv/detail',
    params: { mvid }
  })
}

// 获取 mv 点赞转发评论数数据
export function reqGetMvInfoById(mvid) {
  return request({
    url: '/mv/detail/info',
    params: { mvid }
  })
}

// 根据id获取mv播放地址
export function reqMvUrlById(id, r) {
  return request({
    url: '/mv/url',
    params: { id, r }
  })
}

// 获取mv评论
export function reqGetCommentById(id, pageNo = 1) {
  const offset = (pageNo - 1) * 20
  return request({
    url: '/comment/mv',
    params: { id, offset }
  })
}

// 根据id获取相似mv
export function reqGetSimiMv(mvid) {
  return request({
    url: '/simi/mv',
    params: {mvid}
  })
}