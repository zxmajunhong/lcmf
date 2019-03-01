/**
 * 相关模型请求方法
 */

import http from './http';

export function getHomeData () {
  return http.get('/index/game').then(res => res.data);
}

export function getComposeList() {
  return http.get('/index/games').then(res => res.data);
}

export function getComposeDetail(id) {
  return http.get(`/index/games/${id}`).then(res => res.data);
}

export function getUserInfo() {
  return http.get('/user/info').then(res => res.data);
}

export function postLogin(code, userInfo, signature, rawData, iv, encryptedData) {
  return http.post('/wechat/login', {code, userInfo, signature, rawData, iv, encryptedData}).then(res => res.data);
}

export function getNotice(type, page=1) {
  return http.get(`/notice/info/${type}/${page}`).then(res => res.data);
}

export function postRisk(maxLost, detest, dealRate) {
  return http.post('/risk/do', {
    maxLost,
    detest,
    dealRate
  }).then(res => res.data);
}

export function getFbRecord(page=1) {
  return http.post('/user/account/log', {page})
    .then(res => res.data);
}

export function getInvestRecord(page=1) {
  return http.post('/user/invest/log', {page})
    .then(res => res.data);
}

// 获取用户的投资数据
export function getUserInvestMoney(){
  return http.post('/user/game/info')
  .then(res => res.data);
}

// 检查组合是否能投资
export function checkUserInvest(groupId){
  return http.post('/user/game/check', {groupId})
  .then(res => res.data);
}

// 确认提交投资数据
export function postUserInvest(groupId, money, type){
  return http.post('/user/game/do', {groupId, money, type})
  .then(res => res.data);
}

// 获取用户资产明细数据
export function getAssetsDetail() {
  return http.get('/user/detail')
    .then(res => res.data);
}
