<template>
  <div class="container">
    <div class="my-money-box">
      <div class="bottom-bg"></div>
      <navigator class="invest-add" :url="'/pages/invest-add/main'">追加投资</navigator>
      <div  class="my-money">
        <span class="money">{{userInfo.totalMoney}}</span>
        <span class="txt">总资产 (￥)</span>
      </div>
      <div class="my-earnigns">
        <div class="each">
          <span class="key">累计收益(￥)</span>
          <span class="value">{{userInfo.addUpIncome}}</span>
        </div>
        <div class="each">
          <span class="key">最新收益(￥)</span>
          <span class="value">{{userInfo.newIncome}}</span>
        </div>
        <div class="each">
          <span class="key">最新净值(￥)</span>
          <span class="value blue">{{userInfo.newValue}}</span>
        </div>
        <div class="each">
          <span class="key">最新回撤(￥)</span>
          <span class="value blue">{{userInfo.newBack}}</span>
        </div>
      </div>
    </div>
    <div class="each-area">
      <span class="title">资产结构</span>
      <div class="content chart-wrap">
        <mpvue-echarts :echarts="echarts" :onInit="initChart1" :lazyLoad="true" :canvasId="'c1'" ref="c1" />
      </div>
    </div>
    <div class="each-area">
      <span class="title">资产分析</span>
      <div class="filter-area">
        <div class="item" @click="chart2Change(0)" :class="{'cur': c2Filter == 0}">近30天</div>
        <div class="item" @click="chart2Change(1)" :class="{'cur': c2Filter == 1}">近三月</div>
        <div class="item" @click="chart2Change(2)" :class="{'cur': c2Filter == 2}">近半年</div>
        <div class="item" @click="chart2Change(3)" :class="{'cur': c2Filter == 3}">近一年</div>
        <div class="item" @click="chart2Change(4)" :class="{'cur': c2Filter == 4}">今年</div>
      </div>
      <span class="sub-title">总资产：<span class="value">￥{{assetsData.totalMoney}}</span></span>
      <div class="content chart-wrap">
        <mpvue-echarts :echarts="echarts" :onInit="initChart2" :lazyLoad="true" :canvasId="'c2'" ref="c2" />
      </div>
    </div>
    <div class="each-area">
      <span class="sub-title">
        累计收益：<span class="value">￥{{assetsData.addUpIncome}}</span>
      </span>
      <div class="content chart-wrap">
        <mpvue-echarts :echarts="echarts" :onInit="initChart3" :lazyLoad="true" :canvasId="'c3'" ref="c3" />
      </div>
    </div>
    <div class="each-area">
      <span class="sub-title">
        最新净值：<span class="value">￥{{assetsData.newValue}}</span>
      </span>
      <div class="content chart-wrap">
        <mpvue-echarts :echarts="echarts" :onInit="initChart4" :lazyLoad="true" :canvasId="'c4'" ref="c4" />
      </div>
    </div>
    <div class="each-area">
      <span class="sub-title">
        最新回撤率：<span class="value">{{assetsData.newBack}}</span>
      </span>
      <div class="content chart-wrap">
        <mpvue-echarts :echarts="echarts" :onInit="initChart5" :lazyLoad="true" :canvasId="'c5'" ref="c5" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
