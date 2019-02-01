<!-- 组合配置 -->
<template>
  <div class="content">
    <div class="chart-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="initChart" :canvasId="'firstCanvas'" />
    </div>
    <div class="opts-detail">
      <div class="detail-title">
        <span class="txt">假设投资金额为: <span class="money">100000</span>元,配置如下:</span>
        <div class="modify-money">修改金额</div>
      </div>
      <div class="each-item" v-for="(item, i1) in tblData" :key="i1">
        <div class="line thead">
          <span class="td">{{item.name}}</span>
          <span class="td">{{item.money}}元</span>
          <span class="td">{{item.ratio}}%</span>
        </div>
        <div class="line tr" v-for="line in item.list" :key="line">
          <span class="td">
            <span class="name">{{line.bond_name}}</span>
            <span class="nums">{{line.bond_code}}</span>
          </span>
          <span class="td">{{line.money}}元</span>
          <span class="td">{{line.ratio}}</span>
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
    data: {
      type: Object,
    }
  },
  data() {
    return {
      echarts,
      pieColor: ['#345d9a', '#e65f43', '#6ba35b', '#7a61a4', '#399b9f', '#9f8c39'],
      legendData: [],
      seriesData: [],
      tblData: [],
    }
  },
  methods: {
    // 初始化表格
    initChart(canvas, width, height) {
      const vthis = this;
      // 图形颜色
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
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
        option.legend.data = vthis.legendData;
        option.series[0].data = vthis.seriesData;
        chart.setOption(option);
        return chart;
      }, 0);
    }
  },
  onLoad() {
    // 组织图表所需要的数据
    const srcData = this.data;
    console.log('srcData', srcData);
    const keys = Object.keys(srcData);
    const legendData = [];
    const seriesData = [];
    const tblData = [];
    keys.forEach((it, idx) => {
      legendData.push(`${it} ${srcData[it].ratio}`);
      seriesData.push({
        value: srcData[it].ratio,
        name: `${it} ${srcData[it].ratio}`,
        itemStyle: {color: this.pieColor[idx]},
      });
      tblData.push({
        name: it,
        money: srcData[it].money,
        ratio: srcData[it].ratio,
        list: srcData[it].list,
      });
    });
    this.legendData = legendData;
    this.seriesData = seriesData;
    this.tblData = tblData;
    console.log('配置数据', this.data);
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
