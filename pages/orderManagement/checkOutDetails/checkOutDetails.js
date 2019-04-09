// pages/orderManagement/checkOutDetails/checkOutDetails.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail:[],
    value: '',
    disableds: '',
    status: '',
    color: '',
    orderId: 0,
    finishUserInfo: {},
    headerImage: util.imgUrl + '/header.png'
  },
  accept: function (e) {
    var that = this;
    var status = that.data.orderDetail.status;
    var loginToken = wx.getStorageSync("loginToken");
    var orderId = that.data.orderId;
    if (status == 'ACCEPT') {
      var url = util.url + InterFace.completeOrder;
      var params = {
        "orderId": orderId
      };
      var successData = function (res) {
        if (res.data.code == 0) {
          util.showToastMsg('已完成')
          that.setData({
            value: '已完成',
            disableds: 'disabled',
            color: '#DCDCDC'
          })
        } else {
          util.showToastMsg(res.data, msg)
        }
        setTimeout(function () {
          that.orderStatus(params, that);
        }, 1500)
      };
      var failData = function (res) {
        that.orderStatus(params, that);
      };
      request.Request('POST', '提交中', url, params, successData, failData)

    } else {
      var url = util.url + InterFace.acceptOrder;
      var params = {
        "orderId": orderId
      };
      var successData = function (res) {
        if (res.data.code == 0) {
          util.showToastMsg('已受理')
        } else {
          util.showToastMsg(res.data.msg)
        }
        setTimeout(function () {
          that.orderStatus(params, that);
        }, 1500)
        
      };
      var failData = function (res) {
        that.orderStatus(params, that);
      };
      request.Request('POST', '提交中', url, params, successData, failData)
    }
  },
  //订单详情信息封装
  orderStatus: function (params, that) {
    var url = util.url + InterFace.getOrderDetail;
    var successData = function(res){
      if(res.data.code == 0){
        that.setData({
          orderDetail: res.data.data.orderDetail,
          finishUserInfo: res.data.data.finishUserInfo
        })
        switch (res.data.data.orderDetail.status) {
          case "SUBMIT":
            that.setData({
              value: "受理",
              disableds: ''
            })
            break;
          case "ACCEPT":
            that.setData({
              value: "完成",
              disableds: ''
            })
            break;
          case "FINISH":
            that.setData({
              value: "已完成",
              disableds: 'disabled'
            })
            break;
          case "OVERDUE":
            that.setData({
              value: "已过期",
              disableds: 'disabled'
            })
            break;
        }
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res){};
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderId = options.orderId;
    that.setData({
      orderId: orderId
    })
    var params = {
      "orderId": orderId
    };
    that.orderStatus(params, that);
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