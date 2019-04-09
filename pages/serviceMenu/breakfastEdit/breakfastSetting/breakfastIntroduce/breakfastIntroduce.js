// pages/serviceMenu/breakfastEdit/breakfastSetting/breakfastIntroduce/breakfastIntroduce.js
const app = getApp()
var util = require('../../../../../utils/util.js');
var InterFace = require('../../../../../utils/url.js');
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    breakfastImg: [],
    price: 0,
    description: '',
    image1: '',
    image2: '',
    image3: ''
  },
  deleteImage: function (e) {
    //console.log(e.currentTarget.id)
    var that = this;
    switch (e.currentTarget.id) {
      case 'image1':
        wx.showModal({
          title: '提示',
          content: '确定要删除此图片吗？',
          success: function (res) {
            if (res.confirm) {
              var breakfastImg = that.data.breakfastImg - 1;

              console.log('点击确定了');
              that.setData({
                breakfastImg: breakfastImg,
                image1: '',
              })

            } else if (res.cancel) {
              console.log('点击取消了');
              return false;
            }

          }
        })
        break;
      case 'image2':
        wx.showModal({
          title: '提示',
          content: '确定要删除此图片吗？',
          success: function (res) {
            if (res.confirm) {
              var breakfastImg = that.data.breakfastImg - 1;

              console.log('点击确定了');
              that.setData({
                breakfastImg: breakfastImg,
                image2: '',
              })

            } else if (res.cancel) {
              console.log('点击取消了');
              return false;
            }

          }
        })
        break;
      case 'image3':
        wx.showModal({
          title: '提示',
          content: '确定要删除此图片吗？',
          success: function (res) {
            if (res.confirm) {
              var breakfastImg = that.data.breakfastImg - 1;
              console.log('点击确定了');
              that.setData({
                breakfastImg: breakfastImg,
                image3: '',
              })
            } else if (res.cancel) {
              console.log('点击取消了');
              return false;
            }
          }
        })
        break;
    }
  },

  //更新文本框输入
  inputChanged: function (e) {
    switch (e.currentTarget.id) {
      case 'description':
        this.setData({
          description: e.detail.value.replace(/\s+/g, '')
        })

        break;
    }
  },
  // 获取图片函数
  getImage: function (e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var len = that.data.breakfastImg;
    console.log("len:" + len)
    if (len >= 3) {
      util.showToastMsg('图片张数上限，请先长按图片删除');
      return
    } else {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          var tempFilePaths = res.tempFilePaths;

          wx.uploadFile({
            url: util.url + InterFace.imageUpload + '?size=SIZE_3',
            filePath: tempFilePaths[0],
            name: 'imageFile',

            header: {
              'content-type': 'application/json',
              'Token': loginToken
            },
            success: function (res) {
              console.log(res)
              if (that.data.image1 == '') {
                that.setData({
                  image1: JSON.parse(res.data).data.imgUrl
                })
              } else if (that.data.image2 == '') {
                that.setData({
                  image2: JSON.parse(res.data).data.imgUrl
                })
              } else if (that.data.image3 == '') {
                that.setData({
                  image3: JSON.parse(res.data).data.imgUrl
                })
              }
              //console.log(JSON.parse(res.data).data.imgUrl)
              that.setData({
                breakfastImg: that.data.breakfastImg + 1,
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        fail: function (res) { },
        complete: function (res) {
        },
      })
    }

  },
  formSubmit: function (e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var breakfastValue = that.data.breakfastValue;
    var price = that.data.price;
    var description = that.data.description;
    var image1 = that.data.image1;
    var image2 = that.data.image2;
    var image3 = that.data.image3;
    var breakfastImg = [image1, image2, image3];
      wx.request({
        url: util.url + InterFace.saveBreakfastInfo,
        data: {
          "description": description,
          "images": breakfastImg,
        },
        header: {
          'content-type': 'application/json',
          'Token': loginToken
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          util.showToastMsg('保存成功')
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        },
        fail: function (res) { },
        complete: function (res) {
        },
      })

  },
  //查询早餐券函数
  getBreakfastCouponInfo: function (that) {
    var loginToken = wx.getStorageSync("loginToken");
    wx.request({
      url: util.url + InterFace.getBreakfastInfo

,
      header: {
        'content-type': 'application/json',
        'Token': loginToken
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.data.images.length >= 1) {
          that.setData({
            image1: res.data.data.images[0],
          })
        }
        if (res.data.data.images.length >= 2) {
          that.setData({
            image2: res.data.data.images[1],
          })
        }
        if (res.data.data.images.length >= 3) {
          that.setData({
            image3: res.data.data.images[2],
          })
        }
        that.setData({
          
          description: res.data.data.description,
          breakfastImg: res.data.data.images.length
        })
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
    that.getBreakfastCouponInfo(that);
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