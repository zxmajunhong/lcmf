/* eslint-disable */


const Fly = require('flyio/dist/npm/wx');

const fly = new Fly();

const loginFly = new Fly(); // 登录使用的请求实例

const ajaxServer = 'https://flzt.czstep.com';
// const ajaxServer = 'http://192.168.11.155:92/index.php';


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
  console.log('request', request);
  if (request.url === '/index/game' || request.url === '/wechat/login') {
    // 请求首页数据的时候直接放行 和登录接口的时候直接放行
    return request;
  }
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
    }else {
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
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: true,
            success: (userData) => {
              wx.login({
                success: (wxlogin) => {
                  loginFly.post('/wechat/login', {
                    code: wxlogin.code,
                    userInfo: userData.userInfo,
                    signature: userData.signature,
                    rawData: userData.rawData,
                    iv: userData.iv,
                    encryptedData: userData.encryptedData,
                  }).then((r) => {
                    wx.setStorageSync('x_token', r.data.token);
                    wx.setStorageSync('uid', r.data.uid);
                    resolve(r.data.token);
                  })
                },
                fail: (loginErr) => {
                  console.log('微信登录失败', loginErr);
                }
              })
            },
            fail: (err) => {
              console.log('获取用户信息失败', err);
              // 跳转到首页
              wx.switchTab({
                url: '/pages/index/main'
              });
            }
          })
        } else {
          // 没有授权跳转到首页
          wx.switchTab({
            url: '/pages/index/main'
          });
        }
      }
    });
  })
}

fly.login = login;
// return fly;
export default fly;
