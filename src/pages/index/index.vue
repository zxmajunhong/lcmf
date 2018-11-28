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
        <navigator :url="'/pages/index/main'" :hover-class="'none'" class="item">
          <i class="icon icon1"></i>
          <span class="txt">产品介绍</span>
        </navigator>
        <navigator :url="'/pages/index/main'" :hover-class="'none'" class="item">
          <i class="icon icon2"></i>
          <span class="txt">产品特点</span>
        </navigator>
        <navigator :url="'/pages/index/main'" :hover-class="'none'" class="item">
          <i class="icon icon3"></i>
          <span class="txt">新手指引</span>
        </navigator>
        <navigator :url="'/pages/index/main'" :hover-class="'none'" class="item">
          <i class="icon icon4"></i>
          <span class="txt">常见问题</span>
        </navigator>
      </div>
    </div>
    <div class="chosen-list">
      <div class="title-area">
        <span class="title">精选组合</span>
        <navigator :url="'/pages/index/main'" :hover-class="'none'" class="more">
          查看更多组合>
        </navigator>
      </div>
      <div class="box">
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
      </div>
      <div class="box">
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
      </div>
    </div>
    <div class="bottom-float">
      <navigator :url="'/pages/index/main'" :hover-class="'none'" class="check">查看我的投资</navigator>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfo: {},
      bannerList: ['/static/img/banner.png','/static/img/banner.png','/static/img/banner.png'],
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
  .box {
    width: 690rpx;
    height: 363rpx;
    background-color: #fff;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
    .box-title {
      height: 89rpx;
      line-height: 89rpx;
      border-bottom: 1rpx solid #e5e5e5;
      .title {
        line-height: 30rpx;
        font-size: 30rpx;
        color: #333333;
        border-left: 7rpx solid #4768f3;
        padding-left: 13rpx;
      }
    }
    .box-body {
      height: 186rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #e5e5e5;
      .item {
        width: 190rpx;
        margin: 0 20rpx;
        text-align: center;
        .value {
          font-size: 40rpx;
          color: #e74612;
          margin-bottom: 10rpx;
        }
        .key {
          font-size: 26rpx;
          color: #666666;
          margin-bottom: 10rpx;
        }
        .other {
          line-height: 36rpx;
          font-size: 24rpx;
          color: #000000;
          .icon {
            display: inline-block;
            width: 36rpx;
            height: 36rpx;
            line-height: 36rpx;
            text-align: center;
            border-radius: 50%;
            font-size: 24rpx;
            color: #fff;
            margin-left: 8rpx;
            &.low {
              background-color: #4dba2d;
            }
            &.middle {
              background-color: #ff9500;
            }
            &.hight {
              background-color: #ff6a59;
            }
          }
        }
      }
    }
    .box-bottom {
      height: 86rpx;
      display: flex;
      align-items: center;
      .tag {
        line-height: 44rpx;
        padding: 0 14rpx;
        font-size: 24rpx;
        color: #4768f3;
        border: 1rpx solid #6487ff;
        margin-left: 20rpx;
        border-radius: 8rpx;
      }
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
</style>
