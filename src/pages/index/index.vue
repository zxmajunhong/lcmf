<template>
  <div class="container">
    <div class="top">
      <div class="banner-area">
        <swiper :autoplay="true" :indicator-dots="true" :indicator-color="'#7f7f7f'" :indicator-active-color="'#fff'">
          <swiper-item v-for="item in bannerList" :key="item">
            <image :src="item" class="slide-image" />
          </swiper-item>
        </swiper>
      </div>
      <div class="explain-area">
        <navigator url="/pages/description/main" :hover-class="'none'" class="item">
          <i class="icon icon1"></i>
          <span class="txt">产品介绍</span>
        </navigator>
        <navigator url="/pages/feature/main" :hover-class="'none'" class="item">
          <i class="icon icon2"></i>
          <span class="txt">产品特点</span>
        </navigator>
        <div class="item" @click="redirectFind(2)">
          <i class="icon icon3"></i>
          <span class="txt">新手指引</span>
        </div>
        <div class="item"  @click="redirectFind(3)">
          <i class="icon icon4"></i>
          <span class="txt">常见问题</span>
        </div>
      </div>
    </div>
    <div class="chosen-list">
      <div class="title-area">
        <span class="title">精选组合</span>
        <div class="more" @click="redirectComposeList">
          查看更多组合>
        </div>
      </div>
      <navigator :url="'/pages/compose-detail/main?id=' + item.id" hover-class="none" v-for="item in investList" :key="item.id">
        <div class="common-box product">
          <div class="box-title">
            <span class="title">{{item.name}}</span>
          </div>
          <div class="box-body">
            <div class="item">
              <p class="value">{{item.annual_income}}</p>
              <p class="key">预期年化收益</p>
              <p class="other">
                亏损厌恶度:<span class="icon middle">{{item.detest}}</span>
              </p> 
            </div>
            <div class="item">
              <p class="value">{{item.max_lost}}</p>
              <p class="key">最大可能亏损</p>
              <p class="other">
                最大亏损:<span class="icon middle">{{item.max_lose}}</span>
              </p>
            </div>
            <div class="item">
              <p class="value">{{item.risk_return_ratio}}</p>
              <p class="key">收益风险比</p>
              <p class="other">
                交易频率:<span class="icon hight">{{item.deal_rate}}</span>
              </p>
            </div>
          </div>
        </div>
      </navigator>
    </div>
    <div class="bottom-float">
      <div class="check" @click="redirectPersonal">查看我的投资</div>
    </div>
    <div class="bg-cover" v-if="login || review">
      <div class="login-box" v-show="login">
        <a class="close" @click="login=false"></a>
        <a class="cancel" @click="login=false"></a>
        <button class="sure" open-type="getUserInfo" @getuserinfo="updateUserinfo" hover-class="none"></button>
      </div>
      <div class="review-box" v-show="review">
        <a class="close" @click="review=false"></a>
        <a class="cancel" @click="review=false"></a>
        <a class="sure" @click="reviewPost"></a>
      </div>
    </div>
  </div>
</template>

<script>
import {getHomeData, postLogin} from '@/utils/model';

