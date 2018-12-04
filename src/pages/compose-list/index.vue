<template>
  <div class="container compose-list">
    <box :class-name="'product'">
      <div class="box-title">
        <span class="title">智能增长 Ⅰ 型</span>
        <span class="tag">推荐</span>
      </div>
      <div class="box-body">
        <div class="item">
          <p class="value">+10.0%</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            亏损厌恶度:<span class="icon middle">中</span>
          </p>
        </div>
        <div class="item">
          <p class="value">5.0%</p>
          <p class="key">最大可能亏损</p>
          <p class="other">
            收益偏好:<span class="icon middle">中</span>
          </p>
        </div>
        <div class="item">
          <p class="value">2.00</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            收益频率:<span class="icon hight">高</span>
          </p>
        </div>
      </div>
      <div class="box-bottom">
        <div class="tag">量身定制</div>
        <div class="tag">组合分散</div>
        <div class="tag">回撤控制</div>
        <div class="tag">智能调仓</div>
      </div>
    </box>
    <box :class-name="'product'">
      <div class="box-title">
        <span class="title">智能增长 Ⅰ 型</span>
        <span class="tag">推荐</span>
      </div>
      <div class="box-body">
        <div class="item">
          <p class="value">+10.0%</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            亏损厌恶度:<span class="icon middle">中</span>
          </p>
        </div>
        <div class="item">
          <p class="value">5.0%</p>
          <p class="key">最大可能亏损</p>
          <p class="other">
            收益偏好:<span class="icon middle">中</span>
          </p>
        </div>
        <div class="item">
          <p class="value">2.00</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            收益频率:<span class="icon hight">高</span>
          </p>
        </div>
      </div>
      <div class="box-bottom">
        <div class="tag">量身定制</div>
        <div class="tag">组合分散</div>
        <div class="tag">回撤控制</div>
        <div class="tag">智能调仓</div>
      </div>
    </box>
    <box :class-name="'product'">
      <div class="box-title">
        <span class="title">智能增长 Ⅰ 型</span>
      </div>
      <div class="box-body">
        <div class="item">
          <p class="value">+10.0%</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            亏损厌恶度:<span class="icon middle">中</span>
          </p>
        </div>
        <div class="item">
          <p class="value">5.0%</p>
          <p class="key">最大可能亏损</p>
          <p class="other">
            收益偏好:<span class="icon middle">中</span>
          </p>
        </div>
        <div class="item">
          <p class="value">2.00</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            收益频率:<span class="icon hight">高</span>
          </p>
        </div>
      </div>
      <div class="box-bottom">
        <div class="tag">量身定制</div>
        <div class="tag">组合分散</div>
        <div class="tag">回撤控制</div>
        <div class="tag">智能调仓</div>
      </div>
    </box>
    <box :class-name="'product'">
      <div class="box-title">
        <span class="title">智能增长 Ⅰ 型</span>
      </div>
      <div class="box-body">
        <div class="item">
          <p class="value">+10.0%</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            亏损厌恶度:<span class="icon middle">中</span>
          </p>
        </div>
        <div class="item">
          <p class="value">5.0%</p>
          <p class="key">最大可能亏损</p>
          <p class="other">
            收益偏好:<span class="icon middle">中</span>
          </p>
        </div>
        <div class="item">
          <p class="value">2.00</p>
          <p class="key">预期年化收益</p>
          <p class="other">
            收益频率:<span class="icon hight">高</span>
          </p>
        </div>
      </div>
      <div class="box-bottom">
        <div class="tag">量身定制</div>
        <div class="tag">组合分散</div>
        <div class="tag">回撤控制</div>
        <div class="tag">智能调仓</div>
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
.compose-list {
  padding-top: 20rpx;
  .product .box-title .tag {
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
</style>
