<!-- 业绩表现 -->
<template>
  <div class="content">
    <div class="year-select">
      <div class="item cur" @click="change">过去1年</div>
      <div class="item">过去3年</div>
      <div class="item">过去5年</div>
    </div>
    <div class="tab-content">
      <div class="chart-area">
        <mpvue-echarts :echarts="echarts" :onInit="initChart" :canvasId="'secondCanvas'" />
      </div>
      <div class="table-area">
        <div class="table">
          <div class="tr title">
            <div class="td">组合</div>
            <div class="td">VS</div>
            <div class="td">比较基准</div>
          </div>
          <div class="tr">
            <div class="td">55.0%</div>
            <div class="td">总收益</div>
            <div class="td">35.0%</div>
          </div>
          <div class="tr">
            <div class="td">18.3%</div>
            <div class="td">年化收益</div>
            <div class="td">11.7%</div>
          </div>
          <div class="tr">
            <div class="td">15%</div>
            <div class="td">波动率</div>
            <div class="td">20%</div>
          </div>
          <div class="tr">
            <div class="td">1.2%</div>
            <div class="td">夏普比率</div>
            <div class="td">0.59%</div>
          </div>
          <div class="tr">
            <div class="td">-1.3%</div>
            <div class="td">最大撤回</div>
            <div class="td">-48%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
require('echarts/lib/chart/line.js');
require('echarts/lib/component/legend.js');
import mpvueEcharts from 'mpvue-echarts';
let chart = null;

export default {
  components: {
    mpvueEcharts,
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
      option: { // echart的配置
        grid: {
          show: true,
          top: '10%',
        },
        legend: {
          show: true,
          top: 'bottom',
          data: ['组合', '比较基准']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2014','2015','2016','2017','2018']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            formatter: '{value}%'
          }
        },
        series: [
          {
            name: '组合',
            type: 'line',
            data:[-1.3, 1.2, 15, 18.3, 55.0]
          },
          {
            name: '比较基准',
            type: 'line',
            data:[-48, 5.9, 30, 11.7, 35]
          }
        ]
      },
      chartData: [],
      sTab: 0, // 子选项卡的选择 过去一年、过去三年、过去五年
    }
  },
  mounted() {
    // TODO 通过接口获取方法
    const data = [[
      {name: '总收益', compose: 55.0, compare: 35},
      {name: '年化收益', compose: 18.3, compare: 11.7},
      {name: '波动率', compose: 15, compare: 20},
      {name: '夏普比率', compose: 1.2, compare: 0.59},
      {name: '最大撤回', compose: -1.3, compare: 48}
    ],[
      {name: '总收益', compose: 45.0, compare: 25},
      {name: '年化收益', compose: 8.3, compare: 1.7},
      {name: '波动率', compose: 5, compare: 10},
      {name: '夏普比率', compose: -8.8, compare: -9.41},
      {name: '最大撤回', compose: -11.3, compare: 38}
    ],[
      {name: '总收益', compose: 35.0, compare: 25},
      {name: '年化收益', compose: 8.3, compare: 5.7},
      {name: '波动率', compose: 5, compare: 30},
      {name: '夏普比率', compose: -6.8, compare: -34.41},
      {name: '最大撤回', compose: -17.3, compare: 38}
    ]];
    this.chartData = [];



  },
  methods: {
    // 初始化表格
    initChart(canvas, width, height) {
      const vthis = this;

      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(vthis.option);
      return chart;
    },
    change() {
      const option = {
        grid: {
          show: true,
          top: '10%',
        },
        legend: {
          show: true,
          top: 'bottom',
          data: ['组合', '比较基准']
        },
        xAxis: {
          type: 'category',
        boundaryGap: false,
          data: ['2018-02','2018-04','2018-06','2018-08','2018-10']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            formatter: '{value}%'
          }
        },
        series: [
          {
            name: '组合',
            type: 'line',
            data:[10, -10, 26, 32, 55.0]
          },
          {
            name: '比较基准',
            type: 'line',
            data:[48, 32, 30, 11.7, 10]
          }
        ]
      };
      chart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
}
.year-select {
  padding-top: 20rpx;
  display: flex;
  justify-content: center;
  .item {
    width: 140rpx;
    line-height: 45rpx;
    text-align: center;
    border-bottom: 3rpx solid #e5e5e5;
    font-size: 26rpx;
    color: #999999;
    &.cur {
      color: #4768f3;
      border-color: #4768f3;
    }
  }
}
.chart-area {
  height: 540rpx;
  border-bottom: 1rpx solid #e5e5e5;
}
.table-area {
  padding: 30rpx;
  background-color: #fff;
  .table {
    width: 100%;
    font-size: 28rpx;
    color: #424242;
    .tr {
      width: 100%;
      display: flex;
      .td {
        flex: 0 0 33%;
        height: 54rpx;
        line-height: 54rpx;
        text-align: center;
      }
      &.title {
        .td {
          background-color: #fafaff;
          border: 1rpx solid #999999;
          &:nth-child(2) {
            border-left: 0;
            border-right: 0;
            background-color: #ffe0dc;
          }
        }
      }
      &:not(:first-child) {
        .td:nth-child(1) {
          border-left: 1rpx solid #e5e5e5;
          border-bottom: 1rpx solid #e5e5e5;
        }
        .td:nth-child(2) {
          border: 1px solid #999;
          border-top: 0;
          background-color: #ffe0dc;
        }
        .td:nth-child(3) {
          border-right: 1rpx solid #e5e5e5;
          border-bottom: 1rpx solid #e5e5e5;
        }
      }
    }
  }
}
</style>
