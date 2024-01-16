import request from '@/utils/request'
export function GetAll() {
  return request({
    url: '/department/GetAll',
    method: 'get'
  })
}
export function Add(data) {
  return request({
    url: '/department/Add',
    method: 'post',
    data
  })
}
export function Del(data) {
  return request({
    url: '/department/Del',
    method: 'delete',
    data
  })
}
export function UpData(data) {
  return request({
    url: '/department/UpData',
    method: 'put',
    data
  })
}
export function GetPersonnel() {
  return request({
    url: '/personnel/GetAll',
    method: 'get'
  })
}
