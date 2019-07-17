<template>
  <div class="remind-main">
    <div class="setting-wrap">
      <div class="line">
        <div class="t">
          定投提醒<span class="status">{{openTxt}}</span>
        </div>
        <switch :checked="isOpen" @change="changeOpen" :color="'#4768f3'"></switch>
      </div>
      <div class="line">
        <div class="t">定投周期</div>
        <picker @change="cycleChange" :value="cycleSelected" :range="cycleArry">
          <div class="picker-selected-wrap">
            <span>{{cycleArry[cycleSelected]}}</span>
            <i class="icon"></i>
          </div>
        </picker>
      </div>
      <div class="line">
        <div class="t">定投日</div>
        <picker @change="dayChange" :value="daySelected" :range="dayArry">
          <div class="picker-selected-wrap">
            <span>{{dayArry[daySelected]}}</span>
            <i class="icon"></i>
          </div>
        </picker>
      </div>
      <div class="line">
        <div class="t">每期定投金额</div>
        <div class="picker-selected-wrap">
          <input type="text" class="money" v-model="money">元
        </div>
      </div>
    </div>
    <div class="content">
      <div class="top-title">关注公众号获取第一手调仓信息</div>
      <img src="http://img-flzt.czstep.com/banner/wechat.jpg" class="ewm"/>
      <div class="">
          扫描方法：截图并发送给自己的微信号，再长按识别图中二维码（产品使用过程中遇到任何问题，请联系微信号：flyinvest33）
      </div>
      <div class="">
        搜索公众号：<span class="buy-font">复来智投</span>也可以哦！
      </div>
    </div>
  </div>
</template>
<script>
import {getUserFixedInfo, updateUserFixedInfo} from '@/utils/model';
export default {
  data() {
    return {
      isOpen: false,
      cycleArry: ['每月', '每周'],
      cycleSelected: 0,
      dayArry: ["1号", "2号", "3号", "4号", "5号", "6号", "7号", "8号", "9号", "10号", "11号", "12号", "13号", "14号", "15号", "16号", "17号", "18号", "19号", "20号", "21号", "22号", "23号", "24号", "25号", "26号", "27号", "28号"],
      daySelected: 0,
      money: 0,
    }
  },
  created() {
    getUserFixedInfo().then(res => {
      this.isOpen = res.status == 1;
      this.cycleSelected = this.type - 1;
      this.daySelected = this.day - 1;
      this.money = res.money;
    })
  },
  computed: {
    openTxt() {
      return this.isOpen ? '已开启' : '已关闭';
    }
  },
  methods: {
    changeOpen() {
      this.isOpen = !this.isOpen;
      updateUserFixedInfo({
        status: this.isOpen ? 1 : 0,
        type: this.cycleSelected + 1,
        day: this.daySelected + 1,
        money: this.money || 0,
      }).then(res => {
        // TODO 处理操作结果
      })
    },
    cycleChange(e) {
      this.cycleSelected = e.mp.detail.value;
      this.daySelected = 0;
    },
    dayChange(e) {
      this.daySelected = e.mp.detail.value;
    }
  },
  watch: {
    cycleSelected(val) {
      if (val == 0) {
        this.dayArry = ["1号", "2号", "3号", "4号", "5号", "6号", "7号", "8号", "9号", "10号", "11号", "12号", "13号", "14号", "15号", "16号", "17号", "18号", "19号", "20号", "21号", "22号", "23号", "24号", "25号", "26号", "27号", "28号"];
      } else {
        this.dayArry = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .remind-main {
    min-height: 100vh;
    background-color: #fff;
    font-size: 34rpx;
    padding: 0 30rpx;
    .setting-wrap {
      .line {
        height: 50rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15rpx;
        .status {
          margin-left: 10rpx;
          font-size: 24rpx;
          color: #cccccc;
        }
        .money {
          width: 200rpx;
          min-height: 45rpx;
          height: 45rpx !important;
          border: 1rpx solid #999999;
          padding: 0 10rpx;
          margin-right: 5rpx;
          border-radius: 10rpx;
          text-align: right;
          font-size: 28rpx;
          color: #333;
        }
      }
    }
    .picker-selected-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        display: block;
        width: 14rpx;
        height: 25rpx;
        background: url(../find/img/arrow.png) no-repeat 0 0;
        background-size: cover;
        margin-left: 10rpx;
      }
    }
    .content {
      .top-title {
        color: #ff4c4c;
        text-align: center;
      }
      .ewm {
        display: block;
        width: 460rpx;
        margin: 0 auto;
      }
    }
  }
  switch {
    zoom: .6;
  }
</style>
