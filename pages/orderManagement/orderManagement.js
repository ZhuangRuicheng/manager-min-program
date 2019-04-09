// pages/orderManagement /orderManagement .js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessType: ['所有业务'],
    stateType: ['全部状态', '待受理', '已受理', '已完成', '已过期', '已拒单'],
    index: 0,
    stateIndex: 0,
    orders: [],
    input: '',
    pageNum: 1,
    isHasNextPage: false,
    orderType: '',
    orderStatus: ''
  },
  inputchange: function(e) {
    this.setData({
      input: e.detail.value
    })
  },
  //根据房间号搜索
  search: function(e) {
    var that = this;
    var input = that.data.input;

    if (input == '') {
      return
    } else {
      debugger
      var orderStatus = that.data.orderStatus;
      var orderType = that.data.orderType;
      var params = {
        "pageNum": 1,
        "pageSize": 100000,
        "orderType": orderType,
        "orderStatus": orderStatus,
        "roomNum": input,
      };
      var successData = function(res) {
        if (res.data.code == 0) {
          if (res.data.data.orders === null) {
            that.setData({
              orders: []
            })
          } else {
            that.setData({
              orders: res.data.data.orders
            })
          }
        } else {
          util.showToastMsg(res.data.msg)
        }
      };
      that.queryOrderList(params, that, successData);
    }

  },
  //打扫房间详情
  clearRoom: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './orderDetails/orderDetails?orderId=' + id,
    })
  },
  //发票详情
  invoice: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './InvoiceD/InvoiceD?orderId=' + id,
    })
  },
  //退房
  checkOut: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './checkOutDetails/checkOutDetails?orderId=' + id,
    })
  },
  //自助续住
  self: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './selfDetails/selfDetails?orderId=' + id,
    })
  },
  //vip
  vip: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './vipDetails/vipDetails?orderId=' + id,
    })
  },
  //经理在线
  feedback: function(e) {
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: './feedbackDetails/feedbackDetails?orderId=' + id,
    })
  },
  //在线迷你吧
  store: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './storeDetails/storeDetails?orderId=' + id,
    })
  },
  //酒店预订详情
  hotelRerveDetails: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './hotelRerveDetails/hotelRerveDetails?orderId=' + id,
    })
  },
  //客房送餐
  meals: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './mealsDetails/mealsDetails?orderId=' + id,
    })
  },
  //根据订单类型筛选
  businessBindPicker: function(e) {
    this.setData({
      index: e.detail.value
    })
    var businessType = this.data.businessType[this.data.index]
    var that = this;
    //var stateType = this.data.stateType[this.data.stateIndex];
    var orderStatus = this.data.orderStatus;
    switch (businessType) {
      case '所有业务':
        var params = {
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          that.setData({
            orders: res.data.data.orders,
            orderType: ''
          })
        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);

        break;
      case '办理会员':
        var params = {
          "orderType": "VIP",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'VIP'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'VIP'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);

        break;
      case '续住':
        var params = {
          "orderType": "CONTINUE_STAY",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'CONTINUE_STAY'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'CONTINUE_STAY'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '清扫房间':
        var params = {
          "orderType": "CLEAN_ROOM",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'CLEAN_ROOM'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'CLEAN_ROOM'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '迷你吧配送':
        var params = {
          "orderType": "MINI_BAR",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'MINI_BAR'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'MINI_BAR'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '退房':
        var params = {
          "orderType": "CHECKOUT",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'CHECKOUT'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'CHECKOUT'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '预约发票':
        var params = {
          "orderType": "INVOICE",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'INVOICE'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'INVOICE'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);

        break;
      case '投诉建议':
        var params = {
          "orderType": "FEEDBACK",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'FEEDBACK'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'FEEDBACK'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);

        break;
      case '酒店预订':
        var params = {
          "orderType": "HOTEL_RESERVE",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'HOTEL_RESERVE'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'HOTEL_RESERVE'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '客房送餐':
        var params = {
          "orderType": "MEAL",
          "pageNum": 1,
          "pageSize": 8,
          "orderStatus": orderStatus
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderType: 'MEAL'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderType: 'MEAL'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
    }
  },
  //订单状态筛选
  stateBindPicker: function(e) {

    this.setData({
      stateIndex: e.detail.value
    })
    var stateType = this.data.stateType[this.data.stateIndex];
    var that = this;
    var orderType = that.data.orderType;
    switch (stateType) {
      case '全部状态':
        var params = {
          "pageNum": 1,
          "pageSize": 8,
          "orderType": orderType
        };
        var successData = function(res) {
          that.setData({
            orders: res.data.data.orders,
            orderStatus: ''
          })
        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '待受理':
        var params = {
          "orderStatus": "SUBMIT",
          "pageNum": 1,
          "pageSize": 8,
          "orderType": orderType
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderStatus: 'SUBMIT'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderStatus: 'SUBMIT'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '已受理':
        var params = {
          "orderStatus": "ACCEPT",
          "pageNum": 1,
          "pageSize": 8,
          "orderType": orderType
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderStatus: 'ACCEPT'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderStatus: 'ACCEPT'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '已完成':
        var params = {
          "orderStatus": "FINISH",
          "pageNum": 1,
          "pageSize": 8,
          "orderType": orderType
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderStatus: 'FINISH'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderStatus: 'FINISH'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '已过期':
        var params = {
          "orderStatus": "OVERDUE",
          "pageNum": 1,
          "pageSize": 8,
          "orderType": orderType
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderStatus: 'OVERDUE'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderStatus: 'OVERDUE'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
      case '已拒单':
        var params = {
          "orderStatus": "CANCEL",
          "pageNum": 1,
          "pageSize": 8,
          "orderType": orderType
        };
        var successData = function(res) {
          if (res.data.data.orders === undefined) {
            that.setData({
              orders: [],
              orderStatus: 'CANCEL'
            })
          } else {
            that.setData({
              orders: res.data.data.orders,
              orderStatus: 'CANCEL'
            })
          }

        };
        //查询所有订单函数
        that.queryOrderList(params, that, successData);
        break;
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //查询订单
    var params = {
      "pageNum": 1,
      "pageSize": 8
    };
    var successData = function(res) {
      if (!res.data.data.orders) {
        that.setData({
          orders: [],
          isHasNextPage: res.data.data.isHasNextPage,
        })
      } else {
        that.setData({
          orders: res.data.data.orders,
          isHasNextPage: res.data.data.isHasNextPage,
        })
      }

    };
    //查询所有订单函数
    that.queryOrderList(params, that, successData);
    var loginToken = wx.getStorageSync("loginToken");
    //订单类型查询
    wx.request({
      url: util.url + InterFace.getOrderTypes,
      header: {
        'content-type': 'application/json',
        'Token': loginToken
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          var businessType = that.data.businessType;
          for (var i = 0; i < res.data.data.orderTypes.length; i++) {
            switch (res.data.data.orderTypes[i]) {
              case "CONTINUE_STAY":
                businessType.push("续住");
                break;
              case "VIP":
                businessType.push("办理会员");
                break;
              case "CLEAN_ROOM":
                businessType.push("清扫房间");
                break;
              case "MINI_BAR":
                businessType.push("迷你吧配送");
                break;
              case "INVOICE":
                businessType.push("预约发票");
                break;
              case "CHECKOUT":
                businessType.push("退房");
                break;
              case "FEEDBACK":
                businessType.push("投诉建议");
                break;
              case "HOTEL_RESERVE":
                businessType.push("酒店预订");
                break;
              case "MEAL":
                businessType.push("客房送餐");
                break;
            }

          }
          that.setData({
            businessType: businessType
          })

        } else {
          util.showToastMsg(res.data.msg)
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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
    var that = this;
    var orderStatus = that.data.orderStatus;
    var orderType = that.data.orderType;
    var input = that.data.input;
    var params = {
      "pageNum": 1,
      "pageSize": 8,
      "orderType": orderType,
      "orderStatus": orderStatus,
      "roomNum": input,
    };
    var successData = function(res) {
      if (!res.data.data.orders) {
        that.setData({
          orders: [],
          isHasNextPage: res.data.data.isHasNextPage,
        })
      } else {
        that.setData({
          orders: res.data.data.orders,
          isHasNextPage: res.data.data.isHasNextPage,
        })
      }

    };
    //查询所有订单函数
    that.queryOrderList(params, that, successData);
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
    var that = this;
    var pageNum = that.data.pageNum + 1;
    var orderStatus = that.data.orderStatus;
    var orderType = that.data.orderType;
    var input = that.data.input;
    var params = {
      "pageNum": 1,
      "pageSize": 8,
      "orderType": orderType,
      "orderStatus": orderStatus,
      "roomNum": input,
    };
    var successData = function(res) {
      wx.stopPullDownRefresh()
      util.showToastMsg("刷新成功")
      if (!res.data.data.orders) {
        that.setData({
          orders: [],
          isHasNextPage: res.data.data.isHasNextPage,
        })
      } else {
        that.setData({
          orders: res.data.data.orders,
          isHasNextPage: res.data.data.isHasNextPage,
        })
      }
    };
    that.queryOrderList(params, that, successData);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var pageNum = that.data.pageNum + 1;
    var orderStatus = that.data.orderStatus;
    var orderType = that.data.orderType;
    var input = that.data.input;
    var params = {
      "pageNum": pageNum,
      "pageSize": 8,
      "orderType": orderType,
      "orderStatus": orderStatus
    };
    that.setData({
      pageNum: pageNum
    })
    var successData = function(res) {
      wx.hideLoading();
      that.setData({
        //orders: res.data.data.orders,
        orders: that.data.orders.concat(res.data.data.orders),
        isHasNextPage: res.data.data.isHasNextPage
      })
    };

    if (that.data.isHasNextPage) {
      wx.showLoading({
        title: '加载中',
      })
      //查询订单
      that.queryOrderList(params, that, successData);
    } else {
      util.showToastMsg('已加载完全')
    }
    // console.log("dssss")
  },
  //查询订单
  queryOrderList: function(params, that, successData) {
    //查询订单
    var url = util.url + InterFace.queryOrderList;
    var failData = function(res) {};
    request.Request('GET', '加载中', url, params, successData, failData)
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