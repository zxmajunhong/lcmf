<template>
  <div class="container">
    <div class="common-box product">
      <div class="box-title">
        <span class="title">{{notice.title}}</span>
      </div>
      <div class="box-content">
        {{notice.content}}
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
      notice: {}
    }
  },
  onShow() {
    console.log('this.$root.$mp.query', this.$root.$mp.query);
    let detailId = this.$root.$mp.query.id;
    if (detailId) {
      getNoticeDetail(detailId).then(res => {
        console.log('noticedetail', res);
        this.notice = res.info;
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
  padding-top: 20rpx;
}
.box-content {
  min-height: 550rpx;
  font-size: 28rpx;
  color: #333333;
  padding: 20rpx 22rpx;
}
</style>

