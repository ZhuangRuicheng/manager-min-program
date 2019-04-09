// pages/JurisdictionAdmin/newAccount/newAccount.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionList: ["手动输入"],
    index: 0,
    //业务权限设置
    checkHotelData:false,
    checkRoomJurisdiction:false,
    checkRoomType:false,
    checkOrderManager:false,
    checkMenuManager:false,
    checkData:false,
    checkWriteOff:false,
    checkFinancialDetails:false,
    checkUserManger:false,
    checkAccount:false,
    checkOrderSetting:false,
    //订单受理权限
    checkSelf:false,
    checkClearRoom:false,
    checkStore:false,
    checkCheckOut:false,
    checkVip:false,
    checkInvoice:false,
    checkAdvise:false,
    checkHotelReservation:false,
    checkMeals: false,
    permissions: [],
    name:'',
    phone:'',
    password:'',
    position:''
  },
  //添加职位
  addPosition:function(e){
    var that = this;
    var url = util.url + InterFace.addPosition;
    var position = this.data.position;
    request.addPosition(url, position)
  },
    // 表单提交
  formSubmit:function(e){
     if(this.data.positionList[this.data.index] == '手动输入'){
    var name = this.data.name;
    var phone = this.data.phone;
    var password = this.data.password;
    var permissions = this.data.permissions;
    var position = this.data.position;
      //信息提交
      var that = this;
      var loginToken = wx.getStorageSync("loginToken");
      if(name == ''){
        util.showToastMsg('员工姓名不能为空')
        return
      }else{
        if(phone == ''){
          util.showToastMsg('手机号码不能为空')
          return
        }else{
          if(password ==''){
            util.showToastMsg('密码不能为空')
            return
          }else{
            var params = {
              "userName": name,
              "position": position,
              "phoneNumber": phone,
              "password": password,
              "permissions": permissions
            };
            that.addUser(params, that);
          }
        }
      }

     }else{
 var name = this.data.name;
    var phone = this.data.phone;
    var password = this.data.password;
    var position = this.data.positionList[this.data.index];
    var permissions = this.data.permissions;
      //信息提交
      var that = this;
      var loginToken = wx.getStorageSync("loginToken");
      if(name == ''){
        util.showToastMsg('员工姓名不能为空')
        return
      }else{
        if(phone == ''){
          util.showToastMsg('手机号码不能为空')
          return
        }else{
          if(password ==''){
            util.showToastMsg('密码不能为空')
            return
          }else{
            var params = {
              "userName": name,
              "position": position,
              "phoneNumber": phone,
              "password": password,
              "permissions": permissions
            };
            that.addUser(params,that);
          }
        }
      }

     }
  },
  //添加用户
  addUser:function(params,that){
    var url = util.url + InterFace.addUser;
    var successData = function(res){
      if(res.data.code == 0){
        that.setData({
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
          name: '',
          phone: '',
          password: '',
        })
        util.showToastMsg('添加成功')
        wx.navigateBack({
          delta: 1,
        })
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res){};
    request.Request('POST', '提交中', url, params, successData, failData)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    //console.log('picker发送选择改变，携带值为', this.data.positionList[e.detail.value])
    if (this.data.positionList[e.detail.value] == '手动输入'){
      this.setData({
        reply:true
      })
    }else{
      this.setData({
        reply: false
      })
    }
    this.setData({
      index: e.detail.value
    })
  },
  switchChange: function (e) {
    //console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value) {
      var permissions = this.data.permissions;
      permissions.push("ORDER_ACCEPT")
      this.setData({
        permissions: permissions
      })
    }
  },
  btn:function(e){
    
    console.log(position)
  },
  //文本框输入更改
  inputChange: function (e) {
    switch (e.currentTarget.id) {
      case 'name':

        this.setData({
          name: e.detail.value
        })
        break;
      case 'phone':
        this.setData({
          phone: e.detail.value
        })

        break;
      case 'password':
        this.setData({
          password: e.detail.value
        })

        break;
      case 'position':
      this.setData({
        position: e.detail.value
      })
      break;
    }
  },
  /**
   *   业务权限设置
  */
  //酒店资料编辑
  hotelData:function(e){
    var permissions = this.data.permissions;
    if (e.detail.value){
      permissions.push("FUN_HOTEL_INFO_EDIT")
      this.setData({
        checkHotelData: e.detail.value,
        permissions: permissions
      })
    }else{
      permissions.remove("FUN_HOTEL_INFO_EDIT");
      this.setData({
        checkHotelData: false,
        permissions: permissions
      })
    }
  },
  //房间授权
  roomJurisdiction:function(e){
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
  roomType:function(e){
    var permissions = this.data.permissions;
    if (e.detail.value) {
      permissions.push("FUN_ROOM_TYPE")
      this.setData({
        checkRoomType: e.detail.value,
        permissions: permissions
      })
    } else {
      permissions.remove("FUN_HOTEL_INFO_EDIT");
      this.setData({
        checkRoomType: false,
        permissions: permissions
      })
    }
  },
  //订单管理
  orderManager:function(e){
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
  menuManager:function(e){
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
  dataManager:function(e){
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
  writeOff:function(e){
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
  financialDetails:function(e){
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
  userManager:function(e){
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
  account:function(e){
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
  orderSetting:function(e){
    var permissions = this.data.permissions;
    var checkOrderSetting = this.data.checkOrderSetting;
    if (checkOrderSetting){
      permissions.remove("ORDER_ACCEPT")
      this.setData({
        checkOrderSetting: false,
      })
    }else{
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
  self:function(e){
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
  clearRoom:function(e){
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
  store:function(e){
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
  //退房
  checkOut:function(e){
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
  vip:function(e){
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
  invoice:function(e){
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
  advise:function(e){
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
  hotelReservation:function(e){
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
  //客房送餐
  meals: function (e) {
    var permissions = this.data.permissions;
    var checkHotelReservation = this.data.checkHotelReservation;
    if (checkHotelReservation) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = util.url + InterFace.findPositions;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        var positionList = that.data.positionList;
        for (var i = 0; i < res.data.data.positionList.length; i++) {
          positionList.unshift(res.data.data.positionList[i])
        }
        that.setData({
          positionList: positionList
        })
      } else if (res.data.code == 10) {
        util.showToastMsg(res.data.msg);
        wx.clearStorageSync("loginToken");
        setTimeout(function () {
          wx.redirectTo({
            url: '../../login/login',
          })
        }, 1500)
      } else {
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