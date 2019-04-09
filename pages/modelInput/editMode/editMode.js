// pages/dataInput/modelInput/editMode/editMode.js
var util = require('../../../utils/util.js');
var InterFace = require('../../../utils/url.js');
var request = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    arem:'',
    floor:'',
    bedtype:'',
    window:'',
    addbed:'',
    personnum:'',
    describe:'',
    roomTypeId:''
  },
  //获取输入内容
  inputChange:function(e){
    switch (e.currentTarget.id) {
      case 'name':
        this.setData({
          name: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'arem':
        this.setData({
          arem: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'floor':
        this.setData({
          floor: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'bedtype':
        this.setData({
          bedtype: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'window':
        this.setData({
          window: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'addbed':
        this.setData({
          addbed: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'personnum':
        this.setData({
          personnum: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'describe':
        this.setData({
          describe: e.detail.value.replace(/\s+/g, '')
        })
        break;
    }
  },
  //更改信息提交
  formSubmit:function(e){
    var that = this;
    var roomTypeId = that.data.roomTypeId;
    var img = that.data.img;
    var name = that.data.name;
    var arem = that.data.arem;
    var floor = that.data.floor;
    var bedtype = that.data.bedtype;
    var window = that.data.window;
    var addbed = that.data.addbed;
    var personnum = that.data.personnum;
    var describe = that.data.describe;
    if (name == ''){
      util.showToastMsg('房型名称不能为空');
      return
    }else{
      if (arem == ''){
        util.showToastMsg('房型面积不能为空');
        return 
      }else{
        if (floor == ''){
          util.showToastMsg('楼层不能为空');
          return
        }else{
          if (bedtype == ''){
            util.showToastMsg('床型不能为空');
            return
          }else{
            if (window == ''){
              util.showToastMsg('请填写是否有窗户');
              return
            }else{
              if (addbed == ''){
                util.showToastMsg('请填写是否可加床');
                return 
              }else{
                if (personnum == ''){
                  util.showToastMsg('请填写可居住几人');
                  return   
                }else{
                  var url = util.url + InterFace.saveRoomType;
                  var params = {
                    "roomTypeId": roomTypeId,
                    "typeName": name,
                    "bedType": bedtype,
                    "area": arem,
                    "stayNum": personnum,
                    "window": window,
                    "addBed": addbed,
                    "description": describe,
                    "imgUrl": img,
                    "floor": floor
                  };
                  var successData = function(res){
                    if(res.data.code == 0){
                      util.showToastMsg("编辑成功")
                    }else{
                      util.showToastMsg(res.data.msg)
                    }
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1,
                      })
                    }, 1500)
                  };
                  var failData = function(res){};
                  request.Request('POST', '编辑中', url, params, successData, failData)
                }
              }
            }
          }
        }
      }
    }
  },
  //更改
  click: function (e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: util.url + InterFace.imageUpload + '?size=SIZE_2',
          filePath: tempFilePaths[0],
          name: 'imageFile',
          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          success: function (res) {
            var headerImage = JSON.parse(res.data).data.imgUrl
            that.setData({
              img: headerImage
            })
            console.log(JSON.parse(res.data).data.imgUrl)
          },
          fail: function (res) { },
          complete: function (res) { },
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
    var roomTypeId = options.id;
    that.setData({
      roomTypeId: roomTypeId
    })
    var url = util.url + InterFace.getRoomTypeBaseInfo;
    var params = {
      'roomTypeId': roomTypeId
    };
    var successData = function(res){
      that.setData({
        img: res.data.data.imgUrl,
        name: res.data.data.typeName,
        arem: res.data.data.area,
        floor: res.data.data.floor,
        bedtype: res.data.data.bedType,
        window: res.data.data.window,
        addbed: res.data.data.addBed,
        personnum: res.data.data.stayNum,
        describe: res.data.data.description,
      })
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