// pages/orderManagement/hotelRerveDetails/hotelRerveDetails.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: [],
    orderInfo: [],
    value: '',
    disableds: '',
    status: '',
    color: '',
    orderId: 0,
    finishUserInfo: {},
    headerImage: util.imgUrl + '/header.png',
    show:true,
    refuse1:'抱歉，客房已满，暂时无法受理您的订单',
    refuse2:'抱歉，您的信息有误，未能受理您的订单，如有需要请核实信息后重新提交订单，谢谢',
    refuse3:'抱歉，因故未能受理您的订单',
    orderNo:''
  },
  //拒单发送请求
  refuse:function(e){
    var that = this;
    var reason = e.currentTarget.id;
    var orderNo = that.data.orderNo;
    var url = util.url + InterFace.refusalOrder;
    var params = {
      "orderNo": orderNo,
      "refusalReason": reason
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg("拒单成功")
        that.setData({
          show: true
        })
      }else{
        util.showToastMsg(res.data.msg)
      }
      var orderId = that.data.orderId;
        var params = {
          "orderId": orderId
        };
      setTimeout(function () {
        that.orderStatus(params, that);
      }, 1500)   
    };
    var failData = function(res){
      var orderId = that.data.orderId;
      var params = {
        "orderId": orderId
      };
      that.orderStatus(params, that);
    };
    request.Request('POST', '提交中', url, params, successData, failData)
  },
  //拒单按钮
  refuseBtn:function(e){
    this.setData({
      show: false,
      orderNo: e.currentTarget.dataset.orderno
    })
  },
  //取消按钮
  cancel:function(e){
    this.setData({
      show:true
    })
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
      var url = util.url + InterFace.hotelAcceptOrder;
      var orderNo = e.currentTarget.id;
      var params = {
        "orderNo": orderNo
      };
      var successData = function (res) {
        var params = {
          "orderId": orderId
        };
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
    var params = params;
    var successData = function(res){
      if(res.data.code == 0){
        that.setData({
          orderDetail: res.data.data.orderDetail,
          orderInfo: JSON.parse(res.data.data.orderDetail.orderInfo),
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