// pages/putForwardMoney/createInfo/createInfo.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enterpriseName:'',
    bankName:'',
    bankAccount:''
  },
  //文本框输入更改
  inputChange: function (e) {
    switch (e.currentTarget.id) {
      case 'enterpriseName':

        this.setData({
          enterpriseName: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'bankName':
        this.setData({
          bankName: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'bankAccount':
        this.setData({
          bankAccount: e.detail.value.replace(/\s+/g, '')
        })

        break;
    }
  },
  formSubmit:function(e){
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var enterpriseName = that.data.enterpriseName;
    var bankName = that.data.bankName;
    var bankAccount = that.data.bankAccount;
    if (enterpriseName == ''){
      util.showToastMsg('名称不能为空')
      return
    }else{
      if (bankName == ''){
      util.showToastMsg('开户银行不能为空')
      return
      }else{
        if (bankAccount == ''){
        util.showToastMsg('银行账户不能为空')
        return
        }else{
          var url = util.url + InterFace.saveBankAccountInfo;
          var params = {
            "enterpriseName": enterpriseName,
            "bankName": bankName,
            "bankAccount": bankAccount
          };
          var successData = function(res){
            if(res.data.code == 0){
              util.showToastMsg('添加成功')
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)
            }else{
              util.showToastMsg(res.data.showToastMsg)
            }
          };
          var failData = function(res){};
          request.Request('POST', '添加中', url, params, successData, failData)

        }
      }
    }
  

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var enterpriseName = options.enterpriseName;
    var bankName = options.bankName;
    var bankAccount = options.bankAccount;
   this.setData({
     enterpriseName: enterpriseName,
     bankName: bankName,
     bankAccount: bankAccount
   })
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
    return {
      title: "盘活入住客人，带来更多收益，客房助手来啦！~",
      path: 'pages/login/login',
      imageUrl: util.imgUrl + '/shareImg.png'
    }
  }
})