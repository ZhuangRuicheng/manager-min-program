// pages/dataInput/modelInput/modelInput.js
const app = getApp()
var util = require('../../utils/util.js');
var InterFace = require('../../utils/url.js');
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    dayName: '日租房',
    clockName: '钟点房',
    halfDay: '半日房',
    dayChecked: true,
    clockCheck: false,
    halfDayCheck: false,
    useType: '',
    modelName: '',
    roomPrice: '',
    area: '',
    floor: '',
    bedTypes: '',
    windows: '',
    checkInNum: '',
    describe: '',
    addBed: '',
    roomTypeList: [],
    hide: true,
    show: false,
    img: '',
    radioValue: 'DAY_ROOM',
    EditshowModalStatus: false,
    id: 0
  },
 
  //添加房型弹出框
  showModal: function(e) {
    this.setData({
      showModalStatus: true
    })
  },
  //添加房型隐藏框
  hideModal: function(e) {
    this.setData({
      showModalStatus: false,
      hide: true,
      show: false,
      modelName: '',
      bedTypes: '',
      area: '',
      checkInNum: '',
      windows: '',
      addBed: '',
      describe: '',
      img: '',
      floor: ''
    })
  },

  //获取输入框内容
  inputChange: function (e) {
    switch (e.currentTarget.id) {

      case 'modelName':

        this.setData({
          modelName: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'roomPrice':

        this.setData({
          roomPrice: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'area':

        this.setData({
          area: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'floor':

        this.setData({
          floor: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'bedTypes':

        this.setData({
          bedTypes: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'windows':

        this.setData({
          windows: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'checkInNum':

        this.setData({
          checkInNum: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'describe':

        this.setData({
          describe: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'addBed':

        this.setData({
          addBed: e.detail.value.replace(/\s+/g, '')
        })

        break;
    }
  },
  //添加房型
  click: function(e) {

    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: util.url + InterFace.imageUpload + '?size=SIZE_2',
          filePath: tempFilePaths[0],
          name: 'imageFile',
          data: {
            "size": "SMALL"
          },
          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          success: function(res) {
            var headerImage = JSON.parse(res.data).data.imgUrl
            that.setData({
              img: headerImage,
              hide: false,
              show: true
            })
            // console.log(JSON.parse(res.data).data.imgUrl)
            // that.setData({

            // })
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  //编辑房型
  edit: function(e) {
    var id = e.currentTarget.dataset.id;
    var imgUrl = e.currentTarget.dataset.img;
    // if (!imgUrl) {
    //   imgUrl = '../../images/useType.png'
    // }
    wx.navigateTo({
      url: './editMode/editMode?id=' + id,
    })
  },
  
  //添加房型信息表单数据提交
  formSubmit: function(e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");

    var typeName = that.data.modelName;

    var bedType = that.data.bedTypes;
    var area = that.data.area;
    var stayNum = that.data.checkInNum;
    var window = that.data.windows;
    var addBed = that.data.addBed;
    var description = that.data.describe;
    var imgUrl = that.data.img;
    var floor = that.data.floor;
    if (imgUrl == '') {
      util.showToastMsg('请先上传图片');
      return
    } else {
      if (typeName == '') {
        util.showToastMsg('房型名称不能为空');
        return
    } else {
      if (area == '') {
        util.showToastMsg('面积不能为空');
        return
    } else {
      if (floor == '') {
        util.showToastMsg('楼层不能为空');
        return
    } else {
      if (bedType == '') {
        util.showToastMsg('床型不能为空');
        return
    } else {
      if (window == '') {
        util.showToastMsg('窗户不能为空');
        return
    } else {
      if (addBed == '') {
        util.showToastMsg('是否加床不能为空');
        return
    } else {
      if (stayNum == '') {
        util.showToastMsg('入住人数不能为空');
        return
    } else {
        var url = util.url + InterFace.saveRoomType;
        var params = {
          "typeName": typeName,
          "bedType": bedType,
          "area": area,
          "stayNum": stayNum,
          "window": window,
          "addBed": addBed,
          "description": description,
          "imgUrl": imgUrl,
          "floor": floor
        };
        var successData = function(res){
          if (res.data.code == 0) {
            util.showToastMsg('添加成功');
              that.setData({
                showModalStatus: false,
                hide: true,
                show: false,
                modelName: '',
                bedTypes: '',
                area: '',
                checkInNum: '',
                windows: '',
                addBed: '',
                describe: '',
                img: '',
                floor: ''
              })
           
          } else {
            util.showToastMsg(res.data.msg)
          }
          setTimeout(function () {
            that.getRoomTypeList(that);
          }, 1500)   
        };
        var failData = function(res){
          that.getRoomTypeList(that);
        };
        request.Request('POST', '添加中', url, params, successData, failData)
                    }
                  }
                }
              }
            }
          }
  
      }
    }

  },
  roomManager:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './modeManager/modeManager?id=' + id,
    })
  },
  //删除房型
  deleteImage: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var loginToken = wx.getStorageSync("loginToken");
    wx.showModal({
      title: '提示',
      content: '是否删除此房型？',
      success: function(res) {
        if (res.confirm) {
          var url = util.url + InterFace.delRoomType;
          var params = {
            "roomTypeId": id
          };
          var successData = function(res){
            if(res.data.code == 0){
              util.showToastMsg('删除成功');
            }else{
              util.showToastMsg(res.data.msg);
            }
            setTimeout(function () {
              that.getRoomTypeList(that);
            }, 1500)   
          };
          var failData = function(res){
            that.getRoomTypeList(that);
          };
          request.Request('POST', '删除中', url, params, successData, failData)
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }

      }
    })
  },
  //开启可预订房间
  openRoomTypeBook: function(e) {
    var that = this;
    // var loginToken = wx.getStorageSync("loginToken");
    var id = e.currentTarget.dataset.id;
    var url = util.url + InterFace.openRoomTypeBook;
    var params = {
      "roomTypeId": id
    };
    var successData = function (res) {
      if (res.data.code == 0) {
        util.showToastMsg('更改成功');
      } else {
        util.showToastMsg(res.data.msg);
      }
      that.getRoomTypeList(that);
    };
    var failData = function (res) {
      that.getRoomTypeList(that);
    };
    request.Request('POST', '开启中', url, params, successData, failData)
  },
  //关闭可预订
  closeRoomTypeBook: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var url = util.url + InterFace.closeRoomTypeBook;
    var params = {
      "roomTypeId": id
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg('更改成功');
      }else{
        util.showToastMsg(res.data.msg);
      }
      that.getRoomTypeList(that);
    };
    var failData = function(res){
      that.getRoomTypeList(that);
    };
    request.Request('POST', '关闭中', url, params, successData, failData)
  },
  //获取酒店房型
  getRoomTypeList:function(that){
    var url = util.url + InterFace.getRoomTypeList;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          roomTypeList: res.data.data.roomTypes,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getRoomTypeList(that);
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
    that.getRoomTypeList(that);
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