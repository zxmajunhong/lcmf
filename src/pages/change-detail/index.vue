<template>
  <div class="container">
    <div class="total-line">
        {{showDate}}调仓指令（最新）
        <div class="adjust">
          (建议在{{nextDate}}开盘时完成交易)
        </div>
    </div>

  
    <div class="table-area">
      <div class="tr">
        <div class="col1 first">
        </div>
        <div class="col2">
          <div class="line title">
            <div class="item"><span>证券代码</span></div>
            <div class="item">证券名称</div>
            <div class="item" style="line-height: inherit;">持仓数量<span class="adjust">(调仓前)</span></div>
            <div class="item">交易</div>
            <div class="item" style="line-height: inherit;">持仓数量<span class="adjust">(调仓后)</span></div>
          </div>
        </div>
      </div>
      
      <div class="tr" v-if="sellList && sellList.length > 0">
        <div class="col1 sel">卖出</div>
        <div class="col2 sells">
          <div class="line" v-for="item in sellList" :key="item.id">
            <div class="item">{{item.code}}</div>
            <div class="item">{{item.etfName}}</div>
            <div class="item">{{item.before}}</div>
            <div class="item"><span class="sell-font">-{{item.deal}}</span></div>
            <div class="item">{{item.after}}</div>
          </div>
        </div>
      </div>
      <div class="tr" v-if="buyList && buyList.length > 0">
        <div class="col1 buy">买入</div>
        <div class="col2 buys">
          <div class="line" v-for="item in buyList" :key="item.id">
            <div class="item">{{item.code}}</div>
            <div class="item">{{item.etfName}}</div>
            <div class="item">{{item.before}}</div>
            <div class="item"><span class="buy-font">+{{item.deal}}</span></div>
            <div class="item">{{item.after}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="total-line content">
        <div class=".buy-font">关注公众号获取第一手调仓信息</div>
        <div >
          <img src="http://img-flzt.czstep.com/banner/wechat.jpg" class="img"/>
        </div>
        <div class="">
           <span>扫描方法：截图并发送给自己的微信号，再长按识别图中二维码（产品使用过程中遇到任何问题，请联系微信号：flyinvest33）</span>
        </div>
        <div class="">
          <span>搜索公众号：<span class="buy-font">复来智投</span>也可以哦！</span>
        </div>
    </div>
    <div class="bottom-float" v-if="confirmFlag == true" @click="conChange">
      确认调仓
    </div>
  </div>
  
</template>
<script>
import {getChangeDetail} from '@/utils/model';
import {conUserChange} from '@/utils/model';
export default {
  data() {
    return {
      showDate: '',
      nextDate: '',
      buyList: [],
      sellList: [],
      confirmFlag: false
    }
  },
  onShow() {
    const date = this.$root.$mp.query.date || 0;
    console.log("date", date);
    var arr = date.split(/[- : \/]/);

    var tmpDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    console.log("tmpDate", tmpDate);
    
    tmpDate.setDate(tmpDate.getDate());
    var month = tmpDate.getMonth() + 1;
    var day = tmpDate.getDate();
    this.showDate = tmpDate.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
    console.log("showDate", this.showDate);

    tmpDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    tmpDate.setDate(tmpDate.getDate() + 1);
    var month = tmpDate.getMonth() + 1;
    var day = tmpDate.getDate();
    this.nextDate = tmpDate.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
    getChangeDetail(date).then(res => {
      this.buyList = res.buyList;
      this.sellList = res.sellList;
      this.confirmFlag = res.confirmFlag;
    })
  },
  methods:{
    conChange() {
      conUserChange()
        .then((res) => {
          this.showModal(res.msg, () => {
            if (res.code === 10000) {
              wx.switchTab({
                url: '/pages/my/main'
              });
            }else{
              this.showModal('确认失败', () => {
              });
            }
          });
        })
    },
     // 显示对话框
    showModal(content, sFun) {
      wx.showModal({
        title: '提示',
        content,
        success(res) {
          if (res.confirm) {
            sFun();
          }
        }
      })
    }
  }
}
function getFormatDate(arg) {
            if (arg == undefined || arg == '') {
                return '';
            }

            var re = arg + '';
            if (re.length < 2) {
                re = '0' + re;
            }

            return re;
        }
</script>


<style lang="less" scoped>
.bottom-float {
  width: 750rpx;
  height: 80rpx;
  background-color: #4768f3;
  font-size: 30rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  position: fixed;
  bottom: 0;
}
.img{
  width: 300rpx;
  height: 300rpx;
}
.total-line{
  margin: auto;
  align-content: center;
}
.buy-font{
  font-size: 30rpx;
  color:rgb(192, 32, 32);
  font-weight: bold;
}
.sell-font{
  font-size: 30rpx;
  color:rgb(36, 97, 12); 
  font-weight: bold;
}
.adjust{
  margin-top:10px;
  margin-bottom: 10px;  
  color: gray;
  font-size: 26rpx;
}
.table-area {
  width: 100%;
  background-color: #fff;
  padding:0 10rpx;
  font-size: 26rpx;
  .tr {
    display: flex;
    align-items: stretch;
    justify-content: center;
    .col1 {
      flex: 1 0 6%;
      text-align: center;
      font-size: 32rpx;
      letter-spacing: 10rpx;
      padding: 10rpx 0;
      border: 1rpx solid #dfdfdf;

      font-weight: bold;
      &.sel {
        background-color: rgb(150, 228, 119);
        border-top: 0;
      }
      &.buy {
        background-color: rgb(224, 75, 75);
        border-top: 0;
      }
    }
    .col2 {
      flex: 1 0 94%;
      .line {
        display: flex;
        align-items:center;
        justify-content: center;
        .item {
          height: 50rpx;
          line-height: 50rpx;
          border: 1rpx solid #dfdfdf;
          border-top: 0;
          border-left: 0;
          flex: 1 0 20%;
          text-align: center;
          vertical-align: middle;
        }
        &.title {
         .item {
           font-weight: bold;
           font-size: 30rpx;
           height: 80rpx;
           line-height: 80rpx;
           border-top: 1rpx solid #dfdfdf;
         }
        }
      }
      &.buys {
        background-color:rgb(241, 217, 217);
        border-top: 0;
      }
      &.sells {
        background-color:rgb(189, 238, 170);
        border-top: 0;
      }
    }
  }
}
.content{
  text-align: center;
  font-size: 30rpx;
  font-weight: bold;
}

</style>
