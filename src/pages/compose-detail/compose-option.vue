<!-- 组合配置 -->
<template>
  <div class="content">
    <div class="chart-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="initChart" />
    </div>
    <div class="opts-detail">
      <div class="detail-title">
        <span class="txt">假设投资金额为: <span class="money">100000</span>元,配置如下:</span>
        <div class="modify-money">修改金额</div>
      </div>
      <div class="each-item">
        <div class="line thead">
          <span class="td">A股</span>
          <span class="td">50000元</span>
          <span class="td">50.0%</span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
      </div>
      <div class="each-item">
        <div class="line thead">
          <span class="td">A股</span>
          <span class="td">50000元</span>
          <span class="td">50.0%</span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
      </div>
      <div class="each-item">
        <div class="line thead">
          <span class="td">A股</span>
          <span class="td">50000元</span>
          <span class="td">50.0%</span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
      </div>
      <div class="each-item">
        <div class="line thead">
          <span class="td">A股</span>
          <span class="td">50000元</span>
          <span class="td">50.0%</span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
      </div>
      <div class="each-item">
        <div class="line thead">
          <span class="td">A股</span>
          <span class="td">50000元</span>
          <span class="td">50.0%</span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
      </div>
      <div class="each-item">
        <div class="line thead">
          <span class="td">A股</span>
          <span class="td">50000元</span>
          <span class="td">50.0%</span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">国泰上证5年期国债ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
        <div class="line tr">
          <span class="td">
            <span class="name">华夏上证50ETF</span>
            <span class="nums">510050.SH</span>
          </span>
          <span class="td">20000元</span>
          <span class="td">20.0%</span>
          <span class="arrow"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts/lib/echarts';
require('echarts/lib/chart/pie.js');
require('echarts/lib/component/legend.js');
import mpvueEcharts from 'mpvue-echarts';
import { setTimeout } from 'timers';

export default {
  components: {
    mpvueEcharts
  },
  props: {
    id: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      echarts,
    }
  },
  methods: {
    // 初始化表格
    initChart(canvas, width, height) {
      const vthis = this;
      // 图形颜色
      const pieColor = ['#345d9a', '#e65f43', '#6ba35b', '#7a61a4', '#399b9f', '#9f8c39'];
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(chart)
      var option = {
        legend: {
          orient: 'vertical',
          top: 'center',
          left: '70%',
          itemWidth: 15,
          itemHeight: 15,
          // data:['A股  50%','港股  5.0%','境外股票  5.0%','债券  30.0%','货币  10.0%']
        },
        series: [
          {
            type:'pie',
            center: ['120', '50%'],
            radius: ['58', '105'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{d}%',
            },
          }
        ]
      }
      // TODO 请求获取数据
      setTimeout(() => {
        console.log(vthis.id);
        option.legend.data = ['A股  50%','港股  5.0%','境外股票  5.0%','债券  30.0%','货币  10.0%'];
        option.series[0].data = [
              {value:335, name:'A股  50%', itemStyle: {color: '#345d9a'}},
              {value:310, name:'港股  5.0%', itemStyle: {color: pieColor[1]}},
              {value:234, name:'境外股票  5.0%', itemStyle: {color: pieColor[2]}},
              {value:135, name:'债券  30.0%', itemStyle: {color: pieColor[3]}},
              {value:1548, name:'货币  10.0%', itemStyle: {color: pieColor[4]}}
            ];
        chart.setOption(option);
        return chart;
      }, 1000);
    }
  }
}
</script>
<style lang="less" scoped>
  .chart-wrap {
    width: 100%;
    height: 508rpx;
    background-color: #fff;
  }
  .opts-detail {
    .detail-title {
      height: 80rpx;
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .txt {
        font-size: 28rpx;
        color: #333333;
        .money {
          color: #e74612;
        }
      }
      .modify-money {
        width: 150rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 26rpx;
        color: #fff;
        background-color: #4768f3;
        border-radius: 20rpx;
      }
    }
    .each-item {
      .line {
        display: flex;
        align-items: center;
        .td {
          flex-grow: 0;
          flex-shrink: 0;
          text-align: center;
          &:nth-child(1) {
            flex-basis: 340rpx;
          }
          &:nth-child(2) {
            flex-basis: 185rpx;
          }
          &:nth-child(3) {
            flex-basis: 165rpx;
            padding-right: 60rpx;
          }
        }
        &.thead {
          .td {
            font-size: 26rpx;
            color: #fff;
            height: 60rpx;
            line-height: 60rpx;
          }
        }
        &.tr {
          position: relative;
          .td {
            font-size: 28rpx;
            color: #333333;
            background-color: #fff;
            height: 100rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .arrow {
            display: block;
            width: 14rpx;
            height: 25rpx;
            background: url(../find/img/arrow.png) no-repeat 0 0;
            background-size: cover;
            position: absolute;
            top: 34rpx;
            right: 30rpx;
          }
        }
      }
      .tr + .tr {
        border-top: 1rpx solid #e5e5e5;
      }
      &:nth-child(2) {
        .thead {
          background-color: #345d9a;
        }
      }
      &:nth-child(3) {
        .thead {
          background-color: #e65f43;
        }
      }
      &:nth-child(4) {
        .thead {
          background-color: #6ba35b;
        }
      }
      &:nth-child(5) {
        .thead {
          background-color: #7a61a4;
        }
      }
      &:nth-child(6) {
        .thead {
          background-color: #399b9f;
        }
      }
      &:nth-child(7) {
        .thead {
          background-color: #9f8c39;
        }
      }
    }
  }
</style>
