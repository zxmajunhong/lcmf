<template>
  <div class="container">
      <div class="tab-content">
        <div class="table-area">
          <div class="table">
            <div class="tr title">
              <div class="td">证券代码</div>
              <div class="td">证券名称</div>
              <div class="td">持仓数量(调仓前)</div>
              <div class="td">交易</div>
              <div class="td">持仓数量(调仓后)</div>
            </div>
            <div class="tr" v-for ="info in buyList" :key="info.key">
              <div class="td">{{info.code}}</div>
              <div class="td">{{info.etfName}}</div>
              <div class="td">{{info.before}}</div>
              <div class="td">{{info.deal}}</div>
              <div class="td">{{info.after}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>  
</template>
<script>
import {getChangeDetail} from '@/utils/model';
export default {
  data() {
    return {
      buyList: [],
      sellList: []
    }
  },
  onShow() {
    console.log('a', 1);
    const date = this.$root.$mp.query.date || 0;
    getChangeDetail(date).then(res => {
      this.buyList = res.buyList;
      this.sellList = res.sellList;
    })
  }
}
</script>


<style lang="less" scoped>
.table-area {
  background-color: #fff;
  .table {
    width: 100%;
    font-size: 14rpx;
    color: #424242;
    .tr {
      width: 100%;
      display: flex;
      .td {
        flex: 0 0 33%;
        text-align: center;
      }
    }
  }
}

</style>
