// pages/dataStatistics/dataStatistics.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
import * as echarts from '../ec-canvas/echarts.min';

//访问数绘画canvas 统计图函数

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
  });
  canvas.setChart(chart);
  var option = {
    color: ['#ea5415', '#32c5e9', '#67e0e3'],
    tooltip: {
      show:false
    },
    legend: {
      selectedMode: false,
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        show: false,
        axisLabel: false
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['打扫房间', '早餐券', '退房', '会员', '迷你吧', '开发票','续住','店长在线','酒店预订'],
        axisLine: false,
        selectedMode: false,
        axisLabel: {
        color: '#333333',
        textStyle: {
            fontSize: 15
          }
        }
      }
    ],
    series: [

      {
        // name: '正面',
        type: 'bar',
        stack: '总量',
        clickable: false,
        label: {
          normal: {
            show: true
          }
        },
         data: [],
        itemStyle: {

        }
      },

    ]
  };
  //console.log("option.yAxis.data = titleData:"+option.yAxis[0].data)
  var loginToken = wx.getStorageSync("loginToken");
  var resultData = app.globalData.dateRange;
  switch (resultData) {
    case '今天':
      resultData = "DAY"
      break;
    case '本周':
      resultData = "WEEK"
      break;
    case '本月':
      resultData = "MONTH"
      break;
  }
  var url = util.url + InterFace.getStatisticsInfo;
  var params = {
    "scope": resultData
  };
  var successData = function(res){
    option.series[0].data[0] = res.data.data.pvStatistic["cleanRoom"];
    option.series[0].data[1] = res.data.data.pvStatistic["breakfastCoupon"];
    option.series[0].data[2] = res.data.data.pvStatistic["checkout"];
    option.series[0].data[3] = res.data.data.pvStatistic["vip"];
    option.series[0].data[4] = res.data.data.pvStatistic["miniBar"];
    option.series[0].data[5] = res.data.data.pvStatistic["invoice"];
    option.series[0].data[6] = res.data.data.pvStatistic["continueStay"];
    option.series[0].data[7] = res.data.data.pvStatistic["feedback"];
    option.series[0].data[8] = res.data.data.pvStatistic["hotelReserve"];
    chart.setOption(option);
    return chart;
  };
  var failData = function(res){};
  request.Request('GET', '加载中', url, params, successData, failData)
  chart.setOption(option);
  return chart;
}
//订单数绘画canvas统计图函数

let chartOrder = null;

function initChartOrder(canvas, width, height) {
  chartOrder = echarts.init(canvas, null, {
    width: width,
    height: height,
  });
  canvas.setChart(chartOrder);
  var option = {
    color: ['#ea5415', '#32c5e9', '#67e0e3'],
    tooltip: {
      show: false
    },
    legend: {
      selectedMode: false,
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        show: false,
        axisLabel: false
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['打扫房间', '早餐券', '退房', '会员', '迷你吧', '开发票', '续住', '店长在线','酒店预订'],
        axisLine: false,
        selectedMode: false,
        axisLabel: {
          color: '#333333',
          textStyle: {
            fontSize: 15
          }
        },
      }
    ],
    series: [

      {
        // name: '正面',
         type: 'bar',
         stack: '总量',
        clickable: false,
        label: {
          normal: {
            show: true
          }
        },
        data: [],
        itemStyle: {
          
        }
      },

    ]
  };
   var resultData = app.globalData.dateRange;
  switch (resultData){
    case '今天':
      resultData = "DAY"
      break;
    case '本周':
      resultData = "WEEK"
      break;
    case '本月':
      resultData = "MONTH"
      break;
  }
  var url = util.url + InterFace.getStatisticsInfo;
  var params = {
    "scope": resultData
  };
  var successData = function(res){
    option.series[0].data[0] = res.data.data.orderStatistic["cleanRoom"];
    option.series[0].data[1] = res.data.data.orderStatistic["breakfastCoupon"];
    option.series[0].data[2] = res.data.data.orderStatistic["checkout"];
    option.series[0].data[3] = res.data.data.orderStatistic["vip"];
    option.series[0].data[4] = res.data.data.orderStatistic["miniBar"];
    option.series[0].data[5] = res.data.data.orderStatistic["invoice"];
    option.series[0].data[6] = res.data.data.orderStatistic["continueStay"];
    option.series[0].data[7] = res.data.data.orderStatistic["feedback"];
    option.series[0].data[8] = res.data.data.orderStatistic["hotelReserve"];
    chartOrder.setOption(option);
    return chartOrder;
  };
  var failData = function(res){};
  request.Request('GET', '加载中', url, params, successData, failData)
  chartOrder.setOption(option);
  return chartOrder;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart,
    },
    ecOrder: {
      onInit: initChartOrder,
    },
    array: ['今天', '本周', '本月'],
    objectArray: [
      {
        id: 0,
        name: '今天'
      },
      {
        id: 1,
        name: '本周'
      },
      {
        id: 2,
        name: '本月'
      }
    ],
    index: 0,
   
   