require('echarts/lib/chart/radar.js');
require('echarts/lib/component/legend.js');
import {getUserInfo} from '@/utils/model';
import mpvueEcharts from 'mpvue-echarts';
import { setTimeout } from 'timers';
import { getAssetsDetail } from '@/utils/model';
let chart2 = null;
// 折线图的基本配置信息
const lineBaseOpt = {
  grid: {
    left: 50,
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    data: [],
  }],
  yAxis: [{
    type: 'value',
    axisLabel: {
      formatter: (value, index) => {
        if (value >= 10000 && value < 10000000) {
          value = value / 10000 + '万';
        } else if (value >= 10000000) {
          value = value / 10000000 + '千万';
        }
        return value;
      }
    }
  }],
  series: [],
}
const dataKeys = ['thirtyDayAssetList', 'ninetyDayAssetList', 'sixMonthDayAssetList', 'oneYearDayAssetList', 'thisYearDayAssetList'];
export default {
  components: {
    mpvueEcharts,
  },
  data() {
    return {
      echarts,
      opt: {
        opt1: {}, // 第一个图表的配置信息
        opt2: {}, // 第二个图表的配置信息
        opt3: {}, // 第三个图表的配置信息
        opt4: {}, // 第二个图表的配置信息
        opt5: {}, // 第三个图表的配置信息
      },
      assetsData: {},
      c2Filter: 0, // 总资产的筛选
      userInfo: {},
    }
  },
  methods: {
    getLineBaseOpt() {
      const opt = {
          grid: {
            left: 50,
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: [],
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: (value, index) => {
                if (value >= 10000 && value < 10000000) {
                  value = value / 10000 + '万';
                } else if (value >= 10000000) {
                  value = value / 10000000 + '千万';
                }
                return value;
              }
            }
          }],
          series: [],
        };
      return opt;
    },

    // 初始化表格
    initChart1(canvas, width, height) {
      const vthis = this;
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(vthis.opt.opt1);
      return chart;
    },
    // 第二个图标的初始化方法
    initChart2(canvas, width, height) {
      const vthis = this;
      chart2 = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart2);
      chart2.setOption(vthis.opt.opt2);
      return chart2;
    },
    // 第三个图表的初始化方法
    initChart3(canvas, width, height) {
      const vthis = this;
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(vthis.opt.opt3);
      return chart;
    },
    // 第四个图表的初始化方法
    initChart4(canvas, width, height) {
      const vthis = this;
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(vthis.opt.opt4);
      return chart;
    },
    // 第五个图表的初始化方法
    initChart5(canvas, width, height) {
      const vthis = this;
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(vthis.opt.opt5);
      return chart;
    },
    // 第一个图表的配置设置
    setOption1() {
      let assetsMax = 0;
      const {stock, bond, cash} = this.assetsData;
      if (stock > assetsMax) {
        assetsMax = Number(stock);
      }
      if (bond > assetsMax) {
        assetsMax = Number(bond);
      }
      if (cash > assetsMax) {
        assetsMax = Number(cash);
      }
      assetsMax += 10000;
      this.opt.opt1 = {
        polar : [
          {
            center: ['50%', '60%'],
            indicator : [
              { text: `股票(${stock})`, max: assetsMax},
              { text: `货币(${cash})`, max: assetsMax},
              { text: `债券(${bond})`, max: assetsMax}
            ]
          }
        ],
        series : [
          {
            type: 'radar',
            data : [
              {
                value : [stock, cash, bond],
                name : '资产结构'
              }
            ]
          }
        ]
      }
      this.$refs.c1.init();
    },
    // 第二个图标的配置设置
    setOption2() {
      const chartData = this.assetsData.thirtyDayAssetList;
      const opt = this.getLineBaseOpt();
      opt.xAxis[0].data = chartData.timeArr;
      const seriesData = [];
      chartData.valueArr.forEach(it => {
        seriesData.push(it.data);
      });
      opt.series = [{
        name: '总资产',
        type: 'line',
        data: seriesData,
      }];
      this.opt.opt2 = opt;
      this.$refs.c2.init();
    },
    // 第二个图表的筛选切换
    chart2Change(i) {
      this.c2Filter = i;
      const chartData = this.assetsData[dataKeys[i]];
      const opt = this.getLineBaseOpt();
      opt.xAxis[0].data = chartData.timeArr;
      const seriesData = [];
      chartData.valueArr.forEach(it => {
        seriesData.push(it.data);
      });
      opt.series = [{
        name: '总资产',
        type: 'line',
        data: seriesData,
      }];
      chart2.setOption(opt);
    },
    // 第三个图表的配置设置
    setOption3() {
      const chartData = this.assetsData.thirtyDayLastProfitList;
      const opt = this.getLineBaseOpt();
      opt.xAxis[0].data = chartData.timeArr;
      const seriesData = [];
      chartData.valueArr.forEach(it => {
        seriesData.push(it.data);
      });
      opt.series = [{
        name: '总资产',
        type: 'line',
        data: seriesData,
      }];
      this.opt.opt3 = opt;
      this.$refs.c3.init();
    },
    // 第四个图表的配置设置
    setOption4() {
      const chartData = this.assetsData.thirtyDayEqList;
      const opt = this.getLineBaseOpt();
      opt.xAxis[0].data = chartData.timeArr;
      const seriesData = [];
      chartData.valueArr.forEach(it => {
        seriesData.push(it.data);
      });
      opt.series = [{
        name: '总资产',
        type: 'line',
        data: seriesData,
      }];
      this.opt.opt4 = opt;
      this.$refs.c4.init();
    },
    // 第五个图表的配置设置
    setOption5() {
      const chartData = this.assetsData.thirtyDayDrawList;
      const opt = this.getLineBaseOpt();
      opt.xAxis[0].data = chartData.timeArr;
      const seriesData = [];
      chartData.valueArr.forEach(it => {
        seriesData.push(it.data);
      });
      opt.series = [{
        name: '总资产',
        type: 'line',
        data: seriesData,
      }];
      opt.yAxis = [{
        type: 'value',
        axisLabel: {
          formatter: (value, index) => {
            value = (Number(value) * 100).toFixed(2) + '%';
            return value;
          }
        }
      }];
      this.opt.opt5 = opt;
      this.$refs.c5.init();
    },
  },
  onShow() {
    // 获取资产明细数据
    getAssetsDetail()
      .then(assetsData => {
        this.assetsData = assetsData;
        this.setOption1();
        this.setOption2();
        this.setOption3();
        this.setOption4();
        this.setOption5();
      }),
      getUserInfo().then(res => {
      this.userInfo = res;
    })
  }

}
</script>

