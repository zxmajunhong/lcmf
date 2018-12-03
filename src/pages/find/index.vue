<template>
  <div class="container">
    <!-- <div class="search-area">
      <div class="search-item">
        <i class="icon"></i>
        <input type="text" class="search-ipt">
      </div>
      <a href="" class="cancel"></a>
    </div> -->
    <div class="tab-area">
      <div class="tab" :class="{'cur': tabIndex == 0}" @click="tabIndex = 0">组合配置</div>
      <div class="tab" :class="{'cur': tabIndex == 1}" @click="tabIndex = 1">理财报告</div>
      <div class="tab" :class="{'cur': tabIndex == 2}" @click="tabIndex = 2">新手指引</div>
      <div class="tab" :class="{'cur': tabIndex == 3}" @click="tabIndex = 3">常见问题</div>
    </div>
    <div class="tab-content">
      <!-- 组合配置 -->
      <div class="info-list" v-show="tabIndex == 0">
        <div class="item">
          <div class="left">
            <div class="title">
              如何用积木智能轻松实现财富稳健增长<span class="tag">推荐</span>
            </div>
            <div class="date">
              2018-10-28
            </div>
          </div>
          <div class="icon"></div>
        </div>
        <div class="item">
          <div class="left">
            <div class="title">
              有积木智投，轻松跨越股市牛熊
            </div>
            <div class="date">
              2018-10-28
            </div>
          </div>
          <div class="icon"></div>
        </div>
      </div>
      <!-- 理财报告 -->
      <div class="info-list" v-show="tabIndex == 1">
        <div class="item">
          <div class="left">
            <div class="title">
              本周市场观点(20181028)
            </div>
            <div class="date">
              2018-10-28
            </div>
          </div>
          <div class="icon"></div>
        </div>
        <div class="item">
          <div class="left">
            <div class="title">
              本周市场观点(20181021)
            </div>
            <div class="date">
              2018-10-28
            </div>
          </div>
          <div class="icon"></div>
        </div>
        <div class="item">
          <div class="left">
            <div class="title">
              积木智投9月投资报告
            </div>
            <div class="date">
              2018-10-28
            </div>
          </div>
          <div class="icon"></div>
        </div>
        <div class="item">
          <div class="left">
            <div class="title">
              积木智投8月投资报告
            </div>
            <div class="date">
              2018-10-28
            </div>
          </div>
          <div class="icon"></div>
        </div>

      </div>
      <!-- 新手引导 -->
      <div class="new-guide" v-show="tabIndex == 2">
        <box>
          <div class="box-title"><span class="title">新手指引</span></div>
          <div class="new-guide-txt">新手指引内容</div>
        </box>
      </div>
      <!-- 常见问题 -->
      <div class="question-list" v-show="tabIndex == 3">
        <div class="item">
          <span class="title">常见问题1</span>
          <div class="icon"></div>
        </div>
        <div class="item">
          <span class="title">常见问题2</span>
          <div class="icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Box from "@/components/box";

export default {
  components: { Box },
  data() {
    return {
      tabIndex: 0, // 第几个选项卡
    }
  },
  onShow() {
    const tabIndex = this.globalData.findTabIndex || 0;
    this.tabIndex = tabIndex;
  },
  onHide() {
    this.globalData.findTabIndex = 0;
  }
}
</script>

<style lang="less" scoped>
.tab-area {
  width: 100%;
  height: 90rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
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
.tab-content {
  padding-top: 30rpx;
  min-height: 80vh;
  .info-list {
    .item {
      width: 690rpx;
      height: 146rpx;
      padding: 0 20rpx;
      background-color: #fff;
      border-radius: 8rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .title {
        font-size: 28rpx;
        color: #333333;
        line-height: 36rpx;
        margin-bottom: 25rpx;
        .tag {
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
      .date {
        font-size: 24rpx;
        color: #999999;
      }
      .icon {
        width: 14rpx;
        height: 25rpx;
        background: url(./img/arrow.png) no-repeat 0 0;
        background-size: cover;
      }
    }
  }
  .new-guide-txt {
    min-height: 550rpx;
    font-size: 28rpx;
    color: #333333;
    padding: 20rpx 22rpx;
  }
  .question-list {
    .item {
      width: 690rpx;
      height: 100rpx;
      padding: 0 20rpx;
      background-color: #fff;
      border-radius: 8rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .title {
        font-size: 28rpx;
        color: #333333;
      }
      .icon {
        width: 14rpx;
        height: 25rpx;
        background: url(./img/arrow.png) no-repeat 0 0;
        background-size: cover;
      }
    }
  }
}
</style>
