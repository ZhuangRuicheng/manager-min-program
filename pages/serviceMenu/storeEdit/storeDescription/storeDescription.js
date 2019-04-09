// pages/hotelInfoEdit/storeEdit/storeDescription/storeDescription.js
const app = getApp()
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedBackContent: ''
  },
  textareaInput: function (e) {
    this.setData({
      feedBackContent: e.detail.value
    })
  },
  formSubmit:function(e){
    var that = this;
    var managerLeaveMessage = that.data.feedBackContent;
    var url = util.url + InterFace.updateMiniBarInfo;
    var params = {
      "description": managerLeaveMessage
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg('提交成功');
        that.setData({
          feedBackContent: ''
        })
      }else{
        util.showToastMsg(res.data.msg)
      }
      wx.navigateBack({
        delta: 1,
      })
    };
    var failData = function(res){};
    request.Request('POST', '提交中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = util.url + InterFace.getMiniBarInfo;
    var params = {};
    var successData = function(res){
      if(res.data.code == 0){
        that.setData({
          feedBackContent: res.data.data.description
        })
      }else{
        util.showToastMsg(res.data.msg)
      }
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
    return {
      title: "盘活入住客人，带来更多收益，客房助手来啦！~",
      path: 'pages/login/login',
      imageUrl: util.imgUrl + '/shareImg.png'
    }
  }
})