import request from '@/api/request'


// 输入搜索关键词，返回搜索建议
export function reqSearch(keywords) {
  return request({
    url: '/search/suggest',
    params: {keywords}
  })
}