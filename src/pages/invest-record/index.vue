<template>
  <div class="invest-record">
    <div v-for="item in investRecord" :key="item">
      <div class="line">
        <div class="date">{{item.add_time}}</div>
        <div class="value in"><span v-if="item.money >= 0">+</span><span v-else>-</span>{{item.money}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getInvestRecord} from '@/utils/model';
export default {
  data() {
    return {
      investRecord: [],
    }
  },
  onLoad() {
    getInvestRecord().then(res => {
      console.log('获取投资记录', res);
      this.investRecord = res.list;
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
