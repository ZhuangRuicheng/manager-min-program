// pages/dataInput/dataInput.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function(val) {
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
    hotelName: '',
    image1: '',
    image2: '',
    image3: '',
    address: '',
    i: 0,
    longitude: '', //经度
    latitude: '', //纬度
    telphone: '',
    description: '',
    urls: [],
    notification: ''
  },
  //  自定义函数
  //首页宣传图跳转
  homePage: function(e) {
    wx.navigateTo({
      url: './homePage/homePage',
    })
  },
  //文本框输入更改
  inputChange: function(e) {
    switch (e.currentTarget.id) {
      case 'hotelName':

        this.setData({
          hotelName: e.detail.value
        })
        break;
      case 'address':
        this.setData({
          address: e.detail.value
        })

        break;
      case 'longitude':

        this.setData({
          longitude: e.detail.value
        })
        break;
      case 'latitude':

        this.setData({
          latitude: e.detail.value
        })
        break;
      case 'telphone':

        this.setData({
          telphone: e.detail.value
        })
        break;
      case 'description':

        this.setData({
          description: e.detail.value
        })
        break;
      case 'noticeTextarea':

        this.setData({
          noticeTextarea: e.detail.value
        })
        break;
    }
  },
  getImage: function(e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var img = that.data.img;
    var len = that.data.urls;
    if (len >= 3) {
      util.showToastMsg('图片张数上限，请先长按图片删除');
      return
    } else {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;

          wx.uploadFile({
            url: util.url + InterFace.imageUpload + '?size=SIZE_5',
            filePath: tempFilePaths[0],
            name: 'imageFile',
            header: {
              'content-type': 'application/json',
              'Token': loginToken
            },
            success: function(res) {
              // if (res.data.code == 0) {
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
                that.setData({
                  urls: that.data.urls + 1
                })
              // } else {
              //   util.showToastMsg(res.data.msg)
              // }

            },
            fail: function(res) {
              util.showToastMsg("上传失败")
            },
            complete: function(res) {},
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  //定位自动获取经纬度
  location: function(e) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        const latitude = res.latitude; //纬度
        const longitude = res.longitude; //经度
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      },
      fail: function(res) {
        util.showToastMsg("请开启手机定位")
      },
      complete: function(res) {},
    })
  },
  //单表数据提交
  formSubmit: function(e) {
    var that = this;
    var hotelName = that.data.hotelName;
    var address = that.data.address;
    var longitude = that.data.longitude;
    var latitude = that.data.latitude;
    var telphone = that.data.telphone;
    var description = that.data.description;
    var notification = that.data.noticeTextarea;
    var image1 = that.data.image1;
    var image2 = that.data.image2;
    var image3 = that.data.image3;
    var banners = [image1, image2, image3];
    var url = util.url + InterFace.updateHotelInfo;
    var params = {
      "hotelName": hotelName,
      "address": address,
      "telephone": telphone,
      "latitude": latitude,
      "longitude": longitude,
      "banners": banners,
      "description": description,
      "notification": notification
    };
    var successData = function(res) {
      if (res.data.code == 10) {
        util.showToastMsg(res.data.msg)
        wx.clearStorageSync();
        wx.redirectTo({
          url: '../login/login',
        })
      } else {
        util.showToastMsg(res.data.msg)
        setTimeout(function() {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)

      }
    };
    var failData = function(res) {};
    request.Request('POST', '提交中', url, params, successData, failData)

  },
  deleteImage: function(e) {
    //console.log(e.currentTarget.id)
    var that = this;
    switch (e.currentTarget.id) {
      case 'image1':
        wx.showModal({
          title: '提示',
          content: '确定要删除此图片吗？',
          success: function(res) {
            if (res.confirm) {
              var urls = that.data.urls - 1;

              console.log('点击确定了');
              that.setData({
                urls: urls,
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
          success: function(res) {
            if (res.confirm) {
              var urls = that.data.urls - 1;

              console.log('点击确定了');
              that.setData({
                urls: urls,
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
          success: function(res) {
            if (res.confirm) {
              var urls = that.data.urls - 1;

              console.log('点击确定了');
              that.setData({
                urls: urls,
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
  //房间号录入
  roomInput: function(e) {
    wx.navigateTo({
      url: './roomInput/roomInput',
    })
  },
  // 酒店设施录入
  hotelEquipment: function(e) {
    wx.navigateTo({
      url: './hotelEquipment/hotelEquipment',
    })
  },
  //房型信息录入
  modelInput: function(e) {
    wx.navigateTo({
      url: './modelInput/modelInput',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var url = util.url + InterFace.getHotelInfo;
    var params = {};
    var successData = function(res) {
      if (res.data.data.banners.length >= 1) {
        that.setData({
          image1: res.data.data.banners[0],
        })
      }
      if (res.data.data.banners.length >= 2) {
        that.setData({
          image2: res.data.data.banners[1],
        })
      }
      if (res.data.data.banners.length >= 3) {
        that.setData({
          image3: res.data.data.banners[2],
        })
      }
      that.setData({
        hotelName: res.data.data.hotelName,
        address: res.data.data.address,
        latitude: res.data.data.latitude,
        longitude: res.data.data.longitude,
        telphone: res.data.data.telephone,
        description: res.data.data.description,
        urls: res.data.data.banners.length,
        notification: res.data.data.notification
      })
    };
    var failData = function(res) {};
    request.Request('GET', '提交中', url, params, successData, failData)
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