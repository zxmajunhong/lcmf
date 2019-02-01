<template>
  <div class="container">
    <div class="balance-box">
      <div class="balance">
        F币余额：<span class="value">20.0</span>
      </div>
      <div class="echarge">充值</div>
    </div>
    <div class="title-area">
      <span class="title">F币交易记录：</span>
    </div>
    <div class="record-box">
      <div class="line">
        <div class="date">2018-11-12 12:00:00</div>
        <div class="desc">充值</div>
        <div class="value">+50.0</div>
      </div>
      <div class="line">
        <div class="date">2018-11-12 12:00:00</div>
        <div class="desc">充值</div>
        <div class="value">+50.0</div>
      </div>
      <div class="line">
        <div class="date">2018-11-12 12:00:00</div>
        <div class="desc">充值</div>
        <div class="value">+50.0</div>
      </div>
      <div class="line">
        <div class="date">2018-11-12 12:00:00</div>
        <div class="desc">充值</div>
        <div class="value">+50.0</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getFbRecord} from '@/utils/model';
export default {
  data() {
    return {
      recordList: [],
    }
  },
  onLoad() {
    getFbRecord().then(res => {
      console.log(res);
    })
  }
}
</script>


<style lang="less" scoped>
  .balance-box {
    width: 690rpx;
    height: 90rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 9rpx;
    margin: 30rpx 0 5rpx;
    .balance {
      font-size: 30rpx;
      color: #333333;
      margin-left: 30rpx;
      .value {
        color: #ff6a59
      }
    }
    .echarge {
      width: 126rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      font-size: 26rpx;
      color: #ffffff;
      background-color: #4768f3;
      border-radius: 25rpx;
      margin-right: 30rpx;
    }
  }
  .title-area {
    width: 690rpx;
    padding: 30rpx;
    .title {
      font-size: 30rpx;
      color: #333333;
      padding-left: 5rpx;
      border-left: 7rpx solid #4768f3;
    }
  }
  .record-box {
    width: 630rpx;
    padding: 0 30rpx;
    background-color: #fff;
    border-radius: 9rpx;
    margin-bottom: 30rpx;
    .line {
      width: 630rpx;
      height: 84rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 26rpx;
      color: #333333;
      position: relative;
      .date {
        flex: 0 0 325rpx;
        text-align: center;
      }
      .desc {
        flex: 1 0 auto;
      }
      .value {
        padding-right: 30rpx;
      }
    }
    .line + .line {
      border-top: 1rpx solid #e5e5e5;
    }
    .line::after {
      content: '>';
      color: #999999;
      position: absolute;
      top: 30rpx;
      right: 0;
    }
  }

</style>
