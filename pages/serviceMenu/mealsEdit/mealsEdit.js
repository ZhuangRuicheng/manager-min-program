// pages/serviceMenu/mealsEdit/mealsEdit.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea:'请输入酒店介绍文本，50字已内!',
    headerTitle: '添加顶部宣传图',
    addImg: '+ 添加图片',
    introduceTitle: '餐厅介绍:',
    storeClassify: '商品分类',
    storeEdit: '商品编辑',
    introduceContent: '',
    img:''
  },
  //跳转至商品分类
  mealsClassify:function(){
    wx.navigateTo({
      url: './mealsClassify/mealsClassify',
      success: function(res) {},
    })
  },
  //跳转至商品编辑
  mealsContent:function(){
    wx.navigateTo({
      url: './mealsContent/mealsContent',
      success: function(res) {},
    })
  },
  //添加图片
  addImage: function() {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: util.url + InterFace.imageUpload + '?size=SIZE_4',
          filePath: tempFilePaths[0],
          name: 'imageFile',
          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          success: function(res) {
            var headerImage = JSON.parse(res.data).data.imgUrl
            that.setData({
              img: headerImage
            })
            console.log(JSON.parse(res.data).data.imgUrl)
            var url = util.url + InterFace.saveMealInfo;
            var params = {
              "publicityImage": headerImage
            };
            var successData = function (res) {
              if (res.data.code == 0) {
                util.showToastMsg("保存成功")
              } else {
                util.showToastMsg(res.data.msg)
              }
            };
            var failData = function (res) { };
            request.Request('POST', '正在提交', url, params, successData, failData)
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取餐厅介绍文本
  textareaContent:function(e){
    var that = this;
    that.setData({
      introduceContent: e.detail.value.replace(/\s+/g, '')
    })
    var url = util.url + InterFace.saveMealInfo;
    var params = {
      "introduce": e.detail.value.replace(/\s+/g, '')
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg("保存成功")
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function (res) { };
    request.Request('POST', '正在提交', url, params, successData, failData)
  },

  //获取送餐信息
  getMealInfo:function(that){
    var url = util.url + InterFace.getMealInfo;
    var params = {};
    var successData = function(res){
      if(res.data.code == 0){
        var img;
        if (res.data.data.publicityImage == ''){
          img = ''
        }else if(res.data.data.publicityImage == null){
          img = ''
        }else{
          img = res.data.data.publicityImage
        }
        that.setData({
          introduceContent: res.data.data.introduce,
          img:img
        })
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function (res) { };
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    that.getMealInfo(that);
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