import request from '@/utils/request'
export function GetByDepartment(data) {
  return request({
    url: '/registration/ByDepartment',
    method: 'post',
    data
  })
}
export function AddCasesList(data) {
  return request({
    url: '/CasesList/add',
    method: 'post',
    data
  })
}
