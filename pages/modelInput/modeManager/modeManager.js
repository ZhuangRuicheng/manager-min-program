// pages/dataInput/modelInput/modeManager/modeManager.js
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['日租房', '钟点房', '半日房'],
    index: 0,
    doorprice:'',
    sellprice:'',
    roomnum:'',
    switchOr:false,
    switchOn:'../../images/switchOff.png',
    switchOff: '../../images/switchOn.png',
    roomTypeId:''
  },
  //获取输入内容
  inputChange: function (e) {
    switch (e.currentTarget.id) {
      case 'doorprice':
        this.setData({
          doorprice: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'sellprice':
        this.setData({
          sellprice: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'roomnum':
        this.setData({
          roomnum: e.detail.value.replace(/\s+/g, '')
        })
        break;
    }
  },
  //更改信息提交
  formSubmit: function (e) {
    var that = this;
    var index = that.data.index;
    var array = that.data.array;
    var doorprice = that.data.doorprice;
    var sellprice = that.data.sellprice;
    var roomnum = that.data.roomnum;
    var switchOr = that.data.switchOr;
    var roomTypeId = that.data.roomTypeId;
    var useType;
    switch (array[index]){
      case '钟点房':
        useType = 'CLOCK_ROOM';
        break;
      case '日租房':
        useType = 'DAY_ROOM';
        break;
      case '半日房':
        useType = 'HALF_DAY_ROOM'
        break;
    }
    var failData = function (e) { };
    var url = util.url + InterFace.saveRoomTypeConfigInfo;
    var params = {
      'roomTypeId': parseInt(roomTypeId),
      'useType': useType,
      'price': sellprice,
      'marketPrice': doorprice,
      'roomCount': roomnum,
      'isOpenBook': switchOr
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg('提交成功');
      }else{
        util.showToastMsg(res.data.msg)
      }
      setTimeout(function () {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500)
    };
    var failData = function(res){};
    request.Request('POST', '提交中', url, params, successData, failData)
   },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })

  },
  //开关事件
  switchEvent:function(e){
    var that = this;
    var switchOr = that.data.switchOr;
    if (switchOr){
      that.setData({
        switchOr:false
      })
    }else{
      that.setData({
        switchOr:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var roomTypeId = options.id;
    that.setData({
      roomTypeId: roomTypeId
    })
    var url = util.url + InterFace.getRoomTypeConfigInfo;
    var params = {
      'roomTypeId': roomTypeId
    };
    var successData = function(res){
      if (!res.data.data.useType){
        that.setData({
          doorprice: res.data.data.marketPrice,
          sellprice: res.data.data.price,
          roomnum: res.data.data.roomCount,
          switchOr: res.data.data.isOpenBook,
        })
      }
      switch (res.data.data.useType){
        case 'DAY_ROOM':
        that.setData({
          index:0,
          doorprice: res.data.data.marketPrice,
          sellprice: res.data.data.price,
          roomnum: res.data.data.roomCount,
          switchOr: res.data.data.isOpenBook,
        })
        break;
        case 'CLOCK_ROOM':
          that.setData({
            index: 1,
            doorprice: res.data.data.marketPrice,
            sellprice: res.data.data.price,
            roomnum: res.data.data.roomCount,
            switchOr: res.data.data.isOpenBook,
          })
          break;
        case 'HALF_DAY_ROOM':
          that.setData({
            index: 2,
            doorprice: res.data.data.marketPrice,
            sellprice: res.data.data.price,
            roomnum: res.data.data.roomCount,
            switchOr: res.data.data.isOpenBook,
          })
          break;
      }
    };
    var failData = function(e){};
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