<template>
  <div class="container">
    <div class="my-money-box">
      <div class="bottom-bg"></div>
      <!-- <navigator class="invest-add" :url="'/pages/invest-add/main'">追加投资</navigator> -->
      <navigator :url="'/pages/assets-detail/main'" :hover-class="none" class="my-money">
        <span class="money">{{userInfo.totalMoney}}</span>
        <span class="txt">总资产 (￥)</span>
      </navigator>
      <navigator class="my-earnigns" :url="'/pages/assets-detail/main'" :hover-class="none">
        <div class="each">
          <span class="key">累计收益(￥)</span>
          <span class="value">{{userInfo.addUpIncome}}</span>
        </div>
        <div class="each">
          <span class="key">最新收益(￥)</span>
          <span class="value">{{userInfo.newIncome}}</span>
        </div>
        <div class="each">
          <span class="key">最新净值(￥)</span>
          <span class="value blue">{{userInfo.newValue}}</span>
        </div>
        <div class="each">
          <span class="key">最新回撤(￥)</span>
          <span class="value blue">{{userInfo.newBack}}</span>
        </div>
      </navigator>
    </div>
    <div class="my-compose product box" >
      <div class="box-title">
        <span class="title">我的组合</span>
        <!-- <navigator :url="'/pages/risk-assessment/main'" :hover-class="none" class="button">用户测评</navigator>
        <navigator :hover-class="none" class="button" @click="resetData">数据重置</navigator> -->
      </div>
      <navigator :url="'/pages/compose-detail/main?id='+ userInfo.investGroupID+ '&flag=1'" :hover-class="none">
      <div class="box-body">
        <div class="item">
          <p class="value">{{userInfo.annualIncome}}</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            亏损厌恶度:<span class="txt">{{userInfo.detest}}</span>
          </p>
        </div>
        <div class="item">
          <p class="value">{{userInfo.maxLost}}</p>
          <p class="key">最大回撤</p>
          <p class="other">
            最大亏损:<span class="txt">{{userInfo.userMaxLost}}</span>
          </p>
        </div>
        <div class="item">
          <p class="value">{{userInfo.riskReturnRatio}}</p>
          <p class="key">收益风险比</p>
          <p class="other">
            交易频率:<span class="txt">{{userInfo.dealRate}}</span>
          </p>
        </div>
      </div>
      </navigator>
    </div>
    <div class="pod-box">
      <navigator :url="'/pages/invest-change/main'" :hover-class="none">
      <div class="pod-info">
        <p class="txt">最新调仓：<span v-if="userInfo.changeFinish == 0 && userInfo.userF > 0">{{userInfo.newChange}}></span><span v-else-if="userInfo.userF < 1">您的金币余额不足，咱不能接受我们的调仓指令，请先去充值</span>
        <span v-else>{{userInfo.newChange}}</span></p>
        <p class="tips"  v-if="userInfo.changeFinish == 0">
            您当期的调仓还未完成，点击去完成
        </p>
        <p class="tips"  v-else>
            您的调仓已完成
        </p>
      </div>
      </navigator>
      <span class="arrow">></span>
    </div>
    <div class="fb-box">
      <div class="fb-info">
        <div class="balance">
          金币余额：<span class="value">{{userInfo.userF}}</span>
        </div>
        <!-- <span class="recharge" @click="recharge">充值</span> -->
        <navigator :url="'/pages/recharge/main'" :hover-class="none" class="button recharge">充值</navigator>
      </div>
      <p class="tips">我的组合每天需消耗1个金币当前余额可用至<span class="date">{{userInfo.lastDate}}</span></p>
    </div>
    <div class="other-fun">
      <navigator :url="'/pages/f-bag/main'" :hover-class="none" class="each">
        <i class="icon fb"></i>
        <span class="txt">金币钱包</span>
      </navigator>
      <navigator :url="'/pages/fixed-investment/main'" :hover-class="none" class="each">
        <i class="icon remind"></i>
        <span class="txt">定投提醒</span>
       </navigator>
      <div class="each">
        <i class="icon invite"></i>
        <span class="txt" @click="resetData">数据重置</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from '@/utils/model';
import {resetData} from '@/utils/model';
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  onShow() {
    getUserInfo().then(res => {
      if(res.code == 20001){
        wx.showModal({showCancel:false, title:'还未评测，请先评测', content:res.msg, success(){
          wx.navigateTo({
               url: '/pages/risk-assessment/main'
          })
        }})
      }else if(res.code == 10011){
        wx.showModal({showCancel:false, title:'您还未投资', content:res.msg, success(){
          wx.navigateTo({
               url: '/pages/invest-add/main'
          })
        }})
      }
      this.userInfo = res;
    })
  },
  methods:{
    resetData(){
      wx.showModal({showCancel:true,title:'数据重置', content:'确定重置数据吗，重置将删除评测，投资等所有数据', success(){
        resetData().then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        })
      }})
    }
  }
}
</script>


