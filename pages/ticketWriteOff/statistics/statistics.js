// pages/serviceMenu/breakfastEdit/breakfastSetting/statistics/statistics.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: [],
    index: 0,
    total:0,
    used:0,
    noUsed:0,
    pay:0,
    noPay:0,
    dateDetails:[],
    monthDay:[]
  },
  bindPickerChange(e) {
    var that = this;
   // console.log('picker发送选择改变，携带值为', this.data.monthDay[e.detail.value])
    that.setData({
      index: e.detail.value
    })
    var monthDay = this.data.monthDay[e.detail.value];
    var url = util.url + InterFace.BreakfastDataByMonth;
    var successData = function (res) {
      if (res.data.code == 0) {
        that.setData({
          total: res.data.data.total,
          used: res.data.data.used,
          noUsed: res.data.data.noUsed,
          pay: res.data.data.pay,
          noPay: res.data.data.noPay,
          dateDetails: res.data.data.dateDetails
        })
      }
      else {
        util.showToastMsg(res.data.msg)
      }
    };
    var params = {
      "month": monthDay
    };
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData);
  },
  //获取早餐券统计
  BreakfastDataByMonth: function (monthDay,that){
 var url = util.url + InterFace.BreakfastDataByMonth;
    var successData = function (res) {
      if (res.data.code == 0) {
       that.setData({
         total: res.data.data.total,
         used: res.data.data.used,
         noUsed: res.data.data.noUsed,
         pay: res.data.data.pay,
         noPay: res.data.data.noPay,
         dateDetails: res.data.data.dateDetails
       })
      }
      else {
        util.showToastMsg(res.data.msg)
      }
    };
    var params = {
      "month": monthDay
    };
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取月份请求
    var url = util.url + InterFace.getBreakfastMonth;
    
    var successData = function (res) {
      if (res.data.code == 0) {
        var month = [];
        var monthDay = [];
        for (var i = 0; i < res.data.data.months.length;i++){
          month.push(res.data.data.months[i].value)
          monthDay.push(res.data.data.months[i].key)
        }
       
        that.setData({
          month: month,
          monthDay: monthDay
        })
        that.BreakfastDataByMonth(monthDay[0],that)
      }
      else {
        util.showToastMsg(res.data.msg)
      }
    };
    var params = {};
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData);
    
   //获取早餐券统计请求
   
   
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

  }
})