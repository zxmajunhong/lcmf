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

export function getComposeDetail(id, flag) {
  return http.get(`/index/games/${id}/${flag}`).then(res => res.data);
}

export function getUserInfo() {
  return http.get('/user/info').then(res => res.data);
}

export function postLogin(code, userInfo, signature, rawData, iv, encryptedData) {
  return http.post('/wechat/login', {code, userInfo, signature, rawData, iv, encryptedData}).then(res => res.data);
}

// 获取咨询列表数据
export function getNotice(type, page=1) {
  return http.get(`/notice/info/${type}/${page}`).then(res => res.data);
}

// 获取咨询详情数据
export function getNoticeDetail(id) {
  return http.get(`/notice/info/${id}`).then(res => res.data);
}

export function checkUserRisk(maxLost, detest, dealRate){
  return http.post('/risk/check/user', {maxLost, detest, dealRate})
  .then(res => res.data);
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

//获取调仓记录
export function getInvestChangeLog(id, flag) {
  return http.get(`/user/change/log`).then(res => res.data);
}


//获取支付参数
export function getWxPayArgs(money) {
  return http.post(`order/url`, {money}).then(res => res.data);
}

//获取调仓详细信息
export function getChangeDetail(date) {
    return http.post(`user/change/detail`, {date}).then(res => res.data);
}

//获取投资时的投资组合信息
export function getInvestGroupInfo(groupId) {
  return http.post(`invest/info`, {groupId}).then(res => res.data);
}

//获取用户当前的金额
export function getUserMoney() {
  return http.get(`user/money`).then(res => res.data);
}


//用户更新投资组合
export function userChangeGroup() {
  return http.get(`invest/change/group`).then(res => res.data);
}
