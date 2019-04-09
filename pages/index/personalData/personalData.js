// pages/index/personalData/personalData.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImage: util.imgUrl+'/header.png',
    CONTINUE_STAY:false,
    VIP:false,
    CHECKOUT:false,
    CLEAN_ROOM:false,
    MINI_BAR:false,
    FEEDBACK:false,
    INVOICE:false,
    HOTEL_RESERVE:false,
    name: '',
    position: '',
    phone: '',
    personalImage: '',
    ORDER_ACCEPT:false
  },
//跳转到修改密码页面
  changePassword:function(e){
    wx.navigateTo({
      url: './changePassword/changePassword',
    })
  },
  //更换头像
  getImage:function(e){
     var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: util.url + InterFace.imageUpload+'?size=SIZE_1',
          filePath: tempFilePaths[0],
          name: 'imageFile',
          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          success: function (res) {
            console.log(res)
           var headerImage = JSON.parse(res.data).data.imgUrl
            that.setData({
              personalImage: headerImage
            })
            console.log(JSON.parse(res.data).data.imgUrl)
            var url = util.url + InterFace.saveUserImage;
            var params = {
              "userImage": headerImage
            };
            var successData = function(res){
                console.log(res)
                util.showToastMsg(res.data.msg)
            };
            var failData = function(res){};
            request.Request('POST', '请稍候', url, params, successData, failData)
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //退出登录按钮
  close: function (e) {
    wx.showModal({
      title: '退出提示',
      content: '确定要退出吗',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync("hotelInfo");
          wx.removeStorageSync("loginToken");
          wx.removeStorageSync("logs");
          wx.reLaunch({
            url: '../../login/login',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var permissions = wx.getStorageSync("permissions");
    var name = options.name;
    var position = options.position;
    var phone = options.phone;
    var personalImage = options.personalImage;
    console.log("personalImage:" + personalImage)
    this.setData({
      name: name,
      position: position,
      phone: phone,
      personalImage: personalImage,
    })

    for(var i = 0;i<permissions.length;i++){
      switch(permissions[i]){
        case "CONTINUE_STAY":
        this.setData({
          CONTINUE_STAY: true,
        })
        break;
        case "VIP":
          this.setData({
            VIP: true,
          })
          break;
        case "CHECKOUT":
          this.setData({
            CHECKOUT: true,
          })
          break;
        case "CLEAN_ROOM":
          this.setData({
            CLEAN_ROOM: true,
          })
          break;
        case "MINI_BAR":
          this.setData({
            MINI_BAR: true,
          })
          break;
        case "FEEDBACK":
        this.setData({
          FEEDBACK: true,
        })
        break;

        case "INVOICE":
          this.setData({
            INVOICE: true,
          })
          break;
        case "ORDER_ACCEPT":
          this.setData({
            ORDER_ACCEPT: true,
          })
          break;
        case "HOTEL_RESERVE":
          this.setData({
            HOTEL_RESERVE: true,
          })
          break;
          default:break;
      }
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

  }
})