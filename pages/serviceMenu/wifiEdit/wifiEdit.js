// pages/hotelInfoEdit/wifiEdit/wifiEdit.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    password:''
  },
  formSubmit:function(e){
    var that = this;
    var account = that.data.account;
    var password = that.data.password;
    var url = util.url + InterFace.saveWifiInfo;
    var params = {
      "account": account,
      "password": password
    };
    var successData = function(res){
     if(res.data.code == 0){
       util.showToastMsg("提交成功")
       setTimeout(function () {
         wx.navigateBack({
           delta: 1
         })
       }, 1500)
     }else{
       util.showToastMsg(res.data.msg)
     }
    };
    var failData = function(res){};
    request.Request('POST', '提交中', url, params, successData, failData)
  },
     //文本输入框
  inputChanged: function (e) {
    switch (e.currentTarget.id) {
      case 'account':

        this.setData({
          account: e.detail.value
        })

        break;
      case 'password':
        this.setData({
          password: e.detail.value
        })

        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = util.url + InterFace.getWifiInfo;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          account: res.data.data.account,
          password: res.data.data.password
        })
      } else if (res.data.code == 10) {
        util.showToastMsg(res.data.msg);
        wx.clearStorageSync("loginToken");
        setTimeout(function () {
          wx.redirectTo({
            url: '../../login/login',
          })
        }, 1500)
      } else {
        util.showToastMsg(res.data.msg);
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