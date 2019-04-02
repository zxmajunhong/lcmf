<template>
  <div class="container">
    <div class="top-area">
      <div class="attr-box">
        <div class="item">
          <p class="value">{{composeInfo.annual_income}}</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            亏损厌恶度:<span class="v">{{composeInfo.detest}}</span>
          </p>
        </div>
        <div class="item">
          <p class="value">{{composeInfo.max_lost}}</p>
          <p class="key">最大回撤</p>
          <p class="other">
            最大亏损:<span class="v">{{composeInfo.max_lose}}</span>
          </p>
        </div>
        <div class="item">
          <p class="value">{{composeInfo.risk_return_ratio}}</p>
          <p class="key">收益风险比</p>
          <p class="other">
            交易频率:<span class="v">{{composeInfo.deal_rate}}</span>
          </p>
        </div>
      </div>
      <!-- <div class="review-result">
        <div class="title">
          <span class="txt">用户测评结果</span>
          <div class="review-again">重新测评</div>
        </div>
        <div class="content">
          <div class="item">
            <span class="key">亏损承受度:</span>
            <span class="value">9.0%</span>
          </div>
          <div class="item">
            <span class="key">亏损厌恶度:</span>
            <span class="value">低</span>
          </div>
          <div class="item">
            <span class="key">收益偏好:</span>
            <span class="value">中</span>
          </div>
          <div class="item">
            <span class="key">收益频率:</span>
            <span class="value">高</span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="main">
      <div class="tab-area">
        <div class="tab" :class="{'cur': tabIndex == 0}" @click="tabIndex = 0">组合配置</div>
        <div class="tab" :class="{'cur': tabIndex == 1}" @click="tabIndex = 1">业绩表现</div>
        <div class="tab" :class="{'cur': tabIndex == 2}" @click="tabIndex = 2">风险控制</div>
        <div class="tab"  :class="{'cur': tabIndex == 3}" @click="tabIndex = 3">资产配置</div>
      </div>
      <div class="each-content" v-if="tabIndex == 0">
        <compose-option :data="composeOptions" :money="perforExtendsData.userMoney" :updateTime="perforExtendsData.lastUpdateTime"/>
      </div>
      <div class="each-content" v-if="tabIndex == 1">
        <compose-perfor :data="composePerfor"/>
      </div>
      <div class="each-content" v-if="tabIndex == 2">
        <compose-risk :data="composeRisk" />
      </div>
      <div class="each-content" v-if="tabIndex == 3">
        <compose-adjust />
      </div>
    </div>
    <navigator :url="'/pages/invest/main?groupId='+ composeInfo.id" :hover-class="'none'" class="bottom-float">
      开始投资
    </navigator>
  </div>
</template>

<script>

import ComposeOption from './compose-option';
import ComposePerfor from './compose-perfor';
import ComposeRisk from './compose-risk';
import ComposeAdjust from './compose-adjust';
import {getComposeDetail} from '@/utils/model';

export default {
  components: {
    ComposeOption,
    ComposePerfor,
    ComposeRisk,
    ComposeAdjust
  },
  data() {
    return {
      tabIndex: -1,
      composeInfo: {}, // 组合信息
      composeOptions: {}, // 组合配置信息
      composePerfor: {}, // 业绩表现数据
      perforExtendsData: {}, // 业绩表现数据额外传一些数据
      composeRisk: {}, // 风险控制数据
    }
  },
  onShow() {
    const id = this.$root.$mp.query.id || 0;
    const flag = this.$root.$mp.query.flag || 0;

    // 获取详情页数据
    getComposeDetail(id, flag).then(res => {
      // if(res.code == 20001){
      //   wx.showModal({showCancel:false, title:'还未评测，请先评测', content:res.msg, success(){
      //     wx.redirectTo({
      //          url: '../../pages/risk-assessment/main'
      //     })
      //   }})
      // }else 
      if (res.code == 10000) {
        console.log('res', res);
        this.composeInfo = res.info;
        this.composeOptions = res.list;
        this.composePerfor= res.fiveYearData;
        this.composeRisk = res.listData;
        this.tabIndex = 0;
        this.perforExtendsData = {
          lastUpdateTime: res.lastUpdateTime,
          userMoney: res.userMoney,
        }
      }

    });
  }
}
</script>

<style lang="less" scoped>
.top-area {
  width: 100%;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1rpx solid #e5e5e5;
  margin-bottom: 20rpx;
  .attr-box {
    width: 690rpx;
    height: 188rpx;
    box-shadow: 0 0 40rpx #ebebeb;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5rpx;
    border-radius: 8rpx;
    .item {
      margin: 0 32rpx;
      text-align: center;
      .value {
        font-size: 40rpx;
        color: #e74612;
        margin-bottom: 10rpx;
      }
      .key {
        font-size: 26rpx;
        color: #333333;
        margin-bottom: 10rpx;
      }
      .other {
        font-size: 26rpx;
        color: #333;
        .v {
          color: #e74612;
        }
      }
    }
  }
  .review-result {
    width: 690rpx;
    .title {
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #e5e5e5;
      .txt {
        line-height: 28rpx;
        border-left: 7rpx solid #4768f3;
        padding-left: 13rpx;
        font-size: 30rpx;
        color: #333333;
      }
      .review-again {
        width: 150rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 26rpx;
        color: #ffffff;
        background-color: #4768f3;
        border-radius: 20rpx;
      }
    }
    .content {
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      height: 205rpx;
      .item {
        flex: 0 0 50%;
        height: 68rpx;
        line-height: 68rpx;
        .key {
          display: inline-block;
          width: 200rpx;
          text-align: right;
          font-size: 28rpx;
          color: #000000;
        }
        .value {
          font-size: 28rpx;
          color: #e74612;
          margin-left: 10rpx;
          &.icon {
            display: inline-block;
            width: 36rpx;
            height: 36rpx;
            line-height: 36rpx;
            text-align: center;
            font-size: 24rpx;
            color: #fff;
            border-radius: 50%;
            &.low {
              background-color: #4dba2d;
            }
            &.middle {
              background-color: #ff9500;
            }
            &.hight {
              background-color: #ff6a59;
            }
          }
        }
      }
    }
  }
}
.main {
  width: 100%;
  margin-bottom: 80rpx;
  .tab-area {
    width: 100%;
    height: 90rpx;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1rpx solid #e5e5e5;
    border-bottom: 1rpx solid #e5e5e5;
    .tab {
      font-size: 28rpx;
      color: #999999;
      padding: 0 30rpx;
      position: relative;
      &.cur {
        color: #4768f3;
      }
      &.cur:after {
        content: '';
        display: block;
        width: 50rpx;
        height: 4rpx;
        border-radius: 2rpx;
        background-color: #95a7f2;
        position: absolute;
        top: 48rpx;
        left: 50%;
        margin-left: -25rpx;
      }
    }
    .tab + .tab {
      border-left: 1rpx solid #999;
    }
  }
}
.bottom-float {
  width: 750rpx;
  height: 80rpx;
  background-color: #4768f3;
  font-size: 30rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  position: fixed;
  bottom: 0;
}
</style>
