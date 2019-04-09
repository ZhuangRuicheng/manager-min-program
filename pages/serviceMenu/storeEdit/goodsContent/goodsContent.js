// pages/hotelInfoEdit/storeEdit/goodsContent/goodsContent.js
const app = getApp()
var util = require('../../../../utils/util.js');
var InterFace = require('../../../../utils/url.js');
var request = require('../../../../utils/request.js');
let animationShowHeight = 300;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["所有商品"],
    objectArray: [{
      id: 0,
      name: '所有商品'
    }],
    index: 0,
    addArray: [],
    addObjectArray: [],
    addIndex: 0,
    up: true,
    down: false,
    goodsList: [],
    animationData: "",
    showModalStatus: false,
    editModalStatus: false,
    GoodsName: '',
    goodsPrice: '',
    goodsNUm: '',
    img: '',
    hide: true,
    show: false,
    actionSheetHidden: true,
    actionSheetItems: [{
        bindtap: 'Menu4',
        txt: '上架'
      },
      {
        bindtap: 'Menu1',
        txt: '下架'
      },
      {
        bindtap: 'Menu2',
        txt: '编辑'
      },
      {
        bindtap: 'Menu3',
        txt: '删除'
      }
    ],
    productId: '',
    name: '',
    price: 0,
    num: '',
    editimg: '',
    categoryId: '',
    selectCategory: '',
    selectCategoryId: 0,
    bindCategoryId: 0
  },
  //底部下拉列表函数
  actionSheetTap: function(e) {
    var productId = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var categoryId = e.currentTarget.dataset.categoryid;
    var imgUrl = e.currentTarget.dataset.imgurl;
    var price = e.currentTarget.dataset.price;
    var stock = e.currentTarget.dataset.stock;

    this.setData({
      productId: productId,
      name: name,
      price: price,
      num: stock,
      editimg: imgUrl,
      categoryId: categoryId,
      actionSheetHidden: !this.data.actionSheetHidden,
    })

  },
  actionSheetbindchange: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //商品下架
  bindMenu1: function(e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var productId = that.data.productId;
    var url = util.url + InterFace.updateProductStatus;
    var params = {
      "productId": productId,
      "isDisable": true
    };
    var successData = function(res) {
      if (res.data.code == 0) {
        util.showToastMsg('下架成功');
      } else {
        util.showToastMsg(res.data.msg)
      }
      that.upOrDown(that);
    };
    var failData = function(res) {
      that.upOrDown(that);
    };
    request.Request('POST', '提交中', url, params, successData, failData)
    this.setData({
      menu: 1,
      actionSheetHidden: !this.data.actionSheetHidden
    })

  },
  //商品上架
  bindMenu4: function() {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var productId = that.data.productId;
    var url = util.url + InterFace.updateProductStatus;
    var params = {
      "productId": productId,
      "isDisable": false
    };
    var successData = function(res) {
      if (res.data.code == 0) {
        util.showToastMsg('上架成功')
      } else {
        util.showToastMsg(res.data.msg)
      }
      that.upOrDown(that);
    };
    var failData = function(res) {
      that.upOrDown(that);
    };
    request.Request('POST', '提交中', url, params, successData, failData)
    this.setData({
      menu: 4,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //商品编辑
  bindMenu2: function() {
    //显示弹出框样式
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData: animation.export(),
      editModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)

    this.setData({
      menu: 2,
      actionSheetHidden: !this.data.actionSheetHidden
    })
    //获取当前该商品的所属类别
    var categoryId = this.data.categoryId;
    var addObjectArray = this.data.addObjectArray
    for (var i = 0; i < addObjectArray.length; i++) {

      if (categoryId == addObjectArray[i].id) {
        this.setData({
          addIndex: i
        })

      }

    }
  },
  //删除商品
  bindMenu3: function() {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var productId = that.data.productId;
    wx.showModal({
      title: '删除商品',
      content: '是否删除该商品？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        if (res.confirm) {
          var url = util.url + InterFace.deleteProduct;
          var params = {
            "productId": productId
          };
          var successData = function(res) {
            if (res.data.code == 0) {
              util.showToastMsg("删除成功")
            } else {
              util.showToastMsg(res.data.msg)
            }
            //获取商品类别Id
            var selectCategory = that.data.selectCategory;
            var selectCategoryIdArray = that.data.objectArray;
            for (var i = 0; i < selectCategoryIdArray.length; i++) {
              if (selectCategory == selectCategoryIdArray[i].name) {
                that.setData({
                  selectCategoryId: selectCategoryIdArray[i].id
                })
              }
            }
            // 更新商品列表
            var selectCategoryId = that.data.selectCategoryId;
            if (selectCategoryId == 0) {
              var param = {
                "pageNum": 1,
                "pageSize": 1000,
              };
              that.getProducts(param, that);
            } else {
              var param = {
                "pageNum": 1,
                "pageSize": 1000,
                'categoryId': selectCategoryId
              };
              that.getProducts(param, that);
            }

          };
          var failData = function(res) {
            //获取商品类别Id
            var selectCategory = that.data.selectCategory;
            var selectCategoryIdArray = that.data.objectArray;
            for (var i = 0; i < selectCategoryIdArray.length; i++) {
              if (selectCategory == selectCategoryIdArray[i].name) {
                that.setData({
                  selectCategoryId: selectCategoryIdArray[i].id
                })
              }
            }
            // 更新商品列表
            var selectCategoryId = that.data.selectCategoryId;
            if (selectCategoryId == 0) {
              var param = {
                "pageNum": 1,
                "pageSize": 1000,
              };
              that.getProducts(param, that);
            } else {
              var param = {
                "pageNum": 1,
                "pageSize": 1000,
                'categoryId': selectCategoryId
              };
              that.getProducts(param, that);
            }
          };
          request.Request('POST', '删除中', url, params, successData, failData)
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    this.setData({
      menu: 3,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //添加商品所属类别
  addBindPickerChange: function(e) {
    this.setData({
      addIndex: e.detail.value
    })
  },
  //选择类别
  bindPickerChange: function(e) {

    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      selectCategory: this.data.array[e.detail.value]
    })

    console.log(this.data.selectCategory)
    var categoryId = this.data.objectArray[this.data.index].id;
    // this.setData({
    //   bindCategoryId: categoryId
    // })
    var that = this;
    if (categoryId == 0) {
      var param = {
        "pageNum": 1,
        "pageSize": 1000,
      };
      that.getProducts(param, that);

    } else {
      //var that = this;
      var param = {
        "pageNum": 1,
        "pageSize": 1000,
        "categoryId": categoryId
      };
      that.getProducts(param, that);

    }
  },
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
          url: util.url + InterFace.imageUpload + '?size=SIZE_1',
          filePath: tempFilePaths[0],
          name: 'imageFile',

          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          success: function(res) {
            var headerImage = JSON.parse(res.data).data.imgUrl
            that.setData({
              img: headerImage
            })
            console.log(JSON.parse(res.data).data.imgUrl)
            that.setData({
              hide: false,
              show: true
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  click1: function(e) {

    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: util.url + InterFace.imageUpload + '?size=SIZE_1',
          filePath: tempFilePaths[0],
          name: 'imageFile',
          header: {
            'content-type': 'application/json',
            'Token': loginToken
          },
          success: function(res) {
            var headerImage = JSON.parse(res.data).data.imgUrl
            that.setData({
              editimg: headerImage
            })
            console.log(JSON.parse(res.data).data.imgUrl)
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    that.setData({
      hide: false,
      show: true
    })
  },
  /**
   * 弹出层函数
   */
  imageLoad: function(e) {
    this.setData({
      imageHeight: e.detail.height,
      imageWidth: e.detail.width
    });
  },
  showModal: function(e) {
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
    //获取添加所属类别名称
    var selectCategory = this.data.selectCategory;
    var addArray = this.data.addArray;
    for (var i = 0; i < addArray.length; i++) {
      if (selectCategory == addArray[i]) {
        this.setData({
          addIndex: i
        })
      }
    }

    //获取商品类别Id
    var selectCategory = this.data.selectCategory;
    var selectCategoryIdArray = this.data.objectArray;
    for (var i = 0; i < selectCategoryIdArray.length; i++) {
      if (selectCategory == selectCategoryIdArray[i].name) {
        this.setData({
          selectCategoryId: selectCategoryIdArray[i].id
        })
      }
    }
  },
  hideModal: function() {
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //隐藏编辑弹出层
  edithideModal: function(e) {
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        editModalStatus: false
      })
    }.bind(this), 200)
  },
  //更新输入框值  name:'',

  inputChanged: function(e) {
    switch (e.currentTarget.id) {
      case 'GoodsName':

        this.setData({
          GoodsName: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'goodsPrice':
        this.setData({
          goodsPrice: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'goodsNUm':
        this.setData({
          goodsNUm: e.detail.value.replace(/\s+/g, '')
        });
        break;
      case 'changeGoodsName':

        this.setData({
          name: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'changegoodsPrice':
        this.setData({
          price: e.detail.value.replace(/\s+/g, '')
        })

        break;
      case 'changegoodsNUm':
        this.setData({
          num: e.detail.value.replace(/\s+/g, '')
        });
        break;
    }
  },
  goodsEdit: function(e) {
    var that = this;
    var loginToken = wx.getStorageSync("loginToken");
    var name = that.data.name;
    var price = that.data.price;
    var stock = that.data.num;
    var categoryId = that.data.addObjectArray[that.data.addIndex].id;
    var imgUrl = that.data.editimg;
    var productId = that.data.productId;

    if (name == '') {
      util.showToastMsg('商品名称不能为空');
      return
    } else {
      if (price === '') {
        util.showToastMsg('商品价格不能为空');
        return
      } else {
        if (stock === '') {
          util.showToastMsg('商品数量不能为空');
          return
        } else {
          if (imgUrl == '') {
            util.showToastMsg('请添加商品图片');
            return
          } else {
            var url = util.url + InterFace.saveProduct;
            var params = {
              "id": productId,
              "name": name,
              "price": price,
              "stock": stock,
              "categoryId": categoryId,
              "imgUrl": imgUrl
            };
            var successData = function(res) {
              if (res.data.code == 0) {
                util.showToastMsg('修改成功')
                that.setData({
                  name: '',
                  price: '',
                  num: '',
                  editimg: '',
                  hide: true,
                  show: false,
                  editModalStatus: false
                })
              } else {
                util.showToastMsg(res.data.msg)
              }
              that.pickerStoreState(that);
            };
            var failData = function(res) {
              that.pickerStoreState(that);
            };
            request.Request('POST', '提交中', url, params, successData, failData)
          }
        }
      }
    }

  },
  // 表单提交
  formSubmit: function(e) {
    var that = this;
    var name = that.data.GoodsName;
    var price = that.data.goodsPrice;
    var stock = that.data.goodsNUm;
    var categoryId = that.data.addObjectArray[that.data.addIndex].id
    var imgUrl = that.data.img;
    if (name == "") {
      util.showToastMsg('商品名称不能为空');
      return
    } else {
      if (price == '') {
        util.showToastMsg('商品价格不能为空');
        return
      } else {
        if (stock == '') {
          util.showToastMsg('商品数量不能为空');
          return
        } else {
          if (imgUrl == '') {
            util.showToastMsg('请添加商品图片');
            return
          } else {
            var url = util.url + InterFace.saveProduct;
            var params = {
              "name": name,
              "price": price,
              "stock": stock,
              "categoryId": categoryId,
              "imgUrl": imgUrl
            };
            var successData = function(res) {
              if (res.data.code == 0) {
                util.showToastMsg('添加成功')
                that.setData({
                  GoodsName: '',
                  goodsPrice: '',
                  goodsNUm: '',
                  img: '',
                  hide: true,
                  show: false,
                  showModalStatus: false
                })
              } else {
                util.showToastMsg(res.data.msg)
              }
              that.pickerStoreState(that);
            };
            var failData = function(res) {
              that.pickerStoreState(that);
            };
            request.Request('POST', '提交中', url, params, successData, failData)
          }
        }
      }
    }

  },
  //商品上下架选中商品的状态
  upOrDown: function(that) {
    var categoryId = that.data.objectArray[that.data.index].id
    if (categoryId == 0) {
      var param = {
        "pageNum": 1,
        "pageSize": 1000,
      };
      that.getProducts(param, that);
    } else {
      var param = {
        "pageNum": 1,
        "pageSize": 1000,
        "categoryId": categoryId
      };
      that.getProducts(param, that)
    }
  },
  //更新选中商品状态
  pickerStoreState: function(that) {
    // 更新商品列表
    var array = that.data.array;
    var addArray = that.data.addArray;
    var addIndex = that.data.addIndex;
    var addObjectArray = that.data.addObjectArray;
    var categoryId = '';
    for (var i = 0; i < addArray.length; i++) {
      if (addObjectArray[i].name == addArray[addIndex]) {
        categoryId = addObjectArray[i].id
      }
    }
    //所有商品选中状态
    for (var i = 0; i < array.length; i++) {
      if (addArray[addIndex] == array[i]) {
        that.setData({
          index: i
        })
      }
    }
    var param = {
      "pageNum": 1,
      "pageSize": 1000,
      "categoryId": categoryId
    };
    that.getProducts(param, that);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var name = that.data.array;
    var addArray = that.data.addArray;
    var url = util.url + InterFace.getCategories;
    var params = {};
    var successData = function(res) {
      var ojobjectArray = that.data.objectArray;
      for (var i = 0; i < res.data.data.categories.length; i++) {
        name.push(res.data.data.categories[i].name);
        addArray.push(res.data.data.categories[i].name);
        ojobjectArray.push(res.data.data.categories[i])
      }
      that.setData({
        objectArray: ojobjectArray,
        array: name,
        addArray: addArray,
        addObjectArray: res.data.data.categories
      })
    };
    var failData = function(res) {};
    request.Request('GET', '加载中', url, params, successData, failData)
    // 商品列表
    var param = {
      "pageNum": 1,
      "pageSize": 1000,
    };
    that.getProducts(param, that);
  },
  getProducts: function(params, that) {
    var url = util.url + InterFace.getProducts;
    var successData = function(res) {
      if (res.data.code == 0) {
        that.setData({
          goodsList: res.data.data.list
        })
      } else {
        util.showToastMsg(res.data.msg)
      }
    };
    var failData = function(res) {};
    request.Request('GET', '加载中', url, params, successData, failData)
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
    return {
      title: "盘活入住客人，带来更多收益，客房助手来啦！~",
      path: 'pages/login/login',
      imageUrl: util.imgUrl + '/shareImg.png'
    }
  }
})