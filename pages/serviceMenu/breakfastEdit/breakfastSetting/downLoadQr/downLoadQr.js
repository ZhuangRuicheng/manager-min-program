// pages/serviceMenu/breakfastEdit/breakfastSetting/downLoadQr/downLoadQr.js
const app = getApp()
var util = require('../../../../../utils/util.js');
var InterFace = require('../../../../../utils/url.js');
var request = require('../../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payImgQr:'',
    freeImgQr:''
  },
  downImg: function (that, imgCode) {
    var loginToken = wx.getStorageSync("loginToken");
    wx.downloadFile({
      url: util.url + InterFace.breakfastQrCodeStream +'?hasPay='+ imgCode,
      header: {
        'content-type': 'application/json',
        'Token': loginToken
      },
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res);
            // that.setData({
            //   QrImg: 'data:image/png;base64,' + res.data.data.QrCode
            // })
            util.showToastMsg('保存成功');
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //重置二维码
  freshCode: function (that, params) {
    var that = this;
    var url = util.url + InterFace.resetBreakfastQr;
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg("重置成功")
      }else{
        util.showToastMsg(res.data.msg)
      }
      that.pay(that)
      that.free(that)
    };
    var failData = function(res){
      that.pay(that)
      that.free(that)
    };
    request.Request('POST', '加载中', url, params, successData, failData)
  },
  //下载付费二维码到相册
  payDownLoad:function(e){
    var that = this;
    var imgCode = 'true';
    that.downImg(that, imgCode)
  },
  //下载免费二维码到相册
  freeDownLoad:function(e){
    var that = this;
    var imgCode = 'false';
    that.downImg(that, imgCode)
  },
  //付费重置二维码
  payReset:function(e){
    var that = this;
    var params = {
      'hasPay':true
    };
    that.freshCode(that, params)
  },
  //免费重置二维码
  freeReset:function(e){
    var that = this;
    var params = {
      'hasPay': false
    };
    that.freshCode(that, params)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.pay(that)
    that.free(that)
  },
  pay:function(that){
    var url = util.url + InterFace.breakfastQrCodeBase64;
    var params = {
      'hasPay': true
    };
    var successData = function (res) {
      that.setData({
        payImgQr: 'data:image/png;base64,' + res.data.data.qrCodeBase64Str
      })
    };
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  free: function (that){
    var url = util.url + InterFace.breakfastQrCodeBase64;
    var params = {
      'hasPay': false
    }; 
    var successData = function(res){
      that.setData({
        freeImgQr: 'data:image/png;base64,' + res.data.data.qrCodeBase64Str
      })
    };
    var failData = function (res) { };
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