// pages/hotelInfoEdit/invoiceEdit/invoiceEdit.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceTypes: [],
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框 
    text: ''
  },
  createInvoice: function(e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
      text: ''
    });
  },
  //确认  
  confirm: function() {
    var that = this;
    var text = that.data.text;
    var invoiceTypes = that.data.invoiceTypes;
    var repeatInvoice = false;
    for (var i = 0; i <= invoiceTypes.length; i++) {
      if (text == invoiceTypes[i]) {
        repeatInvoice = true;
        break;
      }
    }
    if (repeatInvoice) {
      util.showToastMsg('该发票类型已存在')
      return
    } else {
      if (text == '') {
        util.showToastMsg('发票类型添加不能为空')
        return
      } else {
        invoiceTypes.push(text);
        var url = util.url + InterFace.saveInvoiceTypes;
        var params = {
          "invoiceTypes": invoiceTypes
        };
        var successData = function(res) {
          if (res.data.code == 0) {
            util.showToastMsg('添加成功')
            that.setData({
              hiddenmodalput: true,
              text: ''
            })
          } else {
            util.showToastMsg(res.data.msg)
          }
          that.getInvoiceTypes(that)
        };
        var failData = function(res) {
          that.getInvoiceTypes(that)
        };
        request.Request('POST', '添加中', url, params, successData, failData)
      }
    }
  },
  // 获取文本框内容
  inputContent: function(e) {
    this.setData({
      text: e.detail.value.replace(/\s+/g, '')
    })
  },
  deleteImage: function(e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var images = that.data.invoiceTypes;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此类型吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(index, 1);
          that.setData({
            invoiceTypes: images
          })
          // console.log(that.data.invoiceTypes)
          var url = util.url + InterFace.saveInvoiceTypes;
          var params = {
            "invoiceTypes": images
          };
          var successData = function(res) {
            if (res.data.code) {
              util.showToastMsg("删除成功")
            } else {
              util.showToastMsg(res.data.msg)
            }
          };
          var failData = function(res) {};
          request.Request('POST', '删除中', url, params, successData, failData)
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          invoiceTypes: images
        });
      }
    })
  },
  //获取发票类型函数
  getInvoiceTypes: function(that) {
    var that = this;
    var url = util.url + InterFace.getInvoiceTypes;
    var params = {};
    var successData = function(res) {
      if (res.data.code == 0) {
        that.setData({
          invoiceTypes: res.data.data.invoiceTypes,
        })
      } else if (res.data.code == 10) {
        util.showToastMsg(res.data.msg);
        wx.clearStorageSync("loginToken");
        setTimeout(function() {
          wx.redirectTo({
            url: '../../login/login',
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
    that.getInvoiceTypes(that)
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