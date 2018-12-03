<template>
  <div class="box" :class="className">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['className']
}
</script>
<style lang="less">
  .box {
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
</style>
