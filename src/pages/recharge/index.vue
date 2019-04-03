<template>
<div class="container">
    <div class="recharge-box">
      <div class="total-line">
        我的金币：<span class="count">{{money}}</span>
      </div>
      <div class="select-area">
        <div class="item" v-for="(item, idx) in selectArry" :key="item" :class="{'cur': selectIndex == idx}" @click="itemSelect(idx)">
          <div class="count">{{item.count}}金币</div>
          <div class="price">售价：{{item.price}}元</div>
        </div>
      </div>
      <div class="oper-line">
        <div class="customer">
          <span>自定义：</span><input type="text" class="recharge-customer" placeholder="金币数量" @click="inputClick" @blur="getNums" v-model="inputVal">
        </div>
        <div class="recharge-submit" @click="checkRechage">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getUserMoney, getWxPayArgs} from '@/utils/model';
export default {

  data() {
    return {
      money: 0,
      selectArry: [{count: 10, price: 10.0}, {count: 30, price: 30.0}, {count: 50, price: 49.0}, {count: 100, price: 95.0}, {count: 200, price: 180.0}, {count: 500, price: 425.0}],
      selectIndex: -1, // 选择第几个
      rechargeNums: 0, // 兑换数量
      inputVal: '', // 自定义数量
    }
  },

  methods: {
    itemSelect(i) {
      this.selectIndex = i;
      this.rechargeNums = this.selectArry[i].count;
    },
    inputClick() {
      this.selectIndex = -1;
      this.rechargeNums = 0;
    },
    // 获取输入框的值
    getNums() {
      this.rechargeNums = this.inputVal;
    },
    checkRechage(){
      const val = this.rechargeNums;
      if (!val) {
        wx.showToast({
          title: '请选择或者输入金币数量',
          icon: 'none',
        });
        return false;
      }
      wx.showModal({
        showCancel: true,
        title:`确认充值${val}金币吗？`,
        success(res){
          if (res.confirm) {
            getWxPayArgs(val).then(res => {
              if (res.code == 10000) {
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success: function (res) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      success: () => {
                        setTimeout(() => {
                          wx.navigateBack({
                            delta: 1,
                          });
                        }, 1600);
                      }
                    });
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: res.msg,
                      icon: 'none',
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                })
              }
            })
          };
        }})
    }
  },
  onShow() {
    getUserMoney().then(res => {
      this.money = res.money;
    })
  }
}
</script>


<style lang="less" scoped>
.recharge-box {
  width: 100%;
  background-color: #fff;
  .total-line {
    line-height: 50rpx;
    border-bottom: 1rpx solid #dfdfdf;
    font-size: 30rpx;
    padding: 0 20rpx;
    .count {
      color: #e74612;
    }
  }
  .select-area {
    padding: 20rpx;
    height: 250rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      flex:0 0 30%;
      height:100rpx;
      border:1rpx solid #dfdfdf;
      margin:10rpx 0;
      text-align:center;
      font-size:28rpx;
      border-radius:8rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .price {
        font-size: 26rpx;
      }
      &.cur {
        border-color: #4768f3;
      }
    }
  }
  .oper-line {
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    .customer {
      font-size: 28rpx;
      display: flex;
      align-items: center;
      .recharge-customer {
        width: 200rpx;
        height: 50rpx;
        padding: 0 10rpx;
        border: 1rpx solid #999999;
        border-radius: 8rpx;
        font-size: 26rpx;
        color: #333;
        margin-left: 10rpx;
      }
    }
    .recharge-submit {
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
</style>
