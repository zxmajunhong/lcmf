<template>
  <div class="container">
    <div class="balance-box">
      <div class="balance">
         <p class="txt">最新调仓：<span v-if="newChange != ''">{{newChange}}></span><span v-else>暂无</span></p>
            <p class="tips"  v-if="newChange != ''">
                您当期的调仓还未完成，点击去完成
          </p>
      </div>
    </div>
    <div class="title-area">
      <span class="title">调仓记录：</span>
    </div>
    <navigator :url="'/pages/change-detail/main?date=' + item.date" hover-class="none" v-for="item in investChangeList" :key="item.id" class="record-box">
      <div class="line">
        <div class="desc">{{item.etf_name}}</div>
        <div class="desc">{{item.etf_number}}</div>
        <div class="date">{{item.date}}</div>
      </div>
      </navigator>
  </div>
</template>
<script>
import {getInvestChangeLog} from '@/utils/model';
export default {
  data() {
    return {
      investChangeList: [],
      newChange: ''
    }
  },
  onShow() {
    getInvestChangeLog().then(res => {
      this.investChangeList = res.list;
      this.newChange = res.newChange;
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
