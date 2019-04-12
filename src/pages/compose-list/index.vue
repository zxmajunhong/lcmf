<template>
  <div class="container compose-list">
    <navigator :url="'/pages/compose-detail/main?id=' + item.id" hover-class="none" v-for="item in investList" :key="item.id">
      <div class="common-box product">
        <div class="box-title">
          <span class="title">{{item.name}}</span>
          <span class="tag" v-if="item.is_sample == 1">推荐</span>
        </div>
        <div class="box-body">
          <div class="item">
            <p class="value">{{item.annual_income}}</p>
            <p class="key">预期年化收益</p>
            <p class="other">
              亏损厌恶度:<span class="icon middle">中</span>
            </p>
          </div>
          <div class="item">
            <p class="value">{{item.max_lost}}</p>
            <p class="key">最大回撤</p>
            <p class="other">
              最大亏损:<span class="icon middle">{{item.max_lose}}</span>
            </p>
          </div>
          <div class="item">
            <p class="value">{{item.risk_return_ratio}}</p>
            <p class="key">风险收益比</p>
            <p class="other">
              交易频率:<span class="icon hight">高</span>
            </p>
          </div>
        </div>
        <!-- <div class="box-bottom">
          <div class="tag">量身定制</div>
          <div class="tag">组合分散</div>
          <div class="tag">回撤控制</div>
          <div class="tag">智能调仓</div>
        </div> -->
      </div>
    </navigator>
  </div>
</template>
<script>
import {getComposeList} from '@/utils/model';
export default {
  data() {
    return {
      investList: [],
    }
  },
  onShow() {
    getComposeList().then(res => {
      this.investList = res.investList;
    });
  }
}
</script>
<style lang="less" scoped>
.compose-list {
  padding-top: 20rpx;
  .product .box-title .tag {
    display: inline-block;
    width: 80rpx;
    height: 36rpx;
    text-align: center;
    line-height: 34rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    color: #e74612;
    background-color: #ffe0dc;
    border: 1rpx solid #ff6a59;
    margin-left: 19rpx;
    border-radius: 5rpx;
  }
}
</style>
