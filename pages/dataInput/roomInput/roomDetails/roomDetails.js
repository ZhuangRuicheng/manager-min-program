// pages/dataInput/roomInput/roomDetails/roomDetails.js
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QrImg:'',
    roomNum:'',
    roomId:'',
    disable:false
  },
  //下载二维码到相册
  downImg: function (e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var roomId = that.data.roomId;
    wx.downloadFile({
      url: util.url + InterFace.getQrCodeStream + '?roomId=' + roomId,
      header: {
        'Token': loginToken
      },
      success: function (res) {
        console.log(res)
        console.log("res:" + res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res);
            util.showToastMsg('保存成功');
          },
          fail: function (res) {
            console.log(res)
            util.showToastMsg('图片保存本地失败' + res);
          },
          complete: function (res) { },
        })
      },
      fail: function (res) {
        console.log(res)
        util.showToastMsg('获取失败' + res);
      },
      complete: function (res) { },
    })


  },
  //绑定二维码
  bindQrCode:function(e){
      var that = this;
      var roomId = that.data.roomId;
      var url = util.url + InterFace.bindQrCode;
      var msg = '绑定成功'
      that.QrCode(util, roomId, url, msg);
     
  },
  //重新绑定二维码
  reBindQrCode:function(e){
    var that = this;
    var roomId = that.data.roomId;
    var url = util.url + InterFace.reBindQrCode;
    var msg = '绑定成功'
    that.QrCode(util, roomId, url, msg);
  }, 
  //解绑二维码
  unBindQrCode:function(e){
    var that = this;
    var roomId = that.data.roomId;
    var roomNum = that.data.roomNum;
    var url = util.url + InterFace.unBindQrCode;
    var successFunction = function(successData){
      util.showToastMsg(successData.data.msg)

    }
    // var msg = '解绑成功'
    // that.QrCode(util, roomId, url, msg);
    wx.showModal({
      title: '解除绑定',
      content: '确定解除绑定该房间二维码吗？解除后二维码依然有效，可以与其他房间重新绑定',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        if(res.confirm){
          that.disableOrBindQr(util, url, roomId, successFunction)
          wx.redirectTo({
            url: '../roomDetails/roomDetails?roomId=' + roomId + '&roomNum=' + roomNum,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {
      },
    })
  },
  //禁用二维码
  disable:function(e){
      var that = this;
    var roomId = that.data.roomId;
    wx.showModal({
      title: '禁用二维码',
      content: '禁用后二维码失效，无法继续使用，确定禁用该房间二维码吗？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if(res.confirm){
          if (that.data.disable) {
            util.showToastMsg("该二维码已被禁用");
            return
          } else {
   
            var url = util.url + InterFace.disableRoomQrCode;
            var successFunction = function(successData){
              if (successData.data.code == 0) {
                util.showToastMsg(successData.data.msg)
                 
                } else {
                util.showToastMsg(successData.data.msg)
                }
            }
            that.disableOrBindQr(util,url, roomId, successFunction)
            
          }
        }
      },
      fail: function (res) { },
      complete: function (res) { 
        that.getQrCodeBase64(that, util, InterFace, roomId)
      },
    })
    
  },
  //解除绑定、禁用二维码共用函数
  disableOrBindQr: function (util,url, roomId,successFunction){
    var loginToken = wx.getStorageSync("loginToken");
    wx.request({
      url: url,
      data: {
        'roomId': roomId
      },
      header: {
        'content-type': 'application/json',
        'Token': loginToken
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        successFunction(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //绑定二维码共用函数
  QrCode: function (util, roomId, url, msg){
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: function (res) {
        console.log(res)
        let q = decodeURIComponent(res.result);
        var qrCodeInfo = util.getQueryString(q, 'code');
        wx.request({
          url: url,
          data: {
            'roomId': roomId,
            'qrCodeInfo': qrCodeInfo
          },
          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(res)
            if (res.data.code == 0) {
              util.showToastMsg(msg)
              var roomId = that.data.roomId;
              that.getQrCodeBase64(that, util, InterFace, roomId)
            } else {
              util.showToastMsg(res.data.msg)
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getQrCodeBase64: function (that,util, InterFace, roomId){
    var loginToken = wx.getStorageSync("loginToken");
    wx.request({
      url: util.url + InterFace.getQrCodeBase64,
      data: {
        'roomId': roomId
      },
      header: {
        'content-type': 'application/json',
        'Token': loginToken
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        that.setData({
          QrImg: 'data:image/png;base64,' + res.data.data.qrCodeBase64,
          disable: res.data.data.disable
        })
        // console.log(that.data.QrImg)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var roomId = options.roomId;
    var roomNum = options.roomNum;
    that.setData({
      roomNum: roomNum,
      roomId: roomId
    })
    console.log("房间号："+roomId+"房间："+roomNum)
    that.getQrCodeBase64(that,util, InterFace, roomId)

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