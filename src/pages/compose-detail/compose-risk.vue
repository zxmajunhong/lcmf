<!-- 风险控制 -->
<template>
  <div class="content">
    <div class="chart-area">
      <p class="title">最大回撤走势图</p>
      <mpvue-echarts :echarts="echarts" :onInit="initChart" :canvasId="'thirdCanvas'" />
    </div>
    <div class="control-method">
      <div class="explain">
        风险控制方法：
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
      const option = { // echart的配置
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
            data:[0, -4, -8.9, -26.3, -35.1]
          },
          {
            name: '比较基准',
            type: 'line',
            data:[0, -8, -15.2, -33.5, -42.1]
          }
        ]
      };
      chart.setOption(option);
      return chart;
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
}
.chart-area {
  height: 708rpx;
  border-bottom: 1rpx solid #e5e5e5;
  position: relative;
  .title {
    color: #333;
    width: 100%;
    font-size: 26rpx;
    text-align: center;
    position: absolute;
    top: 10rpx;
  }
}
.control-method {
  padding: 30rpx;
  .explain {
    min-height: 245rpx;
    border: 1rpx solid #e5e5e5;
    padding: 10rpx;
    line-height: 26rpx;
    border-radius: 6rpx;
    font-size: 24rpx;
    color: #999999;
  }
}
</style>
