
<style lang="less" scoped>
  .fixed-box {
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
      height: 80rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;
      .customer {
        font-size: 35rpx;
        display: flex;
        align-items: center;
        .recharge-customer {
          width: 200rpx;
          height: 50rpx;
          padding: 0 10rpx;
          border: 1rpx solid #999999;
          border-radius: 8rpx;
          font-size: 35rpx;
          color: #333;
          margin-left: 10rpx;
        }
        .value{
          margin-left: 20rpx;
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
<template>
  <div class="compose-list">
    <div class="fixed-box">
      
      <div class="oper-line">
        <div class="customer">
          <span>定投状态</span>
          <div class="value" @click="showPicker">{{pickerValue.label}}</div>
          <mpvue-picker ref="mpvuePicker" mode="selector"  @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
        </div>
      </div>
      <div class="oper-line">
        <div class="customer">
          <span>提醒日期</span>
          <input type="text" class="recharge-customer" v-model="inputDay">
        </div>
      </div>
      <div class="oper-line">
        <div class="customer">
          <span>定投金额</span>
           <input type="text" class="recharge-customer" v-model="inputVal">
        </div>
      </div>
    </div>  
    <div class="total-line content">
        <div class=".buy-font">关注公众号获取第一手调仓信息</div>
        <div >
          <img src="http://img-flzt.czstep.com/banner/wechat.jpg" class="img"/>
        </div>
        <div class="">
           <span>扫描方法：截图并发送给自己的微信号，再长按识别图中二维码（产品使用过程中遇到任何问题，请联系微信号：flyinvest33）</span>
        </div>
        <div class="">
          <span>搜索公众号：<span class="buy-font">复来智投</span>也可以哦！</span>
        </div>
    </div>
  </div>
</template>
<script>
import mpvuePicker from 'mpvue-picker';
import {getUserInvestMoney, checkUserInvest, postUserInvest} from '@/utils/model';
export default {
  components: {
    mpvuePicker,
  },
  data() {
    return {
      initMoney: 0,
      money: 0,
      changeMoney: '',
      pickerValue: {label: '关闭', value: 1},
      pickerValueArray: [
        {label: '关闭', value: 1},
        {label: '开启', value: 2},
      ],
    }
  },
  methods: {
    // 选择出入金的确定
    onConfirm(e) {
      console.log('confirm', e);
      this.pickerValue.label = e.label;
      this.pickerValue.value = e.value[0];

    },
    // 显示选择框
    showPicker() {
      this.$refs.mpvuePicker.show();
    },
    // 显示对话框
    showModal(content, sFun) {
      wx.showModal({
        title: '提示',
        content,
        success(res) {
          if (res.confirm) {
            sFun();
          }
        }
      })
    }
  },
  watch: {
    pickerValue: {
      deep: true,
      handler(val) {
        const changeMoney = Number(this.changeMoney) || 0;
        if (val.value == 1) {
          this.money = Number(this.initMoney) + changeMoney;
        } else {
          this.money = Number(this.initMoney) - changeMoney;
        }
      }
    }
  }
}
</script>


