// pages/hotelInfoEdit/storeEdit/goodsClassify/goodsClassify.js
const app = getApp()
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
let animationShowHeight = 300;
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
    categories:[],
    animationData: "",
    showModalStatus: false,
   
    border1:"#cccccc",
    color1:"#333333",
    selectborder1: "#ea5415",
    selectcolor1: "#ea5415",
    border2: "#cccccc",
    color2: "#333333",
    selectborder2: "#ea5415",
    selectcolor2: "#ea5415",
    border3: "#cccccc",
    color3: "#333333",
    selectborder3: "#ea5415",
    selectcolor3: "#ea5415",
    border4: "#cccccc",
    color4: "#333333",
    selectborder4: "#ea5415",
    selectcolor4: "#ea5415",
    border5: "#cccccc",
    color5: "#333333",
    selectborder5: "#ea5415",
    selectcolor5: "#ea5415",
    border6: "#cccccc",
    color6: "#333333",
    selectborder6: "#ea5415",
    selectcolor6: "#ea5415",
    border7: "#cccccc",
    color7: "#333333",
    selectborder7: "#ea5415",
    selectcolor7: "#ea5415",
    value1:'食品',
    value2: '饮料',
    value3: '酒水',
    value4: '甜品',
    value5: '床上用品',
    value6: '借用物品',
    value7: '一次性用品',
    noSelect1:true,
    select1:false,
    noSelect2: true,
    select2: false,
    noSelect3: true,
    select3: false,
    noSelect4: true,
    select4: false,
    noSelect5: true,
    select5: false,
    noSelect6: true,
    select6: false,
    noSelect7: true,
    select7: false,
    inputValue:'',
    selectCategories:[]
  },
  // 弹出层商品分类选择
  nochooseGoods1:function(e){
    var selectCategories = this.data.selectCategories;
    var value1 = this.data.value1;
    selectCategories.push(value1)
     this.setData({
       noSelect1: false,
       select1: true,
       selectCategories: selectCategories
     })
    console.log(this.data.selectCategories)
  },
  selectchooseGoods1:function(e){
    var selectCategories = this.data.selectCategories;
    var value1 = this.data.value1;
    selectCategories.remove(value1)
    this.setData({
      noSelect1: true,
      select1: false,
      selectCategories: selectCategories
    })
    console.log(this.data.selectCategories)
  },
  nochooseGoods2: function (e) {
    var selectCategories = this.data.selectCategories;
    var value2 = this.data.value2;
    selectCategories.push(value2)
    this.setData({
      noSelect2: false,
      select2: true,
      selectCategories: selectCategories
    })

  },
  selectchooseGoods2: function (e) {
    var selectCategories = this.data.selectCategories;
    var value2 = this.data.value2;
    selectCategories.remove(value2)
    this.setData({
      noSelect2: true,
      select2: false,
      selectCategories: selectCategories
    })

  },
  nochooseGoods3: function (e) {
    var selectCategories = this.data.selectCategories;
    var value3 = this.data.value3;
    selectCategories.push(value3)
    this.setData({
      noSelect3: false,
      select3: true,
      selectCategories: selectCategories
    })

  },
  selectchooseGoods3: function (e) {
    var selectCategories = this.data.selectCategories;
    var value3 = this.data.value3;
    selectCategories.remove(value3)
    this.setData({
      noSelect3: true,
      select3: false,
      selectCategories: selectCategories
    })

  },
  nochooseGoods4: function (e) {
    var selectCategories = this.data.selectCategories;
    var value4 = this.data.value4;
    selectCategories.push(value4)
    this.setData({
      noSelect4: false,
      select4: true,
      selectCategories: selectCategories
    })

  },
  selectchooseGoods4: function (e) {
    var selectCategories = this.data.selectCategories;
    var value4 = this.data.value4;
    selectCategories.remove(value4)
    this.setData({
      noSelect4: true,
      select4: false,
      selectCategories: selectCategories
    })

  },
  nochooseGoods5: function (e) {
    var selectCategories = this.data.selectCategories;
    var value5 = this.data.value5;
    selectCategories.push(value5)
    this.setData({
      noSelect5: false,
      select5: true,
      selectCategories: selectCategories
    })

  },
  selectchooseGoods5: function (e) {
    var selectCategories = this.data.selectCategories;
    var value5 = this.data.value5;
    selectCategories.remove(value5)
    this.setData({
      noSelect5: true,
      select5: false,
      selectCategories: selectCategories
    })

  },
  nochooseGoods6: function (e) {
    var selectCategories = this.data.selectCategories;
    var value6 = this.data.value6;
    selectCategories.push(value6)
    this.setData({
      noSelect6: false,
      select6: true,
      selectCategories: selectCategories
    })

  },
  selectchooseGoods6: function (e) {
    var selectCategories = this.data.selectCategories;
    var value6 = this.data.value6;
    selectCategories.remove(value6)
    this.setData({
      noSelect6: true,
      select6: false,
      selectCategories: selectCategories
    })

  },
  nochooseGoods7: function (e) {
    var selectCategories = this.data.selectCategories;
    var value7 = this.data.value7;
    selectCategories.push(value7)
    this.setData({
      noSelect7: false,
      select7: true,
      selectCategories: selectCategories
    })

  },
  selectchooseGoods7: function (e) {
    var selectCategories = this.data.selectCategories;
    var value7 = this.data.value7;
    selectCategories.remove(value7)
    this.setData({
      noSelect7: true,
      select7: false,
      selectCategories: selectCategories
    })

  },
  //改变输入框
  inputChange:function(e){
    this.setData({
      inputValue: e.detail.value.replace(/\s+/g, '')
    })
  },
  //提交表单数据
  formSubmit:function(e){
    var that = this;
    var inputValue = that.data.inputValue; 
    var selectCategories = this.data.selectCategories;
    var loginToken = wx.getStorageSync("loginToken");
    if (inputValue!=''){
    selectCategories.push(inputValue)
    }
    var url = util.url + InterFace.addCategories;
    var params = {
      "categories": selectCategories
    };
    var successData = function(res){
      if(res.data.code == 0){
        util.showToastMsg("提交成功")
        that.setData({
          inputValue: '',
          selectCategories: [],
          noSelect1: true,
          select1: false,
          noSelect2: true,
          select2: false,
          noSelect3: true,
          select3: false,
          noSelect4: true,
          select4: false,
          noSelect5: true,
          select5: false,
          noSelect6: true,
          select6: false,
          noSelect7: true,
          select7: false,
          showModalStatus: false,
        })
        // setTimeout(function () {
        //   wx.navigateBack({
        //     delta: 1,
        //   })
        // }, 1500)
      }else{
        util.showToastMsg(res.data.msg)
      }
      setTimeout(function () {
        that.getCategories(that);
      }, 1500)
     
    };
    var failData = function(res){
      that.getCategories(that);
    };
    request.Request('POST', '提交中', url, params, successData, failData)
  },
  /**
   * 弹出层函数
   */
  imageLoad: function (e) {
    this.setData({ imageHeight: e.detail.height, imageWidth: e.detail.width });
  },
  showModal: function (e) {
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
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
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
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  deleteImage: function (e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var categories = that.data.categories;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除此类型吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          categories.splice(index, 1);
          //console.log(e.currentTarget.dataset.id)
          that.setData({
            categories: categories
          })
         //删除商品分类

          var url = util.url + InterFace.deleteCategoryById;
          var params = {
            "categoryId": id
          };
          var successData = function(res){
            if(res.data.code == 0){
              util.showToastMsg("删除成功")
            }else{
              util.showToastMsg(res.data.msg)
            }
            that.getCategories(that);
          };
          var failData =function(res){
            that.getCategories(that);
          };
          request.Request('POST', '删除中', url, params, successData, failData)
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          categories: categories
        });
      }
    })
  },
  //共用商品类别
  getCategories:function(that){
    var url = util.url + InterFace.getCategories;
    var params = {};
    var successData = function(res){
      if(res.data.code == 0){
        that.setData({
          categories: res.data.data.categories
        })
      }else{
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res){};
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getCategories(that);
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