//showModalMsg
const showModalMsgs = (showNodalMsg) => {

  wx.showModal({
    title: '',
    content: showNodalMsg,
    showCancel: false,
    confirmText: '确定',
  })
}
//request 封装

const Request = (method, showLoadingText, url, params, successData, failData, showModalMsg = true)=>{
  var loginToken = wx.getStorageSync("loginToken");
  wx.showLoading({
    title: showLoadingText,
    mask: true,
  })
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/json',
      'Token': loginToken
    },
    method: method,
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      wx.hideLoading()
      if(res.statusCode == 200){
        console.log(res)
        successData(res)
      }else if(res.statusCode == 404){
        showModalMsgs("请求资源不存在")
      } else if (res.statusCode == 502) {
        showModalMsgs("服务器正在维护")
      } else {
        showModalMsgs("请求失败，请检查您的网络")
      }
    },
    fail: function(res) {
      wx.hideLoading()
      failData(res)
      var showModalMsg = '请求失败，请检查网络'
      if(res.statusCode == 404){
        showModalMsg = '请求资源不存在'
      }
      showModalMsgs(showModalMsg)
    },
    complete: function(res) {
      
    },
  })
}

/** 
 * 账号权限设置模块
*/
//禁止或解除禁止函数封装
const orUse = (url, userId, title, content, status, util)=>{
  var loginToken = wx.getStorageSync("loginToken");
  wx.showLoading({
    title: '请稍候',
    mask: true,
  })
  wx.request({
    url: url,
    data: {
      "userId": userId
    },
    header: {
      'content-type': 'application/json',
      'Token': loginToken
    },
    method: 'POST',
    success: function (res) {
      console.log(res)
      wx.showModal({
        title: title,
        content: content,
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          if (res.confirm) {
            util.showToastMsg(status)
            wx.navigateBack({
              delta: 1,
            })

          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })

    },
    fail: function (res) { },
    complete: function (res) { 
      wx.hideLoading();
    },
  })
};
//表单提交函数封装
const formSubmit = (url, params, util,that)=>{
  var loginToken = wx.getStorageSync("loginToken");
  wx.showLoading({
    title: '提交中',
    mask: true,
  })
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/json',
      'Token': loginToken
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == 0) {
        util.showToastMsg("提交成功")
        that.setData({
          name: '',
          phone: '',
          password: '',
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        util.showToastMsg(res.data.msg);
      }
      console.log(res);

    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
     },
  })
};
const addPosition = (url, positionName)=>{
  var loginToken = wx.getStorageSync("loginToken");
  wx.request({
    url: url,
    data: {
      "positionName": positionName
    },
    header: {
      'content-type': 'application/json',
      'Token': loginToken
    },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      console.log(res)
    },
    fail: function (res) { },
    complete: function (res) { },
  })
};
module.exports = {
  orUse: orUse,
  formSubmit: formSubmit,
  addPosition: addPosition,
  showModalMsgs: showModalMsgs,
  Request: Request

}
