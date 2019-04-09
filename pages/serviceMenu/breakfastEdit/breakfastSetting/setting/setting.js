// pages/serviceMenu/breakfastEdit/breakfastSetting/setting/setting.js
const app = getApp()
var util = require('../../../../../utils/util.js');
var InterFace = require('../../../../../utils/url.js');
var request = require('../../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    breakfastValue:false,
    breakfastOff:false,
    price:''
  },
  //switch控件事件
  switched:function(e){
    switch (e.currentTarget.id){
       //早餐券是否收费
      case 'Charge':
        if (e.detail.value) {
          var price = this.data.price;
          if(price == 0){
            util.showToastMsg("早餐券价格不能设置为0");
            this.setData({
              breakfastValue: false
            })
            return
          }else{
            this.setData({
              breakfastValue: true
            })
          }

        } else {
          this.setData({
            breakfastValue: false
          })
        }
      break;
      //早餐券是否需要核销
      case 'writeOff':
        if (e.detail.value) {
          this.setData({
            breakfastOff: true
          })
        } else {
          this.setData({
            breakfastOff: false
          })
        }
      break;
    }
  },
  
  //获取输入价格
  priceInput:function(e){

        this.setData({
          price: e.detail.value.replace(/\s+/g, '').replace(/^[.]/, '')
        })
    console.log("price:" +this.data.price)
  },
  //信息提交
  formSubmit:function(e){
    var that = this;
    var price = that.data.price;
      var url = util.url + InterFace.saveBreakfastVoucherSetUp;
      var params = {
        "price": price,
        "isOpenPay": that.data.breakfastValue,
        "isOpenCancel": that.data.breakfastOff
      };
      var successData = function (res) {
        if (res.data.code == 0) {
          util.showToastMsg("提交成功")
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        } else {
          util.showToastMsg(res.data.msg)
        }
      };
      var failData = function (res) { };
    if (that.data.breakfastValue) {
      if (that.data.price == 0) {
        util.showToastMsg("价格不能为0")
        return
      } else {
        request.Request('POST', '提交中', url, params, successData, failData)
      }
    } else {
      request.Request('POST', '提交中', url, params, successData, failData)
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    var url = util.url + InterFace.getBreakfastSetUp;
    var successData = function(res){
     
      if(res.data.code == 0){
        that.setData({
          price:res.data.data.price,
          breakfastValue: res.data.data.isOpenPay,
          breakfastOff: res.data.data.isOpenCancel
        })
        console.log(res.data.data.price)
      }
      else{
        util.showToastMsg(res.data.msg)
      }
    };
    var params = {};
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

  }
})