// pages/serviceMenu/mealsEdit/mealsContent/mealsContent.js
const app = getApp()
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    modelTitle: '添加商品',
    index: 0,
    array: ["所有商品"],
    addStoreArray: [],
    addStoreIndex: 0,
    classifyArray: [{
      id: 0,
      name: '所有商品'
    }],
    addStoreShow: false,
    status: false,
    foodName: '',
    price: '',
    describe: '',
    image: '',
    productId: 0,
    id: ''
  },

  //添加商品弹出层
  showAddContent: function(e) {
    var id = e.currentTarget.id;
    this.setData({
      id: id,
      status: true,
      foodName: '',
      price: '',
      describe: '',
      image: '',
      addStoreShow: true
    })
  },
  //隐藏商品弹出层
  hideModal: function(e) {
    this.setData({
      addStoreShow: false
    })
  },
  //商品上、下架
  switchChange: function(e) {
    if (e.detail.value) {
      this.setData({
        status: true
      })
    } else {
      this.setData({
        status: false
      })
    }
  },
  //添加商品选择商品分类
  bindAddChange: function(e) {
    this.setData({
      addStoreIndex: e.detail.value
    })
    // this.selectClassify(e.detail.value)
  },
  //添加商品选中类别
  selectClassify: function(addStoreIndex) {
    var that = this;
    var array = that.data.array;
    var name = that.data.addStoreArray[addStoreIndex];
    for (var i = 0; i < array.length; i++) {
      if (array[i] == name) {
        that.setData({
          index: i
        })
      }
    }
  },
  //根据类别筛选商品列表
  bindPickerChange: function(e) {
    var that = this;
    var name = that.data.array[e.detail.value];
    var classifyArray = that.data.classifyArray;
    var categoryId;
    that.setData({
      index: e.detail.value
    })
    for (var i = 0; i < classifyArray.length; i++) {
      if (classifyArray[i].name == name) {
        categoryId = classifyArray[i].id
      }
    }

    if (e.detail.value == '0') {
      var params = {};
    } else {
      var params = {
        "categoryId": categoryId
      };
    }
    that.mealsGetProductList(that, params)
    if (name == '所有商品') {
      that.setData({
        addStoreIndex: 0
      })
    } else {
      that.selectStoreClassify(e.detail.value)
    }
  },
  //商品选中类别
  selectStoreClassify: function(i) {
    var that = this;
    var addStoreArray = that.data.addStoreArray;
    var name = that.data.array[i];

    for (var i = 0; i < addStoreArray.length; i++) {
      if (addStoreArray[i] == name) {
        that.setData({
          addStoreIndex: i
        })
      }
    }
  },
  //商品类别id
  selectionId: function(index) {

    var name = this.data.addStoreArray[index];
    var classifyArray = this.data.classifyArray;
    for (var i = 0; i < classifyArray.length; i++) {
      if (classifyArray[i].name == name) {
        this.setData({
          index: i
        })
        return classifyArray[i].id
      }
    }
  },
  //图片上传
  uploadImg:function(e){
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: util.url + InterFace.imageUpload + '?size=SIZE_3',
          filePath: tempFilePaths[0],
          name: 'imageFile',
          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          success: function (res) {
            var headerImage = JSON.parse(res.data).data.imgUrl
            that.setData({
              image: headerImage
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
  //删除商品
  deleteProduct: function(e) {
    var that = this;
    var productId = e.currentTarget.dataset.productid;
    var categoryId = e.currentTarget.dataset.categoryid;
    var index = that.data.index;
    var url = util.url + InterFace.mealsDelProduct;
    var params = {
      'productId': productId,
    };
    var successData = function(res) {
      if (res.data.code == 0) {
        util.showToastMsg("删除成功")
        if (index == 0) {
          var params = {};
        } else {
          var params = {
            'categoryId': categoryId
          };
        }

        that.mealsGetProductList(that, params)
      } else {
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res) {};
    wx.showModal({
      title: '商品删除',
      content: '确认删除该商品？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        if (res.confirm) {
          request.Request('POST', '删除中', url, params, successData, failData)
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取添加商品文本
  getContent: function(e) {
    switch (e.currentTarget.id) {
      case 'foodName':
        this.setData({
          foodName: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'price':
        this.setData({
          price: e.detail.value.replace(/\s+/g, '')
        })
        break;
      case 'describe':
        this.setData({
          describe: e.detail.value.replace(/\s+/g, '')
        })
        break;
    }
  },
  //提交商品
  formSubmit: function(e) {
    var that = this;
    var name = that.data.foodName;
    var description = that.data.describe;
    var price = that.data.price;
    var status = that.data.status;
    var addStoreIndex = that.data.addStoreIndex;
    var categoryId = that.selectionId(addStoreIndex);
    var image = that.data.image;
    var productId = that.data.productId;
    var url = util.url + InterFace.mealsSaveProduct;
    var id = that.data.id;
    if (status == true) {
      if (id == 'add') {
        var params = {
          "categoryId": categoryId,
          "name": name,
          "description": description,
          "price": price,
          "image": image,
          "status": 1,
        };
      } else {
        var params = {
          "id": productId,
          "categoryId": categoryId,
          "name": name,
          "description": description,
          "price": price,
          "image": image,
          "status": 1,
        };
      }

    } else {
      if (id == "edit") {
        var params = {
          "id": productId,
          "categoryId": categoryId,
          "name": name,
          "description": description,
          "price": price,
          "image": image,
          "status": 2,
        };
      }

    }

    var successData = function(res) {
      if (res.data.code == 0) {
        util.showToastMsg("保存成功")
        that.setData({
          addStoreShow: false
        })
        if (id == 'add') {
          that.setData({
            index: 0
          })
          var params = {};
        } else if (id == "edit") {
          var params = {
            "categoryId": categoryId,
          }
        }

        that.mealsGetProductList(that, params)
      } else {
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res) {};
    if (name == '') {
      util.showToastMsg("菜品名称不能为空")
      return
    } else if (price == '') {
      util.showToastMsg("价格不能为空")
      return
    } else if (description == '') {
      util.showToastMsg("商品描述不能为空")
      return
    } else {
      request.Request('POST', '提交中', url, params, successData, failData)
    }

  },
  //商品编辑
  Edit: function(e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    var categoryId = e.currentTarget.dataset.categoryid;
    var image = e.currentTarget.dataset.image;
    var description = e.currentTarget.dataset.description;
    var statusVlue = e.currentTarget.dataset.status;
    var productId = e.currentTarget.dataset.productid;
    var id = e.currentTarget.id;
    var status;
    var price = e.currentTarget.dataset.price;
    if (statusVlue == 1) {
      status = true
    } else if (statusVlue == 2) {
      status = false
    }
    that.setData({
      id: id,
      modelTitle: '编辑商品',
      productId: productId,
      addStoreShow: true,
      status: status,
      foodName: name,
      price: price,
      describe: description,
      image: image
    })

  },
  //获取类别函数封装
  getClassify: function(that) {
    var url = util.url + InterFace.getCategoryList;
    var params = {};
    var successData = function(res) {
      if (res.data.code == 0) {
        var classifyArray = that.data.classifyArray;
        var array = that.data.array;
        var addStoreArray = that.data.addStoreArray;
        for (var i = 0; i < res.data.data.length; i++) {
          classifyArray.push(res.data.data[i])
          addStoreArray.push(res.data.data[i].name)
          array.push(res.data.data[i].name);
        }
        that.setData({
          classifyArray: classifyArray,
          addStoreArray: addStoreArray,
          array: array
        })
      } else {
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res) {};
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  //获取商品列表
  mealsGetProductList: function(that, params) {
    var url = util.url + InterFace.mealsGetProductList;
    var params = params;
    var successData = function(res) {
      if (res.data.code == 0) {
        that.setData({
          productList: res.data.data
        })
      } else {
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res) {};
    request.Request('GET', '加载中', url, params, successData, failData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getClassify(that)
    var params = {};
    that.mealsGetProductList(that, params)
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

  }
})