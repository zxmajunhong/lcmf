<script>
export default {
  // created () {
  //   // 调用API从本地缓存中获取数据
  //   const logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   console.log('app created and cache logs by setStorageSync')
  // },
}
</script>

<style lang="less">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #f6f6fa;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.common-box {
  width: 690rpx;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  .box-title {
    height: 89rpx;
    border-bottom: 1rpx solid #e5e5e5;
    display: flex;
    align-items: center;
    .title {
      line-height: 30rpx;
      font-size: 30rpx;
      color: #333333;
      border-left: 7rpx solid #4768f3;
      padding-left: 13rpx;
    }
  }
  // 默认的组合列表样式
  &.product {
    .box-body {
      height: 186rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
            line-height: 36rpx;
            text-align: center;
            border-radius: 50%;
            font-size: 24rpx;
            color: #e74612;
            margin-left: 8rpx;
          }
          .txt {
            font-size: 24rpx;
            margin-left: 4rpx;
            color: #e74612;
          }
        }
      }
    }
    .box-bottom {
      height: 86rpx;
      display: flex;
      align-items: center;
      border-top: 1rpx solid #e5e5e5;
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
</style>
