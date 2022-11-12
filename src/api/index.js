import request from './request'
import {get,post} from './request'
const userid = parseInt(localStorage.getItem('userid'))
const access_token = localStorage.getItem('access_token')
export const reqSwiper = () => get('/yixun/index/indeximg')
export const reqProjectPost = p => post('/yixun/project/postProject_details', p)
export const reqLogin = () =>get('/yixun/users/login')
export const reqGetAllProject = () => get('/yixun/project/getAllProject')//ok
export const reqProjectDetail = () => get('/yixun/projectdetail')//ok
export const reqCollectDetail = () => get(`/yixun/collection/getColleDetail/${parseInt(localStorage.getItem('userid'))}`)
export const reqUser = p => post('/yixun/user/me', p)
export const reqLogOut = p => post('/yixun/users/logout', p)
export const reqGetUserInfo = () => post('/yixun/users/getUserInfo', p)
export const reqCheckToken = p => post('/yixun/users/checkToken', p)
export const reqPublish = () => get(`/yixun/project/getPersonProject/${parseInt(localStorage.getItem('userid'))}`)

