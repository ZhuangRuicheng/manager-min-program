// pages/userManagement/userManagement.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  infoList:[],
    Input:'',
    pageNum: 1,
    isLastPage: false,
  },
  infoInput:function(e){
    this.setData({
      Input: e.detail.value
    })
  },
  search:function(e){
    var that = this;
    var queryCriteria = that.data.Input;
    var url = util.url + InterFace.queryCustomerList;
    var params = {
      "queryCriteria": queryCriteria
    };
    var successData = function(res){
      if(res.data.code == 0){
        that.setData({
          infoList: res.data.data.customers.list
        })
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res){};
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  details:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './details/details?id='+id,
    })
  },
  //用户信息查询

  queryCustomerList: function (that, params){
    var url = util.url + InterFace.queryCustomerList;
    var successData = function (res) {
      if (res.data.code == 0) {
        that.setData({
          infoList: res.data.data.customers.list,
          isLastPage: res.data.data.customers.isLastPage,
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
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var params = {
      "pageNum": 1,
      "pageSize": 10,
    };
    that.queryCustomerList(that, params);
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
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var pageNum = that.data.pageNum + 1;
    var url = util.url + InterFace.queryCustomerList;
    if (!that.data.isLastPage) {
      var params = {
        "pageNum": pageNum,
        "pageSize": 10,
      };
      var successData = function (res) {
        if (res.data.code == 0) {
          that.setData({
            infoList: that.data.infoList.concat(res.data.data.customers.list),
            isLastPage: res.data.data.customers.isLastPage,
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
      var failData = function (res) { };
      request.Request('GET', '加载中', url, params, successData, failData)
    } else {
      util.showToastMsg('已加载完全')
    }
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