<template>
<div class="container">
    <div class="invest-box">
      <div class="total-line">
      </div>
      <div class="explain-line">
      </div>
      <div class="oper-line">
        <div class="input-area">
          <input type="text" class="invest-value" v-model="changeMoney">
          <span class="unit">元</span>
        </div>
        <div class="invest-submit" @click="checkRechage">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getWxPayArgs} from '@/utils/model';
export default {
  methods: {
    checkRechage(){
        var money = this.changeMoney;
        wx.showModal({showCancel:true, title:'确认充值', success(){
              getWxPayArgs(money).then(res => {
                if (res.code == 10000) {
                  wx.requestPayment({
                    timeStamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    'success': function (res) {
                      that.afterPaySuccess(ret.data.orderID);
                    },
                    'fail': function (res) {
                      console.log(res);
                    }
                  })  
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none',
                  })
                }
              })
            }})
    }
  }
}
</script>


<style lang="less" scoped>
  .invest-box {
    color: #333333;
    margin-bottom: 20rpx;
    .total-line {
      font-size: 32rpx;
      margin-bottom: 20rpx;
      .value {
        color: #e74612;
      }
    }
    .explain-line {
      font-size: 28rpx;
    }
    .oper-line {
      display: flex;
      margin: 40rpx 0 40rpx 0;
      .mpvue-picker {
        width: 200rpx;
        height: 50rpx;
        border-radius: 8rpx;
        border: 1rpx solid #999999;
        margin-right: 10rpx;
        line-height: 50rpx;
        position: relative;
        .value {
          height: 50rpx;
          line-height: 50rpx;
          font-size: 30rpx;
          color: #e74612;
          padding-left: 30rpx;
        }
      }
      .mpvue-picker::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-top: 10rpx solid #999;
        border-left: 8rpx solid transparent;
        border-right: 8rpx solid transparent;
        position: absolute;
        top: 20rpx;
        right: 10rpx;
      }
      .input-area {
        display: flex;
        align-items: baseline;
        font-size: 24rpx;
        color: #333;
        margin-right: 20rpx;
        .invest-value {
          width: 200rpx;
          height: 50rpx;
          padding-right: 20rpx;
          border: 1rpx solid #999999;
          border-radius: 8rpx;
          text-align: right;
          font-size: 28rpx;
          color: #333;
          margin-right: 10rpx;
        }

      }
      .invest-submit {
        width: 98rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        border-radius: 25rpx;
        font-size: 24rpx;
        color: #fff;
        background-color: #4768f3;
        margin-top: 2rpx;
      }
    }
  }
  .record-redirect {
    width: 100%;
    padding-top: 50rpx;
    display: flex;
    justify-content: space-between;
    font-size: 32rpx;
    color: #333333;
    background-color: #fff;
    .title {
      margin-left: 40rpx;
    }
    .arrow {
      margin-right: 40rpx;
    }
  }
</style>
