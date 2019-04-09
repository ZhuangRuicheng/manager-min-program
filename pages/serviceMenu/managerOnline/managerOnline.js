// pages/hotelInfoEdit/managerOnline/managerOnline.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '您好，我是本店经理，感谢您下榻本酒店，入住期间有任何问题和建议您都可以给我留言, 我会在第一时间处理回复您的建议，期待与您携手共创酒店更美好的未来，谢谢！',
    feedBackContent:''
  },
  textareaInput:function(e){
    this.setData({
      feedBackContent: e.detail.value
    })
  },
  //填入模板
  mode:function(e){
    this.setData({
      feedBackContent: '您好，我是本店经理，感谢您下榻本酒店，入住期间有任何问题和建议您都可以给我留言, 我会在第一时间处理回复您的建议，期待与您携手共创酒店更美好的未来，谢谢！'
    })
  },
  formSubmit:function(e){
    var that = this;
    var managerLeaveMessage = that.data.feedBackContent;
    var url = util.url + InterFace.saveManagerLeaveMessage;
    var params = {
      "managerLeaveMessage": managerLeaveMessage
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg('提交成功');
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
  //在线留言
  getManagerLeaveMessage:function(that){
    var url = util.url + InterFace.getManagerLeaveMessage;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          feedBackContent: res.data.data.managerLeaveMessage
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getManagerLeaveMessage(that);
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