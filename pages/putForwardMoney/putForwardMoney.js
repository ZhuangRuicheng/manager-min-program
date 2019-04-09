// pages/putForwardMoney/putForwardMoney.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '',
    state:'',
    infoState:'',
    enterpriseName: '',
    bankName: '',
    bankAccount: '',
    moneyC:''
  },
  dataInput:function(e){
    var enterpriseName = this.data.enterpriseName;
    var bankName = this.data.bankName;
    var bankAccount = this.data.bankAccount;
    wx.navigateTo({
      url: './createInfo/createInfo?enterpriseName=' + enterpriseName + '&bankName=' + bankName + '&bankAccount=' + bankAccount,
    })
  },
  inputChange:function(e){
    this.setData({
      moneyC: e.detail.value
    })
  },
  //全部提现
  allMoney:function(e){
    this.setData({
      moneyC:this.data.money
    })
  },
  putForward:function(e){
    var that = this;
    wx.showModal({
      title: '提现提示',
      content: '是否提现？',
      showCancel: true,
      cancelText: '取消',
     
      confirmText: '确定',
 
      success: function (res) {
        if (res.confirm) {
        
          var loginToken = wx.getStorageSync("loginToken");
          var money = that.data.moneyC;
          var formId = e.detail.formId;
          wx.request({
            url: util.url + InterFace.withdrawCash,
            data: {
              "money": money,
              "formId": formId
            },
            header: {
              'content-type': 'application/json',
              'Token': loginToken
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if(res.data.code == 0){
                util.showToastMsg('提现成功')
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 1500)
              }else{
                util.showToastMsg(res.data.msg)
              }

            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取可用金额请求
    var that = this;
    var url = util.url + InterFace.getHotelMoney;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          money: res.data.data.balance
        })
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
    var failData = function(res){};
    request.Request('GET', '加载中', url, params, successData, failData)
    //获取银行信息
    that.getBankAccountInfo(that);
  },
  //获取银行信息

  getBankAccountInfo:function(that){
    var url = util.url + InterFace.getBankAccountInfo;
    var params = {};
    var successData = function(res){
      if (res.data.data.bankAccount == '') {
        that.setData({
          state: true,
          infoState: false
        })
      } else {
        that.setData({
          state: false,
          infoState: true,
          enterpriseName: res.data.data.enterpriseName,
          bankName: res.data.data.bankName,
          bankAccount: res.data.data.bankAccount
        })
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
    //获取可用金额请求
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.request({
      url: util.url + InterFace.getHotelMoney,
      header: {
        'content-type': 'application/json',
        'Token': loginToken
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          money: res.data.data.balance
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    //获取银行信息
    wx.request({
      url: util.url + InterFace.getBankAccountInfo,
      header: {
        'content-type': 'application/json',
        'Token': loginToken
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.data.bankAccount == '') {
          that.setData({
            state: true,
            infoState: false
          })
        } else {
          that.setData({
            state: false,
            infoState: true,
            enterpriseName: res.data.data.enterpriseName,
            bankName: res.data.data.bankName,
            bankAccount: res.data.data.bankAccount
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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