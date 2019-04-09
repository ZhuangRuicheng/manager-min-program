// pages/serviceMenu/breakfastEdit/breakfastSetting/breakfastSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
//跳转到早餐介绍页面
  introduce:function(e){
    wx.navigateTo({
      url: './breakfastIntroduce/breakfastIntroduce',
    })
  },
  //跳转到餐券设置页面
  setting:function(e){
    wx.navigateTo({
      url: './setting/setting',
    })
  },
 
  //领取二维码
  downQr:function(e){
    wx.navigateTo({
      url: './downLoadQr/downLoadQr',
    })
  },
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