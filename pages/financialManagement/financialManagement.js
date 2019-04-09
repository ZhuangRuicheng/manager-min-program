// pages/financialManagement/financialManagement.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:0,
    image:util.imgUrl+'/financialManagement.png',
    totalIncome:0,
    yesterdayIncome:0,
    payMethod:0,
    toDayInAmount: 0,
    withdrawAmount: 0,
    toDayOutAmount: 0,
  },
  putForwardMoney:function(e){
    wx.navigateTo({
      url: '../putForwardMoney/putForwardMoney',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转对账结算
  settlement:function(){
    var payMethod = this.data.payMethod;
    wx.navigateTo({
      url: './reconciliation/reconciliation?payMethod=' + payMethod,
    })
  },
  detailed:function(e){
    wx.navigateTo({
      url: './detailed/detailed',
      success: function(res) {},
    })
  },
  //获取金额
  getFinance:function(that){
    var url = util.url + InterFace.getFinance;
    var params = {};
    var successData = function (res) {
      if (res.data.code == 0) {
        if (res.data.data.payMethod == 1){
          that.setData({
            money: res.data.data.balance,
            payMethod: res.data.data.payMethod,
            yesterdayIncome: res.data.data.yesterdayIncome,
            totalIncome: res.data.data.totalIncome,
          })
        } else if (res.data.data.payMethod == 2){
          that.setData({
            money: res.data.data.balance,
            payMethod: res.data.data.payMethod,
            toDayInAmount: res.data.data.toDayInAmount,
            withdrawAmount: res.data.data.withdrawAmount,
            toDayOutAmount: res.data.data.toDayOutAmount,
          })
        }
        
      } else if (res.data.code == 10) {
        util.showToastMsg(res.data.msg);
        wx.clearStorageSync("loginToken");
        setTimeout(function () {
          wx.redirectTo({
            url: '../login/login',
          })
        }, 1500)
      } else {
        util.showToastMsg(res.data.msg);
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
    // that.getFinance(that);
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
    that.getFinance(that);
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