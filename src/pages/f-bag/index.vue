<template>
  <div class="container">
    <div class="balance-box">
      <div class="balance">
        F币余额：<span class="value">{{userF}}</span>
      </div>
      <div class="echarge">充值</div>
    </div>
    <div class="title-area">
      <span class="title">F币交易记录：</span>
    </div>
    <div class="record-box" v-for="item in recordList" :key="item">
      <div class="line">
        <div class="date">{{item.add_time}}</div>
        <div class="desc">{{item.type_name}}</div>
        <div class="value"><span v-if="item.user_f < 0">-</span>{{item.user_f}}</div>
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
      userF: 0
    }
  },
  onLoad() {
    getFbRecord().then(res => {
      //console.log(res);
      this.recordList = res.list;
      this.userF = res.userF;
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
