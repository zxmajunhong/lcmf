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
