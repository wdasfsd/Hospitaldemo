import request from '@/utils/request'
export function GetAll() {
  return request({
    url: '/personnel/GetAll',
    method: 'get'
  })
}
export function Add(data) {
  return request({
    url: '/personnel/Add',
    method: 'post',
    data
  })
}
export function Del(data) {
  return request({
    url: '/personnel/Del',
    method: 'delete',
    data
  })
}
export function UpData(data) {
  return request({
    url: '/personnel/UpData',
    method: 'put',
    data
  })
}

export function GetPosition() {
  return request({
    url: '/position/GetAll',
    method: 'get'
  })
}

export function GetDepartment() {
  return request({
    url: '/department/GetAll',
    method: 'get'
  })
}

