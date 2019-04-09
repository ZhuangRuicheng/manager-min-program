// pages/serviceMenu/serviceMenu.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiValue: false,
    vipValue: false,
    checkOutValue: false,
    breakfastValue: false,
    selfValue: false,
    storeValue: false,
    mealsValue: false,
    invoiceValue: false,
    HotLineValue: false,
    managerValue: false,
    clearValue: false,
  },
  //店长热线
  ShopownerHotline: function(e) {
    wx.navigateTo({
      url: './ShopownerHotline/ShopownerHotline',
    })
  },
  //店长在线
  managerOnline: function(e) {
    wx.navigateTo({
      url: './managerOnline/managerOnline',
    })
  },
  //wifi
  wifi: function(e) {
    wx.navigateTo({
      url: './wifiEdit/wifiEdit',

    })
  },
  vip: function(e) {
    wx.navigateTo({
      url: './vipEdit/vipEdit',

    })
  },
  storeEdit: function(e) {
    wx.navigateTo({
      url: './storeEdit/storeEdit',

    })
  },
  //跳转至客房送餐
  mealsEdit: function(e) {
    wx.navigateTo({
      url: './mealsEdit/mealsEdit',

    })
  },
  //跳转至发票信息录入
  invoiceEdit: function(e) {
    wx.navigateTo({
      url: './invoiceEdit/invoiceEdit',

    })
  },
  breakfast: function(e) {
    wx.navigateTo({
      url: './breakfastEdit/breakfastSetting/breakfastSetting',

    })
  },
  // switch函数

  wifiSwitchChange: function(e) {
    if (e.detail.value) {
      this.setData({
        wifiValue: true
      })
    } else {
      this.setData({
        wifiValue: false
      })
    }
    //控件选择状况更新
    var that = this;
    var params = {
      "WIFI": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  breakfastSwitchChange: function(e) {
    if (e.detail.value) {
      this.setData({
        breakfastValue: true
      })
    } else {
      this.setData({
        breakfastValue: false
      })
    }
    //控件选择状况更新
    var that = this;
    var params = {
      "BREAKFAST_COUPON": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  selfSwitchChange: function(e) {

    //控件选择状况更新
    var that = this;
    var params = {
      "CONTINUE_STAY": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  clearSwitchChange: function(e) {

    //控件选择状况更新
    var that = this;
    var params = {
      "CLEAN_ROOM": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  storeSwitchChange: function(e) {

    if (e.detail.value) {
      this.setData({
        storeValue: true
      })
    } else {
      this.setData({
        storeValue: false
      })
    }
    //控件选择状况更新
    var that = this;
    var params = {
      "MINI_BAR": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  mealsSwitchChange: function(e) {
    if (e.detail.value) {
      this.setData({
        mealsValue: true
      })
    } else {
      this.setData({
        mealsValue: false
      })
    }
   // 控件选择状况更新
    var that = this;
    var params = {
      "MEAL": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);
  },
  invoiceSwitchChange: function(e) {

    if (e.detail.value) {
      this.setData({
        invoiceValue: true
      })
    } else {
      this.setData({
        invoiceValue: false
      })
    }
    //控件选择状况更新
    var that = this;
    var params = {
      "INVOICE": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  checkOutSwitchChange: function(e) {

    //控件选择状况更新
    var that = this;
    var params = {
      "CHECKOUT": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  VipSwitchChange: function(e) {

    if (e.detail.value) {
      this.setData({
        vipValue: true
      })
    } else {
      this.setData({
        vipValue: false
      })
    }
    //控件选择状况更新
    var that = this;
    var params = {
      "VIP": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  HotLineSwitchChange: function(e) {

    if (e.detail.value) {
      this.setData({
        HotLineValue: true
      })
    } else {
      this.setData({
        HotLineValue: false
      })
    }
    //控件选择状况更新
    var that = this;
    var params = {
      "MGR_PHONE_NUMBER": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  managerSwitchChange: function(e) {

    if (e.detail.value) {
      this.setData({
        managerValue: true
      })
    } else {
      this.setData({
        managerValue: false
      })
    }
    //控件选择状况更新
    var that = this;
    var params = {
      "FEEDBACK": e.detail.value
    };
    var url = util.url + InterFace.updateHotelFunctionStatus;
    that.switchs(params, url);

  },
  //switch组件请求函数封装
  switchs: function(params, url) {
    var loginToken = wx.getStorageSync("loginToken");
    wx.request({
      url: url,
      data: params,
      header: {
        'content-type': 'application/json',
        'Token': loginToken
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var url = util.url + InterFace.getHotelFunctionStatus;
    var params = {};
    var successData = function(res) {
      if (res.data.code == 0) {
        that.setData({
          wifiValue: res.data.data.WIFI,
          vipValue: res.data.data.VIP,
          checkOutValue: res.data.data.CHECKOUT,
          breakfastValue: res.data.data.BREAKFAST_COUPON,
          selfValue: res.data.data.CONTINUE_STAY,
          storeValue: res.data.data.MINI_BAR,
          invoiceValue: res.data.data.INVOICE,
          HotLineValue: res.data.data.MGR_PHONE_NUMBER,
          managerValue: res.data.data.FEEDBACK,
          clearValue: res.data.data.CLEAN_ROOM,
          mealsValue: res.data.data.MEAL
        })
      } else if (res.data.code == 10) {
        util.showToastMsg(res.data.msg);
        wx.clearStorageSync("loginToken");
        setTimeout(function() {
          wx.reLaunch({
            url: '../login/login',
          })
        }, 1500)
      } else {
        util.showToastMsg(res.data.msg);
      }
    };
    var failData = function(res) {};
    request.Request('GET', '加载中', url, params, successData, failData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})