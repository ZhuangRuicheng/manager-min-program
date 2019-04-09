// pages/hotelInfoEdit/vipEdit/vipEdit.js
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
    vipGrades:[],
    vipModalStatus:false,
    vipName:'',
    vipPrice:'',
    Viptextarea:'',
    vipEditName: '',
    vipEditPrice: 0,
    VipEdittextarea: '',
    vipid:''
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
  vipshowModal: function (e) {
    // //vip 显示遮罩层
    
    this.setData({
     
      vipModalStatus: true
    })
  
    console.log(e.currentTarget.dataset.id);
    var VIPid = e.currentTarget.dataset.id;
    var VIPname = e.currentTarget.dataset.name;
    var VIPprivilege = e.currentTarget.dataset.privilege;
    var VIPprice = e.currentTarget.dataset.price;
    
   this.setData({
     vipid: VIPid,
     vipEditName: VIPname,
     vipEditPrice: VIPprice,
     VipEdittextarea: VIPprivilege
   })
  },
  hideModal: function () {
    // 隐藏遮罩层
   
   
      this.setData({
       
        showModalStatus: false
      })
   
  },
  viphideModal: function () {
    // vip隐藏遮罩层
   
      this.setData({

        vipModalStatus: false
      })

  },
  // 表单提交
  formSubmit:function(e){
    var that = this;
    var id  = that.data.vipid;
    var name = that.data.vipName;
    var price = that.data.vipPrice;
    var privilege = that.data.Viptextarea;
    var repeatVip = false;
    if(name==""){
      util.showToastMsg("会员名称不能为空")
      return
    }else{
      if (price == ''){
        util.showToastMsg("会员价格为空")
        return
      }else{
        var url = util.url + InterFace.saveVipGrade;
        var params = {
          "name": name,
          "price": price,
          "privilege": privilege
        };
        var successData = function (res) {
          if (res.data.code == 0) {
            that.setData({
              vipName: '',
              vipPrice: '',
              Viptextarea: '',
              showModalStatus: false,
            })
            util.showToastMsg('添加成功')
          } else {
            util.showToastMsg(res.data.msg)
          }
          that.getVipGrades(that)
        };
        var failData = function (res) {
          that.getVipGrades(that)
        };
        request.Request('POST', '提交中', url, params, successData, failData)
      }
    
    }
  },
  //更改会员
  changeVip:function(e){
    var value = e.detail.value;
    var len = value.length;
   // console.log(len)
    if (len >= 498) {
      util.showToastMsg("文本超出500字，请重新检验！");
      return
    } else {
      var that = this;
      var id = that.data.vipid;
      var name = that.data.vipEditName;
      var price = that.data.vipEditPrice;
      var privilege = that.data.VipEdittextarea;
      console.log("vip:" + price)
      if (name == "") {
        util.showToastMsg("会员名称不能为空")
        return
      } else {
       
        if(price === "" ){
          util.showToastMsg("会员价格不能为空")
          console.log("会员")
          return
        
        }else{
          var url = util.url + InterFace.saveVipGrade;
          var params = {
            "id": id,
            "name": name,
            "price": price,
            "privilege": privilege
          };
          var successData = function (res) {
            if (res.data.code == 0) {
              that.setData({
                vipModalStatus: false,
              })
              util.showToastMsg('修改成功')
            } else {
              util.showToastMsg(res.data.msg)
            }
            that.getVipGrades(that)
          };
          var failData = function (res) {
            that.getVipGrades(that)
          };
          request.Request('POST', '修改中', url, params, successData, failData)
        }
      }
    }
   
  },
  //删除会员
  deleteVip:function(e){
    var that = this;
    var VIPid = e.currentTarget.dataset.idx;
    wx.showModal({
      title: '提示',
      content: '是否删除此会员类型？',
      success: function (res) {
        if (res.confirm) {
          var url = util.url + InterFace.deleteVipGrade;
          var params = {
            "vipGradeId": VIPid
          };
          var successData = function(res){
            if(res.data.code == 0){
              util.showToastMsg("删除成功");
            }else{
              util.showToastMsg(res.data.msg)
            }
            that.getVipGrades(that)
          };
          var failData = function(res){
            that.getVipGrades(that)
          };
          request.Request('POST', '删除中', url, params, successData, failData)
        } else if (res.cancel) {
          return false;
        }
      }
    })
   
    console.log(VIPid)
  },
  //获取VIP等级信息
  getVipGrades:function(that){
    var url = util.url + InterFace.getVipGrades;
    var params = {};
    var successData = function(res){
      if (res.data.code == 0) {
        that.setData({
          vipGrades: res.data.data.vipGrades
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
  onLoad: function (options) {
    var that = this;
    that.getVipGrades(that)
  },
  //更新输入框
  inputChanged: function (e) {
    switch (e.currentTarget.id) {
      case 'vipName':

        this.setData({
          vipName: e.detail.value
        })
        break;
      case 'vipPrice':
        this.setData({
          vipPrice: e.detail.value
        })

        break;
      case 'Viptextarea':
        var value = e.detail.value;
        var len = value.length;
        console.log(len)
        if(len > 498){
          util.showToastMsg("文本超出500字，请重新检验！");
          return
        }else{
        this.setData({
          Viptextarea: e.detail.value
        });
      }
        break;
      case 'vipShowName':
        this.setData({
          vipEditName: e.detail.value
        });
        break;
      case 'changeViptextarea':
        var value = e.detail.value;
        var len = value.length;
        console.log(len)
        if (len > 498) {
          util.showToastMsg("文本超出500字，请重新检验！");
          return
        } else {
        this.setData({
          VipEdittextarea: e.detail.value
        });
        }
        break;    
      case 'changeVipPrice':
        this.setData({
          vipEditPrice: e.detail.value
        });
        break;
    }
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