// pages/hotelInfoEdit/ShopownerHotline/ShopownerHotline.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone:''
  },
   //文本框输入
  inputChanged:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
     //表单提交
  formSubmit:function(e){
    var that = this;
    var phoneNumber = that.data.phone;
    var url = util.url + InterFace.saveMgrPhoneNumber;
    var params = {
      "phoneNumber": phoneNumber
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg(res.data.msg);
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res){};
    request.Request('POST', '提交中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = util.url + InterFace.getMgrPhoneNumber;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          phone: res.data.data.phoneNumber
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