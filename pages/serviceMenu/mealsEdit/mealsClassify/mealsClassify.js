// pages/serviceMenu/mealsEdit/mealsClassify/mealsClassify.js
const app = getApp()
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyName:'',
    categories:[],
    addClassify: '+ 添加分类名称',
    classifyTitle: '当前分类',
    modelTitle: '添加分类',
    placeholder: '请输入分类名',
    btnName: '确认添加',
    classifyShow: false
  },
  //防止页面滚动
  preventTouchMove: function(e) {},
  //弹出层
  addClassifyShow: function(e) {
    this.setData({
      classifyShow: true
    })
  },
  //隐藏弹出层
  hideModal: function() {
    this.setData({
      classifyShow: false
    })
  },
  //获取输入框内容
  classifyName:function(e){
    this.setData({
      classifyName:e.detail.value.replace(/\s+/g, '')
    })
  },
  //删除商品类别
  deleteClassify:function(e){
    var that = this;
    var categoryId = e.currentTarget.dataset.id;
    var url = util.url + InterFace.mealsDelCategory;
    var params = {
      "categoryId": categoryId
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg("删除成功")
        that.getClassify(that)
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function (res) { };
    wx.showModal({
      title: '删除商品类别',
      content: '是否删除该商品类别？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        if (res.confirm) {
          request.Request('POST', '删除中', url, params, successData, failData)
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //提交添加商品类别
  formSubmit:function(e){
    var that = this;
    var name = that.data.classifyName;
    var url = util.url + InterFace.saveCategory;
    var params = {
      'name': name
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg("添加成功")
        that.setData({
          classifyShow: false,
          classifyName:''
        })
        that.getClassify(that)
      }else{
        util.showToastMsg(res.data.msg)
      }
      
    };
    var failData = function (res) { };
    request.Request('POST', '正在提交', url, params, successData, failData)
  },
  //获取类别函数封装
  getClassify: function(that) {
    var url = util.url + InterFace.getCategoryList;
    var params = {};
    var successData = function(res) {
      if (res.data.code == 0) {
        that.setData({
          categories: res.data.data
        })
      } else {
        util.showToastMsg(res.data.msg)
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
    that.getClassify(that)
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