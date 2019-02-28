<template>
  <div class="container">
    <div class="invest-box">
      <div class="total-line">
        您当前的总资产为：<span class="value">{{money}}</span>元
      </div>
      <div class="explain-line">
        我们将按新的总资产为您配置智能组合，并发送调仓指令。
      </div>
      <div class="oper-line">
        <div class="mpvue-picker">
          <div class="value" @click="showPicker">{{pickerValue.label}}</div>
          <mpvue-picker ref="mpvuePicker" mode="selector" :pickerValueDefault="pickerValue" @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
        </div>
        <div class="input-area">
          <input type="text" class="invest-value">
          <span class="unit">元</span>
        </div>
        <div class="invest-submit">确定</div>
      </div>
    </div>
    <div class="record-redirect">
      <span class="title">出入金记录</span>
      <span class="arrow">></span>
    </div>
  </div>
</template>
<script>
import mpvuePicker from 'mpvue-picker';
import {getUserInvestMoney} from '@/utils/model';
export default {
  components: {
    mpvuePicker,
  },
  data() {
    return {
      money: 0,
      pickerValue: {label: '入金', value: 1},
      pickerValueArray: [
        {label: '入金', value: 1},
        {label: '出金', value: 2},
      ],
    }
  },
  methods: {
    onConfirm(e) {
      this.pickerValue.label = e.label;
      this.pickerValue.value = e.value[0];
      console.log(e);
    },
    showPicker() {
      this.$refs.mpvuePicker.show();
    },
  },
  onLoad() {
    // getFbRecord().then(res => {
    //   //console.log(res);
    //   this.money = res.money;
    // })
  }
}
</script>


<style lang="less" scoped>
  .invest-box {
    background-color: #fff;
    padding: 50rpx 0 0 40rpx;
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
          color: #999999;
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
