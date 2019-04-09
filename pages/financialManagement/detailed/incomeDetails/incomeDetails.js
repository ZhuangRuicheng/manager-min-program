// pages/financialManagement/detailed/incomeDetails/incomeDetails.js
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payInfo: {},
    orderInfo:{},
    orderType:'',
    financeDetailId:0,
    hide:false,
    detailType:'',
    orderId:0
  },
//查看订单详情
  viewDetails:function(e){

    var orderId = this.data.orderInfo.orderId;
    var orderType = e.currentTarget.id;
    switch (orderType){
      case '3':
      wx.navigateTo({
        url: '../../../orderManagement/storeDetails/storeDetails?orderId=' + orderId,
      })
      break;
      case '4':
      wx.navigateTo({
        url: '../../../orderManagement/vipDetails/vipDetails?orderId=' + orderId,
      })
      break;
      case '6':
        wx.navigateTo({
          url: '../../../orderManagement/mealsDetails/mealsDetails?orderId=' + orderId,
        })
        break;
      case '1':
      wx.navigateTo({
        url: '../../../orderManagement/hotelRerveDetails/hotelRerveDetails?orderId=' + orderId,
      })
      default:break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var financeDetailId = options.financeDetailId;
    that.setData({
      financeDetailId: financeDetailId
    })
    var url = util.url + InterFace.getFinanceDetail;
    var params = {
      'financeDetailId': financeDetailId
    };
    var successData = function(res){
      if(res.data.code == 0){
        var orderType;
        var hide;
        switch (res.data.data.detailType) {
          case 3:
            orderType = '迷你吧';
            hide = false;
            break;
          case 4:
            orderType = '办理会员';
            hide = false;
            break;
            console.log("订单类型：" + orderType)
          case 2:
            orderType = '早餐券';
            hide = true;
            console.log("订单类型：" + orderType)
            break;
          case 5:
            orderType = '打赏';
            hide = true;
            break;
          case 6:
            orderType = '客房送餐';
            hide = false;
            break;
          case 1:
            orderType = '酒店预订';
            hide = false;
            break;
          default: break;
        }
        that.setData({
          payInfo: res.data.data.payInfo,
          orderInfo: res.data.data.orderInfo,
          orderType: orderType,
          hide: hide,
          detailType: res.data.data.detailType,
          // orderId: res.data.data.orderInfo.orderId
        })
      }else{
        util.showToastMsg(res.data.msg);
      }
      that.setData({
        payInfo: res.data.data.payInfo,
        orderInfo: res.data.data.orderInfo,
        orderType: orderType,
        hide: hide,
        detailType: res.data.data.detailType,
        // orderId: res.data.data.orderInfo.orderId
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