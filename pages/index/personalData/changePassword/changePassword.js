// pages/index/personalData/changePassword/changePassword.js
const app = getApp()
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initial:'',
    news:'',
    confirm:''
  },
  //更改密码
  formSubmit:function(e){
    var that = this;
    var initial = that.data.initial;
    var news = that.data.news;
    var confirm = that.data.confirm;
    var loginToken = wx.getStorageSync("loginToken");
    if (news == confirm){

      var url = util.url + InterFace.modifyPassword;
      var params = {
        'oldPassword': initial,
        'newPassword': news
      };
      var successData = function(res){
        if (res.data.code == 0) {
          util.showToastMsg("修改成功")
          setTimeout(function () {
            wx.redirectTo({
              url: '../../../index/index',
            })
          }, 1500)
        }else if(res.data.code == 10){
          util.showToastMsg(res.data.msg);
          wx.clearStorageSync("loginToken");
          setTimeout(function () {
            wx.redirectTo({
              url: '../../../login/login',
            })
          }, 1500)
        } else {
          util.showToastMsg(res.data.msg);
        }
      };
      var failData = function(res){};
      request.Request('POST', '正在提交', url, params, successData, failData)

    }else{
      util.showToastMsg("密码不一致，请重新输入！")
      return
    }
    
  },
  //文本框输入更改
  inputChange: function (e) {
    switch (e.currentTarget.id) {
      case 'initialInput':

        this.setData({
          initial: e.detail.value
        })
        break;
      case 'newInput':
        this.setData({
          news: e.detail.value
        })

        break;
      case 'conformInput':
        this.setData({
          confirm: e.detail.value
        })

        break;
    }
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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