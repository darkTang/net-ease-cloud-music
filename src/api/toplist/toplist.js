import request from '@/api/request'

// 获取所有榜单
export function reqGetAllTopList() {
  return request({
    url: '/toplist'
  })
}

// 获取所有榜单的内容摘要
export function reqGetAllTopListDetail() {
  return request({
    url: '/toplist/detail'
  })
}