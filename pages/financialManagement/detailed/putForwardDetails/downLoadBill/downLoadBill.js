// pages/financialManagement/detailed/putForwardDetails/downLoadBill/downLoadBill.js
var util = require('../../../../../utils/util.js');
var InterFace = require('../../../../../utils/url.js');
var request = require('../../../../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    BeginDate: '',
    EndDate:'',
    QrModalStatus:false,
    mail:'',
   
    
  },
  //选择开始时间
  bindBeginDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      BeginDate: e.detail.value
    })
  },
  //选择结束时间
  bindEndDate: function (e) {
    this.setData({
      EndDate: e.detail.value
    })
   
  },
  //下载账单
  downLoad:function(e){
    var BeginDate = this.data.BeginDate;
    var EndDate = this.data.EndDate;
    var BeginDates = new Date(BeginDate.replace(/-/g, "/"));
    var EndDates = new Date(EndDate.replace(/-/g, "/"));
    var days = EndDates.getTime() - BeginDates.getTime();
    if (days <= 0) {
      util.showToastMsg('对账时间不能小于一天，请重新选择')
      return
    } else {
      this.setData({
        QrModalStatus:true
      })
    }
  },
  //关闭弹出框
  clear:function(e){
    this.setData({
      QrModalStatus:false
    })
  },
  //获取输入邮箱
  inputMail:function(e){
    this.setData({
      mail: e.detail.value.replace(/\s+/g, '')
    })
  },
  //发送到邮箱
  sed:function(e){
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var mail = that.data.mail;
    var BeginDate = that.data.BeginDate;
    var EndDate = that.data.EndDate;
    if(mail == ''){
      util.showToastMsg("请输入邮箱地址")
      return
    }else{
      var url = util.url + InterFace.sendBills2Mail;
      var params = {
        'startDate': BeginDate,
        'endDate': EndDate,
        'mail': mail
      };
      var successData = function(res){
        if (res.data.code == 0) {
          setTimeout(function () {
            util.showToastMsg("发送成功")
          }, 1500)
          that.setData({
            QrModalStatus: false
          })
        } else {
          util.showToastMsg(res.data.msg)
        }
      };
      var failData = function(res){};
      request.Request('POST', '发送中', url, params, successData, failData)
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var checkOutD = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1);

    //当月天数
    var monthDaySize;
    //当月号数
    var checkOutDay = date.getDate();
    //当月月份
    var checkOutMonth = date.getMonth() + 1;
    var checkOutYear = date.getFullYear();
    if (date.getMonth() + 1 == 1 || date.getMonth() + 1 == 3 || date.getMonth() + 1 == 5 || date.getMonth() + 1 == 7 || date.getMonth() + 1 == 8 || date.getMonth() + 1 == 10 || date.getMonth() + 1 == 12) {
      monthDaySize = 31;
      if (checkOutDay - monthDaySize == 0) {
        checkOutDay = "01";
        checkOutMonth = checkOutMonth + 1;
      } else {
        checkOutMonth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        checkOutDay = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1);
      }
      if (checkOutDay == 31) {
        checkOutYear = checkOutYear + 1;
      }

    } else if (date.getMonth() + 1 == 4 || date.getMonth() + 1 == 6 || date.getMonth() + 1 == 9 || date.getMonth() + 1 == 11) {
      monthDaySize = 30;
      if (checkOutDay - monthDaySize == 0) {
        checkOutDay = "01";
        checkOutMonth = checkOutMonth + 1;
      } else {
        checkOutMonth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        checkOutDay = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1);
      }
    } else if (date.getMonth() + 1 == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((checkOutYear - 2000) % 4 == 0) {
        monthDaySize = 29;
        if (checkOutDay - monthDaySize == 0) {
          checkOutDay = "01";
          checkOutMonth = checkOutMonth + 1;
        } else {
          checkOutMonth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          checkOutDay = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1);
        }
      } else {
        monthDaySize = 28;
        if (checkOutDay - monthDaySize == 0) {
          checkOutDay = "01";
          checkOutMonth = checkOutMonth + 1;
        } else {
          checkOutMonth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          checkOutDay = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1);
        }
      }
    };
    var liveDate = checkOutD - D;
    var time = Y + "-" + M + "-" + D;
    var checkDate = checkOutYear + "-" + checkOutMonth + "-" + checkOutDay;
    this.setData({
      BeginDate: checkDate,
      EndDate: time
    })
    
    //获取邮箱
    var that = this;
    var url = util.url + InterFace.getHotelMail;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          mail: res.data.data.mail
        })
      } else {
        util.showToastMsg(res.data.msg)
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

  }
})