// pages/hotelInfoEdit/storeEdit/storeEdit.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImage:util.imgUrl+'/header.png',
    text:''
  },
  goodsClassify:function(e){
wx.navigateTo({
  url: './goodsClassify/goodsClassify',
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
  },
  goodsContent:function(e){
    wx.navigateTo({
      url: './goodsContent/goodsContent',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  storeDescription:function(e){
    wx.navigateTo({
      url: './storeDescription/storeDescription',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 获取图片函数
  getImage: function (e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
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
              headerImage: headerImage
            })
            console.log(JSON.parse(res.data).data.imgUrl)
            //更新迷你吧
            var url = util.url + InterFace.updateMiniBarInfo;
            var params = {
              "logoUrl": headerImage
            };
            var successData = function(res){
              if(res.data.code == 0){
                util.showToastMsg("更改成功")
              }else{
                util.showToastMsg(res.data.msg)
              }
              that.getMiniBarInfo(that)
            };
            var failData = function(res){
              that.getMiniBarInfo(that)
            };
            request.Request('POST', '提交中', url, params, successData, failData)
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取迷你吧信息
  getMiniBarInfo:function(that){
    var url = util.url + InterFace.getMiniBarInfo;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          headerImage: res.data.data.logoUrl,
          text: res.data.data.description
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
    var failData = function(res){}
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getMiniBarInfo(that)
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
    that.getMiniBarInfo(that)
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