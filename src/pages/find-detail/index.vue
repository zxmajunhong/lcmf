<template>
  <div class="container">
    <div class="tab-area">
      <div class="tab" :class="{'cur': tabIndex == 1}" @click="tabSelect(1)">组合配置</div>
      <div class="tab" :class="{'cur': tabIndex == 2}" @click="tabSelect(2)">理财报告</div>
      <div class="tab" :class="{'cur': tabIndex == 3}" @click="tabSelect(3)">新手指引</div>
      <div class="tab" :class="{'cur': tabIndex == 4}" @click="tabSelect(4)">常见问题</div>
    </div>
    <div class="common-box product">
      <div class="box-title">
        <span class="title">{{notice.title}}</span>
      </div>
      <div class="box-content">
        <rich-text :nodes="notice.content"></rich-text>
      </div>
    </div>
  </div>
</template>

<script>
import {getNoticeDetail} from '@/utils/model.js';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      notice: {},
      tabIndex: 0,
      nodes: [{
        name: 'div',
      }]
    }
  },
  methods: {
    tabSelect(i) {
      this.globalData.findTabIndex = i;
      wx.switchTab({
        url: '/pages/find/main',
      });
    }
  },
  onShow() {
    console.log('this.$root.$mp.query', this.$root.$mp.query);
    const tabIndex = this.globalData.findTabIndex;
    this.tabIndex = tabIndex;
    let detailId = this.$root.$mp.query.id;
    if (detailId) {
      getNoticeDetail(detailId).then(res => {
        console.log('noticedetail', res);
        this.notice = res.info;
        this.notice.content = this.notice.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
      })
    } else {
      wx.showToast({
        title: '数据错误',
        icon: 'none',
        success: () => {
          // const pages = getCurrentPages(); // 获取页面栈
          // var prevPage = pages[pages.length - 2]; // 上一个页面
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            });
          }, 1600);
        }
      });
    }

  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
}
.tab-area {
  width: 100%;
  height: 90rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .tab {
    font-size: 28rpx;
    color: #999;
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
.box-content {
  min-height: 550rpx;
  font-size: 28rpx;
  color: #333333;
  padding: 20rpx 22rpx;
}
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
</style>

