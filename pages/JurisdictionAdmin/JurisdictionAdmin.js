// pages/JurisdictionAdmin/JurisdictionAdmin.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImage: util.imgUrl+'/header.png',
    name:"",
    position:'',
    userInfo:[],
    isDisalbe:''
  },
   //自定义函数
  newAccount:function(e){
    wx.navigateTo({
      url: './newAccount/newAccount',
    })
  },
  detail:function(e){
    var userId = e.currentTarget.dataset.id;
    var position = e.currentTarget.dataset.position;
    wx.navigateTo({
      url: './modifyJurisdiction/modifyJurisdiction?userId=' + userId,
    })
  },
  //获取用户信息函数
  getUsers:function(that){
    var url = util.url + InterFace.getUsers;
    var params = {
      "pageNum": 1,
      "pageSize": 1000
    };
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          userInfo: res.data.data.list,
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取用户权限信息函数
   that.getUsers(that);
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
    var that = this;
    //获取用户权限信息函数
    that.getUsers(that);
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
      imageUrl: util.imgUrl+'/shareImg.png'
    }
  }
})