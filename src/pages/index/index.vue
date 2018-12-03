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
        <navigator :url="'/pages/index/main'" :hover-class="'none'" class="more">
          查看更多组合>
        </navigator>
      </div>
      <box :class-name="'product'">
        <div class="box-title">
          <span class="title">我的组合</span>
        </div>
        <div class="box-body">
          <div class="item">
            <p class="value">+10.0%</p>
            <p class="key">预期年化收益</p>
            <p class="other">
              亏损厌恶度:<span class="icon middle">中</span>
            </p>
          </div>
          <div class="item">
            <p class="value">5.0%</p>
            <p class="key">最大可能亏损</p>
            <p class="other">
              收益偏好:<span class="icon middle">中</span>
            </p>
          </div>
          <div class="item">
            <p class="value">2.00</p>
            <p class="key">预期年化收益</p>
            <p class="other">
              收益频率:<span class="icon hight">高</span>
            </p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="tag">量身定制</div>
          <div class="tag">组合分散</div>
          <div class="tag">回撤控制</div>
          <div class="tag">智能调仓</div>
        </div>
      </box>
      <box :class-name="'product'">
        <div class="box-title">
          <span class="title">我的组合</span>
        </div>
        <div class="box-body">
          <div class="item">
            <p class="value">+10.0%</p>
            <p class="key">预期年化收益</p>
            <p class="other">
              亏损厌恶度:<span class="icon middle">中</span>
            </p>
          </div>
          <div class="item">
            <p class="value">5.0%</p>
            <p class="key">最大可能亏损</p>
            <p class="other">
              收益偏好:<span class="icon middle">中</span>
            </p>
          </div>
          <div class="item">
            <p class="value">2.00</p>
            <p class="key">预期年化收益</p>
            <p class="other">
              收益频率:<span class="icon hight">高</span>
            </p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="tag">量身定制</div>
          <div class="tag">组合分散</div>
          <div class="tag">回撤控制</div>
          <div class="tag">智能调仓</div>
        </div>
      </box>
      <box :class-name="'product'">
        <div class="box-title">
          <span class="title">智能增长 Ⅰ 型</span>
        </div>
        <div class="box-body">
          <div class="item">
            <p class="value">+14.0%</p>
            <p class="key">预期年化收益</p>
            <p class="other">
              亏损厌恶度:<span class="icon low">低</span>
            </p>
          </div>
          <div class="item">
            <p class="value">8.0%</p>
            <p class="key">最大可能亏损</p>
            <p class="other">
              收益偏好:<span class="icon middle">中</span>
            </p>
          </div>
          <div class="item">
            <p class="value">1.75</p>
            <p class="key">预期年化收益</p>
            <p class="other">
              收益频率:<span class="icon hight">高</span>
            </p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="tag">高风险收益比</div>
          <div class="tag">组合分散</div>
          <div class="tag">回撤控制</div>
          <div class="tag">智能调仓</div>
        </div>
      </box>
    </div>
    <div class="bottom-float">
      <navigator :url="'/pages/index/main'" :hover-class="'none'" class="check">查看我的投资</navigator>
    </div>
    <div class="bg-cover" v-if="login || review">
      <div class="login-box" v-show="login">
        <a class="close" @click="login=false"></a>
        <a class="cancel" @click="login=false"></a>
        <a class="sure" @click="loginPost"></a>
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
import Box from "@/components/box";

export default {
  components: { Box },
  data () {
    return {
      userInfo: {},
      bannerList: ['/static/img/banner.png','/static/img/banner.png','/static/img/banner.png'],
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
    loginPost() {
      console.log('登录方法');
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
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
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
