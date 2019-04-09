// pages/financialManagement/reconciliation/reconciliation.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payMethod:0,
    WxSettleList: [], // 微信支付
    SettleList: [],  // 爱农支付
    pageNum: 1,
    viewShow:false
  },
  preventTouchMove:function(e){},
  //取消弹出层
  cancel:function(){
    this.setData({
      viewShow: false
    })
  },
  //查看爱农账单
  viewOrder:function(){
    this.setData({
      viewShow: true
    })
  },
  //下载账单
  downloadOrder:function(){
    wx.navigateTo({
      url: '../detailed/putForwardDetails/downLoadBill/downLoadBill',
    })
  },
//爱农支付对账单
  getAnSettleList: function (that, params, successData){
    var url = util.url + InterFace.getAnSettleList;
    var params = params;
    var successData = successData;
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  //微信支付对账单
  getMdWxSettleList: function (that, params, successData) {
    var url = util.url + InterFace.getMdWxSettleList;
    var params = params;
    var successData = successData;
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      payMethod: options.payMethod
    })
    if(options.payMethod == 1){
      var params = {
        "pageNum": 1,
        "pageSize": 20
      };
      var successData = function (res) {
        if (res.data.code == 0) {
          that.setData({
            WxSettleList: res.data.data
          })
        }
      };
      that.getMdWxSettleList(that, params, successData)
    }else if(options.payMethod == 2){
      var params = {
        "pageNum":1,
        "pageSize":20
      };
      var successData = function (res) {
        if (res.data.code == 0) {
          that.setData({
            SettleList: res.data.data
          })
        }
      };
      that.getAnSettleList(that, params, successData)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var payMethod = that.data.payMethod;
    var pageNum = that.data.pageNum+1;
    if(payMethod == 1){
      var params = {
        "pageNum": 1,
        "pageSize": 10
      };
      var successData = function (res) {
        if (res.data.code == 0) {
          that.setData({
            WxSettleList: that.data.WxSettleList.concat(res.data.data),
          })
        }
      };
      that.getMdWxSettleList(that, params, successData)
    }else if(payMethod == 2){
      var params = {
        "pageNum": pageNum,
        "pageSize": 10
      };
      var successData = function (res) {
        if (res.data.code == 0) {
          that.setData({
            SettleList: that.data.SettleList.concat(res.data.data),
          })
        }
      };
      that.getAnSettleList(that, params, successData)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})