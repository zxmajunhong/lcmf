<template>
  <div class="container">
    <div class="total-line">
        {{showDate}}调仓指令（最新）
        <div class="adjust">
          (建议在{{nextDate}}开盘时完成交易)
        </div>
    </div>
    <div class="table-area">
      <div class="tr">
        <div class="col1 first">
        </div>
        <div class="col2">
          <div class="line title">
            <div class="item"><span>证券代码</span></div>
            <div class="item">证券名称</div>
            <div class="item" style="line-height: inherit;">持仓数量(调仓前)</div>
            <div class="item">交易</div>
            <div class="item" style="line-height: inherit;">持仓数量(调仓后)</div>
          </div>
        </div>
      </div>
      <div class="tr" v-if="buyList && buyList.length > 0">
        <div class="col1 sel">卖出</div>
        <div class="col2 sells">
          <div class="line" v-for="item in buyList" :key="item.id">
            <div class="item">{{item.code}}</div>
            <div class="item">{{item.etfName}}</div>
            <div class="item">{{item.before}}</div>
            <div class="item">{{item.deal}}</div>
            <div class="item">{{item.after}}</div>
          </div>
        </div>
      </div>
      <div class="tr" v-if="selList && selList.length > 0">
        <div class="col1 buy">买入</div>
        <div class="col2 buys">
          <div class="line" v-for="item in sellList" :key="item.id">
            <div class="item">{{item.code}}</div>
            <div class="item">{{item.etfName}}</div>
            <div class="item">{{item.before}}</div>
            <div class="item">{{item.deal}}</div>
            <div class="item">{{item.after}}</div>
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
      showDate: '',
      nextDate: '',
      buyList: [],
      sellList: []
    }
  },
  onShow() {
    const date = this.$root.$mp.query.date || 0;
    var tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate());
    var month = tmpDate.getMonth() + 1;
    var day = tmpDate.getDate();
    this.showDate = tmpDate.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);


    tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate() + 1);
    var month = tmpDate.getMonth() + 1;
    var day = tmpDate.getDate();
    this.nextDate = tmpDate.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
    getChangeDetail(date).then(res => {
      this.buyList = res.buyList;
      this.sellList = res.sellList;
    })
  }
}
function getFormatDate(arg) {
            if (arg == undefined || arg == '') {
                return '';
            }

            var re = arg + '';
            if (re.length < 2) {
                re = '0' + re;
            }

            return re;
        }
</script>


<style lang="less" scoped>
.total-line{
  margin: auto;
}
.adjust{
  margin-top:10px;
  margin-bottom: 10px;  
  color: gray;
  font-size: 26rpx;
}
.table-area {
  width: 100%;
  background-color: #fff;
  padding:0 10rpx;
  font-size: 26rpx;
  .tr {
    display: flex;
    align-items: stretch;
    justify-content: center;
    .col1 {
      flex: 1 0 6%;
      text-align: center;
      font-size: 32rpx;
      letter-spacing: 10rpx;
      padding: 10rpx 0;
      border: 1rpx solid #dfdfdf;

      font-weight: bold;
      &.sel {
        background-color: rgb(150, 228, 119);
        border-top: 0;
      }
      &.buy {
        background-color: rgb(224, 75, 75);
        border-top: 0;
      }
    }
    .col2 {
      flex: 1 0 94%;
      .line {
        display: flex;
        align-items:center;
        justify-content: center;
        .item {
          height: 50rpx;
          line-height: 50rpx;
          border: 1rpx solid #dfdfdf;
          border-top: 0;
          border-left: 0;
          flex: 1 0 20%;
          text-align: center;
          vertical-align: middle;
        }
        &.title {
         .item {
           font-weight: bold;
           font-size: 30rpx;
           height: 80rpx;
           line-height: 80rpx;
           border-top: 1rpx solid #dfdfdf;
         }
        }
      }
      &.buys {
        background-color:rgb(243, 119, 119);
        border-top: 0;
      }
      &.sells {
        background-color:rgb(189, 238, 170);
        border-top: 0;
      }
    }
  }
}

</style>
