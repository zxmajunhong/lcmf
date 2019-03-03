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
          <mpvue-picker ref="mpvuePicker" mode="selector"  @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
        </div>
        <div class="input-area">
          <input type="text" class="invest-value" v-model="changeMoney">
          <span class="unit">元</span>
        </div>
        <div class="invest-submit" @click="checkInvest">确定</div>
      </div>
    </div>
    <navigator :url="'/pages/invest-record/main'" :hover-class="none" class="record-redirect">
      <span class="title">出入金记录</span>
      <span class="arrow">></span>
    </navigator>
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
      pickerValue: {label: '入金', value: 1},
      pickerValueArray: [
        {label: '入金', value: 1},
        {label: '出金', value: 2},
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
    checkInvest() {
      checkUserInvest(this.$root.$mp.query.groupId)
        .then((res) => {
          if (res.code === 10001) {
            this.showModal('您还未做风险测评，现在去做吗？', () => {
              wx.reLaunch('/pages/risk-assessment/main');
            });
          } else {
            this.showModal(res.msg, () => {
              postUserInvest(this.$root.$mp.query.groupId, this.changeMoney, this.pickerValue.value)
                .then((postRes) => {
                  wx.showToast({
                    title: postRes.msg,
                    icon: 'none',
                    mask: true,
                  })
                })
            })
          }
        })
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
    changeMoney(val) {
      const changeMoney = Number(this.changeMoney);
      if (!changeMoney) {
        this.changeMoney = 0;
      }
      if (this.pickerValue.value == 1) {
        this.money = Number(this.initMoney) + changeMoney;
      } else {
        this.money = Number(this.initMoney) - changeMoney;
      }
    },
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
  },
  onShow() {
    getUserInvestMoney().then(res => {
      this.money = res.money;
      this.initMoney = res.money;
    })
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
