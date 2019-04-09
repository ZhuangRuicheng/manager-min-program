// pages/financialManagement/detailed/putForwardDetails/putForwardDetails.js
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hr1Color:'#5bb135',
    hr2Color: '#c0bfbf',
    submitColor:'#666666',
    submitSize:'30',
    handleColor:'#333333',
    handleSize:'34',
    successColor:'#666666',
    successSize:'30',
    payInfo:{}
  },
  downLoadBill:function(e){
    wx.navigateTo({
      url: './downLoadBill/downLoadBill',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var financeDetailId = options.financeDetailId;
    var url = util.url + InterFace.getFinanceDetail;
    var params = {
      'financeDetailId': financeDetailId
    };
    var successData = function(res){
      that.setData({
        payInfo: res.data.data.withdrawCashInfo
      })
    };
    var failData = function(res){};
    request.Request('GET', '加载中', url, params, successData, failData)
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