// pages/login/login.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    password:'',
    hasOpenId:''
  },
  //文本框输入更改
  inputChange: function (e) {
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

  // 登录验证函数
  login:function(e){
    var account = this.data.account;
    var password = this.data.password;
    if (account == '') {
      util.showToastMsg('请输入您的账号')
      return
    } else {
      if (util.stringIsEmpty(password)) {
        util.showToastMsg('请输入您的密码')
        return
      }else{
        var that = this;
        var phoneNumber = that.data.account;
        var password = that.data.password;
        wx.request({
          url: util.url +InterFace.login,
          data:{
            'phoneNumber': phoneNumber,
            'password': password
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          success: function(res) {
            console.log(res)
            if (res.data.code == 0) {
              util.showToastMsg('登录成功');
              wx.setStorageSync("hotelInfo", res.data.data);
              wx.setStorageSync("loginToken", res.data.data.loginToken);
              that.setData({
                hasOpenId: res.data.data.hasOpenId
              })
              wx.redirectTo({
                url: '../index/index',
                success: function (res) {
                },
                fail: function (res) { },
                complete: function (res) { },
              })
            } else {
              util.showToastMsg(res.data.msg)
            }
            var loginToken = res.data.data.loginToken;
            if (!res.data.data.hasOpenId){
              wx.login({
                success: function(res) {
                  wx.request({
                    url: util.url + InterFace.loginWechat,
                    data: {
                      "code":res.code
                    },
                    header: {
                      'content-type': 'application/json',
                      'Token': loginToken
                    },
                    method: 'POST',
                    dataType: 'json',
                    responseType: 'text',
                    success: function (res) { 
                      console.log(res)
                    },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                },
                fail: function(res) {},
                complete: function(res) {},
              })
       
            }
          },
          fail: function(res) {
            wx.showModal({
              title: '网络请求有误',
              content: '网络有误，请检查网络',
              confirmText: '确定',
              showCancel: false,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          },
          complete: function(res) {},
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loginToken = wx.getStorageSync("loginToken");
    if (loginToken != '') {
      wx.redirectTo({
        url: '../index/index'
      })
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