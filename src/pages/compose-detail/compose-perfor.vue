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
    }
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
      };
      chart.setOption(option);
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
}
</style>
