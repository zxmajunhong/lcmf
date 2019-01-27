/**
 * 相关模型请求方法
 */

import http from './http';
const fun = {};

fun.getHomeData = () => {
  return http.get('/index/game');
};

console.log(fun);

export default fun;
