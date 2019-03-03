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
      <div class="tab" :class="{'cur': tabIndex == 1}" @click="tabSelect(1)">组合配置</div>
      <div class="tab" :class="{'cur': tabIndex == 2}" @click="tabSelect(2)">理财报告</div>
      <div class="tab" :class="{'cur': tabIndex == 3}" @click="tabSelect(3)">新手指引</div>
      <div class="tab" :class="{'cur': tabIndex == 4}" @click="tabSelect(4)">常见问题</div>
    </div>
    <div class="tab-content">
      <!-- 组合配置 -->
      <div class="info-list" v-show="tabIndex == 1">
        <navigator :url="'/pages/find-detail/main?id=' + item.id" class="item" v-for="item in data1" :key="item">
          <div class="left">
            <div class="title">
              {{item.title}}
            </div>
            <div class="date">
              {{item.add_time}}
            </div>
          </div>
          <div class="icon"></div>
        </navigator>
      </div>
      <!-- 理财报告 -->
      <div class="info-list" v-show="tabIndex == 2">
        <navigator :url="'/pages/find-detail/main?id=' + item.id" class="item" v-for="item in data2" :key="item">
          <div class="left">
            <div class="title">
              {{item.title}}
            </div>
            <div class="date">
              {{item.add_time}}
            </div>
          </div>
          <div class="icon"></div>
        </navigator>
      </div>
      <!-- 新手引导 -->
      <div class="info-list" v-show="tabIndex == 3">
        <navigator :url="'/pages/find-detail/main?id=' + item.id" class="item" v-for="item in data3" :key="item">
          <div class="left">
            <div class="title">
              {{item.title}}
            </div>
            <div class="date">
              {{item.add_time}}
            </div>
          </div>
          <div class="icon"></div>
        </navigator>
      </div>
      <!-- 常见问题 -->
      <div class="info-list" v-show="tabIndex == 4">
        <navigator :url="'/pages/find-detail/main?id=' + item.id" class="item" v-for="item in data4" :key="item">
          <div class="left">
            <div class="title">
              {{item.title}}
            </div>
            <div class="date">
              {{item.add_time}}
            </div>
          </div>
          <div class="icon"></div>
        </navigator>
      </div>
    </div>
  </div>
</template>
<script>
import {getNotice} from '@/utils/model.js';
export default {
  data() {
    return {
      tabIndex: 1, // 第几个选项卡
      data1: [], // 组合配置的列表数据
      data2: [], // 理财报告的列表数据
      data3: [], // 新手指引的列表数据
      data4: [], // 常见问题的列表数据
    }
  },
  methods: {
    getList(p) {
      p = p || 1; // 默认第一页数据
      getNotice(this.tabIndex, p)
       .then((res) => {
         if (res.code == 10000) {
           this[`data${this.tabIndex}`] = res.list;
         }
       });
    },
    tabSelect(i) {
      this.tabIndex = i;
      if (this[`data${this.tabIndex}`].length == 0) {
        this.getList(1);
      }
    }
  },
  onShow() {
    const tabIndex = this.globalData.findTabIndex || 1;
    this.tabIndex = tabIndex;
    // 请求咨询数据
  this.getList(1);
  },
  onHide() {
    this.globalData.findTabIndex = this.tabIndex;
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
