// pages/serviceMenu/breakfastEdit/breakfastSetting/writeOff/numWriteOff/numWriteOff.js
const app = getApp()
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Length: 4,    //输入框个数 
    isFocus: true,  //聚焦 
    Value: "",    //输入的内容 
    ispassword: true, //是否密文显示 true为密文， false为明文
    left:178,
    writeOff:false,
    writeOffText:''
  },
  Focus(e) {
    var that = this;
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue,
    })
  },
  Tap() {
    console.log("sdas")
    var that = this;
    that.setData({
      Value:'',
      isFocus: true,
    })
  },
  formSubmit(e) {
    var that = this;
    var url = util.url + InterFace.numberCancel;
    var number = that.data.Value;
    that.setData({
      writeOff: false
    })
    console.log("长度:"+number)
    var params = {
      "digital": number
    };
    var successData = function(res){
      if(res.data.code == 0){
        const innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = 'pages/voice/writeOffSuccess.mp3'
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
        that.setData({
          writeOffText:'核销成功！',
          Value:'',
          inputValue: '',
          writeOff: true
        })
      }else{
        that.setData({
          writeOffText:res.data.msg,
          writeOff: false,
          Value: '',
        })
        const innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = 'pages/voice/writeOffFail.mp3'
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
      }
    };
    var failData = function(res){};
    
    if (number != '' && number.length == 4){
      
      request.Request('POST', '正在核销', url, params, successData, failData)
    }else{
      that.setData({
        writeOffText: '请输入4位数的校验码'
      })
    }
    
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