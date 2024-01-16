import request from '@/utils/request'
export function GetAll() {
  return request({
    url: '/position/GetAll',
    method: 'get'
  })
}
export function Add(data) {
  return request({
    url: '/position/Add',
    method: 'post',
    data
  })
}
export function Del(data) {
  return request({
    url: '/position/Del',
    method: 'delete',
    data
  })
}
export function UpData(data) {
  return request({
    url: '/position/UpData',
    method: 'put',
    data
  })
}

