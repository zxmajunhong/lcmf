<template>
  <div class="container">
    <p class="tips">
      注意：请您务必认真回答下列问题，我们将根据您的回答结果，为您量身定制最适合您，同时又高风险收益比的投资组合，并持续为您提供智能调仓建议。
    </p>
    <div class="question-list">
      <div class="item">
        <div class="title">
          <p class="title-txt">
            1.您期望的资产最大回撤比例是多少？
          </p>
          <p class="title-tips">
            (注：您的本金最大亏损比例不会超过最大回撤比例)
          </p>
          <div class="q" @click="showFc = true"></div>
        </div>
        <div class="content">
          <div class="slider-area">
            <slider min="1" max="3" step="1" activeColor="#4768f3" block-color="#ff6a59" :value="q1_value" @change="q1Change"/>
            <div class="value-line">
              <span class="v">4%</span>
              <span class="v">7%</span>
              <span class="v">10%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          <p class="title-txt">2.您对本金遭受亏损的厌恶程度？</p>
          <p class="title-tips">(注:亏损厌恶程度越高，我们对您本金亏损的控制越严格)</p>
        </div>
        <div class="content">
          <radio-group class="radio-group" @change="q2Change">
            <label class="radio">
              <radio value="1" color="#4768f3" :checked="q2_value == 1" />低
            </label>
            <label class="radio">
              <radio value="2" color="#4768f3" :checked="q2_value == 2" />一般
            </label>
            <label class="radio">
              <radio value="3" color="#4768f3" :checked="q2_value == 3" />高
            </label>
          </radio-group>
        </div>
      </div>
      <div class="item">
        <div class="title">
          <p class="title-txt">2.您认为平均每两个星期买卖一次的交易频率是否较高？</p>
          <p class="title-tips">(注:亏损厌恶程度越高，我们对您本金亏损的控制越严格)</p>
        </div>
        <div class="content">
          <radio-group class="radio-group" @change="q3Change">
            <label class="radio">
              <radio value="1" color="#4768f3" :checked="q3_value == 1" />高
            </label>
            <label class="radio">
              <radio value="2" color="#4768f3" :checked="q3_value == 2" />差不多
            </label>
            <label class="radio">
              <radio value="3" color="#4768f3" :checked="q3_value == 3" />比较高
            </label>
          </radio-group>
        </div>
      </div>
    </div>
    <div class="submit" @click="submit">提交</div>
    <div class="explain-fc" v-show="showFc">
      <box :class-name="'explain-box'">
        <div class="box-title">
          <span class="title">什么是最大回撤比率？</span>
          <div class="close" @click="showFc = false"></div>
        </div>
        <div class="box-content">
          <p class="explain-txt">
            所谓回撤比率，是指您当前总资产从历史最高点开始回落的百分比例，而最大回撤比率是指您可能经历的最大回撤比率，用来描述您开始投资后可能面临的最糟糕的情况。
          </p>
          <p class="explain-txt">
            我们的最大回撤控制技术的作用在于：在投资初期，确保您的本金亏损比例不会超过您设定的最大回撤比例；在投资后期，确定您的盈利回吐不会。
          </p>
        </div>
      </box>
    </div>
  </div>
</template>

<script>
import Box from "@/components/box";
export default {
  components: { Box },
  data() {
    return {
      q1_value: 1,
      q2_value: 2,
      q3_value: 1,
      showFc: false,
    }
  },
  methods: {
    // 问题一的答案选择
    q1Change(e) {
      this.q1_value = e.mp.detail.value;
    },
    // 问题二的答案选择
    q2Change(e) {
      this.q2_value = e.mp.detail.value;
    },
    // 问题三的答案选择
    q3Change(e) {
      this.q3_value = e.mp.detail.value;
    },
    submit() {
      console.log(this.q1_value, this.q2_value, this.q3_value);
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  width: 690rpx;
  font-size: 28rpx;
  color: #ff6a59;
  line-height: 35rpx;
  margin: 30rpx 0;
}
.question-list {
  margin-bottom: 80rpx;
  .item {
    width: 690rpx;
    border-radius: 9rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    .title {
      padding: 20rpx 15rpx 20rpx 20rpx;
      border-bottom: 1rpx solid #e5e5e5;
      position: relative;
      .title-txt {
        font-size: 30rpx;
        color: #333333;
        line-height: 50rpx;
        padding: 10rpx 0;
      }
      .title-tips {
        font-size: 26rpx;
        color: #999999;
      }
      .q {
        width: 36rpx;
        height: 36rpx;
        background: url(./img/q.png) no-repeat 0 0;
        background-size: cover;
        position: absolute;
        top: 30rpx;
        right: 27rpx;
      }
    }
    .slider-area {
      padding: 20rpx 35rpx 30rpx  35rpx;
      .value-line {
        display: flex;
        justify-content: space-between;
        padding: 0 10rpx;
        .v {
          font-size: 26rpx;
          color: #333333;
        }
      }
    }
    .radio-group {
      padding: 40rpx;
      display: flex;
      justify-content: space-between;
      .radio {
        flex: 0 0 150rpx;
        font-size: 28rpx;
        color: #333333;
      }
    }
  }
}
.submit {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 28rpx;
  color: #ffffff;
  background-color: #4768f3;
  position: fixed;
  bottom: 0;
  left: 0;
}
.explain-fc {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #949496;
  padding: 178rpx 0 0 30rpx;
  .explain-box {
    .box-title {
      justify-content: space-between;
      .close {
        width: 40rpx;
        height: 40rpx;
        background: url(./img/close.png) no-repeat 0 0;
        background-size: cover;
        margin-right: 40rpx;
      }
    }
    .box-content {
      padding: 30rpx;
      .explain-txt {
        font-size: 28rpx;
        color: #666666;
        line-height: 48rpx;
      }
    }
  }
}

</style>
