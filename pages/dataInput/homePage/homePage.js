// pages/homePage/homePage.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    img: ''
  },
  getImage: function(e) {
    if (this.data.imgUrls.length > 2) {
      util.showToastMsg('图片张数上限，请先删除');
      return
    } else {
      var that = this;
      var loginToken = wx.getStorageSync("loginToken");
      var img = that.data.imgUrls;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;

          wx.uploadFile({
            url: util.url + InterFace.imageUpload + '?size=SIZE_5',
            filePath: tempFilePaths[0],
            name: 'imageFile',
            header: {
              'content-type': 'application/json',
              'Token': loginToken
            },
            success: function(res) {
              // if (res.data.code == 0) {
                var headerImage = JSON.parse(res.data).data.imgUrl;
                that.setData({
                  imgUrls: img,
                  img: headerImage
                })
              // }else{
              //   util.showToastMsg(res.data.msg)
              // }
            },
            fail: function(res) {
              util.showToastMsg("上传失败")
            },
            complete: function(res) {
              var imgUrl = that.data.img;
              var url = util.url + InterFace.addHomePageBanner;
              var params = {
                'imgUrl': imgUrl
              };
              that.HomePageBanner(url, params, that, '添加成功')
            },
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  deleteImage: function(e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var id = e.currentTarget.dataset.id
    var url = util.url + InterFace.deleteHomePageBanner;
    var params = {
      'homePageBannerId': id
    };
    that.HomePageBanner(url, params, that, '删除成功')
  },
  //添加或删除首页轮播图函数
  HomePageBanner: function(url, params, that, title) {
    var successData = function(res) {
      if(res.data.code == 0){
        util.showToastMsg(title)
        that.getHomePageBanners(that)
      }else{
        util.showToastMsg(res.data.msg)
      }
      
    };
    var failData = function(res) {
      that.getHomePageBanners(that)
    };
    request.Request('POST', '提交中', url, params, successData, failData)

  },
  //获取首页轮播图函数
  getHomePageBanners: function(that) {
    var url = util.url + InterFace.getHomePageBanners;
    var params = {};
    var successData = function(res) {
      if (res.data.code == 0) {
        that.setData({
          imgUrls: res.data.data
        })
      } else if (res.data.code == 10) {
        util.showToastMsg(res.data.msg);
        wx.clearStorageSync("loginToken");
        setTimeout(function() {
          wx.redirectTo({
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getHomePageBanners(that)
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
    return {
      title: "盘活入住客人，带来更多收益，客房助手来啦！~",
      path: 'pages/login/login',
      imageUrl: util.imgUrl + '/shareImg.png'
    }
  }
})