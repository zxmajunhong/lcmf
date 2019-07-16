<template>
  <div class="container">
    <div class="top-area">
      <div class="attr-box">
        <!-- <div class="item">
          <p class="value">{{composeInfo.annual_income}}</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            亏损厌恶度:<span class="v">{{composeInfo.detest}}</span>
          </p>
        </div> -->
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
    </div>
    <div class="invest-box">
      <div class="total-line">
        确定投资金额：
      </div>
      <div class="oper-line" v-if="flag">
        <div class="input-area">
          <input type="text" class="invest-value" v-model="money">
          <span class="unit">元</span>
        </div>
        <div class="invest-submit" @click="checkInvest">确定</div>
      </div>
       <div class="explain-line" v-if="userInvestMoney > 0">
        您当前的总资产为<span class="money-font">{{userInvestMoney}}</span>
      </div>
      <div class="explain-line">
        我们将按该金额为您配置智能组合。
      </div>
      <div class="explain-line">
        <span class="oper-font">操作步骤：</span>
      </div>

      <div class="explain-line">
        <span class="detail-font">(1)投资过程由您在自己的证券账户(即股票账户)中完成，交易对象为指数ETF。
        </span>
      </div>
      <div class="explain-line">
        <span class="detail-font">(2)我们将在每个交易日15:00股市收盘后，为您推送调仓指令(如果当期需要调仓)，您可在下一个交易日开盘时，根据我们推送的调仓指令完成交易。初次使用时，第一条调仓指令将会在当日收盘系统完成计算后向您推送，请您耐心等待。
       </span>
      </div>
     <div class="explain-line">
       <span class="detail-font">注：复来智投详细使用方法，请参考“新手指引”中的文章:《复来智投如何使用？》；如果您还没有证券账户，请参考“新手指引”中的文章:《我还没有证券账户怎么办？》；建议您添加我们的客服微信:flyinvest33，以备在产品使用过程中遇到问题时随时咨询。</span>
     </div>
      
    </div>
    <div class="bottom-float" v-if="flag == false" @click="checkInvestTwo">
      立即投资
    </div>
  </div>
</template>
<script>
import {getInvestGroupInfo, checkUserInvest, postUserInvest, userChangeGroup} from '@/utils/model';
export default {
  components: {
  },
  data() {
    return {
      composeInfo: [],
      money: '',
      userInvestMoney: '',
      //用户是否是这个组合false 不是
      flag: false,
    }
  },
  methods: {
    checkInvest() {
      checkUserInvest(this.$root.$mp.query.groupId)
        .then((res) => {
          if (res.code === 10001) {
            this.showModal('您还未做风险测评，现在去做吗？', () => {
              wx.reLaunch('/pages/risk-assessment/main');
            });
          } else {
            const money = this.money;
            this.showModal(res.msg, () => {
              postUserInvest(this.$root.$mp.query.groupId, money, 1)
                .then((postRes) => {
                  if (postRes.code == 10000) {
                    this.changeMoney = '';
                  }
                  // wx.showToast({
                  //   title: postRes.msg,
                  //   icon: 'none',
                  //   mask: true,
                  // })
                  this.showModal(postRes.msg, () => {
                    wx.switchTab({
                      url: '/pages/my/main'
                    });
                  });
                })
            })
          }
        })
    },
    checkInvestTwo() {
      checkUserInvest(this.$root.$mp.query.groupId)
        .then((res) => {
          if (res.code === 10001) {
            this.showModal('您还未做风险测评，现在去做吗？', () => {
              wx.reLaunch('/pages/risk-assessment/main');
            });
          } else {
            this.showModal(res.msg, () => {
              userChangeGroup(this.$root.$mp.query.groupId)
                .then((postRes) => {
                  if (postRes.code == 10000) {
                    this.changeMoney = '';
                  }
                  // wx.showToast({
                  //   title: postRes.msg,
                  //   icon: 'none',
                  //   mask: true,
                  // })
                  this.showModal(postRes.msg, () => {
                    wx.switchTab({
                      url: '/pages/my/main'
                    });
                  });
                })
            })
          }
        })
    },
    // 显示对话框
    showModal(content, sFun) {
      wx.showModal({
        title: '提示',
        content,
        success(res) {
          if (res.confirm) {
            sFun();
          }
        }
      })
    }
  },
  onShow() {
    const groupId = this.$root.$mp.query.groupId || 0;
    getInvestGroupInfo(groupId).then(res => {
      this.composeInfo = res.info;
      this.userInvestMoney = res.userInvestMoney;
      this.flag = res.flag;
    })
  }
}
</script>


<style lang="less" scoped>
.oper-font{
 font-size: 48rpx;
}
.money-font{
  height: 50rpx;
  line-height: 50rpx;
  font-size: 30rpx;
  color: #e74612;
  padding-left: 30rpx;
}
.detai-font{
 font-size: 46rpx;
}
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
  .invest-box {
    background-color: #fff;
    padding: 50rpx 0 0 40rpx;
    color: #333333;
    margin-bottom: 20rpx;
    .total-line {
      font-size: 32rpx;
      margin-bottom: 20rpx;
      .value {
        color: #e74612;
      }
    }
    .explain-line {
      margin-top: 10px;
      font-size: 28rpx;
    }
    .oper-line {
      display: flex;
      margin: 40rpx 0 40rpx 0;
      .mpvue-picker {
        width: 200rpx;
        height: 50rpx;
        border-radius: 8rpx;
        border: 1rpx solid #999999;
        margin-right: 10rpx;
        line-height: 50rpx;
        position: relative;
        .value {
          height: 50rpx;
          line-height: 50rpx;
          font-size: 30rpx;
          color: #e74612;
          padding-left: 30rpx;
        }
      }
      .mpvue-picker::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-top: 10rpx solid #999;
        border-left: 8rpx solid transparent;
        border-right: 8rpx solid transparent;
        position: absolute;
        top: 20rpx;
        right: 10rpx;
      }
      .input-area {
        display: flex;
        align-items: baseline;
        font-size: 24rpx;
        color: #333;
        margin-right: 20rpx;
        .invest-value {
          width: 200rpx;
          height: 50rpx;
          padding-right: 20rpx;
          border: 1rpx solid #999999;
          border-radius: 8rpx;
          text-align: right;
          font-size: 28rpx;
          color: #333;
          margin-right: 10rpx;
        }

      }
      .invest-submit {
        width: 98rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        border-radius: 25rpx;
        font-size: 24rpx;
        color: #fff;
        background-color: #4768f3;
        margin-top: 2rpx;
      }
    }
  }
  .record-redirect {
    width: 100%;
    padding-top: 50rpx;
    display: flex;
    justify-content: space-between;
    font-size: 32rpx;
    color: #333333;
    background-color: #fff;
    .title {
      margin-left: 40rpx;
    }
    .arrow {
      margin-right: 40rpx;
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
