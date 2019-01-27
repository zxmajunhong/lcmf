/* eslint-disable */


const Fly = require('flyio/dist/npm/wx');

const fly = new Fly();

const loginFly = new Fly(); // 登录使用的请求实例

const ajaxServer = 'http://flzt.czstep.com';

// 配置请求基地址
fly.config.baseURL = ajaxServer;
loginFly.config.baseURL = ajaxServer;
// fly.config.timeout = 5000;
// 是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
// fly.config.parseJson=true
fly.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
fly.interceptors.request.use(request => {
  // 请求加上登录token
  let x_token = wx.getStorageSync('x_token');
  if (!x_token) {
    // 没有拿到token，请求后台重新获取
    // 锁定当天实例，后续请求会在拦截器外排队
    fly.lock();
    return login().then(t => {
      request.headers.token = t;
      return request;
    }).finally(() => {
      fly.unlock();
    });
  } else {
    request.headers.token = x_token;
  }

});

// 响应拦截器
fly.interceptors.response.use(
  (response) => {
    console.log(response);
    const data = response.data || {};
    if (data.code == 20000) {
      // 未登录
      console.warn('登录失效或未登录，重新获取登录token');
      // 不弹出登录失效对话框，直接获取登录状态
      // 清除本地缓存的用户信息相关数据
      wx.clearStorageSync();
      const currentPages = getCurrentPages(); /* eslint-disable-line */
      currentPages[currentPages.length - 1].onLoad();
      // wx.showModal({showCancel:false,title:'错误提示',content:'登录失效',success(){
      //   // 先清除本地存储的token值等
      //   wx.removeStorageSync('x_token');
      //   const currentPages = getCurrentPages(); /* eslint-disable-line */
      //   currentPages[currentPages.length - 1].onLoad();
      // }})
    } else {
      return response;
    }
  }
  ,
  (err) => {
    console.log(err);
    // 发生网络错误后会走到这里
    // return Promise.resolve("ssss")
  },
);

// 定义登录方法
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        console.log('wxlogin', res);
        // 获取用户信息(已经授权的前提)
        wx.getUserInfo({
          withCredentials: true,
          success: userData => {
            // 调用登录方法
            userData.bid = bid;
            userData.code = res.code;
            loginFly.post('/wechat/min/login', userData, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
            .then(r => {
              console.log('请求登录', r);
              wx.setStorageSync('x_token', r.data.token);
              wx.setStorageSync('uid', r.data.uid);
              resolve(r.data.token);
            })
            .catch(e => {
              console.error('请求登录失败', e);
              reject(e.data);
            })
          },
          fail: () => {
            console.error('获取用户信息失败');
            // 跳转到登录授权页面
            wx.reLaunch({
              url: '/pages/login/main',
            });
          }
        });
      },
      fail: res => {
        // 微信的登录失败提示
        console.error(res.errMsg);
      }
    })
  })
}

fly.login = login;
// return fly;
export default fly;
