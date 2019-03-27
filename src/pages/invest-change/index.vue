<template>
  <div class="invest-record">
    <div v-for="item in investChangeList" :key="item">
      <div class="line">
        <div class="date">{{item.etf_name}}</div>
        <div class="value in">>{{item.etf_number}}</div>
        <div class="value in">>{{item.date}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getInvestChangeLog} from '@/utils/model';
export default {
  data() {
    return {
      investChangeList: [],
    }
  },
  onShow() {
    getInvestChangeLog().then(res => {
      console.log('获取调仓记录', res);
      this.investChangeList = res.list;
    })
  }
}
</script>


<style lang="less" scoped>
.invest-record {
  display: flex;
  flex-direction: column;
  padding: 0 40rpx;
  background-color: #fff;
  .line {
    display: flex;
    height: 82rpx;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    color: #333333;
    .in {
      color: #ff6a59;
    }
    .out {
      color: #4dba2d;
    }
  }
  .line + .line {
    border-top: 1rpx solid #e5e5e5;
  }
}
</style>
