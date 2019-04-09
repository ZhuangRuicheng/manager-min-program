// pages/financialManagement/detailed/detailed.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billInfo:[],
    hasData:false,
    bills:[]
  },

  //跳转到收入金额详情
  incomeDetails:function(e){
    var financeDetailId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './incomeDetails/incomeDetails?financeDetailId=' + financeDetailId,
    })
  },
  //跳转到提现金额详情
  putForwardDetails:function(e){
    var financeDetailId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './putForwardDetails/putForwardDetails?financeDetailId=' + financeDetailId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = util.url + InterFace.getDetailList;
    var params = {};
    var successData = function(res){
      if(res.data.code == 0){
        if (res.data.data == '') {
          that.setData({
            hasData: true
          })
        } else {
          that.setData({
            billInfo: res.data.data,
            bills: res.data.data[0].bills,
            hasData: false
          })
        }
      }else{
        util.showToastMsg(res.data.msg);
      }
    };
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
    var long = this.data.billInfo.length;
    var data = this.data.billInfo[long-1].bills.length;
    var id = this.data.billInfo[long - 1].bills[data - 1].id;
    var that = this;
    var url = util.url + InterFace.getDetailList;
    var params = {
      'detailId': id
    };
    var successData = function(res){
      var data = res.data.data;
      var thatData = that.data.billInfo;

      for (var i = 0; i < data.length; i++) {
        var isHas = false;
        for (var j = 0; j < thatData.length; j++) {
          if (data[i].month === thatData[j].month) {
            thatData[j].bills = thatData[j].bills.concat(data[i].bills)
            isHas = true;
            break;
          }
        }
        if (!isHas) {
          thatData = thatData.concat(data[i])
        }

      }

      that.setData({
        billInfo: thatData
      })
    };
    var failData = function(res){};
    request.Request('GET', '加载中', url, params, successData, failData)
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