<style lang="less" scoped>
.my-money-box {
  width: 690rpx;
  height: 346rpx;
  background-color: #fff;
  border-radius: 9rpx;
  margin-top: 40rpx;
  position: relative;
  margin-bottom: 20rpx;
  .invest-add {
    height: 50rpx;
    width: 150rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 26rpx;
    color: #fff;
    background-color:#4768f3;
    border-radius:25rpx;
    position: absolute;
    top: 10rpx;
    right: 30rpx;
  }
  .bottom-bg {
    width: 690rpx;
    height: 51rpx;
    background: url('./img/my_box_bg.png') no-repeat 0 0;
    background-size: cover;
    position: absolute;
    bottom: 0;
  }
  .my-money {
    height: 156rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 2rpx solid #e5e5e5;
    .money {
      font-size: 40rpx;
      color: #ff6a5a;
      font-weight: bold;
    }
    .txt {
      font-size: 32rpx;
      color: #999999;
    }
  }
  .my-earnigns {
    height: 100rpx;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    padding-top: 30rpx;
    .each {
      flex: 0 0 50%;
      height: 64rpx;
      .key {
        font-size: 24rpx;
        color: #999999;
        margin-right: 18rpx;
        padding-left: 30rpx;
      }
      .value {
        font-size: 30rpx;
        color: #ff6a5a;
        &.blue {
          color: #4768f3;
        }
      }
    }
  }
}
.my-compose {
  .box-title {
    justify-content: space-between;
    .button {
      width: 150rpx;
      height: 50rpx;
      font-size: 26rpx;
      color: #ffffff;
      line-height: 50rpx;
      text-align: center;
      background-color: #4768f3;
      border-radius: 25rpx;
      margin-right: 30rpx;
    }
  }
  .box-body {
    border-bottom: 0;
  }
}
.pod-box {
  width: 690rpx;
  height: 134rpx;
  border-radius: 9rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 20rpx;
  .pod-info {
    padding-left: 30rpx;
    .txt {
      font-size: 30rpx;
      color: #333333;
      margin-bottom: 10rpx;
    }
    .tips {
      font-size: 24rpx;
      color: #ff6a59;
    }
  }
  .arrow {
    font-size: 28rpx;
    color: #333333;
    margin-right: 60rpx;
  }
}
.fb-box {
  width: 690rpx;
  height: 144rpx;
  background-color: #fff;
  border-radius: 9rpx;
  margin-bottom: 20rpx;
  .fb-info {
    display: flex;
    height: 50rpx;
    justify-content: space-between;
    align-items: center;
    padding: 18rpx 37rpx 0 33rpx;
    margin-bottom: 20rpx;
    .balance {
      font-size: 30rpx;
      color: #333333;
      .value {
        color: #e74612;
      }
    }
    .recharge {
      width: 99rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      font-size: 26rpx;
      color: #ffffff;
      background-color: #4768f3;
      border-radius: 25rpx;
    }
  }
  .tips {
    margin-left: 33rpx;
    font-size: 24rpx;
    color: #999999;
    .date {
      color: #ff6a59;
    }
  }
}
.other-fun {
  width: 690rpx;
  height: 166rpx;
  background-color: #fff;
  border-radius: 9rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  .each {
    flex: 0 0 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .icon {
      display: block;
      width: 60rpx;
      height: 60rpx;
      margin-bottom: 20rpx;
      &.fb {
        background: url(./img/wallet.png) no-repeat;
        background-size: cover;
      }
      &.remind {
        background: url(./img/remind.png) no-repeat;
        background-size: cover;
      }
      &.invite {
        background: url(./img/invite.png) no-repeat;
        background-size: cover;
      }

    }
    .txt {
      font-size: 26rpx;
      color: #666666;
    }
    &.middle::before {
      content: '';
      display: block;
      width: 0;
      height: 89rpx;
      border-left: 1rpx dashed #ededed;
      position: absolute;
      top: 9rpx;
      left: 0;
    }
    &.middle::after {
      content: '';
      display: block;
      width: 0;
      height: 89rpx;
      border-right: 1rpx dashed #ededed;
      position: absolute;
      top: 9rpx;
      right: 0;
    }
  }
}

</style>