export default {
  data () {
    return {
      userInfo: {},
      bannerList: ['/static/img/banner.png','/static/img/banner.png','/static/img/banner.png'],
      investList: [],
      login: false, // 显示登录弹窗
      review: false, // 显示风险测评弹窗
    }
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    loginPost(userInfo, signature, rawData, iv, encryptedData) {
      const vthis = this;
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            postLogin(res.code, userInfo, signature, rawData, iv, encryptedData)
            .then((res) => {
              console.log('登陆成功', res);
              vthis.login = false;
            })
            .catch(err => {
              vthis.login = false;
              console.log('登陆失败', err);
            });
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail() {
          console.log('接口调用失败');
        }
      })
    },
    reviewPost() {
      console.log('风险测评方法');
    },
    // 跳转到发现中
    redirectFind(i) {
      this.globalData.findTabIndex = i;
      wx.switchTab({
        url: '/pages/find/main'
      });
    },
    redirectComposeList() {
      wx.switchTab({
        url: '/pages/compose-list/main'
      })
    },
    // 跳转到个人中心
    redirectPersonal() {
      console.log('跳转');
      wx.switchTab({
        url: '/pages/my/main'
      });
    },
    updateUserinfo(e) {
      console.log('获取用户信息', e);
      const getUserinfo = e.mp.detail;
      if (getUserinfo) {
        this.loginPost(getUserinfo.userInfo, getUserinfo.signature, getUserinfo.rawData, getUserinfo.iv, getUserinfo.encryptedData);
      } else {
        console.log('获取用户信息失败');
      }
    },
  },
  onLoad() {
    getHomeData().then(res => {
      if (res.bannerList.length > 0) {
        this.bannerList = res.bannerList;
      }
      this.investList = res.investList;
    });

    // 判断用户是否授权，没有授权弹出登陆提示框，授权直接请求登陆
    const vthis = this;
    wx.getSetting({
      success(res) {
        console.log('检查授权', res);
        if (res.authSetting['scope.userInfo']) {
          // 调用登陆方法
          console.log('已经授权');
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              console.log('获取用户信息', res);
              vthis.loginPost(res.userInfo, res.signature, res.rawData, res.iv, res.encryptedData);
            },
            fail: function (err) {
              console.log('获取用户信息失败', err);
            }
          })
        } else {
          vthis.login = true;
        }
      }
    });
  }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 100%;
  border-bottom: 1rpx solid #e5e5e5;
  margin-bottom: 15rpx;
  .banner-area {
    width: 710rpx;
    height: 334rpx;
    margin-bottom: 30rpx;
    swiper {
      height: 334rpx;
    }
    .slide-image {
      width: 710rpx;
      height: 334rpx;
    }
  }
  .explain-area {
    width: 660rpx;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25rpx;
    .item {
      display: flex;
      width: 105rpx;
      height: 130rpx;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .icon {
        display: block;
        width: 80rpx;
        height: 80rpx;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: cover;
        &.icon1 {
          background-image: url(./img/icon1.png);
        }
        &.icon2 {
          background-image: url(./img/icon2.png);
        }
        &.icon3 {
          background-image: url(./img/icon3.png);
        }
        &.icon4 {
          background-image: url(./img/icon4.png);
        }
      }
      .txt {
        font-size: 26rpx;
        color: #000;
      }
    }
  }
}

.chosen-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;
  .title-area {
    width: 690rpx;
    height: 72rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 32rpx;
      color: #000;
      font-weight: bold;
      padding-left: 10rpx;
    }
    .more {
      font-size: 24rpx;
      color: #4768f3;
    }
  }

}

.bottom-float {
  width: 750rpx;
  height: 80rpx;
  background-color: #383b4a;
  position: fixed;
  bottom: 0;
  .check {
    width: 205rpx;
    height: 46rpx;
    line-height: 46rpx;
    text-align: center;
    font-size: 26rpx;
    color: #ffffff;
    background-color: #4768f3;
    border-radius: 23rpx;
    position: absolute;
    top: 17rpx;
    right: 30rpx;
  }
}

.bg-cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter:progid:DXImageTransform.Microsoft.gradient(enabled="true", startColorstr="#CC999999", endColorstr="#CC999999");
  background-color:rgba(153,153,153,0.8);
}

:root .bg-cover {
  filter: none;
}

.login-box {
  width: 502rpx;
  height: 575rpx;
  background: url(./img/login_bg.png) no-repeat 0 0;
  background-size: cover;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -288rpx 0 0 -251rpx;
  .close {
    display: block;
    width: 37rpx;
    height: 37rpx;
    position: absolute;
    top: 57rpx;
    right: 0;
  }
  .cancel {
    display: block;
    width: 180rpx;
    height: 60rpx;
    position: absolute;
    top: 484rpx;
    left: 40rpx;
  }
  .sure {
    display: block;
    width: 180rpx;
    height: 60rpx;
    position: absolute;
    top: 484rpx;
    left: 280rpx;
    background-color: transparent;
    border: none;
  }
  .sure::after {
    border: none;
  }
}

.review-box {
  width: 502rpx;
  height: 561rpx;
  background: url(./img/review_bg.png) no-repeat 0 0;
  background-size: cover;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -280rpx 0 0 -251rpx;
  .close {
    display: block;
    width: 37rpx;
    height: 37rpx;
    position: absolute;
    top: 57rpx;
    right: 0;
  }
  .cancel {
    display: block;
    width: 180rpx;
    height: 60rpx;
    position: absolute;
    top: 470rpx;
    left: 40rpx;
  }
  .sure {
    display: block;
    width: 180rpx;
    height: 60rpx;
    position: absolute;
    top: 470rpx;
    left: 280rpx;
  }
}
</style>