<style lang="less" scoped>
.my-money-box {
  width: 690rpx;
  height: 346rpx;
  background-color: #fff;
  border-radius: 9rpx;
  margin-top: 40rpx;
  position: relative;
  margin-bottom: 20rpx;
  .invest-add {
    height: 50rpx;
    width: 150rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 26rpx;
    color: #fff;
    background-color:#4768f3;
    border-radius:25rpx;
    position: absolute;
    top: 10rpx;
    right: 30rpx;
  }
  .bottom-bg {
    width: 690rpx;
    height: 51rpx;
    background: url('../my/img/my_box_bg.png') no-repeat 0 0;
    background-size: cover;
    position: absolute;
    bottom: 0;
  }
  .my-money {
    height: 156rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 2rpx solid #e5e5e5;
    .money {
      font-size: 40rpx;
      color: #ff6a5a;
      font-weight: bold;
    }
    .txt {
      font-size: 32rpx;
      color: #999999;
    }
  }
  .my-earnigns {
    height: 100rpx;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    padding-top: 30rpx;
    .each {
      flex: 0 0 50%;
      height: 64rpx;
      .key {
        font-size: 24rpx;
        color: #999999;
        margin-right: 18rpx;
        padding-left: 30rpx;
      }
      .value {
        font-size: 30rpx;
        color: #ff6a5a;
        &.blue {
          color: #4768f3;
        }
      }
    }
  }
}

.each-area {
  width: 100%;
  background-color: #fff;
  min-height: 300rpx;
  margin-bottom: 20rpx;
  .title {
    font-size: 30rpx;
    color: #333;
    padding-left: 20rpx;
    font-weight: bold;
  }
  .sub-title {
    font-size: 28rpx;
    color: #333;
    padding-left: 20rpx;
    .value {
      color: #ff4c4c;
    }
  }
  .content {
    border-top: 1rpx solid #dfdfdf;
  }
  .chart-wrap {
    height: 400rpx;
  }
  .filter-area {
    height: 40rpx;
    padding-left: 20rpx;
    display: flex;
    .item {
      width: 100rpx;
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      margin-right: 10rpx;
      font-size: 26rpx;
      color: #333;
      border: 1rpx solid #dfdfdf;
      border-radius: 6rpx;
      &.cur {
        background-color: #8892C9;
      }
    }
  }
}
</style>
