//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');

Page({
  data: {
    userInfo:{},
    permissions:{},
    name: '',
    position: '',
    phone: '',
    hotelName: '',
    personalImage:'',
    ranking:0,
    satisfactionDegree:0,
    handleOrder:0,
    hotelInfo:false,
    FUN_SET:false,
    order:false,
    financial:false,
    dataCount:false,
    user:false,
    jurisdiction:false,
    roomType:false,
    writeOff:false,
    showTips: true,
    orderImg: util.imgUrl +'/order.png'
  },
  //隐藏提示显示
  stopTips: function (e) {
    this.setData({
      showTips: false
    })
    wx.setStorageSync("showTips", "showTips")
  },
  //事件处理函数
  //数据统计模块
  dataStatistics:function(e){
    wx.navigateTo({
      url: '../dataStatistics/dataStatistics',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //票券核销
  ticketWriteOff:function(e){
    wx.navigateTo({
      url: '../ticketWriteOff/ticketWriteOff',
    })
  },
  //酒店信息编辑模块
  hotelInfoEdit:function(e){
    wx.navigateTo({
      url: '../dataInput/dataInput',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 房型管理
  modelInput:function(e){
    wx.navigateTo({
      url: '../modelInput/modelInput',
    })
  },
  //服务菜单管理
  serviceMenu:function(e){
    wx.navigateTo({
      url: '../serviceMenu/serviceMenu',
    })
  },
  //订单管理模块
  orderManagement:function(e){
    wx.navigateTo({
      url: '../orderManagement/orderManagement',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //用户管理模块
  userManagement:function(e){
    wx.navigateTo({
      url: '../userManagement/userManagement',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //财务管理模块
  financial:function(e){
   wx.navigateTo({
     url: '../financialManagement/financialManagement',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
  },
 
  // 权限管理模块
  jurisdiction:function(e){
    wx.navigateTo({
      url: '../JurisdictionAdmin/JurisdictionAdmin',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 获取图片函数
  getImage:function(e){
  
    var permissions = this.data.permissions;
    var userInfo = this.data.userInfo;
    var orderPermissions = [];
    var name = this.data.name;
    var position = this.data.position;
    var phone = this.data.phone;
    var personalImage = this.data.personalImage;

     for(var i = 0;i<permissions.length;i++){
      switch(permissions[i]){
        case "CONTINUE_STAY":
          orderPermissions.push("CONTINUE_STAY")
        break;
        case "VIP":
          orderPermissions.push("VIP")
          break;
        case "CHECKOUT":
          orderPermissions.push("CHECKOUT")
          break;
        case "CLEAN_ROOM":
          orderPermissions.push("CLEAN_ROOM")
          break;
        case "MINI_BAR":
          orderPermissions.push("MINI_BAR")
          break;
        case "FEEDBACK":
          orderPermissions.push("FEEDBACK")
        break;

        case "INVOICE":
          orderPermissions.push("INVOICE")
          break;
        case "ORDER_ACCEPT":
          orderPermissions.push("ORDER_ACCEPT")
          break;
        case "HOTEL_RESERVE":
          orderPermissions.push("HOTEL_RESERVE")
          break;
          default:break;
      }
    }
    // wx.setStorageSync("", data:{});
    wx.setStorage({
      key: 'permissions',
      data: orderPermissions,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.navigateTo({
      url: './personalData/personalData?name=' + name + '&position=' + position + '&phone=' + phone + '&personalImage=' + personalImage,
    })
  },
  //获取首页信息函数
  getHomePageInfo:function(that){
    
    var url = util.url + InterFace.getHomePageInfo;
    var params ={};
    var successData = function(res){
      if (res.data.code == 0) {
        var hotelName = res.data.data.hotelName;
        var name = res.data.data.userInfo.name;
        var position = res.data.data.userInfo.position;
        var phone = res.data.data.userInfo.phone;
        var ranking = res.data.data.userInfo.ranking;
        var satisfactionDegree = res.data.data.userInfo.satisfactionDegree;
        var handleOrder = res.data.data.userInfo.handleOrder;
        var permissions = res.data.data.permissions;
        var personalImage = res.data.data.userInfo.personalImage;
        var userInfo = res.data.data.userInfo
        if (personalImage == '') {
          that.setData({
            headerImage: util.imgUrl + '/header.png',
            personalImage: personalImage
          })
        } else {
          that.setData({
            headerImage: personalImage,
            personalImage: personalImage
          })
        }
        for (var i = 0; i < permissions.length; i++) {
          switch (permissions[i]) {
            case "FUN_ORDER_MANAGE":
              that.setData({
                order: true
              })
              break;
            case "FUN_HOTEL_INFO_EDIT":
              that.setData({
                hotelInfo: true
              })
              break;
            case "FUN_DATA_STATISTICS":
              that.setData({
                dataCount: true
              })
              break;
            case "FUN_PERMISSION_SET":
              that.setData({
                jurisdiction: true
              })
              break;
            case "FUN_FINANCE_MANAGE":
              that.setData({
                financial: true
              })
              break;
            case "FUN_CUSTOMER_MANAGE":
              that.setData({
                user: true
              })
              break;
            case "FUN_SET":
              that.setData({
                FUN_SET: true
              })
              break;
            case "FUN_ROOM_TYPE":
              that.setData({
                roomType: true
              })
              break;
            case "FUN_BREAKFAST_VOUCHER_CANCEL":
              that.setData({
                writeOff: true
              })
              break;
          }
        }
        that.setData({
          name: name,
          position: position,
          phone: phone,
          hotelName: hotelName,
          ranking: ranking,
          satisfactionDegree: satisfactionDegree,
          handleOrder: handleOrder,
          permissions: permissions,
          userInfo: userInfo,
        })
      } else {
        util.showToastMsg(res.data.msg)
        wx.clearStorageSync("loginToken");
        setTimeout(function () {
          wx.reLaunch({
            url: '../login/login',
          })
        }, 1500)

      }
    };
    var failData = function(res){};
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  onLoad: function (options) {
    var that = this;
    that.getHomePageInfo(that)
  },
  onShow:function(){
    //刷新页面
    // var that = this;
    // that.setData({
    //   hotelInfo: false,
    //   FUN_SET: false,
    //   order: false,
    //   financial: false,
    //   dataCount: false,
    //   user: false,
    //   jurisdiction: false,
    //   roomType: false,
    //   writeOff: false,
    // })
    // var showTips = wx.getStorageSync("showTips")
    // if (showTips == "showTips") {
    //   console.log("showTips:" + showTips)
    //   that.setData({
    //     showTips: false,
    //   })
    // }
    // that.getHomePageInfo(that)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: "盘活入住客人，带来更多收益，客房助手来啦！~",
      path: 'pages/login/login',
      imageUrl: util.imgUrl + '/shareImg.png'
    }
  },
  onPullDownRefresh:function(){
    var that = this;
    that.getHomePageInfo(that)
    util.showToastMsg("刷新成功")
    wx.stopPullDownRefresh()
  }
})
