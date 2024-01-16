import request from '@/utils/request'
export function GetAll() {
  return request({
    url: '/registration/GetAll',
    method: 'get'
  })
}
export function Add(data) {
  return request({
    url: '/registration/Add',
    method: 'post',
    data
  })
}
export function SelectById(data) {
  return request({
    url: '/registration/SelectById' + '?idCard=' + data,
    method: 'get'
  })
}
export function Del(data) {
  return request({
    url: '/registration/Del',
    method: 'delete',
    data
  })
}
export function UpData(data) {
  return request({
    url: '/registration/UpData',
    method: 'put',
    data
  })
}
export function GetDepartment() {
  return request({
    url: '/department/GetAll',
    method: 'get'
  })
}

export function GetPersonnel() {
  return request({
    url: '/personnel/GetAll',
    method: 'get'
  })
}

