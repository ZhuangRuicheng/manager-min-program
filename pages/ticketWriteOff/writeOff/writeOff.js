// pages/serviceMenu/breakfastEdit/breakfastSetting/writeOff/writeOff.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    dataCount:{},
    vouchers:[]
  },
  //跳转到数字核销页面
  numWriteOff:function(e){
    wx.navigateTo({
      url: './numWriteOff/numWriteOff',
    })
  },
  //扫码核销
  scanQrCode:function(e){
    var that = this;
    var url = util.url + InterFace.scanCodeCancel;
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: function(res) {
        console.log(res)
          let q = decodeURIComponent(res.result);
          var params = {
            "qrCodeParameter": q
          };
          var successData = function (res) {
            if (res.data.code == 0) {
              setTimeout(function () {
                util.showToastMsg("核销成功")
              const innerAudioContext = wx.createInnerAudioContext()
              innerAudioContext.autoplay = true
              innerAudioContext.src = 'pages/voice/writeOffSuccess.mp3'
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
              })
              innerAudioContext.onError((res) => {
                console.log(res.errMsg)
                console.log(res.errCode)
              })
                }, 500)
            } else {
              setTimeout(function () {
              util.showToastMsg(res.data.msg)
                const innerAudioContext = wx.createInnerAudioContext()
                innerAudioContext.autoplay = true
                innerAudioContext.src = 'pages/voice/writeOffFail.mp3'
                innerAudioContext.onPlay(() => {
                  console.log('开始播放')
                })
                innerAudioContext.onError((res) => {
                  console.log(res.errMsg)
                  console.log(res.errCode)
                })
            }, 500)
            }
            setTimeout(function () {
            that.getCurrentBreakfastVouchers(that)
            }, 1500)
          };
          var failData = function (res) {
            that.getCurrentBreakfastVouchers(that)
           };
          request.Request('POST', '核销中', url, params, successData, failData)

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getCurrentBreakfastVouchers:function(that){
    var url = util.url + InterFace.getCurrentBreakfastVouchers;
    var params = {};
    var successData = function (res) {
      if (res.data.code == 0) {
        that.setData({
          dataCount: res.data.data.dataCount,
          vouchers: res.data.data.vouchers
        })
      } else {
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getCurrentBreakfastVouchers(that)
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
    var that = this;
    that.getCurrentBreakfastVouchers(that)
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
    var url = util.url + InterFace.getCurrentBreakfastVouchers;
    var len = that.data.vouchers.length;
    var updateTime = that.data.vouchers[len - 1].updateTime;
    console.log("updateTime:" + updateTime)
    var params = {
      "updateTime": updateTime,
      "pageSize":15
    };
    var successData = function (res) {
      if (res.data.code == 0) {
        that.setData({
          vouchers: that.data.vouchers.concat(res.data.data.vouchers)
        })
      } else {
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})