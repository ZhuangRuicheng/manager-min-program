// pages/dataInput/hotelEquipment/hotelEquipment.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    inputtextareaValue: '',
    EditshowModalStatus: false,
    facilitiesList: []
  },

  //弹出添加酒店设施框
  showModal: function(e) {
    this.setData({
      showModalStatus: true
    })
  },
  //隐藏添加酒店设施弹出框
  hideModal: function(e) {
    this.setData({
      showModalStatus: false
    })
  },

  //更新获取输入框值
  inputChange: function(e) {
    this.setData({
      inputtextareaValue: e.detail.value.replace(/\s+/g, '')
    })

  },
  //删除房间设施
  deleteImage: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var loginToken = wx.getStorageSync("loginToken");
    wx.showModal({
      title: '提示',
      content: '是否删除此房间设施？',
      success: function(res) {
        if (res.confirm) {
          var url = util.url + InterFace.delFacilities;
          var params = {
            "facilitiesId": id
          };
          var successData = function(res) {
            if (res.data.code == 0) {
              util.showToastMsg('删除成功');
            } else {
              util.showToastMsg(res.data.msg);
            }
            that.getFacilitiesList(that);
          };
          var failData = function(res) {
            that.getFacilitiesList(that);
          };
          request.Request('POST', '正在删除', url, params, successData, failData)
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }

      }
    })
  },
  // 添加酒店设施表单数据提交
  formSubmit: function(e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var inputtextareaValue = that.data.inputtextareaValue;
    var inputtextareaValues = [];
    inputtextareaValues = inputtextareaValue.split(/[,，]/);
    if (inputtextareaValue == '') {
      util.showToastMsg('添加酒店设施不能为空');
      return
    } else {
      var url = util.url + InterFace.addFacilities;
      var params = {
        "facilitiesNames": inputtextareaValues
      };
      var successData = function(res) {
        that.setData({
          showModalStatus: false,
          inputtextareaValue: ''
        })
        util.showToastMsg('添加成功');
        that.getFacilitiesList(that);
      };
      var failData = function(res) {
        that.getFacilitiesList(that);
      };
      request.Request('POST', '正在添加', url, params, successData, failData)
    }

  },

  //获取酒店设施
  getFacilitiesList: function(that) {
    var url = util.url + InterFace.getFacilitiesList;
    var params = {};
    var successData = function(res) {
      if (res.data.code == 0) {
        that.setData({
          facilitiesList: res.data.data.facilitiesList
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
    that.getFacilitiesList(that);
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