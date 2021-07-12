import request from '@/utils/request.js'

// 获取所有的广告位及其对应的广告
export const getAllAds = params => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params
  })
}

// 分页获取课程
export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/front/course/getQueryCourses',
    data
  })
}

// 获取已购课程
export const getPurchaseCourse = () => {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse'
  })
}

// 获取课程详情
export const getCourseById = params => {
  return request({
    method: 'GET',
    url: '/front/course/getCourseById',
    params
  })
}
