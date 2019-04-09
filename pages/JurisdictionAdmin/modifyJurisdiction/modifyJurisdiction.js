// pages/JurisdictionAdmin/modifyJurisdiction/modifyJurisdiction.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
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
    positionList: ["总经理", "员工", "手动输入"],
    userInfo: [],
    permissions:[],
    index: 0,
    show:false,
    resetBtn:true,
    phone:'',
    name:'',
    position:'',
    state:'',
    //业务权限设置
    checkHotelData: false,
    checkRoomJurisdiction: false,
    checkRoomType: false,
    checkOrderManager: false,
    checkMenuManager: false,
    checkData: false,
    checkWriteOff: false,
    checkFinancialDetails: false,
    checkUserManger: false,
    checkAccount: false,
    checkOrderSetting: false,
    //订单受理权限
    checkSelf: false,
    checkClearRoom: false,
    checkStore: false,
    checkCheckOut: false,
    checkVip: false,
    checkInvoice: false,
    checkAdvise: false,
    checkHotelReservation: false,
    checkMeals:false,
    permissions:[],
    checkeds:false,
    reply:false,
    userId: 0
  },
  //添加职位
  addPosition: function (e) {
    //添加职位函数
    var that = this;
    var url = util.url + InterFace.addPosition;
    var position = this.data.position;
    request.addPosition(url, position)
    
  },
  //禁用显示
  isDisable:function(e){
    var that = this;
    if(that.data.state == "解除禁用"){
      var that = this;
      var userId = that.data.userId;
      var enableUserUrl = util.url + InterFace.enableUser;
      //解除禁止使用函数
      request.orUse(enableUserUrl, userId, '禁用提示', '是否解除禁用该账号？', '已解除禁用', util);
    } else if (that.data.state == "禁用"){
      var that = this;
      var userId = that.data.userId;
      var disableUserUrl = util.url + InterFace.disableUser;

      //禁止使用函数
      request.orUse(disableUserUrl, userId, '禁用提示', '是否禁用该账号？', '已禁用', util);
    }
  },
  //禁止使用
  prohibit:function(e){
    var that = this;
    var userId = that.data.userId;
    var disableUserUrl = util.url + InterFace.disableUser;
    
    //禁止使用函数
    request.orUse(disableUserUrl, userId, '禁用提示', '是否禁用该账号？', '已禁用',util);
  },
  //解除禁止使用
  relieve:function(e){
    var that = this;
    var userId = that.data.userId;
    var enableUserUrl = util.url + InterFace.enableUser;
    //解除禁止使用函数
    request.orUse(enableUserUrl, userId, '禁用提示', '是否解除禁用该账号？', '已解除禁用', util);
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    if (this.data.positionList[e.detail.value] == '手动输入') {
      this.setData({
        reply: true
      })
    } else {
      this.setData({
        reply: false
      })
    }
    this.setData({
      index: e.detail.value
    })

  },
  switchChange: function (e) {

    if (e.detail.value){
      var permissions = this.data.permissions;
      permissions.push("ORDER_ACCEPT")
      this.setData({
        permissions: permissions
      })
    }else{
      var permissions = this.data.permissions;
      permissions.remove("ORDER_ACCEPT")
      this.setData({
        permissions: permissions
      })
    }
  },
  reset:function(e){
    this.setData({
      show:true,
      resetBtn:false
    })
  },

  /**
*   业务权限设置
*/
  //酒店资料编辑
  hotelData: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_HOTEL_INFO_EDIT")
      this.setData({
        checkHotelData: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_HOTEL_INFO_EDIT");
      this.setData({
        checkHotelData: false,
        permissions: permissions
      })
    }
  },
  //房间授权
  roomJurisdiction: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_ROOM_AUTHORIZE")
      this.setData({
        checkRoomJurisdiction: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_ROOM_AUTHORIZE");
      this.setData({
        checkRoomJurisdiction: false,
        permissions: permissions
      })
    }
  },
  //房型管理
  roomType: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_ROOM_TYPE")
      this.setData({
        checkRoomType: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_ROOM_TYPE");
      this.setData({
        checkRoomType: false,
        permissions: permissions
      })
    }
  },
  //订单管理
  orderManager: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_ORDER_MANAGE")
      this.setData({
        checkOrderManager: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_ORDER_MANAGE");
      this.setData({
        checkOrderManager: false,
        permissions: permissions
      })
    }
  },
  //菜单管理
  menuManager: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_SET")
      this.setData({
        checkMenuManager: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_SET");
      this.setData({
        checkMenuManager: false,
        permissions: permissions
      })
    }
  },
  //运营数据
  dataManager: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_DATA_STATISTICS")
      this.setData({
        checkData: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_DATA_STATISTICS");
      this.setData({
        checkData: false,
        permissions: permissions
      })
    }
  },
  //票券核销
  writeOff: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_BREAKFAST_VOUCHER_CANCEL")
      this.setData({
        checkWriteOff: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_BREAKFAST_VOUCHER_CANCEL");
      this.setData({
        checkWriteOff: false,
        permissions: permissions
      })
    }
  },
  //财务明细
  financialDetails: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_FINANCE_MANAGE")
      this.setData({
        checkFinancialDetails: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_FINANCE_MANAGE");
      this.setData({
        checkFinancialDetails: false,
        permissions: permissions
      })
    }
  },
  //用户管理
  userManager: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_CUSTOMER_MANAGE")
      this.setData({
        checkUserManger: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_CUSTOMER_MANAGE");
      this.setData({
        checkUserManger: false,
        permissions: permissions
      })
    }
  },
  //账号授权
  account: function (e) {
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_PERMISSION_SET")
      this.setData({
        checkAccount: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_PERMISSION_SET");
      this.setData({
        checkAccount: false,
        permissions: permissions
      })
    }
  },
  //订单受理
  orderSetting: function (e) {
    var permissions = this.data.permissions;
    var checkOrderSetting = this.data.checkOrderSetting;
    if (checkOrderSetting) {
      permissions.remove("ORDER_ACCEPT")
      this.setData({
        checkOrderSetting: false,
      })
    } else {
      permissions.push("ORDER_ACCEPT")
      this.setData({
        checkOrderSetting: true,
      })
    }
  },
  /** 
   * 订单受理权限
  */
  //自助续住
  self: function (e) {
    var permissions = this.data.permissions;
    var checkSelf = this.data.checkSelf;
    if (checkSelf) {
      permissions.remove("CONTINUE_STAY")
      this.setData({
        checkSelf: false,
      })
    } else {
      permissions.push("CONTINUE_STAY")
      this.setData({
        checkSelf: true,
      })
    }
  },
  //清扫房间
  clearRoom: function (e) {
    var permissions = this.data.permissions;
    var checkClearRoom = this.data.checkClearRoom;
    if (checkClearRoom) {
      permissions.remove("CLEAN_ROOM")
      this.setData({
        checkClearRoom: false,
      })
    } else {
      permissions.push("CLEAN_ROOM")
      this.setData({
        checkClearRoom: true,
      })
    }
  },
  //迷你吧
  store: function (e) {
    var permissions = this.data.permissions;
    var checkStore = this.data.checkStore;
    if (checkStore) {
      permissions.remove("MINI_BAR")
      this.setData({
        checkStore: false,
      })
    } else {
      permissions.push("MINI_BAR")
      this.setData({
        checkStore: true,
      })
    }
  },
  // 客房送餐
  meals:function(){
    var permissions = this.data.permissions;
    var checkMeals = this.data.checkMeals;
    if (checkMeals) {
      permissions.remove("MEAL")
      this.setData({
        checkMeals: false,
      })
    } else {
      permissions.push("MEAL")
      this.setData({
        checkMeals: true,
      })
    }
  },
  //退房
  checkOut: function (e) {
    var permissions = this.data.permissions;
    var checkCheckOut = this.data.checkCheckOut;
    if (checkCheckOut) {
      permissions.remove("CHECKOUT")
      this.setData({
        checkCheckOut: false,
      })
    } else {
      permissions.push("CHECKOUT")
      this.setData({
        checkCheckOut: true,
      })
    }
  },
  //会员
  vip: function (e) {
    var permissions = this.data.permissions;
    var checkVip = this.data.checkVip;
    if (checkVip) {
      permissions.remove("VIP")
      this.setData({
        checkVip: false,
      })
    } else {
      permissions.push("VIP")
      this.setData({
        checkVip: true,
      })
    }
  },
  //发票
  invoice: function (e) {
    var permissions = this.data.permissions;
    var checkInvoice = this.data.checkInvoice;
    if (checkInvoice) {
      permissions.remove("INVOICE")
      this.setData({
        checkInvoice: false,
      })
    } else {
      permissions.push("INVOICE")
      this.setData({
        checkInvoice: true,
      })
    }
  },
  //经理在线
  advise: function (e) {
    var permissions = this.data.permissions;
    var checkAdvise = this.data.checkAdvise;
    if (checkAdvise) {
      permissions.remove("FEEDBACK")
      this.setData({
        checkAdvise: false,
      })
    } else {
      permissions.push("FEEDBACK")
      this.setData({
        checkAdvise: true,
      })
    }
  },
  //酒店预订
  hotelReservation: function (e) {
    var permissions = this.data.permissions;
    var checkHotelReservation = this.data.checkHotelReservation;
    if (checkHotelReservation) {
      permissions.remove("HOTEL_RESERVE")
      this.setData({
        checkHotelReservation: false,
      })
    } else {
      permissions.push("HOTEL_RESERVE")
      this.setData({
        checkHotelReservation: true,
      })
    }
  },
  //获取输入文本内容
  inputChange: function (e) {
    switch (e.currentTarget.id) {
      case 'phone':

        this.setData({
          phone: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'password':
        this.setData({
          password: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'name':
        this.setData({
          name: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'position':
        this.setData({
          position: e.detail.value.replace(/\s+/g, '')
        })
        break;
    }
  },
  // 表单提交
  formSubmit: function (e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var userId = that.data.userId;
    var name = that.data.name;
    var phone = that.data.phone;
    var password = that.data.password;
    var url = util.url + InterFace.updateUserInfo;
    if (that.data.positionList[that.data.index] == '手动输入') {
     
      var position = that.data.position;
      //信息提交
      var permissions = that.data.permissions;
      var params = {
        "userId": userId,
        "userName": name,
        "position": position,
        "phoneNumber": phone,
        "password": password,
        "permissions": that.data.permissions
      }
      //表单提交函数
      if(name == ''){
        util.showToastMsg("名字不能空")
        return
      }else{
        request.formSubmit(url, params, util,that)
      }
    }else{
      var position = that.data.positionList[that.data.index];
      //信息提交
      var permissions = that.data.permissions;
      var params = {
          "userId": userId,
          "userName": name,
          "position": position,
          "phoneNumber": phone,
          "password": password,
          "permissions": that.data.permissions
        };
      if (name == '') {
        util.showToastMsg("名字不能空")
        return
      } else {
        request.formSubmit(url, params, util,that)
      }
    
    }
  

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    let userId = decodeURIComponent(options.userId)
    that.setData({
      userId: userId
    })
   
    wx.request({
      url: util.url + InterFace.getUserInfoById,
      data:{
        'userId': userId
      },
      header: {
        'content-type': 'application/json',
        'Token': loginToken,
     
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        var permissions = res.data.data.permissions;
        var isDisable;
        for (var i = 0; i < permissions.length; i++) {
          switch (permissions[i]){
            case "FUN_HOTEL_INFO_EDIT":
              that.setData({
                checkHotelData:true
              })
              break;
            case "FUN_ORDER_MANAGE":
              that.setData({
                checkOrderManager:true
              })
              break;
            case "FUN_FINANCE_MANAGE":
              that.setData({
                checkFinancialDetails:true
              })
              break;
            case "FUN_DATA_STATISTICS":
              that.setData({
                checkData:true
              })
              break;
            case  "FUN_PERMISSION_SET":
              that.setData({
                checkAccount:true
              })
              break;
            case "FUN_CUSTOMER_MANAGE":
              that.setData({
                checkUserManger: true,
              })
              break;
            case "ORDER_ACCEPT":
              that.setData({
                checkOrderSetting: true,
              })
              break;
            case "FUN_SET":
              that.setData({
                checkMenuManager: true,
              })
              break;
            case "FUN_ROOM_AUTHORIZE":
              that.setData({
                checkRoomJurisdiction: true,
              })
              break;
            case "FUN_ROOM_TYPE":
              that.setData({
                checkRoomType: true,
              })
              break;
            case "FUN_BREAKFAST_VOUCHER_CANCEL":
              that.setData({
                checkWriteOff: true,
              })
              break;
              //订单受理权限
            case "CLEAN_ROOM":
              that.setData({
                checkClearRoom: true,
              })
              break;
            case "MINI_BAR":
              that.setData({
                checkStore: true,
              })
              break;
            case "CONTINUE_STAY":
              that.setData({
                checkSelf: true,
              })
              break;
            case "INVOICE":
              that.setData({
                checkInvoice: true,
              })
              break;
            case "CHECKOUT":
              that.setData({
                checkCheckOut: true,
              })
              break;
            case "VIP":
              that.setData({
                checkVip: true,
              })
              break;
            case "FEEDBACK":
              that.setData({
                checkAdvise: true,
              })
              break;
            case "HOTEL_RESERVE":
              that.setData({
                checkHotelReservation: true,
              })
              break;
            case "MEAL":
              that.setData({
                checkMeals: true,
              })
              break;
          }
        }
        var positionList = that.data.positionList;
        for (var i = 0; i <= positionList.length;i++){
          if (res.data.data.userInfo.position == positionList[i]){
            that.setData({
              index:i
            })
          }
        }
        if (res.data.data.userInfo.isDisable){
          isDisable = "解除禁用"
        }else{
          isDisable = "禁用"
        }
        that.setData({
          userInfo:res.data.data.userInfo,
          permissions:res.data.data.permissions,
          phone: res.data.data.userInfo.phone,
          name: res.data.data.userInfo.name,
          position:res.data.data.userInfo.position,
          state:isDisable
        })
        console.log("position:"+that.data.position)
      },
      fail: function(res) {},
      complete: function(res) {
        //获取职位
        wx.request({
          url: util.url + InterFace.findPositions,
          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(res)
            var positionList = that.data.positionList;
            for (var i = 0; i < res.data.data.positionList.length; i++) {

              positionList.unshift(res.data.data.positionList[i])
            }
            that.setData({
              positionList: positionList
            })
          },
          fail: function (res) { },
          complete: function (res) {
            var position = that.data.position;
            for (var i = 0; i <= that.data.positionList.length; i++) {

              if (position == that.data.positionList[i]) {
                that.setData({
                  index:i
                })
              }
            }
          },
        })
      },
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