<!-- 产品介绍页面 -->
<template>
  <div class="container">
    <box>
      <div class="box-title"><span class="title">产品介绍</span></div>
      <div class="box-body">
        积木定投属智能投顾行业细分功能产品，旨在利用智能机器人，以定投的形式，为用户提供个性化、智能化和自动化的投资理财服务。
        <div class="empty"></div>
        期望在承担0%-7%风险前提下，为用户创造年化10%-15%的长期稳定收益。
      </div>
    </box>
  </div>
</template>
<script>
import Box from "@/components/box";

export default {
  components: { Box },
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 20rpx;
  .box-body {
    padding: 30rpx;
    line-height: 50rpx;
    font-size: 28rpx;
    .empty {
      height: 30rpx;
    }
  }
}
</style>
