<!-- 业绩表现 -->
<template>
  <div class="content">
    <div class="year-select">
      <!-- <div class="item" @click="change(0)" :class="{'cur': sTab == 0}">过去1年</div>
      <div class="item" @click="change(1)" :class="{'cur': sTab == 1}">过去3年</div> -->
      <div class="item" :class="{'cur': sTab == 0}" >净值走势图</div>
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
            <div class="td">{{compareData.user_total_income}}</div>
            <div class="td">总收益</div>
            <div class="td">{{compareData.compare_total_income}}</div>
          </div>
          <div class="tr">
            <div class="td">{{compareData.user_annual_income}}</div>
            <div class="td">年化收益</div>
            <div class="td">{{compareData.compare_annual_income}}</div>
          </div>
          <div class="tr">
            <div class="td">{{compareData.user_volatility_ratio}}</div>
            <div class="td">波动率</div>
            <div class="td">{{compareData.compare_volatility_ratio}}</div>
          </div>
          <div class="tr">
            <div class="td">{{compareData.user_sharpe_ratio}}</div>
            <div class="td">夏普比率</div>
            <div class="td">{{compareData.compare_sharpe_ratio}}</div>
          </div>
          <div class="tr">
            <div class="td">{{compareData.user_max_lost}}</div>
            <div class="td">最大回撤</div>
            <div class="td">{{compareData.compare_max_lost}}</div>
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
    },
    data: {
      type: Object,
    },
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
          data: ['组合', '比较基准(沪深300指数)']
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
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '组合',
            type: 'line',
            data:[-1.3, 1.2, 15, 18.3, 55.0]
          },
          {
            name: '比较基准(沪深300指数)',
            type: 'line',
            data:[-48, 5.9, 30, 11.7, 35]
          }
        ]
      },
      chartData: {},
      sTab: 0, // 子选项卡的选择 过去一年、过去三年、过去五年
      compareData: {}, // 比较数据
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
      chart.setOption(vthis.option);
      return chart;
    },
    change(i) {
      const nowData = this.chartData[i];
      this.option.xAxis.data = nowData.timeArr;
      this.option.series[0].data = nowData.data;
      this.option.series[1].data = nowData.compareData;
      chart.setOption(this.option);
      this.sTab = i;
    }
  },
  onLoad() {
    this.compareData = this.$parent.composeInfo;
    // 获取到的数据
    const srcData = this.data;

    console.log('src', srcData);
    // 组织成表格所需要的数据
    const data = [];
    const compareData = [];
    srcData.valueArr.forEach(v => {
      data.push(v.data || 0);
      compareData.push(v.compareData || 0);
    });
    this.option.xAxis.data = srcData.timeArr;
    this.option.series[0].data = data;
    this.option.series[1].data = compareData;
    console.log('options', this.option);
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
