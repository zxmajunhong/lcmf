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