//满意度
    evaluateDissatisfied:0,
    evaluateSatisfied:0,
    forward:0,
    newAddCustomer:0,
    paidCustomer:0,
    share:0,
    visitCustomer:0,
    dataExplain:false,
    income:0,
    startupCount: 0,
    stayTimeAvg: 0,
    allCount:0,
    payCount:0,
    PVallCount:0,
    percent:0,
    left:40,
    right:0,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })

    var dateRange = this.data.array[this.data.index];
    app.globalData.dateRange = dateRange;
    wx.redirectTo({
      url: '../dataStatistics/dataStatistics?dateRange=' + dateRange,
    })
  
  },
  //判断选中的日期累计访问以及满意度数据统计，函数封装
  formatTime:function(dateRange){
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var resultDate;
    switch (dateRange) {
      case '今天':
        resultDate = "DAY"
        break;
      case '本周':
        resultDate = "WEEK"
        break;
      case '本月':
        resultDate = "MONTH"
        break;
    }
    var url = util.url + InterFace.getStatisticsInfo;
    var params = {
      "scope": resultDate
    };
    var successData = function(res){
      if(res.data.code == 0){
        that.setData({
          forward: res.data.data.forward,
          newAddCustomer: res.data.data.newCust,
          share: res.data.data.share,
          visitCustomer: res.data.data.visitCust,
          paidCustomer: res.data.data.payCust,
          income: res.data.data.income,
          startupCount: res.data.data.startupCount,
          stayTimeAvg: res.data.data.stayTimeAvg,
          allCount: res.data.data.orderStatistic.allCount,
          payCount: res.data.data.orderStatistic.payCount,
          PVallCount: res.data.data.pvStatistic.allCount
        })
        //满意度
        var evaluateDissatisfied = res.data.data.dissatisfaction;
        var evaluateSatisfied = res.data.data.satisfaction;
        if (evaluateSatisfied == 0 && evaluateDissatisfied == 0) {
          that.setData({
            evaluateDissatisfied: 0,
            evaluateSatisfied: 0
          })

        } else {
          var percentSatisfied = evaluateDissatisfied + evaluateSatisfied;
          var percent = (percentSatisfied / 100);
          //var evaluateDissatisfieds = (percent * percentSatisfied).toFixed(0);
          var evaluateDissatisfieds = ((evaluateDissatisfied / percentSatisfied) * 100).toFixed(0);
          var evaluateSatisfieds = (100 - evaluateDissatisfieds).toFixed(0);
          var right = (evaluateSatisfieds * 6.7) - 82;
          var left = (evaluateSatisfieds * 6.7) + 40;
          console.log(evaluateSatisfieds)
          that.setData({
            evaluateDissatisfied: evaluateDissatisfieds,
            evaluateSatisfied: evaluateSatisfieds,
            percent: evaluateSatisfieds,
            left: left,
            right: right
          })
          console.log("evaluateSatisfied:" + right)

        }
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res){};
    request.Request('GET', '加载中', url, params, successData, failData)
    return dateRange;
  },
  //数据说明显示
  dataExplain:function(e){
    this.setData({
      dataExplain:true
    })
  },
  //取消按钮
  cancel:function(e){
    this.setData({
      dataExplain:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(options.dateRange){
      var dateRange = options.dateRange;
      var array = this.data.array;
      for (var i = 0; i < array.length; i++) {
        if (array[i] == dateRange) {
          this.setData({
            index: i
          })
          var dateRange = this.data.array[this.data.index];
          app.globalData.dateRange = dateRange;
          this.formatTime(dateRange);
        }
      }
    }else{
      var dateRange = this.data.array[this.data.index];
      app.globalData.dateRange = dateRange;
      this.formatTime(dateRange);
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var dateRange = this.data.array[this.data.index];
    app.globalData.dateRange = dateRange;
    wx.redirectTo({
      url: '../dataStatistics/dataStatistics?dateRange=' + dateRange,
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "盘活入住客人，带来更多收益，客房助手来啦！~",
      path: 'pages/login/login',
      imageUrl: util.imgUrl + '/shareImg.png'
    }
  }
})