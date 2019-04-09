// pages/dataInput/roomInput/roomInput.js
const app = getApp()
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
let animationShowHeight = 300;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: "",
    showModalStatus: false,
    QrModalStatus:false,
    inputValue:'',
    inputtextareaValue:[],
    floorList:[],
    roomId:'',
    roomnum:'',
    QrImg:'',
    moreQrModalStatus:false,
    emailInput:''
  },
  /**
    * 弹出层函数
    */
  imageLoad: function (e) {
    this.setData({ imageHeight: e.detail.height, imageWidth: e.detail.width });
  },
  showModal: function (e) {
    // // 显示遮罩层
   
    this.setData({
      showModalStatus: true
    })
  
  },
  //跳转房间号详情
  roomDatails:function(e){
    var roomId = e.currentTarget.dataset.id;
    var roomNum = e.currentTarget.dataset.roomnum;
    wx.navigateTo({
      url: './roomDetails/roomDetails?roomId=' + roomId + '&roomNum=' + roomNum,
    })
  },
  
  //批量二维码显示层
  moreshowModal: function (e) {
    // // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData: animation.export(),
      moreQrModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
    //获取邮箱
    // var that = this;
    // var loginToken = wx.getStorageSync("loginToken");
    // var url = util.url + InterFace.getHotelMail;
    // var params = {};
    // var successData = function(res){
    //   if (res.data.code == 0) {
    //     that.setData({
    //       emailInput: res.data.data.mail
    //     })
    //   } else {
    //     util.showToastMsg(res.data.msg)
    //   }
    // };
    // var failData = function(res){};
    // request.Request('GET', '加载中', url, params, successData, failData)
    },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        inputValue:'',
        inputtextareaValue:''
      })
    }.bind(this), 200)
  },
  //批量二维码隐藏层
  moreQRhideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        moreQrModalStatus: false
      })
    }.bind(this), 200)
  },
  
  //获取输入文本内容
  inputChange: function (e) {
    switch (e.currentTarget.id) {
      case 'inputValue':
        this.setData({
          inputValue: e.detail.value.replace(/\s+/g, '')
        })
      
        break;
      case 'inputtextareaValue':
        this.setData({
          inputtextareaValue: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'emailInput':
        this.setData({
          emailInput: e.detail.value.replace(/\s+/g, '')
        })

        break;
    }
  },
     //表单数据提交
  formSubmit:function(e){
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var floor = JSON.stringify(that.data.inputValue);
    var roomNum = that.data.inputtextareaValue;
    var roomNums = [];
    console.log("floor:" + floor)
    if (floor == ''){
      util.showToastMsg("楼层不能为空")
      return
    }else{
      if (roomNum == ''){
        util.showToastMsg("房间号不能为空")
        return
      }else{
        roomNums = roomNum.split(/[,，]/);
        var url = util.url + InterFace.addRooms;
        var params = {
          'floor': floor,
          'roomNum': roomNums,
        };
        var successData = function(res){
          if (res.data.code == 10) {
            util.showToastMsg(res.data.msg)
            wx.clearStorageSync();
            wx.redirectTo({
              url: '../../login/login',
            })
          } else {
            util.showToastMsg(res.data.msg)
            that.setData({
              inputValue: '',
              inputtextareaValue: '',
              showModalStatus: false
            })
          }
           setTimeout(function () {
             that.getRooms(that);
        }, 2000)
          
        };
        var failData = function(res){
          that.getRooms(that);
        };
        request.Request('POST', '添加中', url, params, successData, failData)
      }
    }

  },
 
  //删除房间号
  deleteImage:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var floorList = that.data.floorList;
    var loginToken = wx.getStorageSync("loginToken");
    wx.showModal({
      title: '提示',
      content: '是否删除此房间号？',
      success: function (res) {
        if (res.confirm) {
          var url = util.url + InterFace.deleteRoom;
          var params = {
            "roomId": id
          };
          var successData = function(res){
            if(res.data.code == 0){
              util.showToastMsg("删除成功")
            }else{
              util.showToastMsg(res.data.msg)
            }
            that.getRooms(that);
          };
          var failData = function(res){
            that.getRooms(that);
          };
          request.Request('POST', '删除中', url, params, successData, failData)
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
       
      }
    })
    
  },
  //获取房间号函数封装共用
  getRooms:function(that){
    var url = util.url + InterFace.getRooms;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          floorList: res.data.data.rooms,
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
    var failData = function(res){
    };
    request.Request('GET', '加载中', url, params, successData, failData)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var url = util.url + InterFace.getRooms;
    that.getRooms(that);
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